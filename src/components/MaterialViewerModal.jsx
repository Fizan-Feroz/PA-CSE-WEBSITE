import React, { useState, useEffect } from 'react';
import { X, Download, FileText, BookOpen, Terminal, HelpCircle, ExternalLink } from 'lucide-react';
import { resolveDriveUrls } from '../utils/driveHelper';

const TYPE_ICONS = {
  Syllabus: BookOpen,
  Notes: FileText,
  'Lab Manual': Terminal,
  PYQ: HelpCircle
};

export default function MaterialViewerModal({ course, onClose }) {
  const materials = course?.materials || [];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!course) return null;

  const activeMat = materials[activeIdx] || materials[0];
  const { previewUrl, downloadUrl, kind } = resolveDriveUrls(activeMat?.url);

  function handleDownloadBuiltIn() {
    if (!activeMat) return;
    const text = activeMat.content || `# ${course.code} — ${course.title}\n\n${activeMat.title}`;
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    const safeCode = course.code.replace(/[^a-zA-Z0-9]+/g, '_');
    link.download = `${safeCode}_${activeMat.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111111]/80 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-cobalt rounded-[2px] flex flex-col overflow-hidden z-10">
        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-[#111111] bg-[#E6DED4]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] shrink-0">
              {course.code}
            </span>
            <span className="font-tech text-xs sm:text-sm font-bold uppercase text-[#111111] truncate">
              {course.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] bg-[#111111] text-[#F6F2EB] font-mono text-[11px] font-bold uppercase cursor-pointer hover:bg-[#102D69]"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* Material Switcher Tabs */}
        {materials.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 border-b-2 border-[#111111] bg-[#E6DED4]/60 overflow-x-auto">
            {materials.map((mat, idx) => {
              const Icon = TYPE_ICONS[mat.type] || FileText;
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider border-2 border-[#111111] shrink-0 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm -translate-x-px -translate-y-px'
                      : 'bg-[#F6F2EB] text-[#111111] hover:bg-[#DCD2C6]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mat.type}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Material Header & Action Bar */}
        {activeMat && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-b-2 border-[#111111] bg-[#F6F2EB]">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#102D69] block">
                {course.semester} · {course.scheme} · {activeMat.format}
              </span>
              <h4 className="font-tech text-base sm:text-lg font-bold uppercase text-[#111111]">
                {activeMat.title}
              </h4>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {downloadUrl ? (
                <>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={kind !== 'drive-folder'}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{kind === 'drive-folder' ? 'OPEN DRIVE FOLDER' : 'DOWNLOAD FILE'}</span>
                  </a>
                  <a
                    href={activeMat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-[2px] bg-[#E6DED4] text-[#111111] border-2 border-[#111111] font-tech text-xs font-bold uppercase"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>OPEN SOURCE</span>
                  </a>
                </>
              ) : (
                <button
                  onClick={handleDownloadBuiltIn}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD STUDY PACK (.MD)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* In-Site Document Viewer Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#E6DED4]">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              title={activeMat?.title || 'Course Material Viewer'}
              className="w-full h-[460px] bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px]"
            />
          ) : (
            <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-5 sm:p-6">
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#111111] leading-relaxed">
                {activeMat?.content || 'No preview available for this item.'}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-4 py-2 border-t-2 border-[#111111] bg-[#E6DED4] flex items-center justify-between font-tech text-[11px] font-bold uppercase text-[#111111]/70">
          <span>Supports built-in study packs, local PDFs &amp; Google Drive bulk previews</span>
          <span className="font-mono text-[#102D69]">PACE CSE MATERIALS VAULT</span>
        </div>
      </div>
    </div>
  );
}
