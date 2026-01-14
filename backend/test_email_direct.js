require('dotenv').config();
const mongoose = require('mongoose');
const Settings = require('./models/Settings');
const mailer = require('./mailer');

const testEmail = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ DB Connected");

        const settings = await Settings.findOne().sort({ createdAt: -1 });
        if (!settings) throw new Error("No settings found");

        console.log(`📧 Attempting to send to: ${settings.recipientEmail}`);

        const success = await mailer.sendBirthdayEmail({
            recipientEmail: settings.recipientEmail,
            senderName: settings.senderName || "Test Sender",
            appUrl: "http://test-url.com" // Mock URL
        });

        if (success) {
            console.log("✅ Email sent successfully!");
        } else {
            console.error("❌ Email failed to send.");
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

testEmail();
