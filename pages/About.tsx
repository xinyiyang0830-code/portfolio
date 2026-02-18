
import React, { useEffect, useRef } from 'react';
import { EDUCATION, EXHIBITIONS } from '../constants';

const InfoSection: React.FC<{ title: string; enTitle?: string; children: React.ReactNode }> = ({ title, enTitle, children }) => (
  <section className="reveal mb-24 last:mb-0">
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">{title}</h2>
      {enTitle && (
        <>
          <span className="w-12 h-[1px] bg-white/10"></span>
          <span className="font-mono text-[10px] uppercase text-zinc-600 tracking-[0.3em] font-bold">{enTitle}</span>
        </>
      )}
    </div>
    {children}
  </section>
);

const About: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-32 px-6 md:px-20 relative z-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Personal Info & Photo (4/12) */}
        <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-32 h-fit">
          <div className="reveal glass p-1.5 rounded-sm">
            <div className="overflow-hidden contrast-110 rounded-sm bg-zinc-900 w-full h-auto">
              <img 
                src="https://raw.githubusercontent.com/Yang-Emmie/Portfolio12.29/refs/heads/main/20251229153151_322_8.jpg" 
                alt="Yang Xinyi Portrait" 
                className="w-full h-auto block opacity-100"
              />
            </div>
          </div>

          <div className="reveal space-y-8">
            <div className="font-mono">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Xinyi Yang</h1>
              <p className="text-zinc-600 text-[11px] uppercase tracking-[0.3em] font-bold">Personal Profile</p>
            </div>

            <div className="space-y-6 border-t border-white/5 pt-8 font-mono">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-zinc-500 tracking-[0.2em] font-bold">Birth Date</span>
                <span className="text-sm text-zinc-300">2001.08.30</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-zinc-500 tracking-[0.2em] font-bold">TEL</span>
                <span className="text-sm text-zinc-300">15250475140</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-zinc-500 tracking-[0.2em] font-bold">E-Mail</span>
                <a href="mailto:578276060@qq.com" className="text-sm text-zinc-300 hover:text-white transition-colors underline decoration-white/20 underline-offset-4">578276060@qq.com</a>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Main Content (8/12) */}
        <main className="lg:col-span-8">
          {/* Header Row - Centered elements */}
          <header className="reveal flex justify-center items-center gap-12 md:gap-24 mb-24 border-b border-white/5 pb-12">
            <span className="font-mono text-[12px] font-black uppercase tracking-[0.5em] text-white">XINYI YANG</span>
            <span className="font-mono text-[12px] uppercase tracking-[0.5em] text-zinc-600">PORTFOLIO</span>
            <span className="font-mono text-[12px] font-black uppercase tracking-[0.5em] text-white">2025.</span>
          </header>

          {/* About Me Section */}
          <InfoSection title="About me" enTitle="自我介绍">
            <div className="space-y-8">
              <p className="text-zinc-200 text-lg leading-relaxed font-normal">
                杨欣怡，出生于江苏苏州，本科毕业于南京艺术学院，目前为西安外国语大学艺术学院硕士研究生，湖南省包装联合会设计委员会会员。
              </p>
              <p className="text-zinc-400 text-base leading-relaxed font-light">
                主要研究方向为数字媒体艺术，作品主要聚焦于虚拟现实（VR）在文化遗产中的设计以及非物质文化遗产的数字化创新，致力于将我国传统文化遗产和交互类数字艺术结合进行实践设计，以期在设计中融入对传统文化遗产的新诠释。
              </p>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-sm">
                <p className="text-zinc-500 text-sm leading-relaxed font-mono italic uppercase tracking-wider">
                  曾参与国家艺术基金项目《新时代对外文艺交流组织实施人才培训》主视觉设计；艺术实践作品曾在“融界：设计师艺术作品展——苏湘设计师联展”、“长三角文博会 ECA 国际创意设计大赛展”中参与展出。
                </p>
              </div>
            </div>
          </InfoSection>

          {/* Education Section */}
          <InfoSection title="Education" enTitle="教育经历">
            <div className="space-y-16">
              <div className="group relative">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-all duration-300">西安外国语大学 | Xian International Studies University</h3>
                  <span className="font-mono text-xs text-zinc-600 bg-white/5 px-3 py-1 whitespace-nowrap">2023.9 至今</span>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-300 font-medium">数字媒体艺术 | 研究生</p>
                  <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Digital Media Art - Postgraduate</p>
                </div>
              </div>

              <div className="group relative">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-all duration-300">南京艺术学院 | Nanjing University of the Arts</h3>
                  <span className="font-mono text-xs text-zinc-600 bg-white/5 px-3 py-1 whitespace-nowrap">2019.9 – 2023.6</span>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-300 font-medium">数字媒体艺术 | 本科</p>
                  <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Digital Media Art - Undergraduate</p>
                </div>
              </div>
            </div>
          </InfoSection>

          {/* Exhibition Section */}
          <InfoSection title="Exhibition Experience" enTitle="参展经历">
            <div className="space-y-16">
              <div className="group border-l border-white/5 pl-8 py-2 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-lg font-bold text-zinc-200">融界：设计师艺术作品展——苏湘设计师联展</h3>
                   <span className="font-mono text-xs text-zinc-600">2024</span>
                </div>
                <p className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider mb-4">Designer Art Exhibition SUZHOU and HUNAN-Designers Joint Exhibition</p>
                <p className="text-xs text-zinc-600 font-mono">苏州湾数字艺术馆，苏州 | Suzhou Bay Digital Art Museum</p>
              </div>

              <div className="group border-l border-white/5 pl-8 py-2 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-lg font-bold text-zinc-200">长三角文博会 ECA 国际创意设计大赛展</h3>
                   <span className="font-mono text-xs text-zinc-600">2024</span>
                </div>
                <p className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider mb-4">East Creative Award (ECA) International Creative Design Competition</p>
                <p className="text-xs text-zinc-600 font-mono">国家会展中心，上海 | NECC, Shanghai</p>
              </div>
            </div>
          </InfoSection>

        </main>
      </div>
    </div>
  );
};

export default About;
