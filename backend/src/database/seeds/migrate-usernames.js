import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../models/user.model.js";

const migrateUsernames = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔗 MongoDB connected for migration...\n");

        console.log("📝 Starting Username Migration...\n");

        // Check for users without username
        const usersWithoutUsername = await User.find({ username: { $exists: false } });
        
        if (usersWithoutUsername.length > 0) {
            console.log(`Found ${usersWithoutUsername.length} users without username field`);
            console.log("Deleting old users without username...\n");
            
            // Delete all users (migration)
            const deleteResult = await User.deleteMany({ username: { $exists: false } });
            console.log(`✅ Deleted ${deleteResult.deletedCount} old users\n`);
        } else {
            console.log("✅ All users already have username field\n");
        }

        // Check current user count
        const userCount = await User.countDocuments();
        
        if (userCount === 0) {
            console.log("📋 No users found. You need to seed users.");
            console.log("Run: npm run seed:users\n");
        } else {
            console.log(`✅ Migration complete! Current users: ${userCount}`);
            const sampleUsers = await User.find().limit(3);
            console.log("\nSample Users:");
            sampleUsers.forEach((user, i) => {
                console.log(`  ${i + 1}. ${user.username} (${user.email})`);
            });
            console.log();
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Migration error:", error.message);
        process.exit(1);
    }
};

migrateUsernames();
