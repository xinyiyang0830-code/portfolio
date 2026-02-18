
export interface Project {
  id: string;
  title: string;
  chineseTitle?: string;
  category: string;
  type: string;
  year: string;
  thumbnail: string;
  description: string;
  featured?: boolean;
  theme: 'Music Visualization' | 'Virtual Reality' | 'Motion Video' | 'Theme and Image Design' | 'AIGC Design and Practice Project';
}

export type FilterType = 'all' | 'theme' | 'medium' | 'timeline';

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Exhibition {
  title: string;
  enTitle: string;
  location: string;
  year: string;
}

export interface Skill {
  category: string;
  items: string[];
}
