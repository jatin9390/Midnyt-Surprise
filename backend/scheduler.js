const cron = require('node-cron');
const mailer = require('./mailer');
const Settings = require('./models/Settings');

// Schedule task to run at 12:00 AM every day
const initScheduler = () => {
    console.log('⏳ Scheduler initialized. checking every minute...');

    // Cron expression: * * * * * (Every minute)
    cron.schedule('* * * * *', async () => {
        try {
            // Fetch ALL pending settings (Multi-Recipient Support)
            const allPendingSettings = await Settings.find({ emailSent: false });

            if (allPendingSettings.length === 0) {
                // console.log('⚠️ No pending emails found.');
                return;
            }

            const today = new Date();
            const currentMonth = today.getMonth() + 1; // 0-indexed
            const currentDate = today.getDate();
            const currentHours = String(today.getHours()).padStart(2, '0');
            const currentMinutes = String(today.getMinutes()).padStart(2, '0');
            const currentTime = `${currentHours}:${currentMinutes}`;

            // console.log(`⏳ Checking ${allPendingSettings.length} pending scheduled emails...`);

            for (const settings of allPendingSettings) {
                // Check if birthday format is valid MM-DD
                if (!settings.birthdayDate) continue;

                const [targetMonth, targetDate] = settings.birthdayDate.split('-').map(Number);
                const targetTime = settings.birthdayTime || "00:00";

                // Convert current and target times to minutes for comparison
                const [cHours, cMinutes] = currentTime.split(':').map(Number);
                const [tHours, tMinutes] = targetTime.split(':').map(Number);

                const currentTotalMinutes = cHours * 60 + cMinutes;
                const targetTotalMinutes = tHours * 60 + tMinutes;

                // Check if:
                // 1. Date matches
                // 2. Time is ON TARGET or WITHIN 5 MINUTES (Grace Period)
                const isDateMatch = currentMonth === targetMonth && currentDate === targetDate;
                const isTimeMatch = currentTotalMinutes >= targetTotalMinutes && currentTotalMinutes <= targetTotalMinutes + 5;

                if (isDateMatch && isTimeMatch) {
                    // ATOMIC LOCK: 
                    // Try to mark as 'sent' (or a temp status) immediately to prevent other processes from grabbing it
                    // effectively "claiming" the job.
                    const uniqueClaim = await Settings.findOneAndUpdate(
                        { _id: settings._id, emailSent: false },
                        { $set: { emailSent: true } } // Optimistically mark as sent
                    );

                    if (!uniqueClaim) {
                        console.log(`⚠️ Race condition detected. Email for ${settings.recipientEmail} already handled.`);
                        continue;
                    }

                    console.log(`🎂 sending email to ${settings.recipientEmail} (Claimed by this process)...`);

                    const success = await mailer.sendBirthdayEmail({
                        recipientEmail: settings.recipientEmail,
                        senderName: settings.senderName,
                        appUrl: process.env.APP_URL,
                        message: settings // Contains _id for unique link
                    });

                    if (success) {
                        console.log(`🎉 Email sent to ${settings.recipientEmail}!`);
                        // Already marked true above, so we are done.
                    } else {
                        console.log(`❌ Failed to send to ${settings.recipientEmail}.Reverting status.`);
                        // Revert if sending failed so it can be retried
                        await Settings.updateOne({ _id: settings._id }, { $set: { emailSent: false } });
                    }
                }
            }
        } catch (err) {
            console.error("Scheduler Error:", err);
        }
    });
};

module.exports = { initScheduler };
