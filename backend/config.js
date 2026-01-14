require('dotenv').config();
const fs = require('fs');
const path = require('path');

const getSettings = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'settings.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading settings.json", err);
        return {};
    }
};

const settings = getSettings();

module.exports = {
    email: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    recipient: {
        // Priority: settings.json > .env
        email: settings.recipientEmail || process.env.RECIPIENT_EMAIL,
        birthday: settings.birthdayDate || process.env.BIRTHDAY_DATE,
        time: settings.birthdayTime || "00:00",
        name: settings.recipientName || process.env.RECIPIENT_NAME || 'Friend',
        senderName: settings.senderName || 'A Friend',
        emailSent: settings.emailSent || false
    },
    appUrl: process.env.APP_URL || 'http://localhost:5173',
    port: process.env.PORT || 3000
};
