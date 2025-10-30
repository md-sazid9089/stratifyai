import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import StartupTips from './components/StartupTips';
import TopTools from './components/TopTools';
import StartupOfWeek from './components/StartupOfWeek';
import EnterpriseAI from './components/EnterpriseAI';
import UseCases from './components/UseCases';
import AIChatbot from './components/AIChatbot';
import AIAdviser from './components/AIAdviser';
import FloatingCursor from './components/FloatingCursor';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigateToAI = () => {
    setCurrentPage('ai-adviser');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-white'} transition-colors duration-300`}>
      <FloatingCursor />
      <Toaster position="top-right" />
      
      {currentPage !== 'signup' && currentPage !== 'login' && (
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      )}

      <main>
        {currentPage === 'home' && (
          <section id="home">
            <HeroSection 
              darkMode={darkMode} 
              onNavigateToAI={navigateToAI}
              onNavigate={setCurrentPage}
            />
            <StartupTips darkMode={darkMode} />
            <StartupOfWeek darkMode={darkMode} />
            <TopTools darkMode={darkMode} />
          </section>
        )}

        {currentPage === 'ai-adviser' && (
          <AIAdviser darkMode={darkMode} />
        )}

        {currentPage === 'signup' && (
          <SignUp darkMode={darkMode} onNavigate={setCurrentPage} />
        )}

        {currentPage === 'login' && (
          <Login darkMode={darkMode} onNavigate={setCurrentPage} />
        )}

        {currentPage === 'home' && (
          <>
            <EnterpriseAI darkMode={darkMode} />
            <UseCases darkMode={darkMode} />
          </>
        )}
      </main>

      {currentPage !== 'signup' && currentPage !== 'login' && <Footer darkMode={darkMode} />}
      {currentPage !== 'signup' && currentPage !== 'login' && <AIChatbot darkMode={darkMode} />}
    </div>
  );
}

export default App;
