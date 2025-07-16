import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Paperclip, Sparkles, MessageCircle, X } from 'lucide-react';

interface FloatingChatBarProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const FloatingChatBar: React.FC<FloatingChatBarProps> = ({ 
  onSendMessage, 
  placeholder = "Ask me anything about your Brand BOS..." 
}) => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(true);
      
      // Simulate AI response delay
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-black/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 font-medium">Brand BOS AI Assistant</span>
              </div>
              <button
                onClick={toggleExpanded}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-black/20 rounded-lg p-3 mb-3 min-h-[120px] max-h-[300px] overflow-y-auto">
              {isTyping ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                  </div>
                  <span className="text-white/70 text-sm">AI is thinking...</span>
                </div>
              ) : (
                <p className="text-white/70 text-sm">
                  Hello! I'm your Brand BOS AI assistant. I can help you with:
                  <br />• Campaign performance analysis
                  <br />• Content strategy recommendations
                  <br />• SEO optimization insights
                  <br />• Client account management
                  <br />
                  <br />What would you like to know?
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-black/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="flex items-center p-3">
          {/* Expand Button */}
          <button
            type="button"
            onClick={toggleExpanded}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 mr-3"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full bg-black/20 text-white placeholder-white/50 rounded-xl px-4 py-3 pr-12 border border-purple-400/20 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
            
            {/* AI Indicator */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-purple-400 rounded-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-3">
            <button
              type="button"
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <button
              type="button"
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Mic className="w-5 h-5" />
            </button>
            
            <motion.button
              type="submit"
              disabled={!message.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl transition-all duration-200 ${
                message.trim()
                  ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg hover:shadow-purple-500/25'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FloatingChatBar; 