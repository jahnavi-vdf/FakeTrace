
import React, { useState, useRef } from 'react';
import { DetectionType, AnalysisResult, HistoryItem } from '../types';
import { analyzeMedia } from '../geminiService';

interface AnalysisToolProps {
  type: DetectionType;
  onBack?: () => void;
  onSaveResult?: (item: HistoryItem) => void;
}

const AnalysisTool: React.FC<AnalysisToolProps> = ({ type, onBack, onSaveResult }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          const analysis = await analyzeMedia(base64, file.type, type);
          setResult(analysis);
          setAnalyzing(false);
          
          if (onSaveResult) {
            onSaveResult({
              id: crypto.randomUUID(),
              timestamp: Date.now(),
              type,
              fileName: file.name,
              result: analysis
            });
          }
        } catch (err: any) {
          setError(err.message || "Detection interrupted.");
          setAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError("Failed to read file.");
      setAnalyzing(false);
    }
  };

  const renderMethodologyGrid = (text: string) => {
    const points = text.split(/[.\n]/).map(p => p.trim()).filter(p => p.length > 15);
    const displayPoints = points.slice(0, 5);

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 ${displayPoints.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 w-full`}>
        {displayPoints.map((point, idx) => (
          <div 
            key={idx} 
            className="flex flex-col gap-5 glass p-8 rounded-[2.5rem] bg-black/40 hover:border-primary hover:bg-primary/20 transition-all duration-500 group relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -right-4 -top-4 text-8xl font-black italic opacity-[0.1] group-hover:opacity-[0.2] transition-opacity pointer-events-none text-primary">
              0{idx + 1}
            </div>
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg group-hover:scale-110 transition-all shadow-[0_0_20px_var(--primary)] border border-white/20">
              {idx + 1}
            </div>
            <div className="flex-1 relative z-10">
               <p className="text-white text-base leading-relaxed font-bold tracking-tight drop-shadow-md">
                 {point.replace(/^[*-]\s*|^\d+\.\s*/, '')}
               </p>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
               <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-1000 delay-100 shadow-[0_0_15px_var(--primary)]" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto relative pt-4 px-4 sm:px-6">
      <div className="absolute top-0 left-4 sm:left-6 z-[50]">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 px-8 py-4 rounded-2xl glass border-white/20 hover:bg-primary hover:border-white transition-all text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl text-white"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="glass p-8 md:p-16 rounded-[4rem] relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-black/60 mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] -mr-48 -mt-48 pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block px-6 py-2 rounded-2xl bg-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.5em] mb-6 border border-primary/40 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
            Forensic Engine Active
          </div>
          <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter italic glow-text text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            Analyze <span className="text-primary capitalize">{type}</span>
          </h2>
          <p className="text-white text-xl md:text-2xl font-black opacity-100 drop-shadow-md">Neural Core scanning for synthetic patterns.</p>
        </div>

        <div className="flex flex-col items-center gap-10">
          {!previewUrl ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-video md:aspect-[21/9] rounded-[4rem] border-4 border-dashed border-primary/30 hover:border-primary hover:bg-primary/10 cursor-pointer flex flex-col items-center justify-center transition-all group relative bg-black/40 shadow-2xl"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-primary text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)]">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <p className="text-2xl font-black tracking-tight text-white uppercase italic">Select source media</p>
              <p className="text-white/60 mt-3 uppercase text-xs font-black tracking-[0.3em]">High-fidelity forensic formats</p>
            </div>
          ) : (
            <div className="w-full space-y-12">
              <div className="relative aspect-video rounded-[4rem] overflow-hidden glass border-primary/30 group bg-black shadow-2xl">
                {type === 'image' && <img src={previewUrl} className="w-full h-full object-contain" alt="Preview" />}
                {type === 'video' && <video src={previewUrl} className="w-full h-full object-contain" controls />}
                {type === 'audio' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-16">
                    <div className="w-32 h-32 mb-8 text-primary animate-pulse"><svg fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.045-3 2.333S3.343 18.667 5 18.667s3-1.045 3-2.334V5.267l8-1.6V12.7c-.33-.063-.67-.1-1-.1-1.657 0-3 1.045-3 2.333S13.343 17.267 15 17.267s3-1.045 3-2.334V3z"></path></svg></div>
                    <audio src={previewUrl} className="w-full max-w-lg" controls />
                  </div>
                )}
                
                {analyzing && (
                  <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center backdrop-blur-3xl z-[100]">
                    <div className="scan-line" />
                    <p className="text-primary font-mono animate-pulse text-4xl tracking-[0.6em] uppercase font-black glow-text">SCANNING CORE</p>
                  </div>
                )}

                <button 
                  onClick={() => { setPreviewUrl(null); setFile(null); setResult(null); }}
                  className="absolute top-8 right-8 p-5 bg-red-500/80 hover:bg-red-500 text-white rounded-3xl transition-all opacity-0 group-hover:opacity-100 shadow-2xl z-20"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {!result && !analyzing && (
                <button 
                  onClick={handleAnalyze}
                  className="w-full py-10 rounded-[3rem] bg-primary text-white font-black text-3xl hover:scale-[1.01] shadow-[0_20px_60px_rgba(var(--primary-rgb),0.6)] transition-all flex items-center justify-center gap-6 italic tracking-tighter border-2 border-white/30"
                >
                  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  INITIATE FORENSIC AUDIT
                </button>
              )}
            </div>
          )}
        </div>

        {error && <div className="mt-10 p-8 bg-red-500/20 border-2 border-red-500 rounded-[2.5rem] text-red-400 text-center font-black text-xl shadow-[0_0_40px_rgba(239,68,68,0.2)]">{error}</div>}

        {result && (
          <div className="mt-20 space-y-20 animate-fadeIn">
            <div className={`p-16 md:p-24 rounded-[5rem] text-center border-8 shadow-2xl animate-slideDown relative overflow-hidden bg-black/80 ${
              result.label === 'REAL' ? 'border-green-500 shadow-green-500/30' : 'border-red-500 shadow-red-500/30'
            }`}>
              <div className={`absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none ${result.label === 'REAL' ? 'bg-green-500' : 'bg-red-500'}`} />
              <p className="text-white uppercase text-sm tracking-[0.8em] font-black mb-8 opacity-90 drop-shadow-md">Final Analysis Verdict</p>
              <h3 className={`text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none mb-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] ${
                result.label === 'REAL' ? 'text-green-400' : 'text-red-500'
              }`}>
                {result.label === 'REAL' ? 'REAL' : 'FAKE'}
              </h3>
              <div className="inline-flex items-center gap-4 px-12 py-5 rounded-full bg-white/10 border border-white/30 font-black text-3xl tracking-tight uppercase text-white shadow-2xl backdrop-blur-md">
                 Confidence: <span className="text-primary">{result.confidence}%</span>
              </div>
              <p className="mt-12 text-2xl text-white font-black leading-relaxed italic border-t border-white/20 pt-10 drop-shadow-lg">
                 "{result.summary}"
              </p>
            </div>

            <div className="space-y-12 w-full relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-10 border-b-2 border-white/10 pb-12">
                 <div className="w-20 h-20 rounded-[2rem] bg-primary text-white flex items-center justify-center shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)] border-2 border-white/40">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                 </div>
                 <div className="text-center md:text-left">
                    <h4 className="text-5xl font-black italic tracking-tight text-white uppercase mb-3 drop-shadow-md">Forensic Logic</h4>
                    <p className="text-primary text-xl font-black uppercase tracking-widest drop-shadow-sm">Methodological breakdown of results.</p>
                 </div>
              </div>
              
              {renderMethodologyGrid(result.detectionMethodology)}
            </div>

            <div className="glass p-12 md:p-20 rounded-[5rem] border-white/20 bg-black/60 relative overflow-hidden shadow-2xl">
              <h4 className="text-4xl font-black mb-12 italic tracking-tight flex items-center gap-6 uppercase border-b-2 border-white/10 pb-10 text-white drop-shadow-md">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center border border-white/40 shadow-xl">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                 </div>
                 Detected Artifacts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {result.findings.map((finding, idx) => (
                  <div key={idx} className="flex items-center gap-8 bg-white/5 px-10 py-8 rounded-[2.5rem] border border-white/20 hover:bg-primary/20 hover:border-white transition-all cursor-default group shadow-xl">
                    <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 shadow-[0_0_20px_var(--primary)] group-hover:scale-125 transition-transform" />
                    <span className="text-white leading-tight font-black text-xl tracking-tight uppercase italic drop-shadow-sm">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept={type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : 'audio/*'} />
      </div>
    </div>
  );
};

export default AnalysisTool;
