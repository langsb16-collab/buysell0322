import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Image, Mic, Video, X, Globe, Phone, Video as VideoIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: 'user' | 'ai'; translation?: string }[]>([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const { language, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}`);
    socketRef.current = socket;

    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      
      // Auto-translate if message is from AI and target language is not English
      if (msg.sender === 'ai' && language !== 'en') {
        try {
          const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: msg.text, targetLang: language })
          });
          const data = await res.json();
          msg.translation = data.translation;
        } catch (error) {
          console.error('Translation error:', error);
        }
      }
      
      setMessages(prev => [...prev, msg]);
    };

    return () => socket.close();
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !socketRef.current) return;
    
    const userMsg = { 
      id: Date.now(), 
      text: input, 
      sender: 'user' as const 
    };
    
    socketRef.current.send(JSON.stringify(userMsg));
    setInput('');
  };

  return (
    <>
      {/* Floating Button (Bottom Left) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#1428A0] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 left-6 w-[380px] h-[50vh] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-bottom border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">AI</div>
                <div>
                  <p className="font-bold text-sm">Global Support</p>
                  <p className="text-[10px] text-emerald-400">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="hover:text-white cursor-pointer" title={t('chat_call')} />
                <VideoIcon size={18} className="hover:text-white cursor-pointer" title={t('chat_video')} />
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.translation && (
                      <div className="mt-1 pt-1 border-t border-white/10 text-[10px] text-gray-400 italic flex items-center gap-1">
                        <Globe size={10} /> {msg.translation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-2">
                <button className="p-2 text-gray-400 hover:text-white"><Image size={18} /></button>
                <button className="p-2 text-gray-400 hover:text-white"><Mic size={18} /></button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chat_placeholder')}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
