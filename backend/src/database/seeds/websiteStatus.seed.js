import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import WebsiteStatus from "../models/websiteStatus.model.js";

const seedWebsiteStatus = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");

        // Check if status already exists
        const existingStatus = await WebsiteStatus.findOne();
        if (existingStatus) {
            console.log("Website status already exists");
            process.exit(0);
        }

        // Create website status
        const status = new WebsiteStatus({
            isActive: true,
            lastUpdatedBy: "system"
        });

        await status.save();
        console.log("✅ Website status initialized successfully!");
        console.log("Status:", status.isActive ? "Active" : "Inactive");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding website status:", error.message);
        process.exit(1);
    }
};

seedWebsiteStatus();
