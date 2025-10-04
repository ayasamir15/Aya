
import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Link to={`/portfolio/${project.id}`} className="block group bg-bg-alt rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn">
    <div className="relative">
      <img src={project.featuredImage} alt={project.title} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span className="text-white font-bold border-2 border-white px-4 py-2 rounded">View Project</span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-text-base group-hover:text-primary transition-colors">{project.title}</h3>
      <p className="text-sm text-text-muted mt-2">{project.description}</p>
    </div>
  </Link>
);


const PortfolioPage: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <div className="bg-bg-base min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <header className="text-center mb-16 animate-slideInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">My Portfolio</h1>
          <p className="text-lg text-text-muted mt-4 max-w-2xl mx-auto">A collection of my work, showcasing my skills in design and development.</p>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div key={project.id} style={{ animationDelay: `${index * 100}ms`}}>
                <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
