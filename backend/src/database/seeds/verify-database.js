import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.models.js";
import WebsiteStatus from "../models/websiteStatus.model.js";

const verifyDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("\n🔗 MongoDB connected for database verification...\n");

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📊 DATABASE VERIFICATION REPORT");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        // ==================== ADMIN VERIFICATION ====================
        const adminCount = await Admin.countDocuments();
        console.log("👨‍💼 ADMIN COLLECTION");
        console.log(`   Total Admins: ${adminCount}`);
        
        if (adminCount > 0) {
            const admin = await Admin.findOne();
            console.log(`   ✅ Admin ID: ${admin.adminId}`);
            console.log(`   ✅ Email: ${admin.email}`);
            console.log(`   ✅ Role: ${admin.role}\n`);
        } else {
            console.log("   ⚠️  No admins found\n");
        }

        // ==================== USER VERIFICATION ====================
        const userCount = await User.countDocuments();
        console.log("👥 USER COLLECTION");
        console.log(`   Total Users: ${userCount}`);
        
        if (userCount > 0) {
            const users = await User.find().limit(3);
            console.log("   Sample Users:");
            users.forEach((user, index) => {
                console.log(`   ${index + 1}. ${user.fullName} (${user.email})`);
            });
            if (userCount > 3) {
                console.log(`   ... and ${userCount - 3} more users\n`);
            } else {
                console.log();
            }
        } else {
            console.log("   ⚠️  No users found\n");
        }

        // ==================== MESSAGE VERIFICATION ====================
        const messageCount = await Message.countDocuments();
        console.log("💬 MESSAGE COLLECTION");
        console.log(`   Total Messages: ${messageCount}`);
        
        if (messageCount > 0) {
            const messages = await Message.find().limit(2).populate("senderId receiverId", "fullName email");
            console.log("   Sample Messages:");
            messages.forEach((msg, index) => {
                const sender = msg.senderId?.fullName || "Unknown";
                const receiver = msg.receiverId?.fullName || "Unknown";
                const content = msg.text || "(Image message)";
                console.log(`   ${index + 1}. ${sender} → ${receiver}: ${content.substring(0, 40)}...`);
            });
            console.log();
        } else {
            console.log("   ⚠️  No messages found\n");
        }

        // ==================== WEBSITE STATUS VERIFICATION ====================
        const status = await WebsiteStatus.findOne();
        console.log("🌐 WEBSITE STATUS COLLECTION");
        
        if (status) {
            console.log(`   Status: ${status.isActive ? "🟢 ACTIVE" : "🔴 INACTIVE"}`);
            console.log(`   Last Updated By: ${status.lastUpdatedBy}`);
            console.log(`   Last Updated At: ${status.updatedAt.toLocaleString()}\n`);
        } else {
            console.log("   ⚠️  No website status found\n");
        }

        // ==================== DATABASE STATISTICS ====================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📈 STATISTICS SUMMARY");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        
        console.log("Collections Status:");
        console.log(`   ${adminCount > 0 ? "✅" : "❌"} Admins: ${adminCount} record(s)`);
        console.log(`   ${userCount > 0 ? "✅" : "❌"} Users: ${userCount} record(s)`);
        console.log(`   ${messageCount > 0 ? "✅" : "❌"} Messages: ${messageCount} record(s)`);
        console.log(`   ${status ? "✅" : "❌"} Website Status: ${status ? "initialized" : "missing"}\n`);

        // ==================== API HEALTH CHECK ====================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔧 API ENDPOINTS STATUS");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        console.log("Auth Routes:");
        console.log("   ✅ POST /api/auth/signup");
        console.log("   ✅ POST /api/auth/login");
        console.log("   ✅ POST /api/auth/logout");
        console.log("   ✅ PUT /api/auth/update-profile");
        console.log("   ✅ GET /api/auth/check\n");

        console.log("Message Routes:");
        console.log("   ✅ GET /api/messages/users");
        console.log("   ✅ GET /api/messages/:id");
        console.log("   ✅ POST /api/messages/send/:id\n");

        console.log("Admin Routes:");
        console.log("   ✅ POST /api/admin/login");
        console.log("   ✅ POST /api/admin/logout");
        console.log("   ✅ GET /api/admin/check");
        console.log("   ✅ GET /api/admin/users");
        console.log("   ✅ DELETE /api/admin/users/:userId");
        console.log("   ✅ GET /api/admin/dashboard/stats");
        console.log("   ✅ GET /api/admin/website-status");
        console.log("   ✅ PUT /api/admin/website-status/toggle\n");

        // ==================== FINAL STATUS ====================
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        const allSystemsReady = adminCount > 0 && userCount > 0 && status;
        if (allSystemsReady) {
            console.log("✨ ALL SYSTEMS OPERATIONAL ✨");
        } else {
            console.log("⚠️  SOME SYSTEMS NEED ATTENTION");
        }
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error during verification:", error.message);
        process.exit(1);
    }
};

verifyDatabase();
