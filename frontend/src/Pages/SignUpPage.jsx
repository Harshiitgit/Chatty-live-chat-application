import React, { useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore';
import { EyeOff, Eye, Lock, Mail, MessageSquare, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import AuthImagePattern  from '../Components/AuthImagePattern';
import PasswordStrengthIndicator from '../Components/PasswordStrengthIndicator';
import BackButton from '../Components/BackButton';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const validateUsername = (value) => {
    // Username regex: alphanumeric, underscore, hyphen, dot, @ symbol
    // 3-20 characters, must start with letter or number
    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._@-]{2,19}$/;
    
    if (!value.trim()) {
      setUsernameError("Username is required");
      return false;
    }
    
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    
    if (value.length > 20) {
      setUsernameError("Username must not exceed 20 characters");
      return false;
    }
    
    if (!/^[a-zA-Z0-9]/.test(value)) {
      setUsernameError("Username must start with a letter or number");
      return false;
    }
    
    if (!usernameRegex.test(value)) {
      setUsernameError("Username can only contain letters, numbers, underscores, hyphens, dots, and @ symbol");
      return false;
    }
    
    if (/[._@-]{2,}/.test(value)) {
      setUsernameError("Username cannot have consecutive special characters");
      return false;
    }
    
    setUsernameError("");
    return true;
  };

  const validateEmail = (value) => {
    // RFC 5322 compliant email regex (practical version)
    // Allows: letters, numbers, dots, hyphens, underscores, and plus signs before @
    // Domain: letters, numbers, hyphens, dots (TLD must be 2-6 chars)
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    }

    if (value.length > 254) {
      setEmailError("Email is too long (max 254 characters)");
      return false;
    }

    // Check for spaces
    if (/\s/.test(value)) {
      setEmailError("Email cannot contain spaces");
      return false;
    }

    // Check for invalid characters
    if (!/^[a-zA-Z0-9._+@-]+$/.test(value)) {
      setEmailError("Email contains invalid characters");
      return false;
    }

    // Check for @ symbol
    if ((value.match(/@/g) || []).length !== 1) {
      setEmailError("Email must contain exactly one @ symbol");
      return false;
    }

    // Check format
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address (e.g., user@example.com)");
      return false;
    }

    // Check local part (before @)
    const [localPart] = value.split("@");
    if (localPart.length > 64) {
      setEmailError("Email local part is too long (max 64 characters)");
      return false;
    }

    if (localPart.startsWith(".") || localPart.endsWith(".")) {
      setEmailError("Email cannot start or end with a dot");
      return false;
    }

    if (/\.\./.test(localPart)) {
      setEmailError("Email cannot have consecutive dots");
      return false;
    }

    // Check domain part (after @)
    const [, domain] = value.split("@");
    if (!domain || domain.length < 3) {
      setEmailError("Email domain is invalid");
      return false;
    }

    if (domain.startsWith("-") || domain.endsWith("-")) {
      setEmailError("Email domain cannot start or end with hyphen");
      return false;
    }

    if (domain.startsWith(".") || domain.endsWith(".")) {
      setEmailError("Email domain cannot start or end with dot");
      return false;
    }

    if (/\.\./.test(domain)) {
      setEmailError("Email domain cannot have consecutive dots");
      return false;
    }

    const domainParts = domain.split(".");
    const tld = domainParts[domainParts.length - 1];
    
    if (!/^[a-zA-Z]{2,}$/.test(tld)) {
      setEmailError("Email must have a valid domain extension (e.g., .com, .org)");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full Name is required");
    if(!formData.username.trim()) return toast.error("Username is required");
    if(!validateUsername(formData.username)) return false;
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!validateEmail(formData.email)) return false;
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if(success === true) signup(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left Side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-base-100 to-base-100/50'>
        <div className='w-full max-w-md space-y-8 animate-fade-in'>
          {/* Logo & Header */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-3 group'>
              <div className='size-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-lg transition-all duration-300 shadow-soft'>
                <MessageSquare className='size-7 text-white' />
              </div>
              <h1 className='text-3xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60 text-lg'>Get started with your free account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Full Name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-semibold text-base'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  className='input input-bordered w-full pl-12 pr-4 bg-base-100 border-base-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm'
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Username */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-semibold text-base'>Username</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  className={`input input-bordered w-full pl-12 pr-4 bg-base-100 border-base-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm ${usernameError ? 'input-error' : ''}`}
                  placeholder='john_doe123'
                  value={formData.username}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, username: value });
                    if (value) validateUsername(value);
                  }}
                />
              </div>
              {usernameError && (
                <label className='label'>
                  <span className='label-text-alt text-error text-xs font-medium'>{usernameError}</span>
                </label>
              )}
            </div>

            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-semibold text-base'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  className={`input input-bordered w-full pl-12 pr-4 bg-base-100 border-base-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm ${emailError ? 'input-error' : ''}`}
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, email: value });
                    if (value) validateEmail(value);
                  }}
                />
              </div>
              {emailError && (
                <label className='label'>
                  <span className='label-text-alt text-error text-xs font-medium'>{emailError}</span>
                </label>
              )}
            </div>

            {/* Password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-semibold text-base'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input input-bordered w-full pl-12 pr-12 bg-base-100 border-base-300 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className='size-5' />
                  ) : (
                    <EyeOff className='size-5' />
                  )}
                </button>
              </div>
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='btn btn-primary w-full rounded-lg font-semibold text-lg shadow-soft hover:shadow-lg transition-all'
              disabled={isSigningUp}
            >
              {isSigningUp ?(
                <>
                  <Loader2 className='size-5 animate-spin'/>
                  Creating...
                </>
              ):(
                "Create Account"
              )
              }
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{" "}
              <Link to="/login" className='text-primary font-semibold hover:underline'>
                Sign in
              </Link>
            </p>
          </div>

          {/* Bottom Back Button */}
          <div className='mt-8 flex justify-center'>
            <BackButton to="/" label="← Home" />
          </div>
        </div>
      </div>

      {/* right */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
