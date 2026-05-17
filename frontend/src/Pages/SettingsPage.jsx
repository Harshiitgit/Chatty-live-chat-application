import { useThemeStore } from "../Store/useThemeStore";
import { Send, Sun, Moon, Bell, Lock, Eye, MessageCircle, LogOut, Palette, HelpCircle, ChevronRight } from "lucide-react";
import BackButton from "../Components/BackButton";
import { useAuthStore } from "../Store/useAuthStore";
import { useState } from "react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { logout } = useAuthStore();
  const isDarkMode = theme === "dark";
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [messagePreview, setMessagePreview] = useState(true);

  const handleLogout = () => {
    logout();
  };

  const SettingToggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
        enabled ? "bg-success" : "bg-base-300"
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen pt-20 pb-8 bg-gradient-to-br from-base-100 via-base-100 to-base-100/50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton to="/" label="← Back to Chat" />
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-2">Settings</h1>
          <p className="text-lg text-base-content/60">Customize your experience and manage your preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-base-200 bg-gradient-to-r from-base-100 to-base-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-base-content">Appearance</h2>
              </div>
            </div>

            <div className="px-8 py-8">
              <p className="text-base-content/70 mb-8 font-medium">Choose your preferred theme</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Light Mode */}
                <button
                  onClick={() => setTheme("light")}
                  className={`relative group rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    !isDarkMode
                      ? "border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg shadow-primary/20"
                      : "border-base-300 hover:border-base-400 bg-base-100"
                  }`}
                >
                  {/* Card Content */}
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-base-300 flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Sun className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h3 className="text-lg font-bold text-base-content mb-2">Light Mode</h3>
                    <p className="text-sm text-base-content/60 mb-4">Bright and clean interface</p>
                    {!isDarkMode && (
                      <div className="inline-block px-3 py-1 rounded-full bg-success/20 text-success text-xs font-bold">
                        ✓ Active
                      </div>
                    )}
                  </div>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
                </button>

                {/* Dark Mode */}
                <button
                  onClick={() => setTheme("dark")}
                  className={`relative group rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    isDarkMode
                      ? "border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg shadow-primary/20"
                      : "border-base-300 hover:border-base-400 bg-base-100"
                  }`}
                >
                  {/* Card Content */}
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-base-300 flex items-center justify-center mx-auto mb-4 shadow-md">
                      <Moon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-base-content mb-2">Dark Mode</h3>
                    <p className="text-sm text-base-content/60 mb-4">Easy on the eyes</p>
                    {isDarkMode && (
                      <div className="inline-block px-3 py-1 rounded-full bg-success/20 text-success text-xs font-bold">
                        ✓ Active
                      </div>
                    )}
                  </div>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-base-200 bg-gradient-to-r from-base-100 to-base-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-info" />
                </div>
                <h2 className="text-2xl font-bold text-base-content">Notifications</h2>
              </div>
            </div>

            <div className="px-8 py-8 space-y-6">
              {/* Notification Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-base-200/40 to-base-300/20 border border-base-300/50 hover:border-base-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <p className="font-semibold text-base-content">Enable Notifications</p>
                    <p className="text-sm text-base-content/60">Get alerts for new messages</p>
                  </div>
                </div>
                <SettingToggle
                  enabled={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
              </div>

              {/* Message Preview Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-base-200/40 to-base-300/20 border border-base-300/50 hover:border-base-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-semibold text-base-content">Message Preview</p>
                    <p className="text-sm text-base-content/60">Show message content in notifications</p>
                  </div>
                </div>
                <SettingToggle
                  enabled={messagePreview}
                  onChange={() => setMessagePreview(!messagePreview)}
                />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-base-200 bg-gradient-to-r from-base-100 to-base-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-warning" />
                </div>
                <h2 className="text-2xl font-bold text-base-content">Privacy & Status</h2>
              </div>
            </div>

            <div className="px-8 py-8 space-y-6">
              {/* Online Status Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-base-200/40 to-base-300/20 border border-base-300/50 hover:border-base-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-base-content">Show Online Status</p>
                    <p className="text-sm text-base-content/60">Let others see when you're online</p>
                  </div>
                </div>
                <SettingToggle
                  enabled={onlineStatus}
                  onChange={() => setOnlineStatus(!onlineStatus)}
                />
              </div>
            </div>
          </div>

          {/* Support & Feedback */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Help & Support */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="px-8 py-6 border-b border-base-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-info" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content">Help & Support</h3>
                </div>
              </div>
              <div className="px-8 py-6">
                <p className="text-base-content/70 mb-6">Need help? Contact our support team</p>
                <button className="w-full flex items-center justify-center gap-2 bg-info/10 hover:bg-info/20 text-info font-semibold py-3 rounded-xl transition-all border border-info/30 hover:border-info/50 group">
                  Get Help
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* About */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="px-8 py-6 border-b border-base-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content">About Chatty</h3>
                </div>
              </div>
              <div className="px-8 py-6">
                <p className="text-base-content/70 mb-4">
                  <strong>Version:</strong> 1.0.0
                </p>
                <p className="text-base-content/70 mb-6">
                  <strong>Build:</strong> Stable Release
                </p>
                <button className="w-full flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary font-semibold py-3 rounded-xl transition-all border border-secondary/30 hover:border-secondary/50 group">
                  Learn More
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="bg-gradient-to-br from-error/5 via-error/5 to-error/10 rounded-2xl shadow-lg border border-error/20 overflow-hidden">
            <div className="px-8 py-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-error/20 flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-error" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-base-content">Logout</h3>
                  <p className="text-sm text-base-content/60">Sign out from your account</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-error hover:bg-error/90 text-white font-semibold rounded-lg transition-all hover:shadow-lg transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-success/10 via-info/10 to-success/10 rounded-2xl shadow-lg border border-success/20 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">✓</span>
            </div>
            <div>
              <h3 className="font-bold text-base-content mb-1">Settings Auto-Save</h3>
              <p className="text-sm text-base-content/70">
                All your settings are automatically saved and will sync across all your devices in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 flex justify-center">
          <BackButton to="/" label="← Back to Chat" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
