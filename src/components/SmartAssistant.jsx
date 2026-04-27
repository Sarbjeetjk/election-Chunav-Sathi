import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { Send, Bot, Sparkles } from 'lucide-react';
import { getAIResponse } from '../utils/aiService';

const SmartAssistant = () => {
  const { language } = useAppContext();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: language === 'hi' ? "नमस्ते! मैं आपका चुनाव साथी हूँ। आप मुझसे भारतीय चुनावों के बारे में कुछ भी पूछ सकते हैं।" : "Namaste! I am your Chunav Saathi. How can I help you navigate the Indian elections today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await getAIResponse(userMsg.text, language);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col glass-panel overflow-hidden animate-fadeIn h-[70vh] shadow-2xl border-2 border-[var(--saffron)]">
        
        {/* Decorative Top Bar */}
        <div className="h-1.5 w-full flex">
          <div className="h-full flex-1 bg-[var(--saffron)]"></div>
          <div className="h-full flex-1 bg-white"></div>
          <div className="h-full flex-1 bg-[var(--green)]"></div>
        </div>

        {/* Header */}
        <div className="p-6 flex items-center justify-between bg-[var(--bg-secondary)]/50 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-[var(--saffron)] to-orange-600 rounded-2xl text-white shadow-lg">
                <Bot size={28} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-bold text-2xl flex items-center gap-2">
                Chunav Saathi Assistant <Sparkles size={18} className="text-[var(--saffron)]" />
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-widest">Official AI Election Guide</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-[var(--bg-primary)]/40">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
              <div className={`relative max-w-[75%] rounded-2xl px-5 py-3 text-base shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-[var(--navy)] text-white rounded-tr-none' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-none'
              }`}>
                {msg.text}
                <div className={`absolute top-0 w-4 h-4 ${
                  msg.sender === 'user' 
                    ? 'right-[-8px] text-[var(--navy)]' 
                    : 'left-[-8px] text-[var(--bg-secondary)]'
                }`} style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', backgroundColor: 'currentColor' }}></div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] rounded-2xl rounded-tl-none px-5 py-2 text-sm italic">
                {language === 'hi' ? "चुनाव साथी जवाब लिख रहा है..." : "Chunav Saathi is typing..."}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
          <form onSubmit={handleSend} className="flex items-center gap-3 max-w-3xl mx-auto bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-1.5 shadow-inner focus-within:border-[var(--saffron)] transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'hi' ? "अपने प्रश्न यहाँ लिखें..." : "Type your election queries here..."}
              className="flex-1 bg-transparent px-5 py-3 text-base focus:outline-none border-none text-[var(--text-primary)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping} 
              className="p-3.5 bg-[var(--saffron)] text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center"
            >
              <Send size={22} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;
