require('dotenv').config();
const mongoose = require('mongoose');

console.log("🔍 Debugging Environment Variables...");
console.log("MONGO_URI Type:", typeof process.env.MONGO_URI);
console.log("MONGO_URI Value:", process.env.MONGO_URI ? "Set (Hidden)" : "UNDEFINED");

if (!process.env.MONGO_URI) {
    console.error("❌ CRITICAL: MONGO_URI is missing from .env file!");
    process.exit(1);
}

const connectDB = async () => {
    try {
        console.log("⏳ Attempting to connect to Atlas...");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ SUCCESS! Connected to: ${conn.connection.host}`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
