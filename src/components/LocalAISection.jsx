import React, { useState } from 'react';
import { Cpu, Terminal, Copy, Check, Download, Sparkles, Activity, Layers, Code2 } from 'lucide-react';
import { LOCAL_AI_PROFILES } from '../data/cseData';

const OS_OPTIONS = [
  { id: 'windows', label: 'Windows (PowerShell)', installCmd: 'winget install Ollama.Ollama' },
  { id: 'linux', label: 'Linux / GLUG PACE', installCmd: 'curl -fsSL https://ollama.com/install.sh | sh' },
  { id: 'macos', label: 'macOS (Apple Silicon)', installCmd: 'brew install ollama' }
];

const GOAL_OPTIONS = [
  { id: 'coding', label: 'Coding & Lab Prep' },
  { id: 'rag', label: 'Course Notes Q&A (RAG)' },
  { id: 'reasoning', label: 'Math & Algorithm Proofs' }
];

export default function LocalAISection() {
  const [osId, setOsId] = useState('windows');
  const [tierIdx, setTierIdx] = useState(0);
  const [goalId, setGoalId] = useState('coding');
  const [copiedKey, setCopiedKey] = useState('');
  const [ollamaState, setOllamaState] = useState({ status: 'idle', message: '', models: [] });

  const activeOs = OS_OPTIONS.find(o => o.id === osId) || OS_OPTIONS[0];
  const activeTier = LOCAL_AI_PROFILES[tierIdx] || LOCAL_AI_PROFILES[0];
  const rec = activeTier.recommendedModels[goalId] || activeTier.recommendedModels.coding;

  const fullCliBlock = `${activeOs.installCmd}\nollama pull ${rec.model}\nollama run ${rec.model}`;

  function handleCopy(text, key) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 1800);
    }
  }

  function handleDownloadScript() {
    const isWin = osId === 'windows';
    const filename = isWin ? 'pace-local-ai-setup.ps1' : 'pace-local-ai-setup.sh';
    const scriptBody = isWin
      ? `# PACE CSE Local AI Setup Script (Windows PowerShell)\nWrite-Host "Installing Ollama..." -ForegroundColor Cyan\n${activeOs.installCmd}\nWrite-Host "Pulling ${rec.model} (${rec.size})..." -ForegroundColor Cyan\nollama pull ${rec.model}\nWrite-Host "Ready! Run: ollama run ${rec.model}" -ForegroundColor Green\n`
      : `#!/usr/bin/env bash\n# PACE CSE Local AI Setup Script\nset -e\necho "Installing Ollama..."\n${activeOs.installCmd}\necho "Pulling ${rec.model} (${rec.size})..."\nollama pull ${rec.model}\necho "Ready! Run: ollama run ${rec.model}"\n`;

    const blob = new Blob([scriptBody], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handlePingOllama() {
    setOllamaState({ status: 'checking', message: 'Pinging http://127.0.0.1:11434/api/tags...', models: [] });
    try {
      const res = await fetch('http://127.0.0.1:11434/api/tags');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const names = (data.models || []).map(m => m.name);
      setOllamaState({
        status: 'connected',
        message: names.length > 0 ? `Ollama is active with ${names.length} local model(s).` : 'Ollama is running (no models pulled yet).',
        models: names
      });
    } catch {
      setOllamaState({
        status: 'offline',
        message: 'Could not reach Ollama on 127.0.0.1:11434. Start Ollama or set OLLAMA_ORIGINS="*" if testing from a browser.',
        models: []
      });
    }
  }

  return (
    <section id="local-ai-section" className="py-12 sm:py-16 border-t-2 border-[#111111] bg-[#F6F2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-tech text-xs font-bold tracking-widest text-[#102D69] uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#102D69]" />
              OFFLINE CAMPUS &amp; LAPTOP LLM TOOLKIT
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#111111] tracking-wide uppercase mt-1 leading-none">
              LOCAL AI SETUP WORKBENCH
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/75 max-w-2xl mt-2 font-medium">
              Run private coding assistants and study helpers completely offline on your laptop or LAB-101 workstations—zero API keys, zero subscription fees.
            </p>
          </div>

          <button
            onClick={handlePingOllama}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors self-start md:self-auto"
          >
            <Activity className="w-4 h-4" />
            <span>TEST LOCAL OLLAMA (11434)</span>
          </button>
        </div>

        {/* Live Ping Status Banner */}
        {ollamaState.status !== 'idle' && (
          <div className={`mb-6 p-4 rounded-[2px] border-2 border-[#111111] shadow-print-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
            ollamaState.status === 'connected' ? 'bg-[#F5B700]/25' : 'bg-[#E6DED4]'
          }`}>
            <div className="font-tech text-xs sm:text-sm font-bold text-[#111111]">
              <span className="uppercase mr-2 px-1.5 py-0.5 bg-[#111111] text-[#F6F2EB] font-mono text-[10px]">
                {ollamaState.status.toUpperCase()}
              </span>
              {ollamaState.message}
            </div>
            {ollamaState.models.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {ollamaState.models.map((m) => (
                  <span key={m} className="font-mono text-[11px] font-bold px-2 py-0.5 bg-[#F6F2EB] border border-[#111111] rounded-[2px]">
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Interactive Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

          {/* Left Controls (5 cols) */}
          <div className="lg:col-span-5 bg-[#E6DED4] border-2 border-[#111111] shadow-print rounded-[2px] p-5 space-y-5">
            <div>
              <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#102D69] block mb-2">
                1. SELECT OPERATING SYSTEM
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {OS_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOsId(o.id)}
                    className={`px-3 py-2 rounded-[2px] border-2 border-[#111111] font-tech text-xs font-bold uppercase text-left cursor-pointer transition-all ${
                      osId === o.id
                        ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                        : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#DCD2C6]'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#102D69] block mb-2">
                2. SELECT HARDWARE TIER
              </span>
              <div className="space-y-2">
                {LOCAL_AI_PROFILES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setTierIdx(idx)}
                    className={`w-full px-3 py-2 rounded-[2px] border-2 border-[#111111] font-tech text-xs font-bold uppercase text-left cursor-pointer transition-all ${
                      tierIdx === idx
                        ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                        : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#DCD2C6]'
                    }`}
                  >
                    <span className="block">{p.tier}</span>
                    <span className={`font-mono text-[10px] ${tierIdx === idx ? 'text-[#F5B700]' : 'text-[#111111]/60'}`}>
                      {p.vram}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#102D69] block mb-2">
                3. PRIMARY STUDY / CODING GOAL
              </span>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoalId(g.id)}
                    className={`px-3 py-1.5 rounded-[2px] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer ${
                      goalId === g.id
                        ? 'bg-[#F5B700] text-[#111111] shadow-print-sm'
                        : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#DCD2C6]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Output & Copyable CLI (7 cols) */}
          <div className="lg:col-span-7 bg-[#111111] text-[#F6F2EB] border-2 border-[#111111] shadow-print-cobalt rounded-[2px] p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#F6F2EB]/20">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase text-[#F5B700] block">
                    RECOMMENDED MODEL FOR YOUR MACHINE
                  </span>
                  <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-[#F6F2EB] leading-none mt-1">
                    {rec.model}
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#102D69] border border-[#F6F2EB]/30 text-[#F6F2EB]">
                    SIZE: {rec.size}
                  </span>
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#F5B700] text-[#111111] font-bold">
                    {rec.speed}
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#F6F2EB]/85 mb-5 leading-relaxed">
                {rec.notes}
              </p>

              {/* Terminal Block */}
              <div className="bg-[#1A202C] border border-[#F6F2EB]/25 rounded-[2px] p-4 mb-5">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#F6F2EB]/15">
                  <span className="font-mono text-[11px] text-[#F5B700] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    {activeOs.label} — 3-Step Quickstart
                  </span>
                  <button
                    onClick={() => handleCopy(fullCliBlock, 'cli')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#F6F2EB] text-[#111111] font-mono text-[11px] font-bold uppercase cursor-pointer hover:bg-[#F5B700]"
                  >
                    {copiedKey === 'cli' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'cli' ? 'COPIED!' : 'COPY ALL'}</span>
                  </button>
                </div>
                <pre className="font-mono text-xs sm:text-sm text-[#F6F2EB] overflow-x-auto leading-relaxed">
                  {fullCliBlock}
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#F6F2EB]/20">
              <span className="font-tech text-xs uppercase text-[#F6F2EB]/70">
                Prefer a one-click file? Download the setup script for {osId === 'windows' ? 'PowerShell' : 'Bash'}.
              </span>
              <button
                onClick={handleDownloadScript}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] font-tech text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD SETUP SCRIPT</span>
              </button>
            </div>
          </div>

        </div>

        {/* 3 Easy Student Setup Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-5">
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-[#102D69] text-[#F6F2EB] rounded-[2px] inline-flex items-center gap-1 mb-3">
              <Sparkles className="w-3 h-3 text-[#F5B700]" />
              PATH A · NO TERMINAL
            </span>
            <h4 className="font-tech text-lg font-bold uppercase text-[#111111] mb-1.5">
              LM Studio / Ollama Desktop GUI
            </h4>
            <p className="font-sans text-xs text-[#111111]/80 leading-relaxed font-medium">
              Install LM Studio or the official Ollama desktop app, search for <code className="font-mono font-bold">qwen2.5-coder</code> or <code className="font-mono font-bold">llama3.2</code>, click Download, and chat with zero command-line setup.
            </p>
          </div>

          <div className="bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-5">
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-[#102D69] text-[#F6F2EB] rounded-[2px] inline-flex items-center gap-1 mb-3">
              <Code2 className="w-3 h-3 text-[#F5B700]" />
              PATH B · OFFLINE VS CODE COPILOT
            </span>
            <h4 className="font-tech text-lg font-bold uppercase text-[#111111] mb-1.5">
              Continue.dev + Ollama in VS Code
            </h4>
            <p className="font-sans text-xs text-[#111111]/80 leading-relaxed font-medium">
              Install the open-source <strong>Continue</strong> extension in VS Code, select provider <strong>Ollama</strong>, and pick <code className="font-mono font-bold">{rec.model}</code> for free offline lab debugging and autocomplete.
            </p>
          </div>

          <div className="bg-[#E6DED4] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-5">
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-[#102D69] text-[#F6F2EB] rounded-[2px] inline-flex items-center gap-1 mb-3">
              <Layers className="w-3 h-3 text-[#F5B700]" />
              PATH C · CHAT WITH VTU PDFS
            </span>
            <h4 className="font-tech text-lg font-bold uppercase text-[#111111] mb-1.5">
              Private Notes RAG (AnythingLLM)
            </h4>
            <p className="font-sans text-xs text-[#111111]/80 leading-relaxed font-medium">
              Download <strong>AnythingLLM Desktop</strong>, connect it to your local Ollama instance, and drop in VTU syllabus PDFs, lab manuals, and PYQs to quiz yourself offline before exams.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
