import WebsiteStatus from "../database/models/websiteStatus.model.js";

export const getWebsiteStatus = async (req, res) => {
    try {
        let status = await WebsiteStatus.findOne();
        
        // If no status exists, create one
        if (!status) {
            status = new WebsiteStatus({
                isActive: true,
                lastUpdatedBy: "system"
            });
            await status.save();
        }
        
        res.status(200).json(status);
    } catch (error) {
        console.log("Error in getting website status:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const toggleWebsiteStatus = async (req, res) => {
    try {
        let status = await WebsiteStatus.findOne();
        
        // If no status exists, create one
        if (!status) {
            status = new WebsiteStatus({
                isActive: true,
                lastUpdatedBy: req.admin?.adminId || "system"
            });
        } else {
            // Toggle the status
            status.isActive = !status.isActive;
            status.lastUpdatedBy = req.admin?.adminId || "system";
            status.updatedAt = new Date();
        }
        
        await status.save();
        
        res.status(200).json({
            message: status.isActive ? "Website started successfully" : "Website stopped successfully",
            status
        });
    } catch (error) {
        console.log("Error in toggling website status:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
