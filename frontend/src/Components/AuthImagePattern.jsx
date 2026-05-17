import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  // Function to generate random animation styles
  const generateRandomStyles = () => ({
    animationDuration: `${Math.random() * 3 + 3}s`,
    animationDelay: `${Math.random() * 2}s`,
  });

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary/10 rounded-3xl blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-3xl blur-3xl"></div>

      <div className="max-w-md text-center relative z-10">
        {/* Animated Grid Pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8 relative">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl backdrop-blur-sm border border-primary/20 ${
                i % 2 === 0 
                  ? 'animate-pulse-soft bg-gradient-to-br from-primary/20 to-primary/5' 
                  : 'animate-shape-change bg-gradient-to-br from-secondary/20 to-secondary/5'
              } shadow-soft hover:shadow-lg transition-all duration-300`}
              style={generateRandomStyles()}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-base-content">{title}</h2>
          <p className="text-base-content/70 text-lg leading-relaxed">{subtitle}</p>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-2 justify-center mt-8">
          <div className="w-2 h-2 rounded-full bg-primary/60"></div>
          <div className="w-2 h-2 rounded-full bg-secondary/60"></div>
          <div className="w-2 h-2 rounded-full bg-accent/60"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
