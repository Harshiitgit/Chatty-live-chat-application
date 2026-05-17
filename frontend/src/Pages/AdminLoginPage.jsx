import { useState } from "react";
import { useAdminStore } from "../Store/useAdminStore.js";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, User, MessageSquare, Shield } from "lucide-react";
import BackButton from "../Components/BackButton";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    adminId: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const { adminLogin, isLoggingIn } = useAdminStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.adminId.trim()) {
      errors.adminId = "Admin ID is required";
    }
    
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await adminLogin(formData);
    if (success) {
      navigate("/admin/dashboard");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-100/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton to="/login" label="Back to Login" />
        </div>

        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300">
              <Shield className="w-9 h-9 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-base-content mb-2">Admin Portal</h1>
          <p className="text-base-content/70 text-lg">Manage your Chatty platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin ID Input */}
            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">
                Admin ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-base-100 hover:bg-base-200/30 transition-all shadow-sm text-base-content placeholder:text-base-content/40 ${validationErrors.adminId ? "border-error" : "border-base-300"}`}
                  placeholder="admin123"
                  value={formData.adminId}
                  onChange={(e) => handleInputChange("adminId", e.target.value)}
                />
              </div>
              {validationErrors.adminId && (
                <p className="text-error text-xs mt-1">{validationErrors.adminId}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-base-content mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-base-100 hover:bg-base-200/30 transition-all shadow-sm text-base-content placeholder:text-base-content/40 ${validationErrors.password ? "border-error" : "border-base-300"}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-error text-xs mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all shadow-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in to Admin Panel"
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-base-200">
            <p className="text-xs font-semibold text-base-content/70 mb-3 text-center">Demo Credentials</p>
            <div className="space-y-2 bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-base-content/80 font-medium">Admin ID:</span>
                <code className="text-sm font-mono font-semibold text-primary bg-base-100 px-3 py-1.5 rounded-lg border border-primary/30">
                  admin123
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-base-content/80 font-medium">Password:</span>
                <code className="text-sm font-mono font-semibold text-primary bg-base-100 px-3 py-1.5 rounded-lg border border-primary/30">
                  admin@123
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-base-content/60">
          <p>Chatty Admin Portal • Secure Access Only</p>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 flex justify-center">
          <BackButton to="/" label="← Home" />
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
