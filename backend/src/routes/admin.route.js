import express from "express";
import { protectAdminRouter } from "../middleware/adminAuth.middleware.js";
import {
    adminLogin,
    adminLogout,
    checkAdminAuth,
    getAllUsers,
    deleteUser,
    getDashboardStats
} from "../controllers/admin.controller.js";
import {
    getWebsiteStatus,
    toggleWebsiteStatus
} from "../controllers/websiteStatus.controller.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

// Protected routes
router.get("/check", protectAdminRouter, checkAdminAuth);
router.get("/users", protectAdminRouter, getAllUsers);
router.delete("/users/:userId", protectAdminRouter, deleteUser);
router.get("/dashboard/stats", protectAdminRouter, getDashboardStats);

// Website Status routes
router.get("/website-status", getWebsiteStatus);
router.put("/website-status/toggle", protectAdminRouter, toggleWebsiteStatus);

export default router;
