"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic } from 'lucide-react';
export interface PersistentChatBarProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
}
const PersistentChatBar: React.FC<PersistentChatBarProps> = ({
  onSendMessage,
  placeholder = "Ask Brand BOS anything…"
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage?.(message);
      setMessage('');
    }
  };
  return <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <motion.div animate={{
        boxShadow: isFocused ? '0 0 0 2px rgb(255 255 255 / 0.3), 0 8px 32px rgb(0 0 0 / 0.2)' : '0 4px 16px rgb(0 0 0 / 0.1)'
      }} transition={{
        duration: 0.2
      }} className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl overflow-hidden shadow-xl" style={{
        flexWrap: "nowrap",
        rowGap: "0px",
        alignItems: "center",
        flexDirection: "row"
      }}>
          {/* Attachment Button */}
          <button type="button" className="p-4 text-white/70 hover:text-white transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} className="flex-1 px-2 py-4 text-white placeholder-white/60 bg-transparent border-none outline-none resize-none" />

          {/* Voice Input Button */}
          <button type="button" className="p-4 text-white/70 hover:text-white transition-colors">
            <Mic className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <motion.button type="submit" disabled={!message.trim()} whileHover={{
          scale: message.trim() ? 1.05 : 1
        }} whileTap={{
          scale: message.trim() ? 0.95 : 1
        }} className={`m-3 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${message.trim() ? 'bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 shadow-lg border border-white/40' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}>
            <Send className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </form>
    </div>;
};
export default PersistentChatBar;