import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import ChatBubble from './ChatBubble';
import { SendIcon, ThinkingIcon, LogoutIcon } from './icons/Icons';

interface DemoChatProps {
    onLogout: () => void;
}

const QUICK_QUESTIONS = [
  "What are your business hours?",
  "Can I pay with eWallet?",
  "Where are you located?",
  "I want to book for Saturday",
];

const DemoChat: React.FC<DemoChatProps> = ({ onLogout }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      content: 'Good day! 👋 I\'m Nangula, your AI receptionist. How can I assist you today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const userMessageCount = messages.filter(m => m.sender === 'user').length;
    if (userMessageCount === 3 && !showToast) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 8000);
    }
  }, [messages, showToast]);

  const handleSendMessage = async (messageContent?: string) => {
    const content = (messageContent || input).trim();
    if (!content || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseContent = await getChatResponse(content, messages);

    const newAiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      content: aiResponseContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newAiMessage]);
    setIsLoading(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  const handleQuickQuestionClick = (question: string) => {
    setInput(question);
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f9f9f9]">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm z-10">
        <div className="flex items-center space-x-3">
            <img src="https://gemsweb.xyz/wp-content/uploads/2025/10/Nangula-logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-bold text-gray-800">Nangula AI Demo</h1>
        </div>
        <button onClick={onLogout} className="p-2 text-gray-500 hover:text-gray-800 transition-colors" title="End Demo">
            <LogoutIcon />
        </button>
      </header>

      {showToast && (
        <div className="absolute top-20 right-4 bg-white text-gray-800 p-4 shadow-lg w-full max-w-sm text-center rounded-xl z-20">
            <p className="font-bold">Impressed with Nangula AI?</p>
            <p className="text-sm">Get this for YOUR business!</p>
            <a 
                href="https://wa.me/264853411522?text=Hello%20Nangula%20AI!%20I'm%20interested%20in%20your%20service." 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-block bg-[#D4A017] text-white font-bold py-2 px-4 text-sm hover:bg-opacity-90 rounded-lg transition-colors"
            >
                Contact us on WhatsApp
            </a>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white shadow-md flex items-center justify-center flex-shrink-0 rounded-full">
                <ThinkingIcon />
            </div>
            <div className="px-4 py-3 bg-white text-gray-800 max-w-lg rounded-lg shadow-md">
                <div className="flex items-center space-x-1">
                    <span className="dot animate-bounce w-2 h-2 bg-[#2C5F2D] rounded-full"></span>
                    <span className="dot animate-bounce w-2 h-2 bg-[#2C5F2D] rounded-full animation-delay-200ms" style={{animationDelay: '0.2s'}}></span>
                    <span className="dot animate-bounce w-2 h-2 bg-[#2C5F2D] rounded-full animation-delay-400ms" style={{animationDelay: '0.4s'}}></span>
                </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_QUESTIONS.map(q => (
                <button 
                    key={q}
                    onClick={() => handleQuickQuestionClick(q)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
                >
                    {q}
                </button>
            ))}
        </div>
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 w-full px-5 py-3 pr-14 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] rounded-full transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 bg-[#D4A017] text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center rounded-full hover:bg-opacity-90 transition-colors"
          >
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default DemoChat;