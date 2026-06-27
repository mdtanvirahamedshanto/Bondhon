'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getConversationHistory, sendMessage } from '@/core/actions/message.actions';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Send, Search, Sparkles, Star } from 'lucide-react';

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const selectedUserId = searchParams?.get('userId') || 'prof_1';

  const conversations = [
    { id: 'prof_1', name: 'Ananya Verma', lastMessage: 'It has been wonderful! Just working on a few...', time: '10:33 AM', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80', active: true, unread: 1 },
    { id: 'prof_2', name: 'Priya Sen', lastMessage: 'Let us build a beautiful life together.', time: 'Yesterday', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80', active: false, unread: 0 },
  ];

  const [activeChat, setActiveChat] = useState(conversations.find(c => c.id === selectedUserId) || conversations[0]);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    getConversationHistory(activeChat.id).then((res) => {
      if (res.success) setMessages(res.data);
    });
  }, [activeChat.id]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;
    setIsSending(true);

    const tempMsg = { id: `msg_${Date.now()}`, senderId: 'me', content: inputMessage, timestamp: 'Just now', isMe: true };
    setMessages(prev => [...prev, tempMsg]);
    setInputMessage('');

    const res = await sendMessage(activeChat.id, tempMsg.content);
    setIsSending(false);
  };

  return (
    <div className="h-[calc(100vh-80px)] md:h-screen max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6">
      {/* Conversations Sidebar */}
      <div className="w-full md:w-80 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 flex flex-col shrink-0 overflow-hidden">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80">
          <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
            <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-sm outline-none text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition text-left ${activeChat.id === chat.id ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 shadow-sm' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
            >
              <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chat.photo} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 truncate">{chat.name}</h4>
                  <span className="text-[10px] text-zinc-400 font-semibold">{chat.time}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Chat Window */}
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200/60 dark:border-zinc-800 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/20">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeChat.photo} alt={activeChat.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">{activeChat.name}</h3>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                <Sparkles className="h-3 w-3" /> Online • Premium Match
              </span>
            </div>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-zinc-50/30 dark:bg-zinc-950/20">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg p-5 rounded-3xl shadow-sm text-sm font-medium leading-relaxed ${msg.isMe ? 'bg-gradient-to-r from-indigo-600 to-rose-500 text-white rounded-br-none' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-bl-none'}`}>
                {msg.content}
                <div className={`text-[10px] mt-2 text-right font-bold ${msg.isMe ? 'text-indigo-100/80' : 'text-zinc-400'}`}>{msg.timestamp}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 md:p-6 border-t border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900">
          <form onSubmit={handleSend} className="flex items-center gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Reply to ${activeChat.name}...`}
              className="flex-1 px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-sm outline-none text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition"
            />
            <Button type="submit" disabled={isSending} className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-700 hover:to-rose-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition duration-300 shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
