import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Send, Bot, X, MessageCircle } from 'lucide-react';
import { getAIResponse } from '../utils/aiService';

const FloatingAssistant = () => {
  const { language, isAssistantOpen, setIsAssistantOpen } = useAppContext();
  const location = useLocation();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: language === 'hi' ? "नमस्ते! मैं आपका चुनाव साथी हूँ। मैं आपकी कैसे मदद कर सकता हूँ?" : "Namaste! I am your Chunav Saathi. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAssistantOpen, isTyping]);

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

  if (location.pathname === '/assistant') return null;

  const content = (
    <>
      {!isAssistantOpen && (
        <button 
          onClick={() => setIsAssistantOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999999,
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--green)',
            color: 'white',
            border: '4px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}
          className="animate-fancy-float"
        >
          <MessageCircle size={32} />
        </button>
      )}

      {isAssistantOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            zIndex: 999999,
            width: '350px',
            maxWidth: 'calc(100vw - 48px)',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '2px solid var(--saffron)',
            overflow: 'hidden'
          }}
          className="animate-slideUp"
        >
          <div style={{ padding: '15px', backgroundColor: 'var(--saffron)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={20} />
              <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>Chunav Saathi Assistant</span>
            </div>
            <button onClick={() => setIsAssistantOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: 'var(--bg-primary)' }}>
            {messages.map(m => (
              <div key={m.id} style={{ 
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', 
                maxWidth: '85%', padding: '10px 15px', borderRadius: '15px', 
                fontSize: '13px', lineHeight: '1.4',
                backgroundColor: m.sender === 'user' ? 'var(--navy)' : 'var(--bg-secondary)', 
                color: m.sender === 'user' ? 'white' : 'var(--text-primary)', 
                border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                borderBottomRightRadius: m.sender === 'user' ? '2px' : '15px',
                borderBottomLeftRadius: m.sender === 'user' ? '15px' : '2px'
              }}>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', padding: '8px 15px', borderRadius: '15px', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                Assistant is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', backgroundColor: 'var(--bg-secondary)' }}>
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder={language === 'hi' ? "प्रश्न पूछें..." : "Ask your question..."}
              style={{ flex: 1, padding: '10px 15px', borderRadius: '20px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }}
            />
            <button type="submit" disabled={!input.trim() || isTyping} style={{ backgroundColor: 'var(--saffron)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: (!input.trim() || isTyping) ? 0.5 : 1 }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );

  return createPortal(content, document.body);
};

export default FloatingAssistant;
