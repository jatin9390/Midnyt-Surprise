require('dotenv').config();
const mongoose = require('mongoose');
const Settings = require('./models/Settings');

const forceUpdate = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const settings = await Settings.findOne().sort({ createdAt: -1 });

        if (settings) {
            const now = new Date();
            // Set for 2 minutes from now to ensure scheduler picks it up
            const future = new Date(now.getTime() + 2 * 60000);
            const timeString = `${future.getHours().toString().padStart(2, '0')}:${future.getMinutes().toString().padStart(2, '0')}`;
            const dateString = `${future.getMonth() + 1}-${future.getDate()}`.split('-').map(p => p.padStart(2, '0')).join('-');

            settings.birthdayDate = dateString;
            settings.birthdayTime = timeString;
            settings.emailSent = false; // RESET this so it sends again

            await settings.save();
            console.log(`✅ FORCED UPDATE: Scheduled for ${dateString} at ${timeString}`);
        }
        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
};
forceUpdate();
