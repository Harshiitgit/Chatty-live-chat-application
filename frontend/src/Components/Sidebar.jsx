import React, { useEffect, useState } from 'react';
import { useChatStore } from '../Store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { User, Search, X } from 'lucide-react';
import { useAuthStore } from '../Store/useAuthStore';

const Sidebar = () => {
  const { getUsers, selectedUser, setSelectedUser, isUserLoading, users, searchUsers, searchResults, isSearching, clearSearch } = useChatStore();

  const {onlineUsers=[]}= useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      searchUsers(value);
    } else {
      clearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clearSearch();
  };

  const displayUsers = searchQuery.trim() ? searchResults : users;
  const filteredUsers = showOnlineOnly ? displayUsers.filter(user => onlineUsers.includes(user._id)) : displayUsers;
  
  if (isUserLoading) return <SidebarSkeleton/>;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-200 flex flex-col transition-all duration-200 bg-base-100">
      {/* Header Section */}
      <div className="border-b border-base-200 w-full p-4 lg:p-5 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
            <User className="size-5 text-primary" />
          </div>
          <span className="font-semibold hidden lg:block text-base">Contacts</span>
        </div>

        {/* Search Bar - Modern Design */}
        <div className='hidden lg:block'>
          <div className='relative group'>
            <div className='absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none'>
              <Search className="size-4 text-base-content/50 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Find a contact..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="input input-sm w-full pl-9 pr-9 bg-base-200/60 hover:bg-base-200/80 focus:bg-base-200 border-base-200 rounded-lg placeholder:text-base-content/40 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-error transition-colors p-1 hover:bg-error/10 rounded-md"
                title="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className='text-xs text-base-content/60 mt-2 ml-3 font-medium'>
              {isSearching ? 'Searching...' : `${filteredUsers.length} result${filteredUsers.length !== 1 ? 's' : ''}`}
            </p>
          )}
        </div>

        {/* Filter Toggle - Improved Styling */}
        <div className='hidden lg:block'>
          <label className='cursor-pointer flex items-center gap-3 p-2.5 rounded-lg hover:bg-base-200/60 transition-all duration-200'>
            <input 
              type="checkbox" 
              checked={showOnlineOnly} 
              onChange={(e) => setShowOnlineOnly(e.target.checked)} 
              className='checkbox checkbox-sm checkbox-primary'
            />
            <div className='flex-1 min-w-0'>
              <span className='text-sm font-medium block'>Online Only</span>
              <p className='text-xs text-base-content/60'>{Math.max(0, onlineUsers.length - 1)} online</p>
            </div>
          </label>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {isSearching && searchQuery.trim() && (
          <div className='flex items-center justify-center py-8 text-base-content/40'>
            <span className='loading loading-spinner loading-sm'></span>
          </div>
        )}
        
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              handleClearSearch();
            }}
            className={`w-full px-3 py-2.5 lg:px-4 lg:py-3 flex items-center gap-3 transition-all duration-200 mx-2 lg:mx-1 rounded-lg ${
              selectedUser?._id === user._id 
                ? 'bg-primary/15 border-l-4 border-primary text-primary' 
                : 'hover:bg-base-200/50'
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || '/avatar.png'}
                alt={user.fullName || 'User'}
                className="size-10 lg:size-12 object-cover rounded-full ring-2 ring-base-200 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-2.5 lg:size-3 bg-success rounded-full ring-2 ring-base-100 shadow-sm" />
              )}
            </div>

            {/* User Info - Only on Larger Screen */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate text-sm">
                {user.fullName}
              </div>
              <div className={`text-xs font-medium ${onlineUsers.includes(user._id) ? 'text-success' : 'text-base-content/50'}`}>
                {onlineUsers.includes(user._id) ? '● Online' : '○ Offline'}
              </div>
            </div>
          </button>
        ))}

        {/* Empty States */}
        {!isSearching && filteredUsers.length === 0 && !searchQuery && (
          <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
            <div className='p-3 rounded-2xl bg-base-200/50 mb-3'>
              <User className='size-6 text-base-content/30' />
            </div>
            <p className='text-sm font-medium text-base-content/70'>No conversations yet</p>
            <p className='text-xs text-base-content/50 mt-1'>Start a new conversation to see contacts</p>
          </div>
        )}

        {!isSearching && filteredUsers.length === 0 && searchQuery && (
          <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
            <div className='p-3 rounded-full bg-base-200/50 mb-3'>
              <Search className='size-6 text-base-content/30' />
            </div>
            <p className='text-sm font-medium text-base-content/70'>No users found</p>
            <p className='text-xs text-base-content/50 mt-1'>Try searching with a different name</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
