import { useState } from 'react';
import { Menu, X, Lightbulb, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ darkMode, toggleDarkMode, currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Navigate to the page
    onNavigate(page);
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} shadow-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <Lightbulb className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">StratifyAi</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
              className={`transition-colors ${currentPage === 'home' ? 'text-blue-500' : 'hover:text-blue-500'}`}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation('ai-adviser'); }}
              className={`transition-colors ${currentPage === 'ai-adviser' ? 'text-blue-500' : 'hover:text-blue-500'}`}
            >
              AI Adviser
            </a>
            <a 
              href="#enterprise" 
              onClick={() => {
                if (currentPage !== 'home') {
                  handleNavigation('home');
                  setTimeout(() => {
                    document.getElementById('enterprise')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('enterprise')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-blue-500 transition-colors"
            >
              Enterprise AI
            </a>
            <a 
              href="#usecases" 
              onClick={() => {
                if (currentPage !== 'home') {
                  handleNavigation('home');
                  setTimeout(() => {
                    document.getElementById('usecases')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('usecases')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-blue-500 transition-colors"
            >
              Use Cases
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onNavigate('login')}
              className={`px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                  : 'border-gray-300 text-slate-700 hover:bg-gray-50'
              } transition-colors`}
            >
              Login
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-50'} border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
        >
          <div className="px-4 py-4 space-y-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}
              className={`block py-2 transition-colors ${currentPage === 'home' ? 'text-blue-500' : 'hover:text-blue-500'}`}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleNavigation('ai-adviser'); }}
              className={`block py-2 transition-colors ${currentPage === 'ai-adviser' ? 'text-blue-500' : 'hover:text-blue-500'}`}
            >
              AI Adviser
            </a>
            <a 
              href="#enterprise" 
              onClick={() => {
                if (currentPage !== 'home') {
                  handleNavigation('home');
                  setTimeout(() => {
                    document.getElementById('enterprise')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('enterprise')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }
              }}
              className="block py-2 hover:text-blue-500 transition-colors"
            >
              Enterprise AI
            </a>
            <a 
              href="#usecases" 
              onClick={() => {
                if (currentPage !== 'home') {
                  handleNavigation('home');
                  setTimeout(() => {
                    document.getElementById('usecases')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('usecases')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }
              }}
              className="block py-2 hover:text-blue-500 transition-colors"
            >
              Use Cases
            </a>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <button
                onClick={() => onNavigate('login')}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                    : 'border-gray-300 text-slate-700 hover:bg-gray-50'
                } transition-colors`}
              >
                Login
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
