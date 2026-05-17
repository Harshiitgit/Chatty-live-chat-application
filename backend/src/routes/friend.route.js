import express from "express";
import { protectRouter } from "../middleware/auth.middleware.js";
import {
  sendFriendRequest,
  getPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getFriends,
  getAvailableUsers,
  checkFriendRequestStatus,
} from "../controllers/friend.controller.js";

const router = express.Router();

// All routes require authentication
router.use(protectRouter);

// Friend request routes
router.post("/send", sendFriendRequest);
router.get("/pending", getPendingRequests);
router.post("/accept", acceptFriendRequest);
router.post("/reject", rejectFriendRequest);
router.post("/remove", removeFriend);

// Friends list
router.get("/list", getFriends);
router.get("/available", getAvailableUsers);

// Check status
router.get("/status/:targetUserId", checkFriendRequestStatus);

export default router;
