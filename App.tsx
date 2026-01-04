
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnalysisTool from './components/AnalysisTool';
import BottomNav from './components/BottomNav';
import ThemeSwitcher from './components/ThemeSwitcher';
import DemoModal from './components/DemoModal';
import DevPortalModal from './components/DevPortalModal';
import SignInModal from './components/SignInModal';
import ScannerLogo from './components/ScannerLogo';
import { ThemeID, DetectionType, HistoryItem } from './types';

function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeID>('h');
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDevPortalOpen, setIsDevPortalOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [devPortalTab, setDevPortalTab] = useState<'docs' | 'key'>('docs');
  const [activeType, setActiveType] = useState<DetectionType>('image');
  const [viewMode, setViewMode] = useState<'landing' | 'analysis'>('landing');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('faketrace_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('faketrace_history', JSON.stringify(history));
  }, [history]);

  // Apply Theme Class
  useEffect(() => {
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  const handleSaveResult = (item: HistoryItem) => {
    setHistory(prev => [item, ...prev].slice(0, 20));
  };

  const clearHistory = () => {
    if (window.confirm("Clear all forensic history?")) {
      setHistory([]);
      localStorage.removeItem('faketrace_history');
    }
  };

  const handleTypeChange = (type: DetectionType) => {
    setActiveType(type);
    setViewMode('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (section: string) => {
    if (section === 'hero') {
      setViewMode('landing');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    } else if (section === 'detection') {
      setViewMode('analysis');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'signin') {
      setIsSignInOpen(true);
    } else {
      if (viewMode !== 'landing') {
        setViewMode('landing');
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleTryFromDemo = () => {
    setIsDemoModalOpen(false);
    setViewMode('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative pb-48" style={{ color: 'var(--text)' }}>
      <Navbar 
        currentTheme={currentTheme} 
        onOpenThemes={() => setIsThemePanelOpen(true)} 
        onNavigate={handleNavigate}
      />
      
      <main className="transition-all duration-500">
        {viewMode === 'landing' ? (
          <div className="animate-fadeIn">
            <div id="hero">
              <Hero 
                onSystemDemo={() => setIsDemoModalOpen(true)} 
                onStartAnalysis={() => setViewMode('analysis')}
              />
            </div>
            
            {/* HISTORY SECTION */}
            {history.length > 0 && (
              <section id="history" className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase heading-glow">
                    Recent <span className="text-primary">Forensics</span>
                  </h2>
                  <button 
                    onClick={clearHistory}
                    className="text-[11px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-all border-b-2 border-primary text-white"
                  >
                    Clear History
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {history.map((item) => (
                    <div 
                      key={item.id}
                      className="glass p-8 rounded-[2.5rem] border-white/30 group hover:border-primary transition-all cursor-pointer relative overflow-hidden bg-white/5"
                    >
                      <div className={`absolute top-0 right-0 px-5 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest shadow-lg ${item.result.label === 'REAL' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {item.result.label}
                      </div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]">
                          {item.type === 'image' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                          {item.type === 'video' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                          {item.type === 'audio' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-mono opacity-80 uppercase tracking-widest truncate text-primary font-black">{item.fileName}</p>
                          <p className="text-sm font-black text-white">{new Date(item.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4 border border-white/5">
                        <div 
                          className={`h-full transition-all duration-1000 ${item.result.label === 'REAL' ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-red-500 shadow-[0_0_15px_#ef4444]'}`} 
                          style={{ width: `${item.result.confidence}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-white opacity-80 uppercase tracking-widest font-black">{item.result.confidence}% Confidence</span>
                        <span className="text-[11px] font-black italic text-primary group-hover:translate-x-2 transition-transform drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">VIEW REPORT ➔</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="features" className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="glass p-10 rounded-[3rem] border-white/20 group hover:border-primary transition-all bg-white/5 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 group-hover:scale-125 transition-transform shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Real-time Analysis</h3>
                <p className="text-white opacity-80 font-medium leading-relaxed">Processing engine leverages sub-second inference times for immediate detection results on global CDN nodes.</p>
              </div>
              <div className="glass p-10 rounded-[3rem] border-white/20 group hover:border-primary transition-all bg-white/5 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 group-hover:scale-125 transition-transform shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Forensic Integrity</h3>
                <p className="text-white opacity-80 font-medium leading-relaxed">Our models are trained on over 50 million authenticated and manipulated samples across all biological demographics.</p>
              </div>
              <div className="glass p-10 rounded-[3rem] border-white/20 group hover:border-primary transition-all bg-white/5 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 group-hover:scale-125 transition-transform shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">API Native</h3>
                <p className="text-white opacity-80 font-medium leading-relaxed">Enterprise-scale verification with robust RESTful endpoints, streaming webhooks, and zero-latency pipelines.</p>
              </div>
            </section>
          </div>
        ) : (
          <section id="detection" className="px-6 py-28 animate-fadeIn">
            <AnalysisTool 
              key={activeType} 
              type={activeType} 
              onBack={() => setViewMode('landing')} 
              onSaveResult={handleSaveResult}
            />
          </section>
        )}
      </main>

      <footer className="relative px-6 py-40 sm:py-64 border-t-2 border-white/10 bg-black/60 overflow-hidden">
        {/* Massive Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-primary/20 rounded-full blur-[180px] pointer-events-none opacity-40" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-24 relative z-10">
          <div className="flex flex-col items-center gap-12 group">
            <ScannerLogo size={180} />
            <div className="text-center space-y-6">
              <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-black italic tracking-tighter uppercase group-hover:text-primary transition-all duration-700 heading-glow leading-none">
                FAKETRACE
              </h2>
              <p className="text-primary text-xl sm:text-3xl font-black uppercase tracking-[0.6em] glow-text brightness-200 shadow-primary/60 italic">
                Neural Forensic Systems
              </p>
            </div>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto border-t border-white/20 pt-16">
            <p className="text-white text-sm sm:text-base font-black uppercase tracking-[0.4em] font-mono leading-relaxed drop-shadow-xl">
              © 2026 FakeTrace AI Systems | Engineered for Digital Truth | All Rights Reserved
            </p>
            <div className="flex flex-wrap justify-center gap-10 opacity-40 text-[10px] font-black tracking-widest uppercase italic">
               <span>Compliance: Forensic Standard ISO-NFS-9000</span>
               <span>Encryption: Quantum-Resistant AES-512</span>
               <span>Protocol: RFC-N4-TRACE</span>
            </div>
          </div>
        </div>
      </footer>

      <BottomNav activeType={activeType} onChangeType={handleTypeChange} />
      
      <ThemeSwitcher 
        currentTheme={currentTheme} 
        onThemeChange={setCurrentTheme} 
        isOpen={isThemePanelOpen} 
        onClose={() => setIsThemePanelOpen(false)} 
      />

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        onTryNow={handleTryFromDemo}
      />

      <DevPortalModal 
        isOpen={isDevPortalOpen} 
        initialTab={devPortalTab}
        onClose={() => setIsDevPortalOpen(false)}
      />

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)}
      />
    </div>
  );
}

export default App;
