
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { PortfolioData, Theme, ColorPalette, Project, UserInfo, SocialLinks } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../constants';

interface PortfolioContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  updateTheme: (theme: Theme) => void;
  updatePalette: (palette: ColorPalette) => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useLocalStorage<PortfolioData>('portfolioData', INITIAL_PORTFOLIO_DATA);

  const updateTheme = (theme: Theme) => {
    setData(prev => ({ ...prev, themeSettings: { ...prev.themeSettings, theme } }));
  };

  const updatePalette = (palette: ColorPalette) => {
    setData(prev => ({ ...prev, themeSettings: { ...prev.themeSettings, palette } }));
  };

  const updateUserInfo = (info: Partial<UserInfo>) => {
    setData(prev => ({ ...prev, userInfo: { ...prev.userInfo, ...info } }));
  };

  const updateSocialLinks = (links: Partial<SocialLinks>) => {
    setData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, ...links } }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = { ...project, id: `proj-${new Date().getTime()}` };
    setData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const updateProject = (updatedProject: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updatedProject.id ? updatedProject : p),
    }));
  };

  const deleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
        setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    }
  };

  const reorderProjects = (projects: Project[]) => {
      setData(prev => ({...prev, projects}));
  }

  return (
    <PortfolioContext.Provider value={{ data, setData, updateTheme, updatePalette, updateUserInfo, updateSocialLinks, addProject, updateProject, deleteProject, reorderProjects }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
