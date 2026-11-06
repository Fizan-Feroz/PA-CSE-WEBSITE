import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Bot, User, Sparkles, BookOpen, Code, FileText, 
  HelpCircle, Server, CheckCircle2, Copy, Check, RotateCcw,
  CornerDownLeft
} from 'lucide-react';
import { CHATBOT_MODES, generateAcademicResponse } from '../utils/academicRagEngine';
import { SUBJECT_CORPUS } from '../data/academicCorpus';

const SAMPLE_PROMPTS = [
  { label: "Dijkstra 8M Exam Trace", query: "Explain Dijkstra's algorithm for 8 marks with an example and derive its time complexity." },
  { label: "Master Theorem Cases", query: "State Master Theorem for divide-and-conquer recurrences with examples." },
  { label: "Banker's Algorithm", query: "Explain Banker's Algorithm for deadlock avoidance with safety and resource-request algorithms." },
  { label: "POSIX Process C Lab", query: "Show the C lab code for process creation using fork(), exec(), and wait()." },
  { label: "3NF vs BCNF", query: "Compare 3NF and BCNF with examples and discuss dependency preservation." },
  { label: "Backpropagation ML Derivation", query: "Derive the backpropagation weight update rule for output units using sigmoid." }
];

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: `## 🎓 Welcome to PACE CSE Academic Knowledge Assistant
**Department of Computer Science & Engineering · P.A. College of Engineering (PACE) Mangaluru**

I am indexed with official **VTU Autonomous curriculum courseware**, prescribed textbooks, faculty notes, and laboratory code repositories.

### What would you like to explore today?
- **VTU Exam Prep**: Ask for any topic with marks weightage (e.g. *"Explain Dijkstra for 8 marks"*).
- **Lab Code**: Request complete runnable programs (e.g. *"Show producer-consumer semaphore code in C"*).
- **Theory & Proofs**: Inquire about Master Theorem, Normalization, or Backpropagation.`,
    intent: 'syllabus',
    citations: [
      { title: 'PACE Autonomous Syllabus Scheme 2021', source: 'VTU Belagavi & PACE BOS', courseCode: 'AUTONOMOUS', confidence: 100 }
    ],
    timestamp: '10:00 AM'
  }
];

function createChatMessage(sender, text, extra = {}) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const id = `${sender}-${Date.now()}`;
  return { id, sender, text, timestamp: time, ...extra };
}

