const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/midnyt-surprise', {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        // process.exit(1); // Do not exit in serverless environment
        throw error;
    }
};

module.exports = connectDB;
