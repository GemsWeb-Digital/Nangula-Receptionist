import React, { useState, useEffect } from 'react';

const messages = [
  { sender: 'user', text: "Do you accept bookings?" },
  { sender: 'ai', text: "Yes — I can check availability and confirm instantly. What date are you looking at?" },
  { sender: 'user', text: "What are your business hours?" },
  { sender: 'ai', text: "We're open Mon-Fri, 8:00 AM to 5:00 PM, and Sat 9:00 AM to 1:00 PM. How can I assist?" },
  { sender: 'user', text: "Can I book for Saturday?" },
  { sender: 'ai', text: "Absolutely! For bookings, please message us directly on WhatsApp." },
];

const ChatSimulator: React.FC = () => {
  const [displayedMessages, setDisplayedMessages] = useState<typeof messages>([]);

  useEffect(() => {
    setDisplayedMessages([]);
    let currentTimeout: number;

    const animateMessages = () => {
        let i = 0;
        function nextMessage() {
            if (i < messages.length) {
                const newMessage = messages[i];
                // Defensively check if the message object exists before adding it to the state
                if (newMessage) {
                    setDisplayedMessages(prev => [...prev, newMessage]);
                }
                i++;
                currentTimeout = window.setTimeout(nextMessage, i === 1 ? 1000 : 2000);
            } else {
                // Restart after a pause
                currentTimeout = window.setTimeout(() => {
                    setDisplayedMessages([]);
                    animateMessages();
                }, 5000);
            }
        }
        nextMessage();
    };

    const initialTimeout = window.setTimeout(animateMessages, 500);

    return () => {
        window.clearTimeout(initialTimeout);
        window.clearTimeout(currentTimeout);
    };
  }, []);

  return (
    <div className="neuro-card w-full max-w-sm h-[560px] p-0 overflow-hidden flex flex-col">
      <div className="bg-[#D8D8D8] h-14 px-4 flex items-center justify-between flex-shrink-0 shadow-[inset_0_-2px_4px_rgba(163,163,163,0.2)]">
        <h3 className="font-bold text-sm text-[#2D2D2D]">Nangula AI Demo Preview</h3>
        <div className="flex items-center space-x-2">
            <span className="text-xs text-green-700">Online</span>
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_8px_#4ADE80]"></div>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {displayedMessages.map((msg, index) => (
          <div
            key={index}
            className={`${msg.sender === 'user' ? 'neuro-chat-user' : 'neuro-chat-ai'} fade-in`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-3 bg-[#E0E0E0] border-t border-white/50">
          <div className="neuro-input !py-2 !px-4 text-sm text-gray-500">
             Try the real demo →
          </div>
      </div>
    </div>
  );
};

export default ChatSimulator;