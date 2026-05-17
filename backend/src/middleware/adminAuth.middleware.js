import jwt from "jsonwebtoken";
import Admin from "../database/models/admin.model.js";

export const protectAdminRouter = async (req, res, next) => {
    try {
        const token = req.cookies?.adminJwt;
        if (!token) {
            console.log("[Admin Auth] No token provided");
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log("[Admin Auth] Token verification failed:", err.message);
            return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
        }

        const admin = await Admin.findById(decoded.adminId).select("-password");
        if (!admin) {
            console.log("[Admin Auth] Admin not found for ID:", decoded.adminId);
            return res.status(404).json({ message: "Admin Not Found" });
        }

        // Verify admin is active
        if (!admin.adminId) {
            console.log("[Admin Auth] Admin account inactive for ID:", decoded.adminId);
            return res.status(403).json({ message: "Admin account is inactive" });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error("Error in admin protect router middleware:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
