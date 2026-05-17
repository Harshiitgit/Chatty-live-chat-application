import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,  // 5 second timeout for server selection
            socketTimeoutMS: 45000,           // 45 second timeout for socket
        });

        return conn;
    } catch (error) {
        console.error(`\n❌ MongoDB Connection Error:`);
        console.error(`   URI: ${process.env.MONGO_URI}`);
        console.error(`   Message: ${error.message}\n`);
        
        if (error.name === 'MongoServerError') {
            console.error(`   This is a MongoDB server error.`);
            console.error(`   Make sure MongoDB is running: mongod\n`);
        } else if (error.name === 'MongoNetworkError') {
            console.error(`   Failed to connect to MongoDB.`);
            console.error(`   Make sure MongoDB is running on: ${process.env.MONGO_URI}\n`);
        }
        
        throw error;  // Re-throw to be caught by caller
    }
};

export default connectDB;
