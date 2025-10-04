
import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import Editable from '../components/Editable';

const AboutPage: React.FC = () => {
    const { data, updateUserInfo } = usePortfolio();
    const { userInfo } = data;

    return (
        <div className="bg-bg-base py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="w-full lg:w-1/3 animate-slideInUp">
                        <img 
                            src="https://picsum.photos/seed/about-avatar/600/600" 
                            alt={userInfo.name}
                            className="rounded-full shadow-2xl mx-auto w-64 h-64 lg:w-full lg:h-auto object-cover"
                        />
                    </div>
                    <div className="w-full lg:w-2/3 text-center lg:text-left animate-slideInUp" style={{animationDelay: '0.2s'}}>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Me</h1>
                        <div className="text-lg text-text-muted leading-relaxed space-y-4">
                            <Editable as="textarea" initialValue={userInfo.about} onSave={val => updateUserInfo({ about: val })}>
                                {val => val.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                            </Editable>
                        </div>
                        {userInfo.resumeUrl && (
                            <a 
                                href={userInfo.resumeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-8 bg-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-primary-focus transition-transform hover:scale-105 inline-block"
                            >
                                View My Resume
                            </a>
                        )}
                    </div>
                </div>

                <div className="mt-20 text-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
                    <h2 className="text-3xl font-bold mb-8">My Skills</h2>
                    <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
                        {userInfo.skills.map((skill, index) => (
                            <span key={index} className="bg-bg-alt text-text-base px-4 py-2 rounded-full font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
