import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import PeoplePage from './Pages/PeoplePage';
import FriendRequestsPage from './Pages/FriendRequestsPage';

import Navbar from './Components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './Store/useAuthStore';
import { useAdminStore } from './Store/useAdminStore';
import { useThemeStore } from './Store/useThemeStore';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { adminUser, checkAdminAuth } = useAdminStore();
  const {theme} = useThemeStore();

  console.log({onlineUsers})

  useEffect(() => {
    checkAuth();
    checkAdminAuth();
  }, [checkAuth, checkAdminAuth]);
  

  if (isCheckingAuth && !authUser)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div> 
    );

  return (
    <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <HomePage />} />
          <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to = "/" />} />
          <Route path="/login" element={!authUser ? <LoginPage />  : <Navigate to = "/"/>} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
          <Route path="/people" element={authUser ? <PeoplePage/> : <Navigate to="/login"/>} />
          <Route path="/friend-requests" element={authUser ? <FriendRequestsPage/> : <Navigate to="/login"/>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={!adminUser ? <AdminLoginPage /> : <Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={adminUser ? <AdminDashboardPage /> : <Navigate to="/admin/login" />} />
        </Routes>

        <Toaster/>
    </div>
  );
};

export default App;
