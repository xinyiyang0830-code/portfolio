
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 md:px-20 flex flex-col items-center justify-center relative z-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-[1px] bg-white"></span>
            <span className="font-mono text-xs uppercase text-white/60 tracking-widest">Connect Protocol</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-12 italic">Sync.</h1>
          <p className="text-xl text-zinc-500 mb-16 font-mono font-light leading-relaxed max-w-md">
            Available for collaborative research, systemic consulting, or project inquiries.
          </p>
          
          <div className="space-y-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600 mb-4">Direct_Channel</p>
              <a href="mailto:hello@designer.com" className="text-2xl md:text-3xl font-bold uppercase tracking-tighter hover:text-white transition-colors border-b-2 border-white/5 pb-2">
                hello@designer.os
              </a>
            </div>
          </div>
        </div>

        <div className="glass p-1 md:p-1.5 rounded-sm border-white/10 relative">
          <div className="bg-black/40 backdrop-blur-xl p-8 md:p-12 border border-white/5 rounded-sm">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">Sender_Identity</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border-b border-white/10 p-4 font-mono text-sm focus:outline-none focus:border-white transition-all placeholder:text-zinc-800 text-white"
                  placeholder="Enter Name..."
                />
              </div>
              <div className="space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">Digital_Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border-b border-white/10 p-4 font-mono text-sm focus:outline-none focus:border-white transition-all placeholder:text-zinc-800 text-white"
                  placeholder="name@server.com"
                />
              </div>
              <button className="w-full bg-white text-black py-6 font-mono uppercase tracking-[0.4em] font-bold text-xs hover:bg-zinc-200 transition-all shadow-xl group">
                Transmit_Message <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
