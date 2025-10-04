
import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { MailIcon, GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from '../components/icons/IconComponents';

const SocialLink: React.FC<{ href?: string; icon: React.ReactNode; label: string; }> = ({ href, icon, label }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-bg-alt rounded-lg hover:bg-primary/10 hover:text-primary transition-all group">
      <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
      <span className="font-semibold">{label}</span>
    </a>
  );
};

const ContactPage: React.FC = () => {
    const { data } = usePortfolio();
    const { userInfo, socialLinks } = data;

    return (
        <div className="bg-bg-base py-20 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 animate-slideInUp">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">Get In Touch</h1>
                    <p className="text-lg text-text-muted mt-4 max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
                    </p>
                </header>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 animate-slideInUp" style={{animationDelay: '0.2s'}}>
                    <div className="bg-bg-alt p-8 rounded-lg shadow-xl text-center">
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <MailIcon />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Email Me</h2>
                        <p className="text-text-muted mb-4">The best way to reach me.</p>
                        <a href={`mailto:${userInfo.contactEmail}`} className="font-semibold text-primary break-all">
                            {userInfo.contactEmail}
                        </a>
                    </div>

                    <div className="bg-bg-alt p-8 rounded-lg shadow-xl text-center">
                         <h2 className="text-2xl font-bold mb-4">Find Me Online</h2>
                         <div className="space-y-4">
                             <SocialLink href={socialLinks.github} icon={<GithubIcon />} label="GitHub" />
                             <SocialLink href={socialLinks.linkedin} icon={<LinkedinIcon />} label="LinkedIn" />
                             <SocialLink href={socialLinks.twitter} icon={<TwitterIcon />} label="Twitter" />
                             <SocialLink href={socialLinks.dribbble} icon={<DribbbleIcon />} label="Dribbble" />
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
