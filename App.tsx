
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-brand-dark min-h-screen relative selection:bg-white selection:text-black">
        <Navbar />
        {/* 确保 main 容器不限制溢出，允许 ProjectDetail 正常滚动 */}
        <main className="relative min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <footer className="py-28 px-6 md:px-20 border-t border-white/5 bg-[#030303] relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 relative">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center group cursor-pointer relative">
                <span className="w-4 h-4 bg-white animate-pulse"></span>
              </div>
              <div className="font-mono">
                <p className="text-white text-base font-black uppercase tracking-tighter">DESIGNER.OS</p>
                <p className="text-zinc-700 text-[10px] uppercase tracking-[0.4em] font-bold mt-1">LND_NODE // CORE_V.03</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-14 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">
              <a href="#" className="hover:text-white transition-all">Vault_Registry</a>
              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
                className="hover:text-white transition-all flex items-center gap-3 group"
              >
                <span className="group-hover:translate-y-[-4px] transition-transform">↑</span> 
                BACK_TO_SOURCE
              </button>
            </div>
          </div>
          <div className="mt-24 text-center opacity-5 font-mono text-[10px] tracking-[1.5em] uppercase font-black">
            Design_Is_The_Primitive_Logic
          </div>
        </footer>
        <ChatBot />
      </div>
    </Router>
  );
};

export default App;
