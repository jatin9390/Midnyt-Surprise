require('dotenv').config();
const mongoose = require('mongoose');
const Settings = require('./models/Settings');

const inspectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const settings = await Settings.findOne().sort({ createdAt: -1 });
        console.log(JSON.stringify({
            recipient: settings?.recipientEmail,
            date: settings?.birthdayDate,
            time: settings?.birthdayTime,
            emailSent: settings?.emailSent,
            serverTime: new Date().toString()
        }, null, 2));
        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
};
inspectDB();
