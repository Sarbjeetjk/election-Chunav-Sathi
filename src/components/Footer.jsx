import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { language } = useAppContext();

  return (
    <footer className="glass-panel border-b-0 border-x-0 rounded-none py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-xl tracking-tight">
              <span className="text-saffron">Chunav</span>{' '}
              <span className="text-green">Saathi</span>
            </span>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Empowering Indian Citizens for a Stronger Democracy.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end text-sm text-[var(--text-secondary)]">
            <p className="flex items-center gap-1">
              Made by Sarbjeet with <Heart size={14} className="text-red-500 fill-current" /> for India
            </p>
            <p className="mt-1">&copy; {new Date().getFullYear()} Chunav Saathi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
