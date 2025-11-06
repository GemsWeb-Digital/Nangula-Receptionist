import React, { useState, useEffect } from 'react';

const messages = [
  { sender: 'user', text: "Good morning, can you help me with a booking?" },
  { sender: 'ai', text: "Good morning! I can certainly help with that. What date did you have in mind?" },
  { sender: 'user', text: "What are your hours on the weekend?" },
  { sender: 'ai', text: "We're open on Saturdays from 9:00 AM to 1:00 PM. We are closed on Sundays. Can I help with anything else?" },
  { sender: 'user', text: "Great, can I book for this Saturday?" },
  // FIX: Corrected typo in sender property from `ai'` to `'ai'`.
  { sender: 'ai', text: "Of course. To finalize a booking, the best way is to send us a message on WhatsApp, and we can confirm everything for you there." },
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
                currentTimeout = window.setTimeout(nextMessage, i === 1 ? 1000 : 2200);
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
            className={`${msg.sender === 'user' ? 'neuro-chat-user' : 'neuro-chat-ai'} ${index === displayedMessages.length -1 ? 'fade-in' : ''}`}
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
