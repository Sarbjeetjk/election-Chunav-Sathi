import React, { createContext, useState, useEffect, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'en';
    setTheme(savedTheme);
    setLanguage(savedLang);
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      return newTheme;
    });
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const toggleAssistant = () => setIsAssistantOpen(!isAssistantOpen);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, changeLanguage, isAssistantOpen, setIsAssistantOpen, toggleAssistant }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
