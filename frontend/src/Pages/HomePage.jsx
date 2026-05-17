import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Shield, Zap, Lock, Globe, ArrowRight, Sparkles, Heart, Rocket } from 'lucide-react';
import { useAuthStore } from '../Store/useAuthStore';

const HomePage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: MessageCircle,
      title: 'Instant Messaging',
      description: 'Send and receive messages in real-time with beautiful, modern chat interface.',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-200/30'
    },
    {
      icon: Users,
      title: 'Connect & Discover',
      description: 'Find and connect with friends, build your network, and expand your community.',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-200/30'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience seamless communication with our optimized, high-performance platform.',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-200/30'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your conversations are protected with enterprise-grade security and privacy controls.',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-200/30'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with people from around the world and share experiences across borders.',
      color: 'from-indigo-500/20 to-blue-500/20',
      borderColor: 'border-indigo-200/30'
    },
    {
      icon: Heart,
      title: 'User Friendly',
      description: 'Intuitive design that makes communication effortless and enjoyable for everyone.',
      color: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'border-rose-200/30'
    }
  ];

  const testimonials = [
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      avatar: '🎯',
      text: 'Chatty transformed how our team communicates. The interface is so intuitive and messaging is lightning fast!',
      rating: 5
    },
    {
      name: 'James Chen',
      role: 'Startup Founder',
      avatar: '🚀',
      text: 'Finally a messaging app that feels modern and premium. Our users love the design and features.',
      rating: 5
    },
    {
      name: 'Sarah Williams',
      role: 'Community Manager',
      avatar: '💚',
      text: 'Building communities has never been easier. Chatty made connecting with our users so much better!',
      rating: 5
    },
    {
      name: 'Alex Johnson',
      role: 'Product Designer',
      avatar: '✨',
      text: 'The attention to detail in the UI is incredible. This is what modern communication should look like.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-100 to-base-100/50 overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-base-100/80 backdrop-blur-xl border-b border-base-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Chatty</span>
          </div>
          <div className="flex items-center gap-4">
            {authUser ? (
              <Link
                to="/chat"
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Go to Chat
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-base-content font-semibold hover:bg-base-200/50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                    <Sparkles className="w-4 h-4" />
                    Welcome to Chatty
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-base-content">
                  Connect
                  <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    Communicate
                  </span>
                  <span className="text-base-content">Share</span>
                </h1>
                <p className="text-xl text-base-content/70 leading-relaxed max-w-lg">
                  Experience modern messaging like never before. Connect with friends, discover new people, and share moments in a beautiful, secure environment.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {authUser ? (
                  <Link
                    to="/chat"
                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-xl text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 group"
                  >
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Go to Chat
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-xl text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 group"
                    >
                      <Sparkles className="w-5 h-5" />
                      Start Chatting
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/login"
                      className="px-8 py-4 bg-base-200 hover:bg-base-300 text-base-content font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
                    >
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                {testimonials.slice(0, 2).map((testimonial, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-base-content/70 italic leading-relaxed mb-3">{testimonial.text}</p>
                    <p className="font-semibold text-base-content text-sm">{testimonial.name}</p>
                    <p className="text-xs text-base-content/60">{testimonial.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - Hero Graphic */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96">
                {/* Background Gradient Blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Chat Bubble Cards */}
                <div className="absolute top-8 right-8 bg-white dark:bg-base-100 rounded-2xl shadow-xl p-4 w-64 border border-base-200/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base-content text-sm">Alex</p>
                      <p className="text-base-content/60 text-sm">Hey! How are you doing?</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-48 left-12 bg-white dark:bg-base-100 rounded-2xl shadow-xl p-4 w-64 border border-base-200/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                      J
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base-content text-sm">Jordan</p>
                      <p className="text-base-content/60 text-sm">See you tomorrow! 👋</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-16 bg-white dark:bg-base-100 rounded-2xl shadow-xl p-4 w-64 border border-base-200/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white flex-shrink-0">
                      S
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base-content text-sm">Sarah</p>
                      <p className="text-base-content/60 text-sm">Amazing app! Love it 💚</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-base-200/30">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">
              Powerful Features
              <span className="block text-base-content/60 text-lg font-normal mt-2">Everything you need for amazing conversations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 cursor-pointer ${
                    hoveredFeature === idx
                      ? `${feature.borderColor} shadow-xl scale-105`
                      : `border-base-200/30 shadow-md hover:shadow-lg`
                  }`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative p-8 space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content">{feature.title}</h3>
                    <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
                    <div className="flex items-center gap-2 pt-2 text-primary font-semibold group-hover:translate-x-2 transition-transform">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-base-200/30">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">
              Loved by Users
              <span className="block text-base-content/60 text-lg font-normal mt-2">See what people are saying about Chatty</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-base-200/30 backdrop-blur-sm p-6 hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base-content/70 leading-relaxed italic text-sm">"{testimonial.text}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-base-200/30">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-base-content text-sm">{testimonial.name}</p>
                      <p className="text-xs text-base-content/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative px-8 sm:px-12 lg:px-16 py-16 text-center border border-base-200/30 backdrop-blur-sm">
              <h2 className="text-4xl sm:text-5xl font-bold text-base-content mb-6">
                Ready to Connect?
              </h2>
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
                Join thousands of users enjoying seamless messaging and real-time communication on Chatty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {authUser ? (
                  <Link
                    to="/chat"
                    className="px-10 py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-2xl text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 group"
                  >
                    <Rocket className="w-5 h-5" />
                    Start Chatting
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="px-10 py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-2xl text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 group"
                    >
                      <Sparkles className="w-5 h-5" />
                      Create Account
                    </Link>
                    <Link
                      to="/login"
                      className="px-10 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 border border-white/30"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-base-200/30 mt-20 pt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">Chatty</span>
                </div>
                <p className="text-base-content/60 text-sm">Modern messaging for everyone</p>
              </div>
              <div>
                <h4 className="font-semibold text-base-content mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Features</a></li>
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-base-content mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-base-content mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Terms</a></li>
                  <li><a href="#" className="text-base-content/70 hover:text-primary transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-base-200/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-base-content/60">© 2026 Chatty. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;