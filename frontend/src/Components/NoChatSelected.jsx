import React from 'react'
import { MessageSquare, Sparkles, Users, Heart, Zap, Search } from "lucide-react"

const NoChatSelected = () => {
  const features = [
    { icon: Sparkles, text: 'Instant messaging', color: 'from-blue-400 to-blue-600' },
    { icon: Users, text: 'Connect with friends', color: 'from-purple-400 to-purple-600' },
    { icon: Heart, text: 'Share moments', color: 'from-pink-400 to-pink-600' }
  ];

  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-gradient-to-br from-base-100 via-base-100 to-base-100/50 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '0s' }}></div>
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
      
      <div className='max-w-2xl text-center space-y-10 relative z-10'>
        {/* Main Icon Display */}
        <div className='flex justify-center mb-6'>
          <div className='relative'>
            {/* Outer animated rings */}
            <div className='absolute inset-0 w-28 h-28 rounded-full border-2 border-primary/20 animate-spin' style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
            <div className='absolute inset-2 w-24 h-24 rounded-full border-2 border-secondary/20 animate-spin' style={{ animationDuration: '6s' }}></div>
            
            {/* Main icon container */}
            <div className='relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110'>
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-primary opacity-0 hover:opacity-20 transition-opacity duration-300'></div>
              <MessageSquare className='w-12 h-12 text-white relative z-10'/>
            </div>
          </div>
        </div>

        {/* Welcome text with animation */}
        <div className='space-y-4 animate-fade-in'>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Sparkles className='w-5 h-5 text-primary animate-pulse' />
            <span className='text-sm font-semibold text-primary uppercase tracking-wider'>Welcome Back</span>
            <Sparkles className='w-5 h-5 text-secondary animate-pulse' />
          </div>
          <h2 className='text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight'>
            Welcome to Chatty!
          </h2>
          <p className='text-base-content/70 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed'>
            Start a conversation by selecting from your contacts on the left, or use the search to find someone new
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-8'>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className='group p-4 rounded-xl bg-base-100/50 border border-base-200/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer'
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className='w-6 h-6 text-white' />
                </div>
                <p className='text-sm font-semibold text-base-content'>{feature.text}</p>
              </div>
            );
          })}
        </div>

        {/* Decorative typing indicator */}
        <div className='flex gap-2 justify-center pt-4'>
          <div className='w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary animate-bounce' style={{ animationDelay: '0s' }}></div>
          <div className='w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary animate-bounce' style={{ animationDelay: '0.2s' }}></div>
          <div className='w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary animate-bounce' style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Quick start hint */}
        <div className='pt-6'>
          <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm'>
            <Search className='w-4 h-4 text-primary' />
            <span className='text-sm text-base-content/70'>Tip: Use the search box to find contacts</span>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100/50 to-transparent pointer-events-none'></div>
    </div>
  )
}

export default NoChatSelected;