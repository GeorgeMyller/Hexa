import React, { useState } from 'react';
import { InputData, Language } from '../types';
import { Github, Code, Play, Hexagon } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface InputFormProps {
  onAnalyze: (data: InputData) => void;
  isLoading: boolean;
  language: Language;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading, language }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const t = getTranslation(language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl && !codeSnippet) return;
    onAnalyze({ repoUrl, codeSnippet });
  };

  return (
    <div className="bg-[#131b2e] border border-cyan-900/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl -z-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="mb-8 flex items-start gap-4">
        <div className="p-3 bg-cyan-900/20 rounded-xl border border-cyan-500/20 text-cyan-400">
           <Hexagon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1 tracking-tight">{t.input.title}</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t.input.description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Repo URL Input */}
        <div className="space-y-3">
          <label htmlFor="repo-url" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <Github className="w-4 h-4" />
            {t.input.repoLabel}
          </label>
          <div className="relative">
            <input
              id="repo-url"
              type="url"
              placeholder={t.input.repoPlaceholder}
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full bg-[#0b1121] border border-gray-700 text-white rounded-xl px-5 py-4 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-gray-700 hover:border-gray-600"
            />
          </div>
        </div>

        {/* Code Snippet Input */}
        <div className="space-y-3">
          <label htmlFor="code-snippet" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <Code className="w-4 h-4" />
            {t.input.codeLabel}
          </label>
          <div className="relative group">
            <textarea
              id="code-snippet"
              rows={8}
              placeholder={t.input.codePlaceholder}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full bg-[#0b1121] border border-gray-700 text-white rounded-xl px-5 py-4 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-gray-700 font-mono text-sm leading-relaxed hover:border-gray-600 resize-none"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || (!repoUrl && !codeSnippet)}
            className={`
              w-full flex items-center justify-center gap-3 py-5 rounded-xl font-bold text-white transition-all transform tracking-wide text-lg
              ${isLoading 
                ? 'bg-gray-800 cursor-not-allowed border border-gray-700 text-gray-500' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] active:scale-[0.99]'}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t.input.buttonLoading}</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{t.input.buttonIdle}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;