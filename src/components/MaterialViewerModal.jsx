import React, { useState, useEffect } from 'react';
import { X, Download, FileText, BookOpen, Terminal, HelpCircle, ExternalLink, Printer, Copy, Check } from 'lucide-react';
import { resolveDriveUrls } from '../utils/driveHelper';

const TYPE_ICONS = {
  Syllabus: BookOpen,
  Notes: FileText,
  'Lab Manual': Terminal,
  PYQ: HelpCircle
};

function renderInlineMarkdown(text) {
  const parts = String(text || '').split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={i} className="px-1.5 py-0.5 mx-0.5 rounded-[2px] bg-[#E6DED4] border border-[#111111]/30 font-mono text-[11px] sm:text-xs font-bold text-[#102D69]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-[#111111]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function MarkdownStudyView({ content }) {
  const [copiedBlock, setCopiedBlock] = useState(null);
  const lines = String(content || 'No preview available for this item.').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim() || 'code';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    // Markdown table
    if (line.trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const rows = tableLines
        .filter((r) => !/^\|[\s:|-]+\|$/.test(r))
        .map((r) =>
          r
            .slice(1, -1)
            .split('|')
            .map((cell) => cell.trim())
        );
      blocks.push({ type: 'table', rows });
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.slice(2) });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push({ type: 'quote', text: line.slice(2) });
      i++;
      continue;
    }

    // List item (- or 1.)
    if (/^(\s*[-*]|\s*\d+\.)\s+/.test(line)) {
      const items = [];
      const ordered = /^\s*\d+\./.test(line);
      while (i < lines.length && /^(\s*[-*]|\s*\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^(\s*[-*]|\s*\d+\.)\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    blocks.push({ type: 'p', text: line });
    i++;
  }

  function handleCopyCode(code, idx) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedBlock(idx);
      setTimeout(() => setCopiedBlock(null), 1600);
    }
  }

  return (
    <div className="space-y-3 font-sans text-xs sm:text-sm text-[#111111] leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === 'h1') {
          return (
            <h3 key={idx} className="font-heading text-2xl sm:text-3xl font-bold uppercase text-[#102D69] border-b-2 border-[#111111] pb-1.5">
              {renderInlineMarkdown(block.text)}
            </h3>
          );
        }
        if (block.type === 'h2') {
          return (
            <h4 key={idx} className="font-tech text-sm sm:text-base font-bold uppercase tracking-wider text-[#111111] pt-2 border-b border-[#111111]/20 pb-1">
              {renderInlineMarkdown(block.text)}
            </h4>
          );
        }
        if (block.type === 'h3') {
          return (
            <h5 key={idx} className="font-tech text-xs sm:text-sm font-bold uppercase tracking-wider text-[#102D69] pt-1">
              {renderInlineMarkdown(block.text)}
            </h5>
          );
        }
        if (block.type === 'quote') {
          return (
            <div key={idx} className="p-3 bg-[#F5B700]/20 border-l-4 border-[#102D69] border-y border-r border-[#111111]/30 rounded-[2px] font-medium">
              {renderInlineMarkdown(block.text)}
            </div>
          );
        }
        if (block.type === 'code') {
          return (
            <div key={idx} className="border-2 border-[#111111] rounded-[2px] overflow-hidden bg-[#111111] text-[#F6F2EB]">
              <div className="flex items-center justify-between px-3 py-1 bg-[#102D69] border-b border-[#F6F2EB]/20 font-mono text-[10px] uppercase">
                <span>{block.lang}</span>
                <button
                  onClick={() => handleCopyCode(block.code, idx)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-[#F5B700] text-[#111111] font-bold cursor-pointer"
                >
                  {copiedBlock === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBlock === idx ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <pre className="p-3 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }
        if (block.type === 'table' && block.rows.length > 0) {
          const [header, ...bodyRows] = block.rows;
          return (
            <div key={idx} className="overflow-x-auto border-2 border-[#111111] rounded-[2px]">
              <table className="w-full text-left border-collapse font-mono text-[11px] sm:text-xs">
                <thead className="bg-[#102D69] text-[#F6F2EB]">
                  <tr>
                    {header.map((cell, cIdx) => (
                      <th key={cIdx} className="px-3 py-2 border-b-2 border-[#111111] uppercase font-bold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-[#F6F2EB]' : 'bg-[#E6DED4]'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-1.5 border-t border-[#111111]/30">
                          {renderInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <ListTag
              key={idx}
              className={`pl-5 space-y-1 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="font-medium">
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ListTag>
          );
        }
        return (
          <p key={idx} className="font-medium">
            {renderInlineMarkdown(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export default function MaterialViewerModal({ course, onClose }) {
  const materials = course?.materials || [];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    function handleAfterPrint() {
      document.body.classList.remove('printing-material');
    }
    window.addEventListener('keydown', handleKey);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('printing-material');
    };
  }, [onClose]);

  function handlePrintStudyPack() {
    document.body.classList.add('printing-material');
    window.print();
    setTimeout(() => document.body.classList.remove('printing-material'), 500);
  }

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
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handlePrintStudyPack}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[2px] bg-[#E6DED4] hover:bg-[#DCD2C6] text-[#111111] border-2 border-[#111111] font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>PRINT / PDF</span>
                  </button>
                  <button
                    onClick={handleDownloadBuiltIn}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD STUDY PACK (.MD)</span>
                  </button>
                </div>
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
            <div id="material-print-root" className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-5 sm:p-6">
              <div className="hidden print:block mb-4 pb-2 border-b-2 border-[#111111]">
                <p className="font-mono text-xs font-bold uppercase">{course.code} · {course.semester} · PACE CSE</p>
                <h2 className="font-heading text-2xl font-bold uppercase">{course.title} — {activeMat?.title}</h2>
              </div>
              <MarkdownStudyView content={activeMat?.content} />
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
