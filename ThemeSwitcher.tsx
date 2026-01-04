
import React from 'react';
import { THEMES } from '../constants';
import { ThemeID } from '../types';

interface ThemeSwitcherProps {
  currentTheme: ThemeID;
  onThemeChange: (id: ThemeID) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md glass rounded-[2.5rem] p-8 border-glass shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <h2 className="text-2xl font-black mb-6 text-center italic tracking-tighter uppercase">Visual Interfaces</h2>
        
        <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                currentTheme === theme.id 
                ? 'border-primary bg-primary/10 shadow-lg' 
                : 'border-glass hover:bg-primary/5'
              }`}
            >
              <div 
                className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white/20 shadow-inner" 
                style={{ backgroundColor: theme.colors.primary }} 
              />
              <div className="text-left flex-1">
                <div className={`font-black text-sm uppercase tracking-tight ${currentTheme === theme.id ? 'text-primary' : ''}`}>
                  {theme.name}
                </div>
                <div className="text-[10px] opacity-40 font-mono tracking-widest">{theme.colors.primary}</div>
              </div>
              {currentTheme === theme.id && (
                <div className="text-primary animate-pulse">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        
        <button 
          onClick={onClose}
          className="mt-8 w-full py-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
        >
          Close Customizer
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
