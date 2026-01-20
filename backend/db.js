const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;

        // 1. Try Remote or Explicit URI if provided
        if (uri) {
            try {
                console.log("Awaiting connection to remote DB...");
                const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
                console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
                return;
            } catch (err) {
                console.error(`❌ Remote connection failed: ${err.message}`);
                console.log("⚠️ Falling back to local options...");
            }
        }

        // 2. Try Standard Local Host
        try {
            const localUri = 'mongodb://127.0.0.1:27017/midnyt-surprise';
            await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
            console.log("✅ MongoDB Connected: Localhost (Standard)");
            return;
        } catch (err) {
            console.log("⚠️ Local 'mongod' process not running.");
        }

        // 3. Fallback to In-Memory Database
        console.log("🚀 Starting MongoDB Memory Server (Fallback)...");
        // Lazy load to avoid crash if not installed yet (though we are installing it)
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const memoryUri = mongod.getUri();

        await mongoose.connect(memoryUri);
        console.log(`✅ MongoDB Connected: In-Memory Instance (${memoryUri})`);
        console.log("⚠️ NOTE: Data will be lost when server restarts.");

    } catch (error) {
        console.error(`❌ Fatal Error: Could not connect to any database. ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
