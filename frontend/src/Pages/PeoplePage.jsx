import React, { useEffect, useState } from "react";
import { useFriendStore } from "../Store/useFriendStore";
import { UserPlus, UserCheck, Search, Loader, Users, MapPin, Mail, MessageSquare } from "lucide-react";
import Navbar from "../Components/Navbar";
import BackButton from "../Components/BackButton";

const PeoplePage = () => {
  const {
    availableUsers,
    friendRequestStatus,
    isLoading,
    getAvailableUsers,
    sendFriendRequest,
    checkMultipleStatuses,
  } = useFriendStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [sendingTo, setSendingTo] = useState(null);

  useEffect(() => {
    getAvailableUsers();
  }, [getAvailableUsers]);

  useEffect(() => {
    if (availableUsers.length > 0) {
      const userIds = availableUsers.map((u) => u._id);
      checkMultipleStatuses(userIds);
    }
  }, [availableUsers, checkMultipleStatuses]);

  const handleSendRequest = async (userId) => {
    setSendingTo(userId);
    await sendFriendRequest(userId);
    setSendingTo(null);
  };

  const filteredUsers = availableUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getButtonState = (userId) => {
    const status = friendRequestStatus[userId];
    if (status === "friends") {
      return { 
        text: "Friends", 
        icon: UserCheck, 
        bgColor: "bg-success/10",
        textColor: "text-success",
        borderColor: "border-success/30",
        disabled: true 
      };
    } else if (status === "request_sent") {
      return { 
        text: "Request Sent", 
        icon: UserCheck, 
        bgColor: "bg-warning/10",
        textColor: "text-warning",
        borderColor: "border-warning/30",
        disabled: true 
      };
    }
    return { 
      text: "Add Friend", 
      icon: UserPlus, 
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/30",
      disabled: false 
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-100/50 flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-y-auto pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-base-content">Discover People</h1>
                <p className="text-base-content/60 mt-1">
                  Connect with {availableUsers.length} registered {availableUsers.length === 1 ? "user" : "users"} on Chatty
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pointer-events-none">
                <Search className="w-5 h-5 text-base-content/50" />
              </div>
              <input
                type="text"
                placeholder="Search by name, username, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-base-100 border-2 border-base-300 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm text-base-content placeholder:text-base-content/50"
              />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-24">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
                <p className="text-base-content/60 text-lg font-medium">Loading users...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredUsers.length === 0 && (
            <div className="flex justify-center items-center py-24">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-base-200/50 mb-6">
                  <Search className="w-10 h-10 text-base-content/40" />
                </div>
                <p className="text-xl font-semibold text-base-content mb-2">
                  {searchQuery ? "No users found" : "No users available"}
                </p>
                <p className="text-base-content/60">
                  {searchQuery 
                    ? "Try searching with different keywords" 
                    : "There are no registered users to connect with at the moment"}
                </p>
              </div>
            </div>
          )}

          {/* Users Grid */}
          {!isLoading && filteredUsers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => {
                const buttonState = getButtonState(user._id);
                const Icon = buttonState.icon;

                return (
                  <div
                    key={user._id}
                    className="group bg-base-100 rounded-2xl border-2 border-base-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
                  >
                    {/* Profile Header Background */}
                    <div className="h-28 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 group-hover:from-primary/30 group-hover:via-secondary/30 group-hover:to-primary/30 transition-all duration-300"></div>

                    {/* Profile Content */}
                    <div className="relative px-6 pb-6">
                      {/* Avatar */}
                      <div className="flex justify-center -mt-16 mb-4">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-2xl border-4 border-base-100 overflow-hidden shadow-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            {user.profilePic ? (
                              <img
                                src={user.profilePic}
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-4xl font-bold text-white">
                                {user.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-base-content mb-1">
                          {user.fullName}
                        </h3>
                        <p className="text-sm font-semibold text-primary mb-3">
                          @{user.username}
                        </p>
                        
                        {/* Email */}
                        <div className="flex items-center justify-center gap-2 text-sm text-base-content/60 mb-3 truncate">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleSendRequest(user._id)}
                        disabled={buttonState.disabled || sendingTo === user._id}
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                          buttonState.disabled
                            ? `${buttonState.bgColor} ${buttonState.textColor} ${buttonState.borderColor} cursor-not-allowed`
                            : `${buttonState.bgColor} ${buttonState.textColor} ${buttonState.borderColor} hover:${buttonState.bgColor}/30 hover:scale-105 active:scale-95`
                        }`}
                      >
                        {sendingTo === user._id ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Icon className="w-5 h-5" />
                            <span>{buttonState.text}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Results Count */}
          {!isLoading && filteredUsers.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-base-content/60 font-medium">
                Showing {filteredUsers.length} of {availableUsers.length} available {availableUsers.length === 1 ? "user" : "users"}
              </p>
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="mt-16 flex justify-center pb-8">
            <BackButton to="/" label="← Back to Chat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
