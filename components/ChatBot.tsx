
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/gemini';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const aiMsg = await getAIResponse(userMsg);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiMsg || "Kernel Error: System disconnected." }]);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {isOpen ? (
        <div className="glass-accent w-[380px] md:w-[420px] rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col h-[550px] overflow-hidden transition-all duration-500 border-white/10 animate-fade-in-up">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/60">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-2 h-2 bg-white rounded-full animate-ping absolute"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.5em] font-black text-white/90">SYST_NEURAL.CORE</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-600 hover:text-white transition-all text-xl">&times;</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-7 space-y-8 font-mono text-[12px] leading-relaxed scroll-smooth">
            {messages.length === 0 && (
              <div className="py-12 flex flex-col items-center gap-4">
                <p className="text-zinc-700 italic uppercase tracking-[0.3em] text-[9px]">Awaiting Signal Input...</p>
                <div className="w-[1px] h-12 bg-zinc-800"></div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] px-5 py-4 rounded-sm border ${m.role === 'user' ? 'bg-zinc-900/80 border-white/5 text-zinc-300' : 'bg-white/5 border-white/10 text-white font-medium'}`}>
                  <span className="block mb-2 opacity-30 text-[9px] tracking-[0.3em] uppercase font-bold">{m.role === 'user' ? 'GUEST_INPUT' : 'SYSTEM_RESPONSE'}</span>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-5 py-4 border border-white/10 text-white animate-pulse uppercase tracking-[0.3em] rounded-sm text-[9px]">
                  Analyzing...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-black border-t border-white/10 flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inject command..."
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-sm px-5 py-4 text-white text-[11px] font-mono focus:outline-none focus:border-white transition-all placeholder:text-zinc-800"
            />
            <button 
              onClick={handleSend}
              className="bg-white text-black px-7 py-4 rounded-sm text-[10px] font-black font-mono hover:bg-zinc-300 transition-all"
            >
              EXEC
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 rounded-sm bg-black glass border-white/20 flex items-center justify-center shadow-2xl hover:scale-110 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <svg className="w-7 h-7 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