export default function AcademicChatbotModal({ isOpen, onClose, defaultCourse = 'ALL' }) {
  const [selectedCourse, setSelectedCourse] = useState(defaultCourse);
  const [prevDefaultCourse, setPrevDefaultCourse] = useState(defaultCourse);
  const [activeMode, setActiveMode] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [useLocalLLM, setUseLocalLLM] = useState(false);
  const [localLLMUrl, setLocalLLMUrl] = useState('http://localhost:11434/api/generate');

  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  if (defaultCourse !== prevDefaultCourse) {
    setPrevDefaultCourse(defaultCourse);
    setSelectedCourse(defaultCourse);
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSendMessage(textToSend = inputValue) {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage = createChatMessage('user', trimmed);

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await generateAcademicResponse({
        query: trimmed,
        activeCourse: selectedCourse,
        mode: activeMode,
        endpointConfig: {
          useLocalLLM,
          url: localLLMUrl
        }
      });

      const botMessage = createChatMessage('bot', result.text, {
        intent: result.intent,
        citations: result.citations,
        mode: result.mode,
        confidence: result.confidence
      });

      setMessages(prev => [...prev, botMessage]);
    } catch {
      const errorMessage = createChatMessage('bot', 'An error occurred while querying the academic knowledge repository. Please check your query or verify server connection.', {
        intent: 'error',
        citations: []
      });
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy(text, index) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  function handleReset() {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `### Academic Session Reset
Ready for new queries across **${selectedCourse === 'ALL' ? 'All CSE Subjects' : selectedCourse}**. Ask about algorithms, system calls, lab code, or exam marks rubrics!`,
        citations: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#111111]/70 backdrop-blur-sm animate-in fade-in duration-150">
      
      {/* Outer Brutalist Frame */}
      <div 
        className="w-full max-w-5xl h-[92vh] max-h-[880px] bg-[#E6DED4] border-2 border-[#111111] shadow-print flex flex-col rounded-[2px] overflow-hidden text-[#111111]"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Top Header Strip */}
        <div className="bg-[#102D69] text-[#F6F2EB] px-4 py-3 border-b-2 border-[#111111] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 px-2 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111] flex items-center justify-center font-heading text-lg font-bold tracking-wider shrink-0">
              PACE AI
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-wider uppercase leading-none truncate">
                  NEURAL SYLLABUS &amp; ACADEMIC ASSISTANT
                </h2>
                <span className="hidden sm:inline-block font-tech text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[#E6DED4] text-[#111111] border border-[#111111] shrink-0">
                  LAB-101 HPC
                </span>
              </div>
              <p className="font-tech text-xs uppercase tracking-widest text-[#F6F2EB]/80 font-semibold truncate hidden sm:block">
                Department of Computer Science &amp; Engineering · 2021 Autonomous Scheme
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowConfig(prev => !prev)}
              className="p-1.5 rounded-[2px] bg-[#F6F2EB] text-[#111111] hover:bg-[#E6DED4] border border-[#111111] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              title="Configure local model or connection"
            >
              <Server className="w-3.5 h-3.5 text-[#102D69]" />
              <span className="hidden md:inline">SERVER</span>
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-[2px] bg-[#F6F2EB] text-[#111111] hover:bg-[#E6DED4] border border-[#111111] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              title="Clear conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">CLEAR</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-[2px] bg-[#F5B700] hover:bg-[#d9a200] text-[#111111] border border-[#111111] cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Local HPC Server Configuration Drawer */}
        {showConfig && (
          <div className="bg-[#F6F2EB] border-b-2 border-[#111111] p-3 px-4 font-tech text-xs animate-in slide-in-from-top duration-150 shrink-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold uppercase tracking-wider text-[#102D69] block">
                  IN-HOUSE HPC SERVER CONNECTION (PACE LAB-101)
                </span>
                <p className="text-[#111111]/70 font-sans text-xs">
                  Toggle between high-speed in-house pre-indexed cache (0ms latency) and live Ollama/vLLM on campus LAN.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label className="flex items-center gap-2 cursor-pointer font-bold uppercase">
                  <input
                    type="checkbox"
                    checked={useLocalLLM}
                    onChange={(e) => setUseLocalLLM(e.target.checked)}
                    className="accent-[#102D69]"
                  />
                  <span>LAN Model Mode</span>
                </label>
                {useLocalLLM && (
                  <input
                    type="text"
                    value={localLLMUrl}
                    onChange={(e) => setLocalLLMUrl(e.target.value)}
                    placeholder="http://localhost:11434/api/generate"
                    className="px-2 py-1 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-mono text-xs w-48"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Control Toolbar: Course Selector & Intent Modes */}
        <div className="bg-[#DCD2C6] border-b-2 border-[#111111] p-2.5 px-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 shrink-0">
          
          {/* Course Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#111111]/70 shrink-0 mr-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-[#102D69]" />
              COURSE:
            </span>
            <button
              onClick={() => setSelectedCourse('ALL')}
              className={`px-2 py-1 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider border border-[#111111] transition-all cursor-pointer shrink-0 ${
                selectedCourse === 'ALL'
                  ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                  : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#E6DED4]'
              }`}
            >
              ALL COURSES
            </button>
            {SUBJECT_CORPUS.map(c => (
              <button
                key={c.courseCode}
                onClick={() => setSelectedCourse(c.courseCode)}
                className={`px-2 py-1 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider border border-[#111111] transition-all cursor-pointer shrink-0 ${
                  selectedCourse === c.courseCode
                    ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm'
                    : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#E6DED4]'
                }`}
                title={c.title}
              >
                {c.courseCode} ({c.shortTitle.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 md:pb-0">
            {CHATBOT_MODES.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`px-2 py-1 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider border border-[#111111] transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  activeMode === m.id
                    ? 'bg-[#F5B700] text-[#111111] shadow-print-sm'
                    : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#E6DED4]'
                }`}
                title={m.desc}
              >
                {m.id === 'all' && <Sparkles className="w-3 h-3 text-[#102D69]" />}
                {m.id === 'exam' && <FileText className="w-3 h-3 text-[#102D69]" />}
                {m.id === 'code' && <Code className="w-3 h-3 text-[#102D69]" />}
                {m.id === 'viva' && <HelpCircle className="w-3 h-3 text-[#102D69]" />}
                <span>{m.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#E6DED4]">
          {messages.map((msg, index) => {
            const isBot = msg.sender === 'bot';

            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-4xl ${isBot ? 'mr-auto' : 'ml-auto justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-[2px] bg-[#102D69] border border-[#111111] flex items-center justify-center text-[#F5B700] shrink-0 font-bold font-heading text-sm shadow-print-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-2 max-w-3xl ${isBot ? 'w-full' : 'max-w-xl'}`}>
                  
                  {/* Message Bubble Card */}
                  <div 
                    className={`p-4 rounded-[2px] border-2 border-[#111111] shadow-print ${
                      isBot ? 'bg-[#F6F2EB] text-[#111111]' : 'bg-[#102D69] text-[#F6F2EB]'
                    }`}
                  >
                    
                    {/* Header line for message */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#111111]/15 text-[11px] font-tech font-bold uppercase tracking-wider opacity-80">
                      <span>{isBot ? 'PACE CSE Academic Knowledge Engine' : 'Student Query (USN Session)'}</span>
                      <div className="flex items-center gap-2">
                        {isBot && msg.confidence && (
                          <span className="font-mono text-[10px] bg-[#E6DED4] text-[#102D69] px-1 rounded-[2px] border border-[#111111]/30">
                            {Math.round(msg.confidence * 100)}% MATCH
                          </span>
                        )}
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    {/* Markdown Body Text */}
                    <div className="font-sans text-xs sm:text-sm leading-relaxed prose prose-sm max-w-none text-current">
                      <MessageTextRenderer content={msg.text} isBot={isBot} />
                    </div>

                    {/* Bot Citations Plaque */}
                    {isBot && msg.citations && msg.citations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-[#111111]/15">
                        <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#102D69] flex items-center gap-1 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          VERIFIED INSTITUTIONAL CITATIONS &amp; SYLLABUS REFERENCES
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.citations.map((cite, cIdx) => (
                            <div 
                              key={cIdx}
                              className="px-2 py-1 rounded-[2px] bg-[#E6DED4] border border-[#111111] text-[11px] font-tech font-bold uppercase tracking-wide text-[#111111] flex items-center gap-1"
                            >
                              <span className="bg-[#102D69] text-[#F6F2EB] px-1 py-0.2 rounded-[2px] text-[10px] font-mono">
                                {cite.courseCode || 'VTU'}
                              </span>
                              <span className="truncate max-w-xs">{cite.title}</span>
                              {cite.source && (
                                <span className="text-[#111111]/60 font-sans italic lowercase text-[10px] truncate max-w-[120px]">
                                  ({cite.source})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Message Actions */}
                    {isBot && (
                      <div className="mt-3 pt-2 border-t border-[#111111]/10 flex items-center justify-between text-xs font-tech font-bold">
                        <span className="text-[#111111]/60 uppercase tracking-widest text-[10px]">
                          LAB-101 DUAL INDEXED (BGE-M3 + BM25)
                        </span>
                        <button
                          onClick={() => handleCopy(msg.text, index)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-[#E6DED4] hover:bg-[#DCD2C6] border border-[#111111] text-[#111111] cursor-pointer"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>COPY ANSWER</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                  </div>

                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-[2px] bg-[#F5B700] border border-[#111111] flex items-center justify-center text-[#111111] shrink-0 font-bold font-heading text-sm shadow-print-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-[2px] bg-[#102D69] border border-[#111111] flex items-center justify-center text-[#F5B700] shrink-0 font-heading text-sm shadow-print-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] shadow-print text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#102D69] animate-ping" />
                <span>Searching PACE Syllabus Chunks &amp; LAB-101 HPC Model...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Fast Prompt Suggestions Carousel / Strip */}
        <div className="bg-[#DCD2C6] border-t-2 border-[#111111] p-2 px-4 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="font-tech text-xs font-bold uppercase tracking-wider text-[#102D69] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F5B700]" />
            EXAM PRESETS:
          </span>
          {SAMPLE_PROMPTS.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendMessage(prompt.query)}
              className="px-2.5 py-1 rounded-[2px] bg-[#F6F2EB] hover:bg-[#102D69] hover:text-[#F6F2EB] text-[#111111] font-tech text-xs font-bold uppercase tracking-wide border border-[#111111] shadow-print-sm hover:shadow-print transition-all shrink-0 cursor-pointer text-left"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        {/* Input Textarea Bar */}
        <div className="bg-[#F6F2EB] border-t-2 border-[#111111] p-3 sm:p-4 shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  selectedCourse === 'ALL'
                    ? "Ask any question e.g. 'Explain Dijkstra for 8 marks' or 'POSIX fork C lab code'..."
                    : `Ask about ${selectedCourse} syllabus, algorithms, lab code, or exam questions...`
                }
                className="w-full px-3 sm:px-4 py-2.5 bg-[#E6DED4] border-2 border-[#111111] rounded-[2px] text-xs sm:text-sm font-sans focus:outline-none focus:bg-[#F6F2EB] focus:ring-1 focus:ring-[#102D69] placeholder:text-[#111111]/50 text-[#111111] font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 sm:px-6 py-2.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] disabled:opacity-50 disabled:cursor-not-allowed text-[#F6F2EB] font-tech text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-[#111111] shadow-print flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-[#F5B700]" />
              <span className="hidden sm:inline">QUERY</span>
              <CornerDownLeft className="w-3 h-3 opacity-60 hidden md:inline" />
            </button>
          </form>

          <div className="flex items-center justify-between mt-2 font-tech text-[11px] text-[#111111]/60 uppercase tracking-widest font-semibold">
            <span>PACE CSE IN-HOUSE RAG · VERIFIED AUTONOMOUS VTU SCHEME</span>
            <span className="font-mono text-[10px]">ESC to close · ENTER to query</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// Lightweight Markdown / Text renderer for academic formulas and code blocks
function MessageTextRenderer({ content }) {
  if (!content) return null;

  // Split by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, pIdx) => {
        if (part.startsWith('```')) {
          const firstLineBreak = part.indexOf('\n');
          const lang = part.slice(3, firstLineBreak).trim() || 'code';
          const code = part.slice(firstLineBreak + 1, -3);

          return (
            <div key={pIdx} className="my-2 rounded-[2px] border-2 border-[#111111] bg-[#111111] text-[#F6F2EB] overflow-hidden shadow-print-sm">
              <div className="bg-[#1A1A1A] px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#F5B700] border-b border-[#333333] flex justify-between items-center">
                <span>{lang} SOURCE CODE</span>
                <span className="text-[#888888]">GCC / POSIX COMPLIANT</span>
              </div>
              <pre className="p-3 text-xs font-mono overflow-x-auto leading-relaxed text-[#E6DED4]">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Render standard text with simple markdown styling
        const lines = part.split('\n');
        return (
          <div key={pIdx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={lIdx} className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#102D69] pt-2 border-b border-[#111111]/15 pb-1">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={lIdx} className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wide text-[#111111] pt-1.5">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('#### ')) {
                return (
                  <h4 key={lIdx} className="font-tech text-xs sm:text-sm font-bold uppercase tracking-wider text-[#102D69] pt-1">
                    {line.replace('#### ', '')}
                  </h4>
                );
              }
              if (line.startsWith('> ')) {
                return (
                  <blockquote key={lIdx} className="pl-3 border-l-2 border-[#102D69] text-xs font-sans italic text-[#111111]/80 my-1 bg-[#E6DED4]/50 py-1 pr-2">
                    {line.replace('> ', '')}
                  </blockquote>
                );
              }
              if (line.startsWith('- ') || line.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm pl-2">
                    <span className="text-[#102D69] font-bold">•</span>
                    <span>{line.replace(/^[-*]\s+/, '')}</span>
                  </div>
                );
              }
              if (line.trim() === '---') {
                return <hr key={lIdx} className="border-t border-[#111111]/20 my-2" />;
              }
              if (!line.trim()) {
                return <div key={lIdx} className="h-1" />;
              }
              return (
                <p key={lIdx} className="text-xs sm:text-sm leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
