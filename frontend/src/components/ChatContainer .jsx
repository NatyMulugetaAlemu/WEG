import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore"
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'

const ChatContainer = () => {
  const { getMessages, messages, isMessagesLoading, selectedUser } = useChatStore()


  useEffect(() => {
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])

  if (isMessagesLoading) return (
    <div className='flex-1 flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton/>
    </div>
  )


  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>Messges...</p>
      <MessageInput />
    </div>
  )
}

export default ChatContainer 