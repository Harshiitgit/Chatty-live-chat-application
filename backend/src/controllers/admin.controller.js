import Admin from "../database/models/admin.model.js";
import User from "../database/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    const { adminId, password } = req.body;
    try {
        // Validate inputs and trim whitespace
        if (!adminId || !password) {
            return res.status(400).json({ message: "Admin ID and password are required" });
        }

        const trimmedAdminId = adminId.trim();
        const trimmedPassword = password.trim();

        // Validate that fields are not empty after trimming
        if (!trimmedAdminId || !trimmedPassword) {
            return res.status(400).json({ message: "Admin ID and password cannot be empty" });
        }

        const admin = await Admin.findOne({ adminId: trimmedAdminId });
        if (!admin) {
            console.log(`[Admin Login] Failed - Admin not found with ID: ${trimmedAdminId}`);
            return res.status(401).json({ message: "Invalid Admin Credentials" });
        }

        // Check if admin account is active
        if (!admin.isActive) {
            console.log(`[Admin Login] Failed - Admin account inactive: ${trimmedAdminId}`);
            return res.status(403).json({ message: "Admin account is inactive" });
        }

        const isValidPass = await bcrypt.compare(trimmedPassword, admin.password);
        if (!isValidPass) {
            console.log(`[Admin Login] Failed - Invalid password for admin ID: ${trimmedAdminId}`);
            return res.status(401).json({ message: "Invalid Admin Credentials" });
        }

        const token = jwt.sign({ adminId: admin._id, role: "admin" }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("adminJwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        });

        // Update last login timestamp
        admin.lastLogin = new Date();
        await admin.save();

        console.log(`[Admin Login] Success - Admin ${trimmedAdminId} logged in successfully`);

        res.status(200).json({
            _id: admin._id,
            adminId: admin.adminId,
            email: admin.email,
            role: admin.role
        });
    } catch (error) {
        console.error("Error in admin login controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const adminLogout = (req, res) => {
    try {
        res.cookie("adminJwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        console.log("Error in admin logout controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAdminAuth = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select("-password");
        return res.status(200).json(admin);
    } catch (error) {
        console.log("Error in check admin auth:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getting all users:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.log("Error in deleting user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const users = await User.find().select("-password");

        res.status(200).json({
            totalUsers,
            users
        });
    } catch (error) {
        console.log("Error in getting dashboard stats:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
