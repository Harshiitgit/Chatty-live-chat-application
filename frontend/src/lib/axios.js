import axios from "axios"

// Determine the correct API base URL
const getBaseURL = () => {
    if (import.meta.env.MODE === "development") {
        // In development, use the current hostname so it works on any device
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        return `${protocol}//${hostname}:5001/api`;
    }
    // In production, use relative path
    return "/api";
};

export const axiosInstance = axios.create({
    baseURL: getBaseURL(),
    withCredentials:true, // for cookies in every single request
})