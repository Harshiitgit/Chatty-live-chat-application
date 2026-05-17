import React from 'react'
import { useChatStore } from '../Store/useChatStore'

import Sidebar from "../Components/Sidebar"
import NoChatSelected from "../Components/NoChatSelected"
import ChatContainer from "../Components/ChatContainer"

const ChatPage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-100/50 pt-16'>
      <div className='flex items-center justify-center px-2 sm:px-4 h-full pb-2'>
        <div className='bg-base-100 rounded-2xl shadow-lg w-full max-w-7xl h-[calc(100vh-5rem)] border border-base-200'>
          <div className='flex h-full rounded-2xl overflow-hidden'>
            <Sidebar/>
            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
