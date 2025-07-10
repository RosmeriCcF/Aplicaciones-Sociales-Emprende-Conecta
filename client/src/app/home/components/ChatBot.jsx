"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";


export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickResponses, setShowQuickResponses] = useState(true);
    const messagesEndRef = useRef(null);


    // Respuestas rápidas predefinidas
    const quickResponses = [
        "Crear mi cuenta",
        "Ver emprendimientos",
        "Buscar productos",
        "Contactar vendedor",
        "Consejos para emprender",
        "Preguntas frecuentes",
        "Otras opciones",
    ];


    // Respuestas básicas que pueden manejarse sin IA
    const basicResponses = {
        hola: "¡Hola! 👋 Me alegra que estés aquí. ¿Cómo puedo asistirte con **Emprende y Conecta** hoy?",
        hi: "¡Hola! 👋 Me alegra que estés aquí. ¿Cómo puedo asistirte con **Emprende y Conecta** hoy?",
        gracias: "¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?",
        "muchas gracias": "¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?",
        adios: "¡Hasta pronto! Que tengas un excelente día. 👋",
        chao: "¡Hasta pronto! Que tengas un excelente día. 👋",
        "hasta luego": "¡Hasta pronto! Que tengas un excelente día. 👋",
    };


    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen && messages.length === 0) {
            // Mensaje de bienvenida inicial
            const welcomeMessage = {
                id: Date.now(),
                text: "¡Holaaaaaa! 👋 Soy tu asistente virtual de **Emprende y Conecta**. Estoy aquí para ayudarte con cualquier pregunta sobre nuestra plataforma. ¿En qué puedo asistirte hoy?",
                sender: "bot",
                timestamp: new Date(),
                type: "text",
            };
            setMessages([welcomeMessage]);
        }
    };


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);


    // Función para llamar a Gemini
    const getGeminiResponse = async (userMessage) => {
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: messages.slice(-10), // Enviar últimos 10 mensajes para contexto
                }),
            });


            const data = await response.json();


            if (data.success) {
                return data.reply;
            } else {
                throw new Error(data.error || "Error en la respuesta");
            }
        } catch (error) {
            console.error("Error al llamar a Gemini:", error);
            return "Disculpa, estoy teniendo problemas técnicos. Por favor, selecciona una de las opciones rápidas o intenta reformular tu pregunta. 🤔";
        }
    };


    const handleSendMessage = async () => {
        if (inputMessage.trim() === "" || isTyping) return;


        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: "user",
            timestamp: new Date(),
            type: "text",
        };


        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsTyping(true);
        setShowQuickResponses(false);


        // Simular delay de escritura
        await new Promise((resolve) => setTimeout(resolve, 1000));


        let botResponse = "";
        const lowerMessage = inputMessage.toLowerCase().trim();


        // Primero verificar si es una respuesta básica
        if (basicResponses[lowerMessage]) {
            botResponse = basicResponses[lowerMessage];
        } else {
            // Si no es básica, usar Gemini
            botResponse = await getGeminiResponse(inputMessage);
        }


        const botMessage = {
            id: Date.now() + 1,
            text: botResponse,
            sender: "bot",
            timestamp: new Date(),
            type: "text",
        };


        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
    };


    const handleQuickResponse = async (response) => {
        setShowQuickResponses(false);


        const userMessage = {
            id: Date.now(),
            text: response,
            sender: "user",
            timestamp: new Date(),
            type: "text",
        };


        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);


        // Simular delay de escritura
        await new Promise((resolve) => setTimeout(resolve, 1000));


        // Para respuestas rápidas, usar Gemini para respuestas más naturales
        const botResponse = await getGeminiResponse(response);


        const botMessage = {
            id: Date.now() + 1,
            text: botResponse,
            sender: "bot",
            timestamp: new Date(),
            type: "text",
        };


        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
    };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };


    return (
        <>
            {/* Botón flotante del chatbot */}
            <button
                className="fixed bottom-6 right-6 z-50 bg-white rounded-full shadow-lg p-3 hover:scale-105 transition-all duration-300"
                onClick={toggleChat}
            >
                <Image
                    src="/chatbot-icon.png"
                    alt="Chatbot E&C"
                    width={60}
                    height={60}
                />
            </button>


            {/* Ventana del chat */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 z-50 w-[380px] h-[500px] bg-white shadow-2xl rounded-lg overflow-hidden animate-slide-up">
                    {/* Header del chat */}
                    <div
                        className="text-white p-4 flex justify-between items-center"
                        style={{ backgroundColor: "#0B3954" }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-semibold">CHATBOT E&C ✨</span>
                        </div>
                        <button
                            className="text-white hover:text-gray-200 transition-colors"
                            onClick={toggleChat}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>


                    {/* Área de mensajes */}
                    <div className="h-[320px] overflow-y-auto p-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"
                                    }`}
                            >
                                <div
                                    className={`inline-block max-w-[80%] p-3 rounded-lg ${message.sender === "user"
                                        ? "bg-blue-500 text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none shadow-md flex items-start"
                                        }`}
                                >
                                    {message.sender === "bot" && (
                                        <span className="mr-2 text-lg">🤖</span>
                                    )}
                                    <div className="flex-1">
                                        <p
                                            className="text-sm whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{
                                                __html: message.text.replace(
                                                    /\*\*(.*?)\*\*/g,
                                                    "<strong>$1</strong>"
                                                ),
                                            }}
                                        ></p>
                                        <p className="text-xs opacity-70 mt-1">
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}


                        {/* Indicador de escritura */}
                        {isTyping && (
                            <div className="text-left mb-4">
                                <div className="inline-block bg-white p-3 rounded-lg rounded-bl-none shadow-md">
                                    <div className="flex gap-1 items-center">
                                        <span className="mr-2 text-lg">🤖</span>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                        <span className="text-xs text-gray-500 ml-2">
                                            Pensando...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Respuestas rápidas */}
                        {showQuickResponses && (
                            <div className="text-left mb-4">
                                <div className="inline-block bg-white p-3 rounded-lg rounded-bl-none shadow-md">
                                    <p className="text-sm text-gray-700 mb-2">
                                        Aquí hay algunas cosas en las que puedo ayudarte:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {quickResponses.map((response, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickResponse(response)}
                                                className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full transition-colors font-medium"
                                            >
                                                {response}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>


                    {/* Input para mensajes */}
                    <div className="p-2 bg-white border-t flex gap-2 items-center">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping}
                            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors flex-shrink-0 hover:opacity-80"
                            style={{ backgroundColor: "#0B3954" }}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ color: "white" }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}


            <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }


        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
