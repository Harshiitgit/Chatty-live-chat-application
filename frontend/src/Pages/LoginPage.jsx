import { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore.js";
import AuthImagePattern from "../Components/AuthImagePattern.jsx";
import PasswordStrengthIndicator from "../Components/PasswordStrengthIndicator.jsx";
import BackButton from "../Components/BackButton.jsx";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-base-100 to-base-100/50">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3 group">
              <div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-lg transition-all duration-300 shadow-soft"
              >
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-base-content/60 text-lg">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-12 pr-4 bg-base-100 border-base-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 bg-base-100 border-base-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            <button type="submit" className="btn btn-primary w-full rounded-lg font-semibold text-lg shadow-soft hover:shadow-lg transition-all" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>

          {/* Bottom Back Button */}
          <div className="mt-8 flex justify-center">
            <BackButton to="/" label="← Home" />
          </div>
        </div>
      </div>

      {/* Right Side - Image Pattern */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations"
      />
    </div>
  );
};

export default LoginPage;