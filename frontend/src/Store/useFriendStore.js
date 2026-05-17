import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useFriendStore = create((set, get) => ({
  pendingRequests: [],
  friends: [],
  availableUsers: [],
  isLoading: false,
  friendRequestStatus: {}, // Maps userId to their request status

  // Get all pending friend requests
  getPendingRequests: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/friends/pending");
      set({ pendingRequests: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch requests");
    } finally {
      set({ isLoading: false });
    }
  },

  // Get user's friends list
  getFriends: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/friends/list");
      set({ friends: res.data });
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Get available users (not friends and not self)
  getAvailableUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/friends/available");
      set({ availableUsers: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isLoading: false });
    }
  },

  // Send a friend request
  sendFriendRequest: async (receiverId) => {
    try {
      const res = await axiosInstance.post("/friends/send", { receiverId });
      toast.success("Friend request sent!");
      
      // Update status
      set((state) => ({
        friendRequestStatus: {
          ...state.friendRequestStatus,
          [receiverId]: "request_sent",
        },
      }));
      
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request");
    }
  },

  // Accept a friend request
  acceptFriendRequest: async (requestId, senderId) => {
    try {
      const res = await axiosInstance.post("/friends/accept", { requestId });
      toast.success("Friend request accepted!");
      
      // Update pending requests
      set((state) => ({
        pendingRequests: state.pendingRequests.filter((r) => r._id !== requestId),
      }));
      
      // Refresh friends list
      get().getFriends();
      
      // Update status
      set((state) => ({
        friendRequestStatus: {
          ...state.friendRequestStatus,
          [senderId]: "friends",
        },
      }));
      
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    }
  },

  // Reject a friend request
  rejectFriendRequest: async (requestId, senderId) => {
    try {
      await axiosInstance.post("/friends/reject", { requestId });
      toast.success("Friend request rejected");
      
      // Update pending requests
      set((state) => ({
        pendingRequests: state.pendingRequests.filter((r) => r._id !== requestId),
      }));
      
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject request");
    }
  },

  // Remove a friend
  removeFriend: async (friendId) => {
    try {
      await axiosInstance.post("/friends/remove", { friendId });
      toast.success("Friend removed");
      
      // Update friends list
      set((state) => ({
        friends: state.friends.filter((f) => f._id !== friendId),
      }));
      
      // Reset status
      set((state) => ({
        friendRequestStatus: {
          ...state.friendRequestStatus,
          [friendId]: "none",
        },
      }));
      
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove friend");
    }
  },

  // Check friend request status with a specific user
  checkFriendRequestStatus: async (userId) => {
    try {
      const res = await axiosInstance.get(`/friends/status/${userId}`);
      set((state) => ({
        friendRequestStatus: {
          ...state.friendRequestStatus,
          [userId]: res.data.status,
          [`${userId}_requestId`]: res.data.requestId || null,
        },
      }));
      return res.data.status;
    } catch (error) {
      console.error("Failed to check status:", error);
    }
  },

  // Get status for multiple users
  checkMultipleStatuses: async (userIds) => {
    for (const userId of userIds) {
      await get().checkFriendRequestStatus(userId);
    }
  },
}));
