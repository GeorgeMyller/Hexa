import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';
import { ArrowRight, Hexagon, Cpu, Shield, FileText, Briefcase, Scale, LogIn } from 'lucide-react';

interface LandingHeroProps {
  language: Language;
  onStart: () => void;
  hasApiKey: boolean;
  onConnectApi: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ language, onStart, hasApiKey, onConnectApi }) => {
  const t = getTranslation(language);

  const agents = [
    { icon: Hexagon, name: t.agents.architect, color: "text-blue-400" },
    { icon: Shield, name: t.agents.qa, color: "text-green-400" },
    { icon: FileText, name: t.agents.docs, color: "text-yellow-400" },
    { icon: Briefcase, name: t.agents.product, color: "text-purple-400" },
    { icon: Scale, name: t.agents.legal, color: "text-red-400" },
    { icon: Cpu, name: t.agents.ai, color: "text-cyan-400" },
  ];

  return (
    <div className="relative pt-12 pb-20 sm:pt-16 sm:pb-24">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyan-900/10 via-blue-900/5 to-transparent blur-3xl -z-10" />
      
      <div className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-xs font-bold tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          {t.hero.tagline}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          {t.hero.title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {t.hero.highlight}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {hasApiKey ? (
            <button 
              onClick={onStart}
              className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] font-bold rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)] flex items-center gap-3"
            >
              {t.hero.deploy}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={onConnectApi}
              className="group relative px-8 py-4 bg-[#0f172a] hover:bg-gray-900 text-white border border-gray-700 hover:border-cyan-500/50 font-bold rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-3"
            >
              <LogIn className="w-5 h-5 text-cyan-400" />
              {t.hero.connect}
            </button>
          )}
        </div>

        {/* Agent Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {agents.map((agent, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-gray-700 transition-colors">
              <agent.icon className={`w-6 h-6 ${agent.color}`} />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide text-center">{agent.name}</span>
            </div>
          ))}
        </div>

        {/* Features Specs */}
        <div className="mt-12 pt-10 border-t border-gray-800 flex justify-center gap-8 md:gap-16 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {t.hero.features.instant}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {t.hero.features.comprehensive}
          </div>
           <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            {t.hero.features.secure}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;