import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Save, Trash2, X, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  onRemove: () => void;
  currentKey: string | null;
  language: Language;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  onRemove, 
  currentKey,
  language
}) => {
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInputKey('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!inputKey || inputKey.trim().length < 10) {
      setError(language === 'pt' ? 'Chave muito curta ou inválida.' : 'Key too short or invalid.');
      return;
    }
    onSave(inputKey.trim());
    onClose();
  };

  const handleRemove = () => {
    onRemove();
    onClose();
  };

  const isStored = !!currentKey;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#131b2e] border border-cyan-500/30 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">
              {language === 'pt' ? 'Configuração de API Key' : 'API Key Configuration'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="bg-[#0b1121] rounded-xl p-4 border border-gray-800">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {language === 'pt' ? 'Status da Chave' : 'Key Status'}
            </label>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isStored ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${isStored ? 'text-green-400' : 'text-gray-400'}`}>
                {isStored 
                  ? (language === 'pt' ? 'Chave Armazenada Localmente' : 'Key Stored Locally')
                  : (language === 'pt' ? 'Nenhuma Chave Configurada' : 'No Key Configured')}
              </span>
            </div>
            {isStored && (
              <p className="mt-2 text-xs text-gray-500 font-mono">
                Ends with: ...{currentKey?.slice(-4)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              {language === 'pt' ? 'Inserir Nova Chave' : 'Enter New Key'}
            </label>
            <div className="relative group">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#0b1121] border border-gray-700 text-white rounded-xl pl-4 pr-12 py-3 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder-gray-700 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </div>
            )}
            <p className="text-[10px] text-gray-500 leading-relaxed mt-2">
              {language === 'pt' 
                ? 'Sua chave é salva apenas no localStorage do seu navegador. O HEXA não armazena chaves em servidores externos.' 
                : 'Your key is saved only to your browser\'s localStorage. HEXA does not store keys on external servers.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/30 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all"
          >
            <Save className="w-4 h-4" />
            {language === 'pt' ? 'Salvar Chave' : 'Save Key'}
          </button>
          
          {isStored && (
            <button
              onClick={handleRemove}
              className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 rounded-lg transition-all"
              title={language === 'pt' ? 'Remover Chave' : 'Remove Key'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;