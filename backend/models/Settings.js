const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    senderName: { type: String, default: "Friend" },
    recipientName: { type: String, default: "Friend" },
    recipientEmail: { type: String, required: true },
    birthdayDate: { type: String, default: "01-01" }, // MM-DD
    birthdayTime: { type: String, default: "00:00" }, // HH:mm
    messageContent: { type: String, default: "" },
    images: { type: [String], default: [] }, // Base64 strings
    emailSent: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false } // For potential future use
}, { timestamps: true });

// Prevent multiple settings documents; we generally want one global config per deployment for this simple app
// or we can just fetch the first one.

module.exports = mongoose.model('Settings', settingsSchema);
