
import { X } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";
import { useChatStore } from "../Store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 lg:p-4 border-b border-base-200 bg-base-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 lg:size-12 rounded-full relative ring-2 ring-base-200 shadow-sm">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-base text-base-content">{selectedUser.fullName}</h3>
            <p className={`text-xs font-medium transition-colors ${onlineUsers?.includes(selectedUser._id) ? 'text-success' : 'text-base-content/60'}`}>
              {onlineUsers?.includes(selectedUser._id) ? '● Online' : '○ Offline'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2 hover:bg-base-200/60 rounded-lg transition-colors duration-200 text-base-content/60 hover:text-base-content"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
