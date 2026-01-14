require('dotenv').config();
const mongoose = require('mongoose');
const Settings = require('./models/Settings');

const verifyDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected for Verification");
        const count = await Settings.countDocuments();
        console.log(`📊 Settings Documents: ${count}`);

        if (count > 0) {
            const doc = await Settings.findOne();
            console.log("📝 Sample Data:", doc.recipientEmail);
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

verifyDB();
