
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PortfolioProvider, usePortfolio } from './contexts/PortfolioContext';

import Layout from './components/Layout';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const AppContent: React.FC = () => {
    const { isLoggedIn } = useAuth();
    
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/portfolio" element={<PortfolioPage />} />
                            <Route path="/portfolio/:projectId" element={<ProjectDetailPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Layout>
                } />
            </Routes>
            {isLoggedIn && <AdminPanel />}
        </>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
        <PortfolioProvider>
          <HashRouter>
            <AppContent />
          </HashRouter>
        </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;
