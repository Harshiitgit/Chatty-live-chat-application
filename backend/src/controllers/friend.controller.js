import FriendRequest from "../database/models/friendRequest.model.js";
import User from "../database/models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.body;

    // Validation
    if (!receiverId) {
      return res
        .status(400)
        .json({ message: "Receiver ID is required" });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself" });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already friends
    const sender = await User.findById(senderId);
    if (sender.friends.includes(receiverId)) {
      return res.status(400).json({ message: "Already friends with this user" });
    }

    // Check for existing friend request (in either direction)
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
      status: { $in: ["pending", "accepted"] },
    });

    if (existingRequest) {
      if (existingRequest.status === "accepted") {
        return res.status(400).json({ message: "Already friends with this user" });
      }
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Create friend request
    const friendRequest = new FriendRequest({
      senderId,
      receiverId,
      status: "pending",
    });

    await friendRequest.save();
    await friendRequest.populate("senderId", "-password");

    // Emit socket event to receiver
    const receiverSocketId = getReceiverSocketId(receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("friendRequestReceived", {
        _id: friendRequest._id,
        sender: friendRequest.senderId,
        message: `${friendRequest.senderId.fullName} sent you a friend request`,
      });
    }

    res.status(201).json({
      message: "Friend request sent successfully",
      friendRequest,
    });
  } catch (error) {
    console.log("Error in sendFriendRequest:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get pending friend requests for logged-in user
export const getPendingRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const pendingRequests = await FriendRequest.find({
      receiverId: userId,
      status: "pending",
    })
      .populate("senderId", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.log("Error in getPendingRequests:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Check if current user is the receiver
    if (friendRequest.receiverId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to accept this request" });
    }

    if (friendRequest.status !== "pending") {
      return res.status(400).json({ message: "Friend request is not pending" });
    }

    // Update friend request status
    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add each other to friends list
    await User.findByIdAndUpdate(userId, {
      $addToSet: { friends: friendRequest.senderId },
    });

    await User.findByIdAndUpdate(friendRequest.senderId, {
      $addToSet: { friends: userId },
    });

    await friendRequest.populate("senderId", "-password");

    // Emit socket events
    const senderSocketId = getReceiverSocketId(friendRequest.senderId.toString());
    if (senderSocketId) {
      io.to(senderSocketId).emit("friendRequestAccepted", {
        message: `${req.user.fullName || "A user"} accepted your friend request`,
        friend: await User.findById(userId).select("-password"),
      });
    }

    res.status(200).json({
      message: "Friend request accepted",
      friendRequest,
    });
  } catch (error) {
    console.log("Error in acceptFriendRequest:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reject a friend request
export const rejectFriendRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Check if current user is the receiver
    if (friendRequest.receiverId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to reject this request" });
    }

    if (friendRequest.status !== "pending") {
      return res.status(400).json({ message: "Friend request is not pending" });
    }

    // Update status to rejected
    friendRequest.status = "rejected";
    await friendRequest.save();

    res.status(200).json({
      message: "Friend request rejected",
      friendRequest,
    });
  } catch (error) {
    console.log("Error in rejectFriendRequest:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a friend
export const removeFriend = async (req, res) => {
  try {
    const userId = req.user._id;
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    if (userId.toString() === friendId.toString()) {
      return res.status(400).json({ message: "Cannot remove yourself from friends" });
    }

    // Check if they are actually friends
    const user = await User.findById(userId);
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Not friends with this user" });
    }

    // Remove from both users' friend lists
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });

    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId },
    });

    // Remove any friend request records between them
    await FriendRequest.deleteMany({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    });

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.log("Error in removeFriend:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all friends of logged-in user
export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("friends", "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getFriends:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users except friends and self
export const getAvailableUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all users except self and existing friends
    const availableUsers = await User.find({
      _id: {
        $ne: userId,
        $nin: user.friends,
      },
    }).select("-password");

    res.status(200).json(availableUsers);
  } catch (error) {
    console.log("Error in getAvailableUsers:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Check friend request status between two users
export const checkFriendRequestStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;

    if (!targetUserId) {
      return res.status(400).json({ message: "Target user ID is required" });
    }

    // Check if already friends
    const user = await User.findById(userId);
    if (user.friends.includes(targetUserId)) {
      return res.status(200).json({ status: "friends" });
    }

    // Check for pending request in either direction
    const sentRequest = await FriendRequest.findOne({
      senderId: userId,
      receiverId: targetUserId,
      status: "pending",
    });

    const receivedRequest = await FriendRequest.findOne({
      senderId: targetUserId,
      receiverId: userId,
      status: "pending",
    });

    if (sentRequest) {
      return res.status(200).json({ status: "request_sent" });
    }

    if (receivedRequest) {
      return res.status(200).json({ status: "request_received", requestId: receivedRequest._id });
    }

    res.status(200).json({ status: "none" });
  } catch (error) {
    console.log("Error in checkFriendRequestStatus:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
