import React, { useState } from 'react';
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import InputForm from './components/InputForm';
import ReportView from './components/ReportView';
import { AnalysisStatus, EvaluationReport, InputData, Language } from './types';
import { analyzeRepository } from './services/geminiService';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { getTranslation } from './utils/translations';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [isStarted, setIsStarted] = useState(false);
  const [report, setReport] = useState<EvaluationReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const t = getTranslation(language);

  const handleAnalyze = async (data: InputData) => {
    setStatus(AnalysisStatus.ANALYZING);
    setErrorMsg(null);
    setReport(null);

    try {
      const result = await analyzeRepository(data.repoUrl, data.codeSnippet, language);
      setReport(result);
      setStatus(AnalysisStatus.COMPLETE);
    } catch (err: any) {
      console.error(err);
      const message = err.message || t.error.default;
      setErrorMsg(message);
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(AnalysisStatus.IDLE);
    setReport(null);
    setErrorMsg(null);
    setIsStarted(false);
  };

  const handleRetry = () => {
    setStatus(AnalysisStatus.IDLE);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#0b1121] selection:bg-cyan-500/30 text-gray-200">
      <Header 
        language={language} 
        onLanguageChange={setLanguage} 
        onLogoClick={handleReset}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* State 0: Landing Page */}
        {!isStarted && status === AnalysisStatus.IDLE && (
          <LandingHero language={language} onStart={() => setIsStarted(true)} />
        )}

        {/* State 1: Input Configuration */}
        {isStarted && status === AnalysisStatus.IDLE && (
          <div className="py-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
             <button 
               onClick={() => setIsStarted(false)}
               className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors"
             >
               <ArrowLeft className="w-4 h-4" />
               Back to Home
             </button>
             <InputForm onAnalyze={handleAnalyze} isLoading={false} language={language} />
          </div>
        )}

        {/* State 2: Analyzing (Loading) */}
        {status === AnalysisStatus.ANALYZING && (
          <div className="py-20 max-w-3xl mx-auto flex flex-col items-center justify-center">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
              <div className="relative w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-cyan-400 rounded-full animate-[spin_1s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-[#0b1121] rounded-full flex items-center justify-center border border-gray-800">
                  <span className="text-3xl animate-pulse">💠</span>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">{t.loading.title}</h2>
            <div className="space-y-4 w-full max-w-md">
              <div className="flex items-center gap-3 text-cyan-400/80 animate-pulse">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <p className="font-mono text-sm">{t.loading.step1}</p>
              </div>
              <div className="flex items-center gap-3 text-blue-400/80 animate-pulse delay-100">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <p className="font-mono text-sm">{t.loading.step2}</p>
              </div>
              <div className="flex items-center gap-3 text-purple-400/80 animate-pulse delay-200">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <p className="font-mono text-sm">{t.loading.step3}</p>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Error */}
        {status === AnalysisStatus.ERROR && (
          <div className="py-20 max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-6 bg-red-500/10 rounded-2xl mb-8 border border-red-500/20">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{t.error.title}</h2>
            <p className="text-red-300 mb-8 bg-red-950/30 p-6 rounded-xl border border-red-500/20 font-mono text-sm">
              {errorMsg}
            </p>
            <button 
              onClick={handleRetry}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors border border-gray-700 hover:border-red-500/50"
            >
              {t.error.retry}
            </button>
          </div>
        )}

        {/* State 4: Report View */}
        {status === AnalysisStatus.COMPLETE && report && (
          <div className="py-12">
            <ReportView report={report} onReset={handleReset} language={language} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;