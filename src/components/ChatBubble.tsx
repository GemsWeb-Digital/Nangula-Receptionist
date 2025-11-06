import React from 'react';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const linkClass = isUser 
    ? "font-bold text-[#C8A882] hover:underline" 
    : "font-bold underline text-white/90 hover:text-white";

  const formattedContent = message.content.replace(
    /(https?:\/\/[^\s]+)/g,
    `<a href="$1" target="_blank" rel="noopener noreferrer" class="${linkClass}">$1</a>`
  );

  const bubbleClasses = isUser ? 'neuro-chat-user' : 'neuro-chat-ai';

  return (
    <div
        className={bubbleClasses}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};

export default ChatBubble;
