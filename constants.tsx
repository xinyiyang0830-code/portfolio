import { Project, Education, Skill, Exhibition } from './types';

export const PROJECTS: Project[] = [
  // Music Visualization
  {
    id: 'music-1',
    title: 'Promotion and Application of Suzhou Code in Theme Design of Subway Stations',
    chineseTitle: '音画姑苏：苏州码子在地铁站主题设计中的推广应用',
    category: 'Music Visualization',
    type: 'Interactive Installation',
    year: '2024',
    theme: 'Music Visualization',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/276%E6%96%87%E5%AD%97%E5%BB%BA%E7%AD%91.jpg',
    description: '探索将传统苏州码子融入现代城市空间的视觉表达。'
  },
  {
    id: 'music-2',
    title: 'Visual representation of Xiaoshi lantern combined with sound',
    chineseTitle: '流彩：非遗硖石灯彩结合声音的可视化表现',
    category: 'Music Visualization',
    type: 'Digital Art',
    year: '2024',
    theme: 'Music Visualization',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%A1%96%E7%9F%B3%E7%81%AF%E5%BD%A91.jpg',
    description: '通过声音驱动对非物质文化遗产硖石灯彩进行动态视觉转化。'
  },
  {
    id: 'music-3',
    title: 'Visualization of Xian drum music',
    chineseTitle: '鼓乐生花：西安鼓乐可视化',
    category: 'Music Visualization',
    type: 'Generative Design',
    year: '2024',
    theme: 'Music Visualization',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/1.jpg',
    description: '以数字手段诠释地方传统音乐。'
  },
  {
    id: 'music-4',
    title: 'Building immersive scenes with music',
    chineseTitle: '森林：以音乐构建沉浸式场景',
    category: 'Music Visualization',
    type: 'Experience Design',
    year: '2023',
    theme: 'Music Visualization',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/5%E6%A3%AE%E6%9E%972%E7%BB%88.png',
    description: '强调通过音乐营造多感官体验的空间氛围。'
  },
  {
    id: 'music-5',
    title: 'Main visual design and Dynamic Poster for Shaanbei Folk Song Album',
    chineseTitle: '陕北民歌专辑主视觉设计与动态海报',
    category: 'Music Visualization',
    type: 'Branding & Motion',
    year: '2023',
    theme: 'Music Visualization',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/1Simple-Digipack-Mockup-2.jpg',
    description: '结合地域民歌文化进行视觉系统创作。'
  },

  // Virtual Reality
  {
    id: 'vr-1',
    title: 'VR virtual space with the theme of the Taihu Lake Stone',
    chineseTitle: '瑞云之梦——以太湖石为主题的 VR 虚拟空间',
    category: 'Virtual Reality',
    type: 'VR Experience',
    year: '2024',
    theme: 'Virtual Reality',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230719221308.png',
    description: '以中国传统园林中的太湖石为灵感，构建具有文化意蕴的虚拟现实环境。'
  },

  // Motion Video
  {
    id: 'video-1',
    title: '24 Solar Terms: Major Heat Dynamic Poster',
    chineseTitle: '时至晚夏——二十四节气·大暑动态海报',
    category: 'Motion Video',
    type: 'Motion Graphics',
    year: '2024',
    theme: 'Motion Video',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E6%8C%82%E4%BB%B6.jpg',
    description: '作品使用三渲二的渲染技术，将国画与皮影效果与自然景观的变化相结合，创作出具有传统文化韵味又充满现代感的动态海报。'
  },
  {
    id: 'video-2',
    title: 'Hidden Eyes: Cartoon style Animation',
    chineseTitle: '隐藏的眼睛——卡通风格动画',
    category: 'Motion Video',
    type: 'Animation',
    year: '2023',
    theme: 'Motion Video',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/1_0120.png',
    description: '作品围绕“信息茧房”概念展开，通过手机应用程序的拟物化展现，探讨大数据时代下的束缚与自由。'
  },
  {
    id: 'video-3',
    title: 'Double-sided Suzhou: combining virtual and real effects',
    chineseTitle: '双面苏州——虚实结合特效',
    category: 'Motion Video',
    type: 'VFX & Compositing',
    year: '2024',
    theme: 'Motion Video',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/1_0102.png',
    description: '通过数字特效融合苏州的现实景观与虚拟想象，展现“双面苏州”的独特魅力。'
  },
  {
    id: 'video-4',
    title: 'Naked eye 3D',
    chineseTitle: '裸眼3D效果',
    category: 'Motion Video',
    type: '3D Installation',
    year: '2024',
    theme: 'Motion Video',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/QQ%E5%9B%BE%E7%89%8720230209180434.png',
    description: '运用无需佩戴设备的3D技术，打造极具冲击力的裸眼3D视觉效果。'
  },

  // Theme and Image Design
  {
    id: 'design-1',
    title: 'The main visual design of the National Art Fund project',
    chineseTitle: '2024 国家艺术基金项目——主视觉设计与书籍排版',
    category: 'Theme and Image Design',
    type: 'Graphic Design',
    year: '2024',
    theme: 'Theme and Image Design',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E7%AC%AC%E4%B8%80%E7%89%88%E6%A0%B7%E6%9C%BA.jpg',
    description: '参与国家级艺术项目的整体视觉系统构建，包括主视觉与出版物设计。'
  },
  {
    id: 'design-2',
    title: 'Banpo Culture IP Image Design',
    chineseTitle: '半坡文化——IP 形象设计',
    category: 'Theme and Image Design',
    type: 'Character Design',
    year: '2023',
    theme: 'Theme and Image Design',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E6%95%B4%E4%BD%93%E6%8C%82%E4%BB%B6%E5%B1%95%E7%A4%BA.jpg',
    description: '以新石器时代仰韶文化中的半坡遗址为原型，开发具有文化内涵的原创IP形象。'
  },

  // AIGC Design and Practice Project
  {
    id: 'aigc-1',
    title: 'AIGC DESIGN',
    chineseTitle: 'AIGC设计',
    category: 'AIGC Design',
    type: 'Generative AI Art',
    year: '2025',
    theme: 'AIGC Design and Practice Project',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E6%B8%85%E6%99%B0-7.jpg',
    description: '探索人工智能生成内容在现代设计流程中的深度应用。'
  },
  {
    id: 'aigc-2',
    title: 'PRACTICE PROJECT',
    chineseTitle: '实践项目',
    category: 'Design Practice',
    type: 'Practical Design',
    year: '2025',
    theme: 'AIGC Design and Practice Project',
    thumbnail: 'https://raw.githubusercontent.com/xinyiyang0830-code/portfolio-web/main/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260217181212_178_24.png',
    description: '将 AIGC 技术落地于具体的商业或文化实践项目，探索人机协作的无限可能。'
  }
];

