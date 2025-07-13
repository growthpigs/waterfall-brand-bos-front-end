import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Paperclip, ArrowUp, ChevronDown } from 'lucide-react';
const AIFloatingChatBubble: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Claude Sonnet 4');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(24);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const models = ['Claude Sonnet 4', 'Gemini Pro', 'GPT-4', 'GPT-4 Turbo', 'Claude Haiku'];
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    // Auto-resize textarea upward like Claude
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = newHeight + 'px';
      setTextareaHeight(newHeight);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
  };
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log('Selected files:', files);
  };
  const handleSend = () => {
    if (inputValue.trim()) {
      console.log('Sending message:', inputValue);
      setInputValue('');
      setTextareaHeight(24);
      if (textareaRef.current) {
        textareaRef.current.style.height = '24px';
      }
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    ease: "easeOut"
  }} className="group w-full">
      <div className="relative w-full">
        <div className={`relative bg-white/20 backdrop-blur-md border-2 border-white/80 rounded-xl shadow-lg transition-all duration-300 ${isDragOver ? 'border-blue-400/50 bg-blue-50/20' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          {/* Input field container */}
          <div className="flex items-end gap-3 p-3">
            {/* File upload button */}
            <button onClick={handleFileUpload} className="flex-shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="Upload file">
              <Paperclip className="w-4 h-4 text-white/80" />
            </button>

            {/* Expanding textarea container */}
            <div className="flex-1 relative">
              <textarea ref={textareaRef} value={inputValue} onChange={handleInputChange} placeholder="Ask Brand BOS anything..." className="w-full resize-none bg-transparent text-white placeholder-white/60 border-none outline-none text-sm leading-relaxed pr-32" rows={1} style={{
              height: textareaHeight + 'px',
              minHeight: '24px'
            }} />
              
              {/* LLM Selector INSIDE input field, right side */}
              <div className="absolute bottom-1 right-12">
                <div className="relative">
                  <button onClick={() => setShowModelDropdown(!showModelDropdown)} className="flex items-center gap-1 px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <span>{selectedModel}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {showModelDropdown && <div className="absolute bottom-full right-0 mb-1 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg shadow-lg z-50 min-w-[140px]">
                      {models.map(model => <button key={model} onClick={() => {
                    setSelectedModel(model);
                    setShowModelDropdown(false);
                  }} className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-white/50 first:rounded-t-lg last:rounded-b-lg transition-colors">
                          {model}
                        </button>)}
                    </div>}
                </div>
              </div>
            </div>

            {/* Send button with WHITE arrow */}
            <button onClick={handleSend} disabled={!inputValue.trim()} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-white/10 text-white/50 cursor-not-allowed'}`} title="Send message">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Drag overlay */}
          {isDragOver && <div className="absolute inset-0 bg-blue-100/20 border-2 border-dashed border-blue-400/50 rounded-xl flex items-center justify-center backdrop-blur-md">
              <p className="text-white font-medium">Drop files here to upload</p>
            </div>}
        </div>

        {/* Hidden file input */}
        <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt" onChange={handleFileSelect} className="hidden" />
      </div>
    </motion.div>;
};
export default AIFloatingChatBubble;