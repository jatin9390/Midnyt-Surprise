// api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/db');
const Settings = require('../backend/models/Settings');

const app = express();

// Initialize DB Connection
// Note: In serverless, we must handle connection reuse carefully.
// Mongoose 5+ handles buffering, so just calling connectDB is usually fine.
// However, we should await it if possible, but Express handlers can be async.
connectDB();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Middleware for Admin Authentication
const requireAuth = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    const validPassword = process.env.ADMIN_PASSWORD || 'midnyt';
    if (password === validPassword) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// --- Routes ---

app.get('/api/public-config', async (req, res) => {
    try {
        const { id } = req.query;
        let settings;

        if (id && id !== 'undefined' && id !== 'null') {
            settings = await Settings.findById(id);
        } else {
            settings = await Settings.findOne().sort({ createdAt: -1 });
        }

        if (!settings) return res.json({ recipientName: "Friend", messageContent: "", images: [] });

        res.json({
            recipientName: settings.recipientName || "Friend",
            messageContent: settings.messageContent || "",
            images: settings.images || [],
            senderName: settings.senderName || "Friend"
        });
    } catch (e) {
        console.error(e);
        res.json({ recipientName: "Friend" });
    }
});

app.get('/api/config', requireAuth, async (req, res) => {
    try {
        let settings = await Settings.findOne().sort({ createdAt: -1 });
        if (!settings) settings = await Settings.create({});
        res.json(settings);
    } catch (e) {
        res.status(500).json({ error: "Failed to read settings" });
    }
});

app.post('/api/config', requireAuth, async (req, res) => {
    try {
        const { recipientName, recipientEmail, birthdayDate, birthdayTime, senderName, messageContent, images } = req.body;
        const updateData = {
            senderName, recipientName, recipientEmail, birthdayDate, birthdayTime, messageContent, images, emailSent: false
        };
        const settings = await Settings.create(updateData);
        res.json({ message: "Settings saved successfully", settings });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to save settings" });
    }
});

app.get('/', (req, res) => {
    res.send('Midnyt Surprise API (Vercel) 🌙');
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
