import React from 'react';
import { calculatePasswordStrength } from '../lib/utils';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const PasswordStrengthIndicator = ({ password }) => {
  const { strength, score, feedback } = calculatePasswordStrength(password);

  if (!password) {
    return null;
  }

  // Determine color based on strength
  const getStrengthColor = () => {
    if (strength === "Weak") return "text-error";
    if (strength === "Medium") return "text-warning";
    return "text-success";
  };

  // Determine progress bar color
  const getProgressColor = () => {
    if (strength === "Weak") return "bg-error";
    if (strength === "Medium") return "bg-warning";
    return "bg-success";
  };

  // Get badge background color
  const getBadgeColor = () => {
    if (strength === "Weak") return "bg-error/15 text-error border-error/30";
    if (strength === "Medium") return "bg-warning/15 text-warning border-warning/30";
    return "bg-success/15 text-success border-success/30";
  };

  // Calculate progress percentage (score out of 9 max)
  const progressPercentage = (score / 9) * 100;

  return (
    <div className="mt-4 space-y-3">
      {/* Strength Label and Badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-base-content">Password Strength</span>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeColor()}`}>
          {strength}
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-base-300 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 rounded-full`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-base-content/60 font-medium">{Math.round(progressPercentage)}% Strength</span>
      </div>

      {/* Feedback Items */}
      <div className="space-y-2">
        {feedback.map((item, index) => (
          <div key={index} className="text-xs text-base-content/70 font-medium flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Strength Tips */}
      {strength === "Weak" && (
        <div className="text-xs text-error bg-error/10 border border-error/30 p-3 rounded-lg flex items-start gap-2 mt-3">
          <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
          <span>Use at least 8 characters with uppercase, lowercase, numbers, and special characters</span>
        </div>
      )}
      {strength === "Medium" && (
        <div className="text-xs text-warning bg-warning/10 border border-warning/30 p-3 rounded-lg flex items-start gap-2 mt-3">
          <Info className="size-4 flex-shrink-0 mt-0.5" />
          <span>Consider adding more special characters or making it longer for better security</span>
        </div>
      )}
      {strength === "Strong" && (
        <div className="text-xs text-success bg-success/10 border border-success/30 p-3 rounded-lg flex items-start gap-2 mt-3">
          <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" />
          <span>Great password! Strong and secure.</span>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
