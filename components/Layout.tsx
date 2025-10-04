
import React, { ReactNode, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';
import { PALETTES } from '../constants';
import { HomeIcon, BriefcaseIcon, UserIcon, MailIcon, GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from './icons/IconComponents';

interface LayoutProps {
  children: ReactNode;
}

const NavItem: React.FC<{ to: string, children: ReactNode }> = ({ to, children }) => (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/10'}`}>
        {children}
    </NavLink>
);

const SocialIcon: React.FC<{ href?: string, children: ReactNode }> = ({ href, children }) => {
    if (!href) return null;
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">{children}</a>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { data } = usePortfolio();
    const { theme, palette } = data.themeSettings;
    const { socialLinks } = data;

    useEffect(() => {
        const root = document.documentElement;
        const currentPalette = PALETTES.find(p => p.id === palette);
        if (currentPalette) {
            Object.entries(currentPalette.colors).forEach(([key, value]) => {
                root.style.setProperty(key, value);
            });
        }
        
        // Add theme-specific body classes for global styles like backgrounds
        document.body.className = ''; // Clear previous classes
        document.body.style.backgroundColor = 'var(--color-bg-base)';
        document.body.style.color = 'var(--color-text-base)';
        if (theme === 'artistic') {
           document.body.classList.add('artistic-bg');
        }

    }, [palette, theme]);
    
    const navItems = [
        { to: "/", icon: <HomeIcon/>, label: "Home" },
        { to: "/portfolio", icon: <BriefcaseIcon/>, label: "Portfolio" },
        { to: "/about", icon: <UserIcon/>, label: "About" },
        { to: "/contact", icon: <MailIcon/>, label: "Contact" },
    ];
    
    // Header and Footer styling based on theme
    const headerClasses = {
        modern: 'bg-bg-alt/80 backdrop-blur-sm sticky top-0 z-30 border-b border-border',
        artistic: 'bg-transparent absolute top-0 left-0 right-0 z-30',
        professional: 'bg-bg-base shadow-md sticky top-0 z-30',
    }[theme];

    const navContainerClasses = {
        modern: 'container mx-auto flex justify-between items-center p-4',
        artistic: 'container mx-auto flex justify-between items-center p-6 text-white',
        professional: 'container mx-auto flex justify-between items-center px-6 py-3',
    }[theme];

    const footerClasses = {
        modern: 'bg-bg-alt border-t border-border',
        artistic: 'bg-bg-alt',
        professional: 'bg-bg-alt',
    }[theme];

    return (
        <div className={`min-h-screen flex flex-col font-sans theme-${theme}`}>
           <style>{`
             :root {
                --color-primary: #8b5cf6; --color-primary-focus: #7c3aed; --color-secondary: #d8b4fe;
                --color-text-base: #f3f4f6; --color-text-muted: #9ca3af;
                --color-bg-base: #1f2937; --color-bg-alt: #374151; --color-border: #4b5563;
             }
             .bg-primary { background-color: var(--color-primary); }
             .hover\\:bg-primary-focus:hover { background-color: var(--color-primary-focus); }
             .bg-primary\\/10 { background-color: var(--color-primary); opacity: 0.1; }
             .hover\\:bg-primary\\/10:hover { background-color: var(--color-primary); opacity: 0.1; }
             .hover\\:bg-primary\\/20:hover { background-color: var(--color-primary); opacity: 0.2; }
             .text-primary { color: var(--color-primary); }
             .border-primary { border-color: var(--color-primary); }
             .border-border { border-color: var(--color-border); }
             .bg-bg-base { background-color: var(--color-bg-base); }
             .bg-bg-alt { background-color: var(--color-bg-alt); }
             .text-text-base { color: var(--color-text-base); }
             .text-text-muted { color: var(--color-text-muted); }
             .ring-primary { ring-color: var(--color-primary); }
             .theme-artistic.artistic-bg { 
                background: linear-gradient(135deg, var(--color-bg-alt), var(--color-bg-base));
             }
           `}</style>
            <header className={headerClasses}>
                <nav className={navContainerClasses}>
                    <NavLink to="/" className="text-2xl font-bold text-primary">
                        {data.userInfo.name.split(' ')[0]}
                    </NavLink>
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map(item => <NavItem key={item.to} to={item.to}>{item.icon}<span>{item.label}</span></NavItem>)}
                    </div>
                    {/* Mobile nav could be added here */}
                </nav>
            </header>
            
            <main className="flex-grow">
                {children}
            </main>

            <footer className={footerClasses}>
                <div className="container mx-auto px-6 py-8 text-center text-text-muted">
                    <div className="flex justify-center space-x-6 mb-4">
                        <SocialIcon href={socialLinks.github}><GithubIcon /></SocialIcon>
                        <SocialIcon href={socialLinks.linkedin}><LinkedinIcon /></SocialIcon>
                        <SocialIcon href={socialLinks.twitter}><TwitterIcon /></SocialIcon>
                        <SocialIcon href={socialLinks.dribbble}><DribbbleIcon /></SocialIcon>
                    </div>
                    <p>&copy; {new Date().getFullYear()} {data.userInfo.name}. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
