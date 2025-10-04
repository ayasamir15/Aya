
import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import { usePortfolio } from '../contexts/PortfolioContext';
import { XIcon } from './icons/IconComponents';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const { addProject, updateProject } = usePortfolio();
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    featuredImage: '',
    videoUrl: '',
    detailedDescription: '',
    additionalMedia: [],
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'featuredImage' | 'additionalMedia') => {
    if (e.target.files) {
      if (field === 'featuredImage') {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData(prev => ({ ...prev, featuredImage: reader.result as string }));
          };
          reader.readAsDataURL(file);
        }
      } else {
        const files = Array.from(e.target.files);
        const promises = files.map(file => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        });
        Promise.all(promises).then(base64Strings => {
          setFormData(prev => ({ ...prev, additionalMedia: [...prev.additionalMedia, ...base64Strings] }));
        });
      }
    }
  };
  
  const removeAdditionalMedia = (index: number) => {
    setFormData(prev => ({
        ...prev,
        additionalMedia: prev.additionalMedia.filter((_, i) => i !== index)
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      updateProject({ ...formData, id: project.id });
    } else {
      addProject(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-bg-alt text-text-base rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sticky top-0 bg-bg-alt z-10 border-b border-border flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary">{project ? 'Edit Project' : 'Add New Project'}</h2>
            <button onClick={onClose} className="text-text-muted hover:text-text-base transition-colors"><XIcon /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-bg-base border border-border rounded-md p-2 focus:ring-primary focus:border-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-bg-base border border-border rounded-md p-2 focus:ring-primary focus:border-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Featured Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'featuredImage')} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            {formData.featuredImage && <img src={formData.featuredImage} alt="Featured" className="mt-2 rounded-md max-h-40" />}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">YouTube/Vimeo Embed URL</label>
            <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="e.g. https://www.youtube.com/embed/VIDEO_ID" className="w-full bg-bg-base border border-border rounded-md p-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Detailed Description</label>
            <textarea name="detailedDescription" value={formData.detailedDescription} rows={6} onChange={handleChange} className="w-full bg-bg-base border border-border rounded-md p-2 focus:ring-primary focus:border-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Additional Media (Images/GIFs)</label>
            <input type="file" multiple accept="image/*,image/gif" onChange={(e) => handleFileChange(e, 'additionalMedia')} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
             <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {formData.additionalMedia.map((media, index) => (
                    <div key={index} className="relative group">
                        <img src={media} alt={`Additional media ${index + 1}`} className="rounded-md object-cover h-24 w-full" />
                        <button type="button" onClick={() => removeAdditionalMedia(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <XIcon />
                        </button>
                    </div>
                ))}
             </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 mr-2 border border-border rounded-md hover:bg-bg-base transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-focus transition-colors">{project ? 'Save Changes' : 'Create Project'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
