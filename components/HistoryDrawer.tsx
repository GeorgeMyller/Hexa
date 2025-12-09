import React from 'react';
import { EvaluationReport } from '../types';
import { X, Clock, Trash2, ArrowRight } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: EvaluationReport[];
  onSelectReport: (report: EvaluationReport) => void;
  onDeleteReport: (id: string) => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectReport,
  onDeleteReport
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#131b2e] border-l border-gray-800 z-[70] transform transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Scan History
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                No past scans found.
              </div>
            ) : (
              history.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#0b1121] border border-gray-800 rounded-xl p-4 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white truncate max-w-[200px]">{item.repoName || "Unnamed"}</h3>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-bold ${item.overallScore >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {item.overallScore}
                      </span>
                      <span className="text-[10px] text-gray-600">/100</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-mono mb-4">
                    {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        onSelectReport(item);
                        onClose();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyan-900/20 text-cyan-400 rounded-lg text-xs font-bold uppercase hover:bg-cyan-900/40 transition-colors"
                    >
                      Load Report <ArrowRight className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReport(item.id);
                      }}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryDrawer;