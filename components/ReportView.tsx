import React, { useState } from 'react';
import { EvaluationReport, AgentEvaluation, Language } from '../types';
import { getTranslation } from '../utils/translations';
import ReactMarkdown from 'react-markdown';
import HexaRadarChart from './HexaRadarChart';
import { 
  Shield, 
  Layout, 
  CheckCircle, 
  AlertOctagon, 
  Lightbulb, 
  Link as LinkIcon,
  BookOpen,
  Briefcase,
  Scale,
  Cpu,
  TrendingUp,
  Clock,
  AlertTriangle,
  Hexagon,
  Download,
  Copy,
  Check
} from 'lucide-react';

interface ReportViewProps {
  report: EvaluationReport;
  onReset: () => void;
  language: Language;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-cyan-400';
  if (score >= 70) return 'text-yellow-400';
  return 'text-red-400';
};

const getScoreBg = (score: number) => {
  if (score >= 90) return 'bg-cyan-400';
  if (score >= 70) return 'bg-yellow-400';
  return 'bg-red-400';
};

const AgentCard: React.FC<{ agent: AgentEvaluation }> = ({ agent }) => {
  let Icon = Layout;
  if (agent.role.includes('Architect') || agent.role.includes('Arquiteto')) Icon = Layout;
  if (agent.role.includes('QA') || agent.role.includes('Segurança')) Icon = CheckCircle;
  if (agent.role.includes('Documentation') || agent.role.includes('Documentação')) Icon = BookOpen;
  if (agent.role.includes('Product') || agent.role.includes('Produto')) Icon = Briefcase;
  if (agent.role.includes('Legal')) Icon = Scale;
  if (agent.role.includes('AI') || agent.role.includes('IA')) Icon = Cpu;

  return (
    <div className="bg-[#131b2e] border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors duration-300 flex flex-col h-full group">
      <div className="p-6 border-b border-gray-800 bg-gray-900/30 flex justify-between items-start group-hover:bg-cyan-900/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-800 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg leading-tight">{agent.role}</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mt-1">HEXA Agent Report</p>
          </div>
        </div>
        <div className={`text-2xl font-mono font-bold ${getScoreColor(agent.score)}`}>
          {agent.score}<span className="text-sm text-gray-600">/100</span>
        </div>
      </div>
      
      <div className="p-6 space-y-6 flex-grow">
        <div className="text-gray-300 text-sm leading-relaxed italic border-l-2 border-cyan-500/30 pl-4">
           <ReactMarkdown>{agent.summary}</ReactMarkdown>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            Findings
          </h4>
          <ul className="space-y-2">
            {agent.findings.map((finding, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-gray-400 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                <div className="markdown-content">
                  <ReactMarkdown>{finding}</ReactMarkdown>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
             <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
             Recommendations
          </h4>
          <ul className="space-y-2">
            {agent.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-gray-400 items-start">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                <div className="markdown-content">
                   <ReactMarkdown>{suggestion}</ReactMarkdown>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ReportView: React.FC<ReportViewProps> = ({ report, onReset, language }) => {
  const t = getTranslation(language);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `HEXA_REPORT_${report.repoName.replace(/\//g, '_')}_${report.timestamp}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleCopyMarkdown = () => {
    let md = `# HEXA REPORT: ${report.repoName}\n\n`;
    md += `**Score:** ${report.overallScore}/100\n`;
    md += `**Date:** ${new Date(report.timestamp).toLocaleString()}\n\n`;
    md += `## Executive Summary\n${report.executiveSummary}\n\n`;
    md += `## Roadmap\n${report.roadmap.map(x => `- ${x}`).join('\n')}\n\n`;
    md += `## Agent Details\n`;
    report.agents.forEach(a => {
      md += `### ${a.role} (${a.score}/100)\n${a.summary}\n`;
      a.findings.forEach(f => md += `- [Finding] ${f}\n`);
      a.suggestions.forEach(s => md += `- [Suggestion] ${s}\n`);
      md += `\n`;
    });
    
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Action Bar */}
      <div className="flex justify-end gap-3 px-2">
        <button 
          onClick={handleCopyMarkdown}
          className="flex items-center gap-2 px-4 py-2 bg-[#131b2e] hover:bg-[#1e293b] border border-gray-700 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          Copy Markdown
        </button>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-[#131b2e] hover:bg-[#1e293b] border border-gray-700 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-all"
        >
          <Download className="w-4 h-4" />
          Download JSON
        </button>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-[#131b2e] border border-cyan-900/30 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-5">
          <Hexagon className="w-96 h-96" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row gap-12 mb-10">
            {/* Left Column: Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest border border-cyan-500/20 mb-4">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                {t.report.metaTitle}
              </div>
              <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
                {report.repoName || 'Unnamed Repository'}
              </h2>
              <p className="text-gray-400 text-sm font-mono mb-8">ID: {report.id.slice(0, 8).toUpperCase()}</p>
              
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-900/40 rounded-xl p-8 border-l-4 border-cyan-500 backdrop-blur-sm">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">{t.report.execSummary}</h3>
                <div className="text-gray-200 leading-loose text-lg font-light markdown-content">
                  <ReactMarkdown>{report.executiveSummary}</ReactMarkdown>
                </div>
              </div>
            </div>
            
            {/* Right Column: Visuals & Score */}
            <div className="flex flex-col items-center justify-start gap-8 min-w-[300px]">
               <div className="flex flex-col items-center justify-center bg-[#0b1121] p-6 rounded-2xl border border-gray-800 w-full">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{t.report.health}</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-6xl font-black ${getScoreColor(report.overallScore)}`}>
                    {report.overallScore}
                  </span>
                  <span className="text-gray-600 font-bold text-lg">/100</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBg(report.overallScore)} transition-all duration-1000`} 
                    style={{ width: `${report.overallScore}%` }}
                  />
                </div>
              </div>

              {/* Radar Chart */}
              <div className="bg-[#0b1121] rounded-2xl border border-gray-800 p-2 w-full flex justify-center">
                 <HexaRadarChart agents={report.agents} />
              </div>
            </div>
          </div>

          {/* Strategic Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Quick Wins */}
            <div className="bg-[#0b1121]/50 rounded-xl p-6 border border-gray-800 hover:border-green-500/20 transition-colors">
              <h3 className="text-xs font-bold text-green-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t.report.quickWins}
              </h3>
              <ul className="space-y-3">
                {report.quickWins?.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-300 items-start">
                    <CheckCircle className="w-4 h-4 text-green-500/50 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      <ReactMarkdown>{item}</ReactMarkdown>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Risks */}
            <div className="bg-[#0b1121]/50 rounded-xl p-6 border border-gray-800 hover:border-red-500/20 transition-colors">
              <h3 className="text-xs font-bold text-red-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t.report.risks}
              </h3>
              <ul className="space-y-3">
                {report.criticalRisks?.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-300 items-start">
                    <AlertOctagon className="w-4 h-4 text-red-500/50 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      <ReactMarkdown>{item}</ReactMarkdown>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

             {/* Roadmap */}
             <div className="bg-[#0b1121]/50 rounded-xl p-6 border border-gray-800 hover:border-blue-500/20 transition-colors">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t.report.roadmap}
              </h3>
              <ul className="space-y-3">
                {report.roadmap?.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-300 items-start">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="leading-snug">
                      <ReactMarkdown>{item}</ReactMarkdown>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sources / Grounding */}
          {report.links && report.links.length > 0 && (
            <div className="pt-6 border-t border-gray-800/50">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                {t.report.sources}
              </h3>
              <div className="flex flex-wrap gap-3">
                {report.links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0b1121] border border-gray-800 text-xs text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  >
                    <span className="truncate max-w-[200px]">{link.title}</span>
                    <LinkIcon className="w-3 h-3 opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Agents Grid */}
      <div>
        <h3 className="text-2xl font-black text-white pl-4 border-l-4 border-cyan-500 mb-8 tracking-tight">
          {t.report.specialists}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {report.agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-12">
        <button 
          onClick={onReset}
          className="px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all border border-gray-700 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/10 transform hover:-translate-y-1"
        >
          {t.report.newAnalysis}
        </button>
      </div>
    </div>
  );
};

export default ReportView;