import { useEffect, useState } from "react";
import { useAdminStore } from "../Store/useAdminStore.js";
import { useNavigate } from "react-router-dom";
import { Trash2, Users, LogOut, Search, Loader2, Power, Activity, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import BackButton from "../Components/BackButton";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { adminUser, users, stats, websiteStatus, getAllUsers, getDashboardStats, deleteUser, adminLogout, getWebsiteStatus, toggleWebsiteStatus, isTogglingWebsite } =
    useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([getAllUsers(), getDashboardStats(), getWebsiteStatus()]);
      setIsLoading(false);
    };

    loadData();
  }, [adminUser, navigate]);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    await adminLogout();
    navigate("/admin/login");
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      deleteUser(userId);
    }
  };

  const handleToggleWebsite = async () => {
    const success = await toggleWebsiteStatus();
    if (!success) {
      // Error already shown via toast
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-base-100 to-base-100/50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-100/50 pt-16">
      {/* Header */}
      <div className="bg-base-100 shadow-sm border-b border-base-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/" label="Back" />
            <div>
              <h1 className="text-2xl font-bold text-base-content">Admin Dashboard</h1>
              <p className="text-sm text-base-content/70 mt-1">Welcome back, <span className="font-semibold text-primary">{adminUser?.adminId}</span></p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-error to-error/80 hover:shadow-lg text-error-content rounded-lg font-semibold transition-all shadow-soft"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-base-200 p-6 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/70">Total Users</p>
                <p className="text-4xl font-bold text-primary mt-3">{stats?.totalUsers || 0}</p>
                <p className="text-xs text-base-content/60 mt-2">Active users on platform</p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 rounded-2xl">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Platform Status Card */}
          <div className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-base-200 p-6 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/70">Platform Status</p>
                <div className="flex items-center gap-2 mt-3">
                  <Activity className={`h-6 w-6 ${websiteStatus?.isActive ? 'text-success' : 'text-base-content/30'}`} />
                  <span className={`text-lg font-bold ${websiteStatus?.isActive ? 'text-success' : 'text-base-content/50'}`}>
                    {websiteStatus?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleToggleWebsite}
                disabled={isTogglingWebsite}
                className={`p-4 rounded-xl transition-all ${
                  websiteStatus?.isActive
                    ? 'bg-gradient-to-br from-success/20 to-success/5 text-success hover:shadow-soft'
                    : 'bg-gradient-to-br from-base-200 to-base-300 text-base-content/40 hover:shadow-soft'
                } disabled:opacity-50`}
                title={websiteStatus?.isActive ? 'Stop website' : 'Start website'}
              >
                {isTogglingWebsite ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Power className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Admin Panel Info Card */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-primary/20 p-6 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/70">Admin Panel</p>
                <p className="text-sm text-primary mt-3 font-bold">v1.0</p>
                <p className="text-xs text-base-content/60 mt-1 font-medium">Fully Operational</p>
              </div>
              <div className="bg-gradient-to-br from-primary/30 to-secondary/30 p-4 rounded-2xl">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Management Section */}
        <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-primary/15 to-secondary/15 px-6 py-5 border-b border-base-200">
            <h2 className="text-lg font-bold text-base-content flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              User Management
            </h2>
          </div>

          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/40" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  className="w-full pl-12 pr-4 py-3 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-base-200/40 hover:bg-base-200/60 transition-all shadow-sm text-base-content placeholder:text-base-content/40 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <p className="text-xs text-base-content/70 mt-2 font-medium">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Users Table */}
            {filteredUsers.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-base-200">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-base-300 bg-base-200/50">
                      <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Full Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-base-content">Joined Date</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-base-content">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b border-base-200 hover:bg-base-200/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-base-content">{user.fullName}</td>
                        <td className="px-6 py-4 text-sm text-base-content/80">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-base-content/80">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(user._id, user.fullName)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-error/20 to-error/10 text-error hover:shadow-soft rounded-lg font-semibold text-sm transition-all hover:from-error/30 hover:to-error/20 border border-error/30"
                            title="Delete user"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-base-200/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-base-content/30" />
                </div>
                <p className="text-base-content/70 font-semibold text-lg">
                  {searchQuery ? "No users found matching your search." : "No users registered yet."}
                </p>
                <p className="text-base-content/60 text-sm mt-2">
                  {!searchQuery && "Users will appear here once they sign up."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center pb-8">
          <p className="text-sm text-base-content/60 mb-6 font-medium">Chatty Admin Panel • v1.0</p>
          <div className="flex justify-center gap-4 items-center flex-col sm:flex-row">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-error to-error/80 hover:shadow-lg text-error-content rounded-xl font-semibold transition-all shadow-soft"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
            <BackButton to="/" label="← Home" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
