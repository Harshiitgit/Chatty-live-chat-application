import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
    adminUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    users: [],
    stats: null,
    websiteStatus: null,
    isTogglingWebsite: false,

    checkAdminAuth: async () => {
        try {
            const res = await axiosInstance.get("/admin/check");
            set({ adminUser: res.data });
        } catch (error) {
            console.log("Error in checkAdminAuth:", error);
            set({ adminUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    adminLogin: async (data) => {
        set({ isLoggingIn: true });
        try {
            // Validate input before sending
            if (!data.adminId || !data.password) {
                toast.error("Admin ID and password are required");
                set({ isLoggingIn: false });
                return false;
            }

            if (data.adminId.trim().length === 0 || data.password.trim().length === 0) {
                toast.error("Admin ID and password cannot be empty");
                set({ isLoggingIn: false });
                return false;
            }

            const res = await axiosInstance.post("/admin/login", data);
            set({ adminUser: res.data });
            toast.success("Admin logged in successfully");
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed";
            console.error("Admin login error:", errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    adminLogout: async () => {
        try {
            await axiosInstance.post("/admin/logout");
            set({ adminUser: null, users: [], stats: null, websiteStatus: null });
            toast.success("Logged out successfully");
        } catch {
            toast.error("Logout failed");
        }
    },

    getAllUsers: async () => {
        try {
            const res = await axiosInstance.get("/admin/users");
            set({ users: res.data });
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    },

    deleteUser: async (userId) => {
        try {
            await axiosInstance.delete(`/admin/users/${userId}`);
            get().getAllUsers(); // Refresh the user list
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user");
            console.log("Error deleting user:", error);
        }
    },

    getDashboardStats: async () => {
        try {
            const res = await axiosInstance.get("/admin/dashboard/stats");
            set({ stats: res.data });
        } catch {
            // Error fetching stats
        }
    },

    getWebsiteStatus: async () => {
        try {
            const res = await axiosInstance.get("/admin/website-status");
            set({ websiteStatus: res.data });
        } catch {
            // Error fetching website status
        }
    },

    toggleWebsiteStatus: async () => {
        set({ isTogglingWebsite: true });
        try {
            const res = await axiosInstance.put("/admin/website-status/toggle");
            set({ websiteStatus: res.data.status });
            toast.success(res.data.message);
            return true;
        } catch (error) {
            toast.error("Failed to toggle website status");
            console.log("Error toggling website status:", error);
            return false;
        } finally {
            set({ isTogglingWebsite: false });
        }
    }
}));
