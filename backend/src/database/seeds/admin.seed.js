import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ adminId: "admin123" });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin@123", salt);

        // Create admin
        const admin = new Admin({
            adminId: "admin123",
            password: hashedPassword,
            email: "admin@chatty.com",
            role: "admin",
            isActive: true,
            lastLogin: null
        });

        await admin.save();
        console.log("✅ Admin created successfully!");
        console.log("Admin ID: admin123");
        console.log("Password: admin@123");
        console.log("Email: admin@chatty.com");
        console.log("Status: Active");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error.message);
        process.exit(1);
    }
};

seedAdmin();
