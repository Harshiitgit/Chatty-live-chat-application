import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib/axios"
import {useAuthStore} from "../Store/useAuthStore"

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    searchResults: [],
    selectedUser:null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSearching: false,


    getUsers: async() => {
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUserLoading:false});
        }
    },

    searchUsers: async(query) => {
        set({isSearching: true});
        try {
            const res = await axiosInstance.get(`/messages/search?q=${encodeURIComponent(query)}`);
            set({searchResults: res.data});
        } catch (error) {
            console.error("Search error:", error);
            set({searchResults: []});
        } finally {
            set({isSearching: false});
        }
    },

    clearSearch: () => {
        set({searchResults: [], isSearching: false});
    },

    getMessages: async(userId) => {
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false});
        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser?._id) {
            toast.error("No user selected");
            return;
        }
        try {
            console.log("Sending message:", messageData);
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("Send message failed:", error);
            toast.error(error?.response?.data?.message || "Failed to send message");
        }
    },
    
    subscribeToMessages: () => {
        const {selectedUser} = get();
        if(!selectedUser) return ;

        const socket = useAuthStore.getState().socket;


        socket.on("newMessage",(newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            });
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket && typeof socket.off === "function") {
            socket.off("newMessage");
        }
    },
    setSelectedUser: (selectedUser) => set({selectedUser}),
}))