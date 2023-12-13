// Initialize Mongoose
const mongoose = require('mongoose');
// connect to MongoDB
const connectDB = async () => {
    try {
        // MongoDB connection string
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Log the connection
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        // Log the error
        console.error(`Error: ${error.message}`.red.underline.bold);
        // Exit with failure
        process.exit(1);
    }
};

module.exports = connectDB;
