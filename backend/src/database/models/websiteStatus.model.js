import mongoose from "mongoose";

const websiteStatusSchema = new mongoose.Schema(
    {
        isActive: {
            type: Boolean,
            default: true,
        },
        lastUpdatedBy: {
            type: String,
            default: "system",
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const WebsiteStatus = mongoose.model("WebsiteStatus", websiteStatusSchema);
export default WebsiteStatus;
