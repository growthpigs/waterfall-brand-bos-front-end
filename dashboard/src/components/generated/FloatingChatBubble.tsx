import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
const FloatingChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const toggleChat = () => setIsOpen(!isOpen);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };
  return <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        scale: 0.8,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.8,
        y: 20
      }} transition={{
        duration: 0.2
      }} className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-xs text-white/80">Online</p>
                  </div>
                </div>
                <button onClick={toggleChat} className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-64 p-4 overflow-y-auto bg-slate-50">
              <div className="space-y-3">
                <div className="flex">
                  <div className="bg-white rounded-2xl rounded-bl-md p-3 shadow-sm max-w-xs">
                    <p className="text-sm text-slate-700">
                      Hi! I'm here to help you optimize your brand performance. What would you like to know?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" />
                <motion.button type="submit" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors">
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button onClick={toggleChat} whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow">
        <AnimatePresence mode="wait">
          {isOpen ? <motion.div key="close" initial={{
          rotate: -90,
          opacity: 0
        }} animate={{
          rotate: 0,
          opacity: 1
        }} exit={{
          rotate: 90,
          opacity: 0
        }} transition={{
          duration: 0.2
        }}>
              <X className="w-6 h-6" />
            </motion.div> : <motion.div key="chat" initial={{
          rotate: -90,
          opacity: 0
        }} animate={{
          rotate: 0,
          opacity: 1
        }} exit={{
          rotate: 90,
          opacity: 0
        }} transition={{
          duration: 0.2
        }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>}
        </AnimatePresence>
      </motion.button>
    </div>;
};
export default FloatingChatBubble;