
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import ProjectForm from './ProjectForm';
import type { Project, UserInfo, SocialLinks } from '../types';
import { THEMES, PALETTES } from '../constants';
import { SettingsIcon, LogoutIcon, ChevronUpIcon, PlusIcon, EditIcon, TrashIcon, ChevronDownIcon } from './icons/IconComponents';

const AdminPanel: React.FC = () => {
  const { logout } = useAuth();
  const { data, updateTheme, updatePalette, updateUserInfo, updateSocialLinks, deleteProject, reorderProjects } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const handleUserInfoChange = (field: keyof UserInfo, value: string | string[]) => {
    updateUserInfo({ [field]: value });
  };
  
  const handleSocialLinkChange = (field: keyof SocialLinks, value: string) => {
    updateSocialLinks({ [field]: value });
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
      const newProjects = [...data.projects];
      const project = newProjects[index];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;

      if (swapIndex < 0 || swapIndex >= newProjects.length) return;
      
      newProjects[index] = newProjects[swapIndex];
      newProjects[swapIndex] = project;
      reorderProjects(newProjects);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-focus transition-transform hover:scale-110 z-40"
        aria-label="Open Admin Panel"
      >
        <SettingsIcon />
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-alt text-text-base shadow-2xl z-50 overflow-y-auto animate-fadeIn">
        <div className="p-6 flex justify-between items-center border-b border-border">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
          <button onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20">
            <LogoutIcon /> Logout
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Customization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border pb-2">Theme & Design</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Website Theme</label>
              <select value={data.themeSettings.theme} onChange={(e) => updateTheme(e.target.value as any)} className="w-full p-2 bg-bg-base border border-border rounded-md">
                {THEMES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color Palette</label>
              <div className="flex gap-2">
                {PALETTES.map(p => (
                  <button key={p.id} onClick={() => updatePalette(p.id)} className={`flex-1 p-2 rounded-md text-sm border-2 ${data.themeSettings.palette === p.id ? 'border-primary' : 'border-transparent'}`} style={{ backgroundColor: p.colors['--color-bg-base'], color: p.colors['--color-text-base'] }}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border pb-2">Personal Info</h3>
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input type="text" value={data.userInfo.name} onChange={(e) => handleUserInfoChange('name', e.target.value)} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
            </div>
            <div>
                <label className="block text-sm font-medium">Headline</label>
                <input type="text" value={data.userInfo.headline} onChange={(e) => handleUserInfoChange('headline', e.target.value)} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
            </div>
             <div>
                <label className="block text-sm font-medium">About Me</label>
                <textarea value={data.userInfo.about} onChange={(e) => handleUserInfoChange('about', e.target.value)} rows={5} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
            </div>
            <div>
                <label className="block text-sm font-medium">Skills (comma-separated)</label>
                <input type="text" value={data.userInfo.skills.join(', ')} onChange={(e) => handleUserInfoChange('skills', e.target.value.split(',').map(s => s.trim()))} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Contact & Socials</h3>
              <div>
                  <label className="block text-sm font-medium">Contact Email</label>
                  <input type="email" value={data.userInfo.contactEmail} onChange={(e) => handleUserInfoChange('contactEmail', e.target.value)} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
              </div>
              <div>
                  <label className="block text-sm font-medium">Resume URL</label>
                  <input type="text" value={data.userInfo.resumeUrl} onChange={(e) => handleUserInfoChange('resumeUrl', e.target.value)} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
              </div>
              <div>
                  <label className="block text-sm font-medium">GitHub URL</label>
                  <input type="text" value={data.socialLinks.github} onChange={(e) => handleSocialLinkChange('github', e.target.value)} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
              </div>
              <div>
                  <label className="block text-sm font-medium">LinkedIn URL</label>
                  <input type="text" value={data.socialLinks.linkedin} onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)} className="w-full p-2 bg-bg-base border border-border rounded-md mt-1" />
              </div>
          </div>


          {/* Project Management */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h3 className="text-lg font-semibold">Projects</h3>
              <button onClick={() => setIsAddingProject(true)} className="flex items-center gap-2 px-3 py-2 text-sm bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                <PlusIcon /> Add Project
              </button>
            </div>
            <ul className="space-y-2">
              {data.projects.map((p, index) => (
                <li key={p.id} className="flex items-center justify-between p-2 bg-bg-base rounded-md">
                  <span className="truncate flex-1">{p.title}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleMoveProject(index, 'up')} disabled={index === 0} className="p-1 disabled:opacity-30"><ChevronUpIcon/></button>
                    <button onClick={() => handleMoveProject(index, 'down')} disabled={index === data.projects.length - 1} className="p-1 disabled:opacity-30"><ChevronDownIcon/></button>
                    <button onClick={() => setEditingProject(p)} className="p-1 text-blue-400 hover:text-blue-300"><EditIcon /></button>
                    <button onClick={() => deleteProject(p.id)} className="p-1 text-red-400 hover:text-red-300"><TrashIcon /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {(isAddingProject || editingProject) && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setIsAddingProject(false);
            setEditingProject(null);
          }}
        />
      )}
    </>
  );
};

export default AdminPanel;
