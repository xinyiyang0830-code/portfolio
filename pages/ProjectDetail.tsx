import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);
  
  const isSuzhouCode = id === 'music-1';
  const isXiashiLantern = id === 'music-2';
  const isXianDrum = id === 'music-3';
  const isImmersiveForest = id === 'music-4';
  const isShaanbei = id === 'music-5';
  const isTaihuVR = id === 'vr-1';
  const isNationalArtFund = id === 'design-1';
  const isBanpoIP = id === 'design-2';
  const isMajorHeat = id === 'video-1';
  const isHiddenEyes = id === 'video-2';
  const isDoubleSidedSuzhou = id === 'video-3';
  const isNakedEye3D = id === 'video-4';
  const isAigcDesign = id === 'aigc-1';
  const isPracticeProject = id === 'aigc-2';

  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark">
        <h1 className="text-4xl font-black mb-8 text-white uppercase tracking-tighter">Entry_Not_Found</h1>
        <button onClick={() => navigate('/work')} className="font-mono text-xs uppercase tracking-[0.5em] border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all text-white">
          Return_to_Archive
        </button>
      </div>
    );
  }

  // --- Asset URL Definitions (Corrected to raw.githubusercontent.com) ---
  const xiashiImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%A1%96%E7%9F%B3%E7%81%AF%E5%BD%A92.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%A1%96%E7%9F%B3%E7%81%AF%E5%BD%A9.jpg'
  ];
  const taihuImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/12%20p13p14.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/18%20p23p24.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/19%20p25p26.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/20%20p27p28.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%91%9E%E4%BA%91%E4%B9%8B%E6%A2%A61.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%91%9E%E4%BA%91%E4%B9%8B%E6%A2%A62.jpg'
  ];
  const artFundImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%AC%AC%E4%B8%80%E7%89%88.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%AC%AC%E4%BA%8C%E7%89%88.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%AC%AC%E4%B8%80%E7%89%88%E6%A0%B7%E6%9C%BA.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E4%BD%9C%E5%93%81%E9%9B%8612131415-2.jpg'
  ];
  const banpoImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%B1%95%E6%9D%BF%E5%B0%8F%E4%BA%BA%E4%B8%89%E8%A7%86%E5%9B%BE.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%B1%95%E6%9D%BF%E7%8C%AA%E4%B8%89%E8%A7%86%E5%9B%BE.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E6%95%B4%E4%BD%93%E7%9B%B2%E7%9B%92.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E6%95%B4%E4%BD%93%E7%9B%B2%E7%9B%92%E7%8C%AA.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250721112821.png',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E6%95%B4%E4%BD%93%E6%8C%82%E4%BB%B6%E5%B1%95%E7%A4%BA.jpg'
  ];
  const suzhouBoardImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%B1%95%E6%9D%BF1.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%B1%95%E6%9D%BF2.jpg'
  ];
  const shaanbeiImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/logo1.jpg',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E4%B8%93%E8%BE%91%E6%B5%B7%E6%8A%A5.jpg'
  ];

  // AIGC Design Images (Corrected to raw.githubusercontent.com)
  const aigcImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%9B%BE%E7%89%871.png',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%9B%BE%E7%89%872.png',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%9B%BE%E7%89%873.png',
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%9B%BE%E7%89%874.png'
  ];

  // Practice Project Images
  const practiceImages = [
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/1.3.jpg', 
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/1.1.jpg', 
    'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/1.2.jpg'  
  ];

  // Video Links (Assuming these are working)
  const xiashiVideo = "https://github.com/xinyiyang0830-code/portfolio-web/releases/download/v1.0/xiashidengcai.mp4";
  const taihuVideo = "https://github.com/xinyiyang0830-code/portfolio-web/releases/download/v1.0/dream.mp4";
  const xianVideoHero = "https://github.com/xinyiyang0830-code/portfolio-web/releases/download/v1.0/xi-anguyue1.mp4";
  const xianVideoBody = "https://github.com/xinyiyang0830-code/portfolio-web/releases/download/v1.0/xi-anguyue2.mp4";
  const suzhouCodeVideo = "https://github.com/xinyiyang0830-code/portfolio-web/releases/download/v1.0/suzhoumazi.mp4";
  const shaanbeiVideoMain = "https://github.com/xinyiyang0830-code/portfolio-web/releases/download/v1.0/shanbeimingge.mp4";

  return (
    <div className="bg-brand-dark w-full">
      {/* 1. Full-screen Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {isXianDrum ? (
          <video src={xianVideoHero} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-80" />
        ) : (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover transition-all duration-1000 opacity-70" 
          />
        )}
        
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white italic mb-6 reveal max-w-5xl leading-tight">
            {project.title}
          </h1>
          <p className="text-xl md:text-3xl text-zinc-300 font-bold tracking-tighter reveal">{project.chineseTitle}</p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 animate-bounce">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white">Scroll Down</span>
          <div className="w-[1px] h-10 bg-white"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
      </section>

      {/* 2. Deep Content Section */}
      <section className="relative z-10 pt-40 pb-60 px-6 md:px-20 max-w-[1440px] mx-auto">
        
        {/* Metadata */}
        <div className="mb-40 reveal">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-white/30"></span>
            <span className="font-mono text-xs uppercase text-zinc-500 tracking-[0.4em]">Project_Log // {project.year}</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/5 pt-12">
            <div><p className="font-mono text-[9px] text-zinc-600 uppercase mb-2">Category</p><p className="text-sm text-white font-bold uppercase">{project.category}</p></div>
            <div><p className="font-mono text-[9px] text-zinc-600 uppercase mb-2">Technique</p><p className="text-sm text-white font-bold uppercase">{project.type}</p></div>
            <div><p className="font-mono text-[9px] text-zinc-600 uppercase mb-2">Medium</p><p className="text-sm text-white font-bold uppercase italic">Digital Art</p></div>
            <div><p className="font-mono text-[9px] text-zinc-600 uppercase mb-2">Status</p><p className="text-sm text-white font-bold uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Verified</p></div>
          </div>
        </div>

        {/* --- Content Dispatcher --- */}

        {isSuzhouCode ? (
          <div className="space-y-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start reveal">
              <div className="lg:col-span-6">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-12 italic tracking-tighter leading-tight">音画姑苏 // SUZHOU_CODE</h3>
                <p className="text-lg text-zinc-300 leading-relaxed mb-8">探索将传统苏州码子融入现代地铁站主题设计。苏州码子作为一种古老的商业数字符号，承载着深厚的地域文化记忆。</p>
                <p className="text-zinc-400 leading-relaxed">通过动态交互装置与视觉化设计，将码子符号与现代城市的脉动相结合，提升地铁空间的文化深度。</p>
              </div>
              <div className="lg:col-span-6">
                <div className="border border-white/5 rounded-sm shadow-2xl bg-black">
                   <video src={suzhouCodeVideo} autoPlay muted loop playsInline className="w-full h-auto block" />
                </div>
              </div>
            </div>
            <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8">
               <img src={suzhouBoardImages[0]} alt="Board 1" className="w-full h-auto border border-white/10" />
               <img src={suzhouBoardImages[1]} alt="Board 2" className="w-full h-auto border border-white/10" />
            </div>
          </div>
        ) : isXiashiLantern ? (
          <div className="space-y-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start reveal">
              <div className="lg:col-span-6">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-12 italic tracking-tighter">指尖上的光影 // XIASHI_LANTERN</h3>
                <p className="text-lg text-zinc-300 mb-8">选取非遗“硖石灯彩”，以八大技法为切入点进行分层拆解。使用点云效果表现灯彩最具有特色的“针”技法。</p>
                <p className="text-zinc-400 leading-relaxed">组成花灯的粒子随着环境音量与音调进行变化，借助声音展现灯彩制作的不同阶段。</p>
              </div>
              <div className="lg:col-span-6">
                <div className="border border-white/5 rounded-sm shadow-2xl bg-black">
                   <video src={xiashiVideo} autoPlay muted loop playsInline className="w-full h-auto block" />
                </div>
              </div>
            </div>
            <div className="reveal">
               <img src={xiashiImages[0]} alt="Xiashi" className="w-full h-auto border border-white/5" />
            </div>
          </div>
        ) : isXianDrum ? (
          <div className="space-y-48">
             <div className="max-w-4xl mx-auto text-center reveal">
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase mb-12 italic tracking-tighter">鼓乐生花</h3>
                <p className="text-xl text-zinc-300 leading-relaxed font-light mb-16">
                  西安鼓乐是国家级非遗。通过音频分析算法，将打击乐节奏转化为实时生成的花卉生长形态。
                </p>
             </div>
             <div className="reveal p-2 rounded-sm border border-white/10 bg-black overflow-hidden shadow-4xl">
                <video src={xianVideoBody} autoPlay muted loop playsInline controls className="w-full h-auto" />
             </div>
          </div>
        ) : isImmersiveForest ? (
          <div className="space-y-32 flex flex-col items-center reveal">
             <img src={project.thumbnail} alt="Forest" className="w-full max-w-5xl h-auto shadow-4xl mb-24" />
             <div className="max-w-3xl text-center space-y-8">
                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">森林：沉浸式音画场景</h3>
                <p className="text-lg text-zinc-400 leading-relaxed font-light">
                   利用实时渲染引擎，将音频频率映射为森林植被的色彩与律动，让观众仿佛置身于音律交织的自然之境。
                </p>
             </div>
          </div>
        ) : isShaanbei ? (
          <div className="space-y-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center reveal">
              <div className="lg:col-span-5">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-8 italic tracking-tighter">陕北民歌专辑视觉</h3>
                <p className="text-zinc-400 leading-relaxed mb-10">提取陕北地貌与黄土文化中的粗犷线条，将其转化为现代感十足的设计语言。</p>
                <img src={shaanbeiImages[0]} alt="Logo" className="w-32 h-32 object-contain bg-white/5 p-4" />
              </div>
              <div className="lg:col-span-7">
                <video src={shaanbeiVideoMain} autoPlay muted loop playsInline className="w-full h-auto rounded-sm border border-white/10" />
              </div>
            </div>
            <div className="reveal">
               <img src={shaanbeiImages[1]} alt="Poster" className="w-full h-auto border border-white/5" />
            </div>
          </div>
        ) : isTaihuVR ? (
          <div className="space-y-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start reveal">
              <div className="lg:col-span-5">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-12 italic tracking-tighter">目睹者 // THE WITNESS</h3>
                <p className="text-xl text-zinc-300 italic mb-8">“沧海桑田，物是人非，只有石头亘古不变。”</p>
                <p className="text-zinc-400 leading-relaxed">作品讲述了太湖石瑞云峰几百年间颠沛流离的往事。</p>
              </div>
              <div className="lg:col-span-7">
                <img src={taihuImages[0]} alt="VR Scene" className="w-full h-auto rounded-sm border border-white/5" />
              </div>
            </div>
            <video src={taihuVideo} autoPlay loop playsInline controls className="w-full h-auto border border-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
               <img src={taihuImages[4]} alt="Scene 1" className="w-full h-auto" />
               <img src={taihuImages[5]} alt="Scene 2" className="w-full h-auto" />
            </div>
          </div>
        ) : isNationalArtFund ? (
          <div className="space-y-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 reveal">
              <div className="lg:col-span-6">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-12 italic tracking-tighter leading-tight">国家艺术基金项目<br/>主视觉设计</h3>
                <p className="text-zinc-300 italic mb-8">"方案 100% 采用，运用于中国美术报、国画周刊等平台。"</p>
              </div>
              <div className="lg:col-span-6">
                <img src={artFundImages[2]} alt="Mockup" className="w-full h-auto border border-white/5" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
               <img src={artFundImages[0]} alt="V1" className="w-full h-auto" />
               <img src={artFundImages[1]} alt="V2" className="w-full h-auto" />
            </div>
            <img src={artFundImages[3]} alt="Details" className="w-full h-auto reveal" />
          </div>
        ) : isBanpoIP ? (
          <div className="space-y-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 reveal">
              <div className="lg:col-span-6">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-12 italic tracking-tighter">半坡文化 IP</h3>
                <p className="text-lg text-zinc-300 mb-12">将人面鱼纹等造型与 IP 文创相结合，通过 3D 建模打造茶宠形象。</p>
              </div>
              <div className="lg:col-span-6">
                 <img src={banpoImages[4]} alt="Hero" className="w-full h-auto border border-white/5 shadow-2xl" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
               <img src={banpoImages[0]} alt="Orthographic 1" className="w-full h-auto border border-white/10" />
               <img src={banpoImages[1]} alt="Orthographic 2" className="w-full h-auto border border-white/10" />
            </div>
            <img src={banpoImages[5]} alt="Showcase" className="w-full h-auto reveal border border-white/10" />
          </div>
        ) : isPracticeProject ? (
          <div className="space-y-64">
            <div className="reveal max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-white/40"></span>
                <span className="font-mono text-[10px] uppercase text-white/60 tracking-[0.5em]">参与项目 // COLLABORATIVE_PROJECTS</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase mb-12 italic tracking-tighter">实践项目</h3>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-24">
                深度参与多项国际级数字整合营销与品牌传播项目，利用前沿数字技术升维品牌价值，构建沉浸式数字叙事。
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center reveal">
              <div className="lg:col-span-7">
                <div className="group overflow-hidden border border-white/5 rounded-sm shadow-3xl">
                  <img src={practiceImages[0]} alt="Beijing Wanli" className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-8">
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.6em]">CASE_01 // MARKETING_INTEGRATION</div>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">北京湾里全链路数字整合营销方案</h4>
                <p className="text-zinc-400 leading-relaxed text-justify">
                  项目为全新开业的北京湾里打造全链路数字整合营销方案。以数字技术解构水的三态，通过MR影片、裸眼3D及数字Mapping，将「水」的形态千变万化，升维诠释“湾里”ICON，完美呼应品牌「wonder in life」所蕴含的无限可能与生活奇趣。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center reveal">
              <div className="lg:col-span-5 lg:order-1 order-2 space-y-8">
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.6em]">CASE_02 // LUXURY_BRAND_3D</div>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">Tiffany & Co. 裸眼3D数字内容</h4>
                <p className="text-zinc-400 leading-relaxed text-justify">
                  项目携手签约数字团队Inertia Studio为Tiffany&Co.制作裸眼3D数字内容，并以内嵌形式上线品牌移动端官网页面。在浓厚的的冬日氛围中，满屏的Tiffany蓝与吸睛的巨物礼盒呈现梦幻爱意。礼盒打开，光影流转，如《With love, Since 1837》广告大片一般，在银装素裹的冬日奇境中，带我们开启了一场别开生面的都市浪漫之旅。
                </p>
              </div>
              <div className="lg:col-span-7 lg:order-2 order-1">
                <div className="group overflow-hidden border border-white/5 rounded-sm shadow-3xl">
                  <img src={practiceImages[1]} alt="Tiffany & Co" className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center reveal">
              <div className="lg:col-span-7">
                <div className="group overflow-hidden border border-white/5 rounded-sm shadow-3xl">
                  <img src={practiceImages[2]} alt="Trip.com" className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-8">
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.6em]">CASE_03 // GLOBAL_PARTNERS_SUMMIT</div>
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">携程影片《飞跃“其”遇记》</h4>
                <p className="text-zinc-400 leading-relaxed text-justify">
                  项目为携程在土耳其伊斯坦布尔举办的全球合作伙伴峰会打造影片《飞跃“其”遇记》。以猫猫旅人穿越时空，乘上热气球，以天空为卷，开启全新想象。在历史遗迹间开启专属旅行者的“其”妙冒险。
                </p>
              </div>
            </div>
          </div>
        ) : isAigcDesign ? (
          <div className="space-y-64">
            <div className="reveal max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-white/40"></span>
                <span className="font-mono text-[10px] uppercase text-white/60 tracking-[0.5em]">AIGC // GENERATIVE_ART_EXPLORATION</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase mb-12 italic tracking-tighter">AIGC 设计探索</h3>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-24">
                深度探索人工智能在设计领域的前沿应用，将传统美学逻辑与神经网络生成技术融合，构建全新维度的视觉叙事语言。
              </p>
            </div>

            <div className="space-y-16 reveal">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">1. 训练专门的 Lora 模型加入工作流</h4>
                <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.4em]">SYSTEM_CALIBRATION // NEURAL_FLOW</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group overflow-hidden border border-white/5 rounded-sm bg-zinc-900 aspect-square md:aspect-video flex items-center justify-center">
                  <img src={aigcImages[0]} alt="Lora Training 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="group overflow-hidden border border-white/5 rounded-sm bg-zinc-900 aspect-square md:aspect-video flex items-center justify-center">
                  <img src={aigcImages[1]} alt="Lora Training 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </div>
            </div>

            <div className="space-y-16 reveal">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">2. AIGC 作品展示</h4>
                <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.4em]">OUTPUT_GALLERY // GENERATED_VISUALS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group overflow-hidden border border-white/5 rounded-sm bg-zinc-900 aspect-square md:aspect-video flex items-center justify-center">
                  <img src={aigcImages[2]} alt="AIGC Work 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="group overflow-hidden border border-white/5 rounded-sm bg-zinc-900 aspect-square md:aspect-video flex items-center justify-center">
                  <img src={aigcImages[3]} alt="AIGC Work 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="reveal space-y-24">
            <div className="max-w-4xl">
               <h3 className="text-3xl font-black text-white uppercase mb-8 italic tracking-tighter">Project Overview</h3>
               <p className="text-2xl text-zinc-400 leading-relaxed font-light">{project.description}</p>
            </div>
            <img src={project.thumbnail} alt={project.title} className="w-full h-auto border border-white/10" />
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-60 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <button onClick={() => navigate('/work')} className="flex items-center gap-8 group">
            <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">←</div>
            <div className="text-left font-mono">
              <p className="text-[10px] text-zinc-700 uppercase tracking-widest mb-1">Return_Archive</p>
              <p className="text-xl text-white font-black uppercase italic">Back to Archive</p>
            </div>
          </button>
        </div>
      </section>

      <style>{`
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
};

export default ProjectDetail;