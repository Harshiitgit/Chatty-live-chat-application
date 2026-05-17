import React from 'react'
import { useChatStore } from '../Store/useChatStore';
import { useEffect, useRef } from 'react';

import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../Store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const {messages, getMessages , isMessagesLoading , selectedUser,subscribeToMessages, unsubscribeFromMessages} = useChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id); 

      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?._id, getMessages , subscribeToMessages,unsubscribeFromMessages]);

  useEffect(() =>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  },[messages])

  if(isMessagesLoading){ 
  return( 
    <div className='flex-1 flex flex-col overflow-auto bg-gradient-to-b from-base-100 to-base-100/50'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto bg-gradient-to-b from-base-100 to-base-100/50'>
      <ChatHeader/>
      <div className='flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 flex flex-col'>
        {messages.map((message) => (
        <div key={message._id} 
          className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`} ref={messageEndRef}>
          
          <div className={`flex gap-2 items-end max-w-xs md:max-w-md lg:max-w-lg ${message.senderId === authUser._id ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className='size-8 rounded-full flex-shrink-0 ring-2 ring-base-200 shadow-sm'>
              <img 
                src={
                  message.senderId === authUser._id 
                    ? authUser.profilePic || "/avatar.png" 
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="Profile Pic"
                className='w-full h-full rounded-full object-cover'
              />
            </div>

            {/* Message Bubble */}
            <div className='flex flex-col gap-1'>
              <div className={`chat-bubble rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-200 ${
                message.senderId === authUser._id 
                  ? 'bg-primary text-primary-content' 
                  : 'bg-base-200 text-base-content'
              }`}>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt='Attachment' 
                    className='sm:max-w-[200px] rounded-xl mb-2 shadow-sm'
                  />
                )}
                {message.text && <p className='text-sm leading-relaxed'>{message.text}</p>}
              </div>
              <time className={`text-xs font-medium text-base-content/60 ${message.senderId === authUser._id ? 'text-right' : 'text-left'}`}>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
          </div>
        </div>
      ))}
      </div>
      
      <MessageInput/>
    </div>
  )
}
export default ChatContainer