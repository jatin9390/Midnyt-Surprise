require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
    console.log("--- STARTING EMAIL TEST ---");
    console.log(`User: ${process.env.EMAIL_USER}`);
    console.log(`To: ${process.env.RECIPIENT_EMAIL}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        debug: true, // Show SMTP traffic
        logger: true // Log to console
    });

    try {
        console.log("Attempting to send...");
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: "FINAL TEST - Midnyt Surprise",
            text: "If you are reading this, the email system IS working."
        });
        console.log("--- SUCCESS ---");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);
    } catch (error) {
        console.log("--- ERROR ---");
        console.error(error);
    }
};

testEmail();