export const EDUCATION: Education[] = [
  {
    institution: '西安外国语大学 | Xian International Studies University',
    degree: '数字媒体艺术 | Digital Media Art (Postgraduate)',
    period: '2023.9 至今 (Present)',
    description: '西安外国语大学艺术学院硕士研究生，主要研究方向为数字媒体艺术、VR文化遗产数字化。'
  },
  {
    institution: '南京艺术学院 | Nanjing University of the Arts',
    degree: '数字媒体艺术 | Digital Media Art (Undergraduate)',
    period: '2019.9 – 2023.6',
    description: '本科毕业于南京艺术学院，奠定了数字媒体与交互设计的专业基础。'
  }
];

export const EXHIBITIONS: Exhibition[] = [
  {
    title: '融界：设计师艺术作品展——苏湘设计师联展',
    enTitle: 'Designer Art Exhibition SUZHOU and HUNAN-Designers Joint Exhibition',
    location: '苏州湾数字艺术馆，苏州 | Suzhou Bay Digital Art Museum, Suzhou',
    year: '2024'
  },
  {
    title: '长三角文博会 ECA 国际创意设计大赛展',
    enTitle: 'East Creative Award (ECA) International Creative Design Competition',
    location: '国家会展中心，上海 | National Exhibition and Convention Center, Shanghai',
    year: '2024'
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Research',
    items: ['VR/AR Design', 'Cultural Heritage Digitalization', 'Digital Media Arts', 'Interactive Systems']
  },
  {
    category: 'Software',
    items: ['Unity 3D', 'Unreal Engine', 'Cinema 4D', 'Adobe Creative Suite']
  },
  {
    category: 'Others',
    items: ['National Art Fund Participant', 'Hunan Packaging Federation Member']
  }
];