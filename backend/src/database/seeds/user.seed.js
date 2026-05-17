import { config } from "dotenv";
import connectDB from "../config/db.js"
import User from "../models/user.model.js";
config();

const seedDatabase = async () => {
    try {
        await connectDB();

        const userCount = await User.countDocuments();
        console.log("📊 User Database Status:");
        console.log(`   Total registered users: ${userCount}`);
        
        if (userCount === 0) {
            console.log("\n   ℹ️  No users registered yet. Users must sign up through the signup page.\n");
        } else {
            console.log("\n   ✅ Real users are stored in the database.\n");
            const users = await User.find({}, "email fullName username").limit(5);
            console.log("   Sample users:");
            users.forEach((user) => {
                console.log(`      - ${user.fullName} (${user.email})`);
            });
            if (userCount > 5) {
                console.log(`      ... and ${userCount - 5} more\n`);
            } else {
                console.log();
            }
        }
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error.message);
        process.exit(1);
    }
};

// Call the function
seedDatabase();