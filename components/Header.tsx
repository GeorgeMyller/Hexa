import React from 'react';
import { Hexagon, Terminal, ShieldCheck, Globe, Key, Clock } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogoClick: () => void;
  onOpenSettings: () => void;
  onToggleHistory: () => void;
  hasStoredKey: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  language, 
  onLanguageChange, 
  onLogoClick, 
  onOpenSettings,
  onToggleHistory,
  hasStoredKey
}) => {
  const t = getTranslation(language);

  return (
    <header className="border-b border-gray-800 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={onLogoClick}
          role="button"
          tabIndex={0}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Hexagon className="relative w-8 h-8 text-cyan-400 fill-cyan-400/10 stroke-[1.5]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-widest font-mono group-hover:text-cyan-400 transition-colors">
              {t.app.name}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-gray-500">
            <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-default">
              <Terminal className="w-4 h-4" />
              <span>{t.app.deepAnalysis}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-default">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.app.multiModule}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-800 hidden md:block"></div>

          <div className="flex items-center gap-3">
             <button
              onClick={onToggleHistory}
              className="p-2 rounded-lg border bg-gray-900 border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all"
              title="View History"
            >
              <Clock className="w-4 h-4" />
            </button>

             <button
              onClick={onOpenSettings}
              className={`p-2 rounded-lg border transition-all ${
                hasStoredKey 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20' 
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
              title="API Key Settings"
            >
              <Key className="w-4 h-4" />
            </button>

            <button 
              onClick={() => onLanguageChange(language === 'en' ? 'pt' : 'en')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-cyan-500/50 transition-all text-xs font-bold text-gray-300 hover:text-white"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;