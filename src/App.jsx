import React, { useEffect, useState } from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || []
    setChats(storedChats)

    if (storedChats.length > 0) {
      setActiveChat(storedChats[0].id)
    }
  }, [])

  const handleStartChat = () => {
    setIsChatting(true)

    if (chats.length === 0) {
      createNewChat()
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  const createNewChat = (initialMessage = '') => {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString(
        'en-GB',
      )} ${new Date().toLocaleTimeString()}`,
      messages: initialMessage
        ? [{ type: 'prompt', text: initialMessage, timestamp: new Date().toLocaleTimeString() }]
        : [],
    }

    const updatedChats = [newChat, ...chats]
    setChats(updatedChats)
    localStorage.setItem('chats', JSON.stringify(updatedChats))
    localStorage.setItem(newChat.id, JSON.stringify(newChat.messages))
    setActiveChat(newChat.id)
  }

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp
          onGoBack={handleGoBack}
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={createNewChat}
        />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  )
}

export default App
