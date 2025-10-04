
import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { Link } from 'react-router-dom';
import Editable from '../components/Editable';

const ProjectCard: React.FC<{ project: import('../types').Project }> = ({ project }) => (
    <Link to={`/portfolio/${project.id}`} className="block group bg-bg-alt rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <img src={project.featuredImage} alt={project.title} className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity" />
        <div className="p-4">
            <h3 className="text-lg font-bold text-text-base group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-sm text-text-muted mt-1">{project.description}</p>
        </div>
    </Link>
);


const HomePage: React.FC = () => {
    const { data, updateUserInfo } = usePortfolio();
    const { userInfo, projects, themeSettings } = data;
    const featuredProjects = projects.slice(0, 3);

    const HeroContent = () => (
        <>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-slideInUp">
                <Editable initialValue={userInfo.name} onSave={(val) => updateUserInfo({name: val})}>
                    {(val) => <span className="text-primary">{val.split(' ')[0]}</span>}
                </Editable>
                <Editable initialValue={userInfo.name} onSave={(val) => updateUserInfo({name: val})}>
                    {(val) => <span> {val.substring(val.indexOf(' ') + 1)}</span>}
                </Editable>
            </h1>
            <div className="max-w-2xl text-lg md:text-xl text-text-muted animate-slideInUp" style={{animationDelay: '0.2s'}}>
              <Editable as="textarea" initialValue={userInfo.headline} onSave={(val) => updateUserInfo({headline: val})}>
                {(val) => <p>{val}</p>}
              </Editable>
            </div>
            <div className="mt-8 animate-slideInUp" style={{animationDelay: '0.4s'}}>
                <Link to="/portfolio" className="bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-focus transition-transform hover:scale-105 inline-block">
                    View My Work
                </Link>
            </div>
        </>
    );

    const renderModernTheme = () => (
        <div>
            <section className="min-h-[60vh] flex items-center bg-bg-base">
                <div className="container mx-auto px-6 text-center">
                    <HeroContent />
                </div>
            </section>
            <section className="py-20 bg-bg-alt">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                    </div>
                </div>
            </section>
        </div>
    );
    
    const renderArtisticTheme = () => (
       <div>
         <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-0"></div>
             <div className="container mx-auto px-6 text-center z-10">
                 <HeroContent />
             </div>
         </section>
         <section className="py-24 bg-bg-base">
             <div className="container mx-auto px-6">
                 <h2 className="text-4xl font-bold text-center mb-16 text-primary tracking-wider">My Creations</h2>
                 <div className="grid md:grid-cols-3 gap-10">
                    {featuredProjects.map((p, i) => (
                        <div key={p.id} className="animate-slideInUp" style={{ animationDelay: `${i * 0.15}s` }}>
                            <ProjectCard project={p}/>
                        </div>
                    ))}
                 </div>
             </div>
         </section>
       </div>
    );

    const renderProfessionalTheme = () => (
        <div>
            <section className="py-24 bg-bg-base">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-3/5 text-center md:text-left">
                        <HeroContent/>
                    </div>
                    <div className="md:w-2/5">
                        <img src="https://picsum.photos/seed/avatar/600/600" alt="Avatar" className="rounded-full shadow-2xl mx-auto w-64 h-64 md:w-80 md:h-80 object-cover" />
                    </div>
                </div>
            </section>
            <section className="py-20 bg-bg-alt">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                    </div>
                </div>
            </section>
        </div>
    );
    
    switch(themeSettings.theme) {
        case 'artistic': return renderArtisticTheme();
        case 'professional': return renderProfessionalTheme();
        case 'modern':
        default:
            return renderModernTheme();
    }
};

export default HomePage;
