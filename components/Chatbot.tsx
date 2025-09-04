import React, { useState, useRef, useEffect } from 'react';
import type { Baggage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { SendIcon } from './icons/SendIcon';

interface ChatbotProps {
  baggage: Baggage;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ baggage }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: `Hi! I'm your virtual assistant. How can I help you with baggage ${baggage.id}?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const aiResponseText = await getChatbotResponse(input, baggage);
        const aiMessage: Message = { sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
        const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having some technical difficulties right now." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col h-[32rem] max-h-[80vh]">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xl font-bold text-center">Baggage Assistant</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>}
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-200 text-slate-800 rounded-bl-none'
                }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask 'Where is my baggage?'"
            className="flex-grow px-4 py-2 bg-slate-100 text-slate-900 placeholder-slate-500 border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-5 h-5"/>
          </button>
        </form>
      </div>
    </div>
  );
};