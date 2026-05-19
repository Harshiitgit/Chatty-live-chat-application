import React, { useEffect, useState } from "react";
import { useFriendStore } from "../Store/useFriendStore";
import { Check, X, Inbox, Loader } from "lucide-react";
import Navbar from "../Components/Navbar";
import BackButton from "../Components/BackButton";

const FriendRequestsPage = () => {
  const { pendingRequests, isLoading, getPendingRequests, acceptFriendRequest, rejectFriendRequest } =
    useFriendStore();

  const [processingId, setProcessingId] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    getPendingRequests();
  }, [getPendingRequests]);

  const handleAccept = async (requestId, senderId) => {
    setProcessingId(requestId);
    setAction("accept");
    await acceptFriendRequest(requestId, senderId);
    setProcessingId(null);
    setAction(null);
  };

  const handleReject = async (requestId, senderId) => {
    setProcessingId(requestId);
    setAction("reject");
    await rejectFriendRequest(requestId, senderId);
    setProcessingId(null);
    setAction(null);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-100/50 flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-y-auto pt-20 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-base-content">Friend Requests</h1>
            <p className="text-base-content/60 text-lg">
              {pendingRequests.length} pending request{pendingRequests.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader className="size-8 animate-spin text-primary" />
                <p className="text-base-content/60">Loading requests...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && pendingRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-base-200/50 mb-4">
                <Inbox className="size-8 text-base-content/40" />
              </div>
              <p className="text-base-content/60 text-lg">No pending friend requests</p>
              <p className="text-base-content/50 mt-2">
                When someone sends you a request, it will appear here
              </p>
            </div>
          )}

          {/* Requests List */}
          {!isLoading && pendingRequests.length > 0 && (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-base-100 rounded-xl border border-base-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar */}
                    <div className="size-14 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-base-200">
                      {request.senderId.profilePic ? (
                        <img
                          src={request.senderId.profilePic}
                          alt={request.senderId.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-white">
                          {request.senderId.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      )}
                    </div>

                    {/* User Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-base-content text-lg">
                        {request.senderId.fullName}
                      </h3>
                      <p className="text-sm text-base-content/60">@{request.senderId.username}</p>
                      <p className="text-xs text-base-content/50 mt-1">
                        {request.senderId.email}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleAccept(request._id, request.senderId._id)}
                      disabled={processingId === request._id}
                      className="btn btn-sm btn-success gap-2 min-w-fit"
                    >
                      {processingId === request._id && action === "accept" ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <Check className="size-4" />
                      )}
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id, request.senderId._id)}
                      disabled={processingId === request._id}
                      className="btn btn-sm btn-ghost gap-2"
                    >
                      {processingId === request._id && action === "reject" ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <X className="size-4" />
                      )}
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="mt-12 flex justify-center pb-8">
            <BackButton to="/" label="← Back to Chat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsPage;
