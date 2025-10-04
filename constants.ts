
import type { PortfolioData, ThemeSettings, Theme, ColorPalette } from './types';

export const ADMIN_PASSWORD = 'password123'; // In a real app, this would be handled securely on a backend.

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  userInfo: {
    name: 'Alex Doe',
    headline: 'Creative Frontend Developer & UI/UX Designer',
    about: 'I am a passionate developer with a knack for creating beautiful and functional user interfaces. With over 5 years of experience, I specialize in React, TypeScript, and crafting pixel-perfect designs that bring ideas to life. I thrive in collaborative environments and am always eager to learn new technologies. When I\'m not coding, you can find me exploring new hiking trails or experimenting with new recipes in the kitchen.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Figma', 'UI/UX Design', 'Web Accessibility'],
    contactEmail: 'hello@alexdoe.com',
    resumeUrl: '#',
  },
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    dribbble: 'https://dribbble.com'
  },
  projects: [
    {
      id: 'proj-1',
      title: 'E-commerce Platform Redesign',
      description: 'A complete overhaul of a client\'s online store, focusing on user experience and conversion rates.',
      featuredImage: 'https://picsum.photos/seed/proj1/800/600',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      detailedDescription: 'This project involved a ground-up redesign of the user interface and experience for a major e-commerce client. We conducted extensive user research to identify pain points and opportunities for improvement. The new design features a streamlined checkout process, improved product discovery, and a fully responsive layout for mobile and desktop devices. The tech stack included React, Redux for state management, and a headless CMS for content.',
      additionalMedia: ['https://picsum.photos/seed/proj1-add1/1200/800', 'https://picsum.photos/seed/proj1-add2/1200/800'],
    },
    {
      id: 'proj-2',
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing complex financial data, built with D3.js and React.',
      featuredImage: 'https://picsum.photos/seed/proj2/800/600',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      detailedDescription: 'The goal of this project was to create an intuitive and powerful tool for financial analysts. The dashboard allows users to explore large datasets through interactive charts, graphs, and maps. I was responsible for the frontend architecture and implementation, using D3.js for custom visualizations and React for the component-based UI. Performance and real-time data updates were key challenges we successfully addressed.',
      additionalMedia: ['https://picsum.photos/seed/proj2-add1/1200/800'],
    },
    {
      id: 'proj-3',
      title: 'Mobile Banking App',
      description: 'A sleek and secure mobile app for a new challenger bank, designed for simplicity and ease of use.',
      featuredImage: 'https://picsum.photos/seed/proj3/800/600',
      videoUrl: '',
      detailedDescription: 'This mobile app, built with React Native, provides users with a seamless banking experience. Features include instant payments, budget tracking, and biometric security. My role was to lead the UI development, ensuring the app adhered to the highest standards of design and accessibility. We worked in an agile team, iterating quickly based on user feedback to deliver a product that users love.',
      additionalMedia: [],
    },
  ],
  themeSettings: {
    theme: 'modern',
    palette: 'rose',
  },
};

export const THEMES: { id: Theme; name: string }[] = [
  { id: 'modern', name: 'Modern & Minimalist' },
  { id: 'artistic', name: 'Dynamic & Artistic' },
  { id: 'professional', name: 'Clean & Professional' },
];

export const PALETTES: { id: ColorPalette; name: string; colors: Record<string, string> }[] = [
  {
    id: 'violet',
    name: 'Violet Dream',
    colors: {
      '--color-primary': '#6d28d9',
      '--color-primary-focus': '#5b21b6',
      '--color-secondary': '#c084fc',
      '--color-text-base': '#e5e7eb',
      '--color-text-muted': '#9ca3af',
      '--color-bg-base': '#111827',
      '--color-bg-alt': '#1f2937',
      '--color-border': '#374151',
    },
  },
  {
    id: 'ocean',
    name: 'Oceanic Blue',
    colors: {
      '--color-primary': '#2563eb',
      '--color-primary-focus': '#1d4ed8',
      '--color-secondary': '#38bdf8',
      '--color-text-base': '#1e293b',
      '--color-text-muted': '#475569',
      '--color-bg-base': '#f8fafc',
      '--color-bg-alt': '#f1f5f9',
      '--color-border': '#e2e8f0',
    },
  },
  {
    id: 'rose',
    name: 'Rosé Pink',
    colors: {
      '--color-primary': '#db2777',
      '--color-primary-focus': '#be185d',
      '--color-secondary': '#f472b6',
      '--color-text-base': '#1f2937',
      '--color-text-muted': '#4b5563',
      '--color-bg-base': '#fff1f2',
      '--color-bg-alt': '#ffe4e6',
      '--color-border': '#fecdd3',
    },
  },
];
