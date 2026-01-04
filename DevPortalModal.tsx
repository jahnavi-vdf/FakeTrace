
import React, { useState } from 'react';

interface DevPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'docs' | 'key';
}

const DevPortalModal: React.FC<DevPortalModalProps> = ({ isOpen, onClose, initialTab }) => {
  const [activeTab, setActiveTab] = useState<'docs' | 'key'>(initialTab);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<'node' | 'python' | 'curl'>('node');

  if (!isOpen) return null;

  const generateKey = () => {
    const random = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setApiKey(`ft_live_${random}`);
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const codeExamples = {
    node: `const axios = require('axios');\n\nconst analyze = async () => {\n  const response = await axios.post('https://api.faketrace.ai/v1/analyze', {\n    media_url: 'https://example.com/media.mp4',\n    type: 'video'\n  }, {\n    headers: { 'X-FT-KEY': 'YOUR_API_KEY' }\n  });\n  console.log(response.data.label); // "FAKE" or "REAL"\n};`,
    python: `import requests\n\nurl = "https://api.faketrace.ai/v1/analyze"\nheaders = { "X-FT-KEY": "YOUR_API_KEY" }\ndata = { "media_url": "...", "type": "image" }\n\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json()["label"])`,
    curl: `curl -X POST https://api.faketrace.ai/v1/analyze \\\n     -H "X-FT-KEY: YOUR_API_KEY" \\\n     -H "Content-Type: application/json" \\\n     -d '{"media_url": "...", "type": "audio"}'`
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl glass rounded-[3rem] border-glass shadow-2xl overflow-hidden flex flex-col h-[85vh]" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        
        {/* Header */}
        <div className="p-8 border-b border-glass flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </button>
            <div className="h-6 w-[1px] bg-glass-border" />
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Developer <span className="text-primary">Portal</span></h2>
          </div>
          
          <div className="flex p-1.5 glass rounded-2xl border-glass">
            <button 
              onClick={() => setActiveTab('docs')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'docs' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'opacity-40 hover:opacity-100'}`}
            >
              Documentation
            </button>
            <button 
              onClick={() => setActiveTab('key')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'key' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'opacity-40 hover:opacity-100'}`}
            >
              Get Key
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          {activeTab === 'docs' ? (
            <div className="space-y-12 max-w-3xl mx-auto">
              <section>
                <h3 className="text-3xl font-black italic tracking-tight mb-6 uppercase">Authentication</h3>
                <p className="text-dim mb-6">Include your secret API key in the request header to authenticate with our servers.</p>
                <div className="glass p-5 rounded-2xl border-glass font-mono text-sm bg-black/40">
                  <span className="text-primary">X-FT-KEY:</span> your_api_key_here
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-black italic tracking-tight uppercase">Implementation</h3>
                  <div className="flex gap-2">
                    {(['node', 'python', 'curl'] as const).map(l => (
                      <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border transition-all ${lang === l ? 'bg-primary/20 border-primary text-primary' : 'border-glass opacity-40'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-[2rem] border-glass bg-black/50 overflow-hidden shadow-inner">
                  <div className="px-6 py-3 border-b border-glass bg-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Request Example</span>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/30" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                      <div className="w-2 h-2 rounded-full bg-green-500/30" />
                    </div>
                  </div>
                  <pre className="p-8 font-mono text-sm leading-relaxed overflow-x-auto text-primary/80">
                    {codeExamples[lang]}
                  </pre>
                </div>
              </section>

              <section className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20">
                <h4 className="font-black text-xs uppercase tracking-widest mb-3 text-primary">Response Schema</h4>
                <p className="text-sm text-dim leading-relaxed">
                  Our API returns a JSON object containing the <span className="text-white font-bold">verdict (REAL/FAKE)</span>, confidence score, and a list of detected forensic artifacts found during the neural scan.
                </p>
              </section>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto">
              <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-8 animate-pulse">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              </div>
              
              <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">API Access <span className="text-primary">Control</span></h3>
              <p className="text-dim mb-10 leading-relaxed">
                Generate a live production key to start integrating FakeTrace into your environment. High-fidelity forensic analysis at scale.
              </p>

              {apiKey ? (
                <div className="w-full space-y-6 animate-slideDown">
                  <div className="glass p-6 rounded-3xl border-primary/30 bg-primary/5 relative flex flex-col items-center group">
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest mb-4">Your Secret API Key</span>
                    <code className="text-2xl font-mono font-bold tracking-tight mb-6 select-all">{apiKey}</code>
                    <button 
                      onClick={copyToClipboard}
                      className={`px-8 py-3 rounded-2xl font-black uppercase text-xs transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105'}`}
                    >
                      {copied ? (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
                      ) : 'Copy Key'}
                    </button>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-[10px] text-yellow-500/80 uppercase font-black tracking-widest flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    Warning: Do not share this key. Treat it like a password.
                  </div>
                </div>
              ) : (
                <button 
                  onClick={generateKey}
                  className="px-12 py-5 bg-primary text-white rounded-[2rem] font-black italic text-xl uppercase tracking-tighter shadow-2xl shadow-primary/30 hover:translate-y-[-4px] transition-all"
                >
                  Generate Production Key
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-8 border-t border-glass bg-black/5 flex items-center justify-between">
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-30">
              <span>Status: Operational</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
           </div>
           <button onClick={onClose} className="px-8 py-3 glass border-glass rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Dismiss
           </button>
        </div>
      </div>
    </div>
  );
};

export default DevPortalModal;
