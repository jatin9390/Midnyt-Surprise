const nodemailer = require('nodemailer');
const config = require('./config');

const sendBirthdayEmail = async (settings) => {
    // Revert to static transporter (Bot Account)
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const senderName = settings.senderName || "A Friend";
    let finalAppUrl = process.env.APP_URL || 'http://localhost:5173';

    // Append Unique ID if available
    if (settings.message && settings.message._id) {
        finalAppUrl = `${finalAppUrl}/?id=${settings.message._id}`;
    }

    const mailOptions = {
        from: `"Midnyt Surprise" <${process.env.EMAIL_USER}>`,
        to: settings.recipientEmail,
        subject: `Happy Birthday! (From ${senderName}) 🎂`,
        html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333; padding: 20px;">
        <h1 style="color: #d97706;">🎉 It's Your Special Day! 🎉</h1>
        <p style="font-size: 16px;">A special digital surprise is waiting for you.</p>
        <p style="font-size: 16px;">Click the link below to open your gift:</p>
        <a href="${finalAppUrl}" style="display: inline-block; background: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Open Surprise</a>
        <p style="margin-top: 30px; font-size: 12px; color: #888;">With love,<br><strong>${senderName}</strong></p>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return false;
    }
};

module.exports = { sendBirthdayEmail };
