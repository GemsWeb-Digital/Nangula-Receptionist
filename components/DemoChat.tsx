import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import ChatBubble from './ChatBubble';
import { SendIcon, LogoutIcon } from './icons/Icons';

interface DemoChatProps {
    onLogout: () => void;
    onGoHome: () => void;
}

const QUICK_QUESTIONS = [
  "What are your business hours?",
  "Can I pay with eWallet?",
  "Where are you located?",
  "I want to book for Saturday",
];

const DemoChat: React.FC<DemoChatProps> = ({ onLogout, onGoHome }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      content: 'Good day! 👋 I\'m Nangula, your AI receptionist. I\'m here to demonstrate how I can help your business. Feel free to ask me anything!',
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
    if (userMessageCount === 4 && !showToast) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 10000);
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
    if (isLoading) return;
    setInput(question);
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-screen bg-[#E0E0E0] p-4 items-center justify-center">
        <header className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-br from-[#D4A574] to-[#C8A882] p-3 text-white shadow-lg">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <div className="font-bold text-sm">🎯 DEMO MODE</div>
                <div>
                  <button onClick={onGoHome} className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors mr-4">← Back to Homepage</button>
                  <button onClick={onLogout} className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors">End Demo</button>
                </div>
            </div>
        </header>

        <div className="neuro-card w-full max-w-3xl h-full mt-12 flex flex-col relative overflow-hidden">
            {showToast && (
                <div className="absolute top-4 right-4 z-20 neuro-card bg-gradient-to-br from-[#E5E5E5] to-[#D8D8D8] p-4 w-full max-w-xs text-center fade-in">
                    <p className="font-bold text-lg text-gray-800">Impressed with Nangula AI?</p>
                    <p className="text-sm text-gray-600 mb-3">Get this for YOUR business!</p>
                    <a 
                        href="https://wa.me/264853411522?text=Hello%20Nangula%20AI!%20I'm%20interested%20in%20your%20service." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="neuro-button-accent !text-sm !py-2 !px-4"
                    >
                        Contact us on WhatsApp
                    </a>
                </div>
            )}
            
            <div className="p-4 flex-shrink-0 bg-[#E0E0E0] shadow-[inset_0_-4px_8px_rgba(163,163,163,0.1)] flex justify-between items-center">
                 <div className="flex items-center space-x-3">
                    <img src="https://gemsweb.xyz/wp-content/uploads/2025/10/Nangula-logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <h1 className="text-lg font-bold text-[#2D2D2D]">Nangula AI Demo</h1>
                </div>
                <button onClick={onLogout} title="End Demo" className="neuro-button !p-2 !rounded-full">
                  <LogoutIcon />
                </button>
            </div>
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                    <div className="neuro-chat-ai">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                            <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </main>

            <footer className="p-4 bg-[#E0E0E0] border-t border-white/50">
                <div className="flex flex-wrap gap-2 mb-3">
                    {QUICK_QUESTIONS.map(q => (
                        <button 
                            key={q}
                            onClick={() => handleQuickQuestionClick(q)}
                            disabled={isLoading}
                            className="neuro-button !text-xs !px-3 !py-1.5 !rounded-full"
                        >
                            {q}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleFormSubmit} className="relative flex items-center gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="neuro-input flex-1 !rounded-full !py-3 !px-5"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input} className="neuro-button-accent !rounded-full !w-12 !h-12 !p-0 flex items-center justify-center">
                    <SendIcon />
                </button>
                </form>
            </footer>
        </div>
    </div>
  );
};

export default DemoChat;
