require('dotenv').config();
const mongoose = require('mongoose');
const Settings = require('./models/Settings');

const debugDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected for Debugging");

        const settings = await Settings.findOne().sort({ createdAt: -1 });
        if (settings) {
            console.log("--- Current Settings ---");
            console.log("Recipient:", settings.recipientEmail);
            console.log("Date:", settings.birthdayDate);
            console.log("Time:", settings.birthdayTime);
            console.log("Email Sent Flag:", settings.emailSent);

            const now = new Date();
            const currentString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            console.log("--- System Time ---");
            console.log("Current Server Time:", currentString);
            console.log("Full Date:", now.toString());
        } else {
            console.log("⚠️ No settings found!");
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

debugDB();
