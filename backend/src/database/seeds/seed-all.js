import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.models.js";
import WebsiteStatus from "../models/websiteStatus.model.js";
import bcrypt from "bcryptjs";

const seedAll = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔗 MongoDB connected for comprehensive seeding...\n");

        // ==================== ADMIN SEEDING ====================
        console.log("📝 Setting up Admin...");
        const existingAdmin = await Admin.findOne({ adminId: "admin123" });
        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("admin@123", salt);
            
            const admin = new Admin({
                adminId: "admin123",
                password: hashedPassword,
                email: "admin@chatty.com",
                role: "admin"
            });
            
            await admin.save();
            console.log("✅ Admin created");
            console.log("   - Admin ID: admin123");
            console.log("   - Password: admin@123\n");
        } else {
            console.log("⚠️  Admin already exists. Skipping...\n");
        }

        // ==================== USER SEEDING ====================
        console.log("👥 User Management...");
        const existingUsers = await User.countDocuments();
        
        if (existingUsers === 0) {
            console.log("ℹ️  No users in database. Users must register through the signup page.\n");
        } else {
            console.log(`✅ ${existingUsers} real registered user(s) found\n`);
        }

        // ==================== MESSAGE SEEDING (OPTIONAL) ====================
        console.log("💬 Sample Messages...");
        const existingMessages = await Message.countDocuments();
        
        if (existingMessages === 0) {
            console.log("ℹ️  No sample messages. Messages are created only through user interactions.\n");
        } else {
            console.log(`✅ ${existingMessages} message(s) found in database\n`);
        }

        // ==================== WEBSITE STATUS SEEDING ====================
        console.log("🌐 Setting up Website Status...");
        const existingStatus = await WebsiteStatus.findOne();
        
        if (!existingStatus) {
            const status = new WebsiteStatus({
                isActive: true,
                lastUpdatedBy: "system"
            });

            await status.save();
            console.log("✅ Website status initialized");
            console.log(`   - Status: ${status.isActive ? "🟢 Active" : "🔴 Inactive"}\n`);
        } else {
            console.log("⚠️  Website status already exists. Skipping...\n");
        }

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("✨ Database Setup Complete!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n📋 Summary:");
        console.log("  ✓ Admin Portal: admin123 / admin@123");
        console.log("  ✓ Users: Only real registered users are shown");
        console.log("  ✓ Messages: Created through user interactions");
        console.log("  ✓ Website Status: Active\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error during seeding:", error.message);
        process.exit(1);
    }
};

seedAll();
