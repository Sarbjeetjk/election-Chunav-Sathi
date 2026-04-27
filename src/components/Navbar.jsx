import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { Sun, Moon, Globe, Menu, X, Vote, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, language, changeLanguage, setIsAssistantOpen } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'home' },
    { path: '/services', label: 'voter_services' },
    { path: '/constituency', label: 'constituency' },
    { path: '/timeline', label: 'timeline' },
    { path: '/candidates', label: 'candidates' },
    { path: '/evm-demo', label: 'evm_demo' },
    { path: '/quiz', label: 'quiz' },
    { path: '/assistant', label: 'assistant' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
  ];

  return (
    <nav className="fixed w-full top-0 z-40 glass-panel border-t-0 rounded-none border-x-0" style={{ marginTop: '4px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Vote className="text-saffron h-8 w-8" />
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                <span className="text-saffron">Chunav</span>{' '}
                <span className="text-green">Saathi</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path
                    ? 'text-saffron'
                    : 'hover:text-saffron'
                  }`}
                style={location.pathname === link.path ? { backgroundColor: 'rgba(255, 153, 51, 0.1)' } : {}}
              >
                {getTranslation(language, link.label)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <button
                className="btn-icon flex items-center gap-1.5"
                onClick={() => setIsLangOpen(!isLangOpen)}
                style={{ borderRadius: '20px', padding: '0.4rem 0.75rem', backgroundColor: 'rgba(255, 153, 51, 0.15)', color: 'var(--saffron)', borderColor: 'rgba(255, 153, 51, 0.3)' }}
              >
                <Globe size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">{language}</span>
              </button>
              <div className={`absolute right-0 mt-2 w-40 glass-panel shadow-lg rounded-md overflow-hidden ${isLangOpen ? 'block' : 'hidden group-hover:block'}`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'text-saffron' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    style={language === lang.code ? { backgroundColor: 'rgba(255, 153, 51, 0.1)' } : {}}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsAssistantOpen(true)}
              className="btn-icon"
              style={{ backgroundColor: 'rgba(255, 153, 51, 0.15)', color: 'var(--saffron)', borderColor: 'rgba(255, 153, 51, 0.3)' }}
            >
              <MessageCircle size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="btn-icon"
              style={{ backgroundColor: 'rgba(19, 136, 8, 0.15)', color: 'var(--green)', borderColor: 'rgba(19, 136, 8, 0.3)' }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              className="md:hidden btn-icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel border-x-0 border-b-0 rounded-none pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                    ? 'text-saffron'
                    : 'hover:text-saffron'
                  }`}
                style={location.pathname === link.path ? { backgroundColor: 'rgba(255, 153, 51, 0.1)' } : {}}
              >
                {getTranslation(language, link.label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
