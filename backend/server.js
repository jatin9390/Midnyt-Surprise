require('dotenv').config();
const express = require('express');
const cors = require('cors');
const scheduler = require('./scheduler');
const mailer = require('./mailer');
const connectDB = require('./db');
const Settings = require('./models/Settings');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database and Start Server
connectDB().then(() => {
    // Seed Database from settings.json if empty (Migration Helper)
    const seedDatabase = async () => {
        try {
            const count = await Settings.countDocuments();
            if (count === 0) {
                console.log("📂 Database empty. Seeding from settings.json...");
                try {
                    const legacyData = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json'), 'utf8'));
                    await Settings.create(legacyData);
                    console.log("✅ Seeded successfully.");
                } catch (err) {
                    console.log("⚠️ No settings.json found or invalid. Creating defaults.");
                    await Settings.create({
                        recipientEmail: process.env.RECIPIENT_EMAIL || "test@example.com"
                    });
                }
            }
        } catch (error) {
            console.error("Seed error:", error);
        }
    };

    seedDatabase().then(() => {
        scheduler.initScheduler();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });
});

app.use(cors()); // Allow All (Simplest fix for connection issues)
// app.options('*', cors()); // Removed to prevent crash
app.use(express.json({ limit: '10mb' })); // Restore JSON Body Parser


// Middleware for Admin Authentication
const requireAuth = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    console.log(`🔐 Auth attempt. Pass provided: ${password ? 'YES' : 'NO'}`);

    const validPassword = process.env.ADMIN_PASSWORD || 'midnyt';
    if (password === validPassword) {
        next();
    } else {
        console.log("❌ Auth failed: Incorrect Password");
        res.status(401).json({ error: "Unauthorized: Incorrect Password" });
    }
};

// Public Route (Safe Data Only - Name)
app.get('/api/public-config', async (req, res) => {
    try {
        const { id } = req.query;
        let settings;

        if (id && id !== 'undefined' && id !== 'null') {
            settings = await Settings.findById(id);
        } else {
            settings = await Settings.findOne().sort({ createdAt: -1 }); // Fallback to latest
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

// Protected Route (Full Data) - Requires Password
app.get('/api/config', requireAuth, async (req, res) => {
    try {
        let settings = await Settings.findOne().sort({ createdAt: -1 });
        if (!settings) {
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (e) {
        res.status(500).json({ error: "Failed to read settings from DB" });
    }
});

// Protected Route (Save Data) - Requires Password
app.post('/api/config', requireAuth, async (req, res) => {
    try {
        const { recipientName, recipientEmail, birthdayDate, birthdayTime, senderName, messageContent, images } = req.body;

        const updateData = {
            senderName,
            recipientName,
            recipientEmail,
            birthdayDate,
            birthdayTime,
            messageContent,
            images,
            emailSent: false
        };

        // ALWAYS Create New (For Unique Links)
        // Instead of updating the latest, we create a new entry every time "Finalize" is clicked.
        // This ensures every surprise has a permanent, unique existence.
        let settings = await Settings.create(updateData);

        console.log("⚙️ Settings updated in DB:", settings);



        res.json({ message: "Settings saved successfully", settings });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Failed to save settings" });
    }
});

app.get('/', (req, res) => {
    res.send('Midnyt Surprise Backend is running (MongoDB) 🌙');
});
