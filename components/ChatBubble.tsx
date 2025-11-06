import React from 'react';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AIIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2C5F2D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formattedContent = message.content.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="font-bold text-[#D4A017] hover:underline">$1</a>'
  );

  const containerClasses = isUser ? 'flex-row-reverse' : 'flex-row';
  
  const bubbleClasses = isUser 
    ? 'bg-gray-200 text-gray-800' 
    : 'bg-[#2C5F2D] text-white';
    
  const iconContainerClasses = 'bg-white shadow-md';

  return (
    <div className={`flex items-start gap-3 ${containerClasses}`}>
        <div className={`w-10 h-10 ${iconContainerClasses} flex items-center justify-center flex-shrink-0 rounded-full`}>
            {isUser ? <UserIcon /> : <AIIcon />}
        </div>
        <div 
            className={`px-4 py-3 ${bubbleClasses} max-w-lg whitespace-pre-wrap rounded-xl shadow-sm`}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
    </div>
  );
};

export default ChatBubble;