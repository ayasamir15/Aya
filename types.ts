
export interface Project {
  id: string;
  title: string;
  description: string;
  featuredImage: string; // base64 string
  videoUrl?: string;
  detailedDescription: string;
  additionalMedia: string[]; // array of base64 strings
}

export interface UserInfo {
  name: string;
  headline: string;
  about: string;
  skills: string[];
  contactEmail: string;
  resumeUrl?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  dribbble?: string;
}

export type Theme = 'modern' | 'artistic' | 'professional';
export type ColorPalette = 'violet' | 'ocean' | 'rose';

export interface ThemeSettings {
  theme: Theme;
  palette: ColorPalette;
}

export interface PortfolioData {
  userInfo: UserInfo;
  socialLinks: SocialLinks;
  projects: Project[];
  themeSettings: ThemeSettings;
}
