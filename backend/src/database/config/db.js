import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

// Import Admin model dynamically to avoid circular dependencies
let Admin;
const getAdminModel = async () => {
    if (!Admin) {
        const adminModule = await import("../models/admin.model.js");
        Admin = adminModule.default;
    }
    return Admin;
};

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,  // 5 second timeout for server selection
            socketTimeoutMS: 45000,           // 45 second timeout for socket
        });

        // Initialize default admin account if it doesn't exist
        await initializeDefaultAdmin();

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

// Function to initialize default admin account
const initializeDefaultAdmin = async () => {
    try {
        const AdminModel = await getAdminModel();
        
        // Check if admin already exists
        const existingAdmin = await AdminModel.findOne({ adminId: "admin123" });
        if (existingAdmin) {
            return; // Admin already exists, no need to create
        }

        // Create default admin account
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin@123", salt);

        const defaultAdmin = new AdminModel({
            adminId: "admin123",
            password: hashedPassword,
            email: "admin@chatty.com",
            role: "admin",
            isActive: true,
            lastLogin: null
        });

        await defaultAdmin.save();
        console.log("\n✅ Default Admin Account Initialized");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Admin Portal Credentials:");
        console.log("  📧 Admin ID: admin123");
        console.log("  🔑 Password: admin@123");
        console.log("  ✉️  Email: admin@chatty.com");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    } catch (error) {
        // Only log if it's not a duplicate key error (which means admin already exists)
        if (error.code !== 11000) {
            console.error("Warning: Could not initialize admin account:", error.message);
        }
    }
};

export default connectDB;
