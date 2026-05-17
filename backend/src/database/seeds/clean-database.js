import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";

const cleanDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔗 MongoDB connected for cleanup...\n");

    // List of seed users to remove
    const seedEmails = [
      "emma.thompson@example.com",
      "olivia.miller@example.com",
      "sophia.davis@example.com",
      "ava.wilson@example.com",
      "isabella.brown@example.com",
      "mia.johnson@example.com",
      "charlotte.williams@example.com",
      "amelia.garcia@example.com",
      "james.anderson@example.com",
      "william.clark@example.com",
      "benjamin.taylor@example.com",
      "lucas.moore@example.com",
      "henry.jackson@example.com",
      "alexander.martin@example.com",
      "michael.thompson@example.com",
    ];

    console.log("🗑️  Removing seed users...");

    // Get IDs of seed users to delete
    const seedUsers = await User.find({ email: { $in: seedEmails } });
    const seedUserIds = seedUsers.map((u) => u._id);

    // Remove friend requests involving seed users
    const deletedRequests = await FriendRequest.deleteMany({
      $or: [
        { senderId: { $in: seedUserIds } },
        { receiverId: { $in: seedUserIds } },
      ],
    });

    console.log(`  ✅ Deleted ${deletedRequests.deletedCount} friend requests`);

    // Remove seed users
    const deletedUsers = await User.deleteMany({
      email: { $in: seedEmails },
    });

    console.log(`  ✅ Deleted ${deletedUsers.deletedCount} seed users\n`);

    // Show remaining users
    const remainingUsers = await User.find(
      {},
      "email fullName username createdAt"
    ).sort({ createdAt: -1 });

    console.log("📊 Remaining users in database:");
    if (remainingUsers.length === 0) {
      console.log("  ✨ Database is clean - no users");
    } else {
      remainingUsers.forEach((user) => {
        console.log(
          `  👤 ${user.fullName} (${user.email}) - @${user.username}`
        );
      });
    }

    console.log("\n✅ Database cleanup complete!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during cleanup:", error.message);
    process.exit(1);
  }
};

cleanDatabase();
