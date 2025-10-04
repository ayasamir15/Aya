
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data } = usePortfolio();
  const project = data.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Link to="/portfolio" className="text-primary hover:underline mt-4 inline-block">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-base py-16 animate-fadeIn">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{project.title}</h1>
          <p className="text-lg text-text-muted mt-4 max-w-3xl mx-auto">{project.description}</p>
        </header>

        {project.videoUrl && (
          <div className="mb-12 aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-2xl"
              src={project.videoUrl}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="max-w-4xl mx-auto bg-bg-alt p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">About The Project</h2>
          <div className="prose prose-invert max-w-none text-text-muted leading-relaxed">
            {project.detailedDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {project.additionalMedia.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.additionalMedia.map((media, index) => (
                <img key={index} src={media} alt={`Gallery image ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
