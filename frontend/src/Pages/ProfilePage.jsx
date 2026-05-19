import { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore.js";
import { Camera, Mail, User, Calendar, Shield, CheckCircle, Clock, Settings, LogOut } from "lucide-react";
import BackButton from "../Components/BackButton";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If the date is invalid, return just the date part if it's in ISO format
        return dateString.split("T")[0];
      }
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch {
      return dateString.split("T")[0];
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-base-100 via-base-100 to-base-100/50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton to="/" label="← Back to Chat" />
        </div>

        {/* Main Profile Container */}
        <div className="space-y-6">
          {/* Header Card - Profile Picture and Basic Info */}
          <div className="bg-gradient-to-br from-base-100 to-base-200/30 rounded-3xl shadow-lg border border-base-200 overflow-hidden">
            {/* Gradient Background Banner */}
            <div className="h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20"></div>

            {/* Profile Content */}
            <div className="relative px-8 pb-8">
              {/* Avatar with Upload */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 mb-8">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden border-8 border-base-100 shadow-2xl ring-4 ring-primary/20 bg-base-300">
                    <img
                      src={selectedImg || authUser?.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-2 right-2 
                      bg-gradient-to-br from-primary to-secondary hover:scale-110 
                      p-4 rounded-full cursor-pointer 
                      transition-all duration-200 shadow-lg
                      text-white group-hover:shadow-xl
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className="w-6 h-6" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                {/* Name and Status */}
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-4xl font-bold text-base-content mb-2">{authUser?.fullName}</h1>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                    <p className="text-lg text-success font-semibold">Online & Active</p>
                  </div>
                  <p className="text-sm text-base-content/60 mt-2">
                    {isUpdatingProfile ? "Updating profile..." : "Click camera icon to change photo"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information Card */}
              <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-8">
                <h2 className="text-2xl font-bold text-base-content mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Username */}
                  <div className="bg-gradient-to-br from-base-200/50 to-base-300/30 rounded-2xl p-6 border border-base-300/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-primary" />
                      <label className="text-sm font-bold text-base-content/70 uppercase tracking-wide">Username</label>
                    </div>
                    <p className="text-2xl font-bold text-base-content break-all">{authUser?.username}</p>
                  </div>

                  {/* Email */}
                  <div className="bg-gradient-to-br from-base-200/50 to-base-300/30 rounded-2xl p-6 border border-base-300/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <label className="text-sm font-bold text-base-content/70 uppercase tracking-wide">Email Address</label>
                    </div>
                    <p className="text-lg font-semibold text-base-content break-all">{authUser?.email}</p>
                  </div>

                  {/* Full Name */}
                  <div className="bg-gradient-to-br from-base-200/50 to-base-300/30 rounded-2xl p-6 border border-base-300/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-primary" />
                      <label className="text-sm font-bold text-base-content/70 uppercase tracking-wide">Full Name</label>
                    </div>
                    <p className="text-lg font-semibold text-base-content">{authUser?.fullName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Account Stats & Details */}
            <div className="space-y-6">
              {/* Account Stats Card */}
              <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-2xl shadow-lg border border-primary/20 p-8">
                <h2 className="text-xl font-bold text-base-content mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  Account Details
                </h2>

                <div className="space-y-5">
                  {/* Member Since */}
                  <div className="bg-base-100/60 backdrop-blur-sm rounded-xl p-4 border border-base-300/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-bold text-base-content/60 uppercase">Member Since</span>
                    </div>
                    <p className="text-sm font-bold text-base-content">{formatDate(authUser?.createdAt)}</p>
                  </div>

                  {/* Account Status */}
                  <div className="bg-base-100/60 backdrop-blur-sm rounded-xl p-4 border border-base-300/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs font-bold text-base-content/60 uppercase">Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <p className="text-sm font-bold text-success">Active</p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="bg-base-100/60 backdrop-blur-sm rounded-xl p-4 border border-base-300/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-warning" />
                      <span className="text-xs font-bold text-base-content/60 uppercase">Last Updated</span>
                    </div>
                    <p className="text-sm font-bold text-base-content">{formatDate(authUser?.updatedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-base-200 hover:bg-base-300 text-base-content font-semibold py-3 rounded-xl transition-colors">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 bg-error/20 hover:bg-error/30 text-error font-semibold py-3 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-gradient-to-r from-success/10 via-info/10 to-success/10 rounded-2xl shadow-lg border border-success/20 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-base-content mb-1">Profile Complete</h3>
                <p className="text-base-content/70">Your profile is fully set up and active on Chatty!</p>
              </div>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="mt-12 flex justify-center">
            <BackButton to="/" label="← Back to Chat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;