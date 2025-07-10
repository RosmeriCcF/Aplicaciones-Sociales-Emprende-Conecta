'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-white rounded-full shadow-lg p-3 hover:scale-105 transition"
        onClick={toggleChat}
      >
        <Image
          src="/chatbot-icon.png"
          alt="Chatbot"
          width={60}
          height={60}
        />
      </button>

      
      {isOpen && (
        <div className="fixed bottom-16 right-6 z-50 w-[350px] h-[450px] bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <span className="font-semibold">ChatBot</span>
            <button
              className="text-xl font-bold"
              onClick={toggleChat} 
            >
              ×
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            
            <div className="mb-4">
              <div className="text-sm text-gray-600">✨ Hola! Bienvenido(a) 👋</div>
              <div className="text-sm text-gray-600">Soy tu asistente virtual y estoy aquí para ayudarte. ¿En qué puedo apoyarte hoy?</div>
            </div>
            
          </div>
        </div>
      )}
    </>
  )
}