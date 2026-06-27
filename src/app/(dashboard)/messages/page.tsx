'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Search, Sparkles, MoreVertical, Paperclip, 
  Smile, Mic, Image as ImageIcon, Phone, Video, 
  Ban, Flag, Check, CheckCheck, Camera
} from 'lucide-react';

// Advanced Private Chat Engine (Client Architecture)
function MessagesContent() {
  const searchParams = useSearchParams();
  const selectedUserId = searchParams?.get('userId') || 'prof_1';

  const conversations = [
    { id: 'prof_1', name: 'Ananya Verma', lastMessage: 'It has been wonderful! Just working on a few...', time: '10:33 AM', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80', active: true, unread: 1, isTyping: false },
    { id: 'prof_2', name: 'Priya Sen', lastMessage: 'Let us build a beautiful life together.', time: 'Yesterday', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80', active: false, unread: 0, isTyping: false },
  ];

  const [activeChat, setActiveChat] = useState(conversations.find(c => c.id === selectedUserId) || conversations[0]);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate Socket Connection and History Fetch
  useEffect(() => {
    // Initial load
    setMessages([
      { id: 'm1', content: 'Hi Ananya! I really loved reading about your passion for design.', isMe: true, timestamp: '10:00 AM', status: 'read' },
      { id: 'm2', content: 'Hello! Thank you so much. Your profile caught my eye too!', isMe: false, timestamp: '10:15 AM' },
      { id: 'm3', content: 'Are you free for a quick call this weekend?', isMe: true, timestamp: '10:20 AM', status: 'read' },
      { id: 'm4', content: 'It has been wonderful! Just working on a few project deadlines right now, but yes!', isMe: false, timestamp: '10:33 AM' }
    ]);
  }, [activeChat.id]);

  // Simulate incoming typing event from socket
  useEffect(() => {
    if (activeChat.id === 'prof_1') {
      const typingTimer = setInterval(() => {
        setIsTyping(prev => !prev); // Toggle typing randomly for simulation
      }, 15000);
      return () => clearInterval(typingTimer);
    }
  }, [activeChat.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      content: inputMessage,
      isMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
    setShowAttachMenu(false);

    // Simulate Read Receipt Socket Update
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m));
    }, 1000);
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m));
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
      
      {/* Left Sidebar: Conversational List */}
      <div className="w-full md:w-80 bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-md border border-zinc-200/60 dark:border-zinc-800 flex flex-col shrink-0 overflow-hidden">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50">
          <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
            <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold outline-none text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition shadow-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition text-left relative ${activeChat.id === chat.id ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 shadow-sm' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-transparent'}`}
            >
              <div className="relative h-12 w-12 rounded-full shrink-0 shadow-sm border border-zinc-200 dark:border-zinc-700 p-0.5 bg-white dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chat.photo} alt={chat.name} className="w-full h-full object-cover rounded-full" />
                {chat.active && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">{chat.name}</h4>
                  <span className="text-[10px] text-zinc-400 font-bold">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? 'text-zinc-900 dark:text-zinc-100 font-bold' : 'text-zinc-500 dark:text-zinc-400 font-medium'}`}>
                  {chat.isTyping ? <span className="text-indigo-500 italic">Typing...</span> : chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-extrabold shadow-sm shrink-0">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Area: Active Chat Canvas */}
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl shadow-premium-lg border border-zinc-200/60 dark:border-zinc-800 flex flex-col overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full shrink-0 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeChat.photo} alt={activeChat.name} className="w-full h-full object-cover rounded-full" />
              {activeChat.active && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">{activeChat.name}</h3>
              <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                {activeChat.active ? 'Online' : 'Last seen 2h ago'}
                <Sparkles className="h-3 w-3 text-amber-500 ml-1" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 relative">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-full">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-full hidden sm:flex">
              <Video className="h-5 w-5" />
            </Button>
            <Button onClick={() => setShowOptions(!showOptions)} variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>

            {/* Moderation Dropdown */}
            <AnimatePresence>
              {showOptions && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute top-12 right-0 w-48 bg-white dark:bg-zinc-800 rounded-2xl shadow-premium-xl border border-zinc-200 dark:border-zinc-700 py-2 z-50">
                  <button onClick={() => setShowOptions(false)} className="w-full text-left px-4 py-2.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 flex items-center gap-2">
                    <Search className="h-4 w-4" /> Search Chat
                  </button>
                  <button onClick={() => setShowOptions(false)} className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-700 mt-1 pt-3">
                    <Ban className="h-4 w-4" /> Block User
                  </button>
                  <button onClick={() => setShowOptions(false)} className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2">
                    <Flag className="h-4 w-4" /> Report Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cream-pixels.png')] bg-zinc-50/50 dark:bg-zinc-950/30">
          <div className="text-center pb-4">
            <span className="bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] md:max-w-md p-4 rounded-3xl shadow-sm text-sm font-medium leading-relaxed relative group ${msg.isMe ? 'bg-gradient-to-r from-indigo-600 to-rose-500 text-white rounded-br-sm' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-bl-sm'}`}>
                {msg.content}
                
                {/* Meta row: Time & Read Receipt */}
                <div className={`flex items-center justify-end gap-1 text-[10px] mt-1.5 font-bold ${msg.isMe ? 'text-indigo-100' : 'text-zinc-400'}`}>
                  {msg.timestamp}
                  {msg.isMe && (
                    <span className="ml-1">
                      {msg.status === 'sent' && <Check className="h-3 w-3 text-indigo-200" />}
                      {msg.status === 'delivered' && <CheckCheck className="h-3 w-3 text-indigo-200" />}
                      {msg.status === 'read' && <CheckCheck className="h-3 w-3 text-emerald-400" />}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && activeChat.id === 'prof_1' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-1.5 w-1.5 bg-indigo-500 rounded-full" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Unified Input Engine */}
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800/80 relative z-20">
          
          {/* Attachment Popover */}
          <AnimatePresence>
            {showAttachMenu && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-20 left-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-premium-xl border border-zinc-200 dark:border-zinc-700 p-2 flex gap-2">
                <button className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 hover:scale-105 transition">
                  <ImageIcon className="h-5 w-5" />
                </button>
                <button className="h-12 w-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex flex-col items-center justify-center text-rose-600 dark:text-rose-400 hover:scale-105 transition">
                  <Camera className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSend} className="flex items-end gap-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-3xl p-2 shadow-inner transition focus-within:border-indigo-400">
            <div className="flex items-center gap-1 shrink-0 pb-1 pl-1">
              <button type="button" onClick={() => setShowAttachMenu(!showAttachMenu)} className="h-9 w-9 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-indigo-500 transition">
                <Paperclip className="h-5 w-5" />
              </button>
              <button type="button" className="h-9 w-9 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-amber-500 transition">
                <Smile className="h-5 w-5" />
              </button>
            </div>
            
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 max-h-32 bg-transparent py-2.5 px-2 outline-none text-sm font-semibold text-zinc-900 dark:text-zinc-100 resize-none overflow-y-auto"
            />
            
            <div className="shrink-0 pb-1 pr-1">
              {inputMessage.trim() ? (
                <Button type="submit" className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-rose-500 text-white shadow-md hover:scale-105 transition p-0">
                  <Send className="h-4 w-4 ml-0.5" />
                </Button>
              ) : (
                <Button type="button" className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 shadow-inner hover:scale-105 transition p-0">
                  <Mic className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="h-8 w-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>}>
      <MessagesContent />
    </Suspense>
  );
}
