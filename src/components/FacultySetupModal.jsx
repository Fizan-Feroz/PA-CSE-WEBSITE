import React, { useState, useEffect } from 'react';
import {
  X, Upload, Sparkles, Calendar, BookOpen, Download, RotateCcw,
  Plus, CheckCircle2, AlertCircle, Image as ImageIcon, Cloud, LogIn, LogOut
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { resolveDriveUrls } from '../utils/driveHelper';
import {
  fileToBase64,
  parseTimetableImageWithOllama,
  clearPortalOverrides,
  upsertTimetableToSupabase,
  upsertCourseToSupabase,
  uploadFileToSupabaseStorage
} from '../utils/portalStore';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

export default function FacultySetupModal({
  isOpen,
  onClose,
  timetables,
  onSaveTimetables,
  courses,
  onSaveCourses
}) {
  const [activeTab, setActiveTab] = useState('timetable'); // 'timetable' | 'courses'
  const supabaseReady = isSupabaseConfigured();
  const [userEmail, setUserEmail] = useState('');
  const [authEmailInput, setAuthEmailInput] = useState('');
  const [authStatus, setAuthStatus] = useState('');

  // Timetable state
  const [sectionName, setSectionName] = useState('CSE-3A');
  const [semesterLabel, setSemesterLabel] = useState('Semester 3');
  const [roomLabel, setRoomLabel] = useState('Academic Block A · Room 104');
  const [dayTextMap, setDayTextMap] = useState({
    MON: '09:00 Data Structures (BCS304)\n10:00 OS & Architecture\n11:15 Discrete Math\n02:00 DSA Lab (LAB-105)',
    TUE: '09:00 Discrete Math\n10:00 Data Structures (BCS304)\n11:15 OOP with Java\n02:00 Java Lab (LAB-112)',
    WED: '09:00 OS & Architecture\n10:00 Digital Design\n11:15 Data Structures (BCS304)\n02:00 Library / GLUG',
    THU: '09:00 OOP with Java\n10:00 Discrete Math\n11:15 Digital Design\n02:00 DSA Lab (LAB-105)',
    FRI: '09:00 Data Structures (BCS304)\n10:00 OS & Architecture\n11:15 Seminar / ASCII\n02:00 Mentoring Hour'
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [visionModel, setVisionModel] = useState('llama3.2-vision');
  const [aiStatus, setAiStatus] = useState({ type: 'idle', msg: '' });

  // Course & Files state
  const [selectedCourseCode, setSelectedCourseCode] = useState(courses[0]?.code || '');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseSem, setNewCourseSem] = useState('Semester 3');
  const [newCourseCredits, setNewCourseCredits] = useState('4');
  const [newCourseDomain, setNewCourseDomain] = useState('Systems & Software Engineering');

  const [matType, setMatType] = useState('Notes');
  const [matTitle, setMatTitle] = useState('');
  const [matUrl, setMatUrl] = useState('');
  const [matContent, setMatContent] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [statusToast, setStatusToast] = useState('');

  useEffect(() => {
    if (!supabaseReady || !supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data?.user?.email || '');
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || '');
    });
    return () => sub?.subscription?.unsubscribe();
  }, [supabaseReady]);

  useEffect(() => {
    function onKey(e) {
      if (isOpen && e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function showToast(msg) {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(''), 3500);
  }

  async function handleSendMagicLink(e) {
    e.preventDefault();
    if (!supabase || !authEmailInput.trim()) return;
    setAuthStatus('Sending login link...');
    const { error } = await supabase.auth.signInWithOtp({
      email: authEmailInput.trim(),
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) {
      setAuthStatus(`Error: ${error.message}`);
    } else {
      setAuthStatus('Magic link sent! Check your @pace.edu.in inbox.');
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUserEmail('');
    setAuthStatus('');
  }

  function handleLoadExistingSection(sec) {
    const found = timetables.find(t => t.section === sec);
    setSectionName(sec);
    if (found) {
      setSemesterLabel(found.semester);
      setRoomLabel(found.room);
      const nextMap = {};
      DAYS.forEach(d => {
        const row = found.schedule.find(r => r.day === d);
        nextMap[d] = row ? row.slots.join('\n') : '';
      });
      setDayTextMap(nextMap);
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const { dataUrl, base64 } = await fileToBase64(file);
    setImagePreview(dataUrl);
    setImageBase64(base64);
    setAiStatus({ type: 'idle', msg: `Loaded "${file.name}". Click "Extract with Local AI" or edit slots alongside the image.` });
  }

  async function handleExtractWithOllama() {
    if (!imageBase64) {
      setAiStatus({ type: 'error', msg: 'Please upload a timetable image first.' });
      return;
    }
    setAiStatus({ type: 'loading', msg: `Scanning timetable image with local ${visionModel} (127.0.0.1:11434)...` });
    try {
      const parsed = await parseTimetableImageWithOllama({
        base64: imageBase64,
        model: visionModel,
        sectionName
      });
      if (parsed.semester) setSemesterLabel(parsed.semester);
      if (parsed.room) setRoomLabel(parsed.room);
      if (Array.isArray(parsed.schedule)) {
        const nextMap = { ...dayTextMap };
        parsed.schedule.forEach(row => {
          const dayKey = String(row.day || '').toUpperCase().slice(0, 3);
          if (DAYS.includes(dayKey) && Array.isArray(row.slots)) {
            nextMap[dayKey] = row.slots.join('\n');
          }
        });
        setDayTextMap(nextMap);
      }
      setAiStatus({ type: 'success', msg: 'Timetable extracted! Review the slots below and click Save Timetable.' });
    } catch (err) {
      setAiStatus({
        type: 'error',
        msg: `${err.message} Tip: You can still read your uploaded image on the left and edit slots manually.`
      });
    }
  }

  async function handleSaveTimetable() {
    const cleanSec = sectionName.trim().toUpperCase() || 'CSE-A';
    const schedule = DAYS.map(day => ({
      day,
      slots: (dayTextMap[day] || '')
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
    }));

    const newEntry = {
      section: cleanSec,
      semester: semesterLabel.trim() || 'Semester 3',
      room: roomLabel.trim() || 'Academic Block A',
      schedule
    };

    const idx = timetables.findIndex(t => t.section === cleanSec);
    const updated = idx >= 0
      ? timetables.map((t, i) => (i === idx ? newEntry : t))
      : [...timetables, newEntry];

    onSaveTimetables(updated);

    if (supabaseReady && userEmail) {
      const res = await upsertTimetableToSupabase(newEntry);
      if (res.ok) {
        showToast(`Published ${cleanSec} to Supabase Cloud & Student Hub!`);
        return;
      }
      showToast(`Saved locally (Supabase sync failed: ${res.reason})`);
      return;
    }

    showToast(`Saved timetable for ${cleanSec}! Live in Student Hub.`);
  }

  async function handleUploadPdfToSupabase(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const publicUrl = await uploadFileToSupabaseStorage(file, selectedCourseCode || 'general');
      setMatUrl(publicUrl);
      setMatTitle(prev => prev || file.name.replace(/\.[^/.]+$/, ''));
      showToast('Uploaded file to Supabase Storage!');
    } catch (err) {
      showToast(`Upload error: ${err.message}`);
    } finally {
      setUploadingFile(false);
    }
  }

  async function handleTextFileAttach(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setMatTitle(prev => prev || file.name.replace(/\.[^/.]+$/, ''));
    setMatContent(text);
    showToast(`Loaded "${file.name}" into study pack editor.`);
  }

  async function handleAddMaterial() {
    if (!selectedCourseCode || !matTitle.trim()) {
      showToast('Select a course and enter a material title.');
      return;
    }

    const driveInfo = resolveDriveUrls(matUrl);
    const formatLabel =
      driveInfo.kind === 'drive-folder'
        ? 'Google Drive Folder'
        : driveInfo.kind === 'drive-file' || driveInfo.kind === 'google-doc'
          ? 'Google Drive'
          : matUrl.trim()
            ? 'PDF / Cloud Storage'
            : 'Built-in Study Guide';

    const newMat = {
      id: `custom-${Date.now()}`,
      type: matType,
      title: matTitle.trim(),
      format: formatLabel,
      url: matUrl.trim(),
      content: matContent.trim() || `# ${selectedCourseCode} — ${matTitle.trim()}\n\nUploaded via PACE CSE Faculty Quick Setup.`
    };

    let targetCourse = null;
    const updated = courses.map(c => {
      if (c.code !== selectedCourseCode) return c;
      targetCourse = {
        ...c,
        materials: [...(c.materials || []), newMat]
      };
      return targetCourse;
    });

    onSaveCourses(updated);
    setMatTitle('');
    setMatUrl('');
    setMatContent('');

    if (supabaseReady && userEmail && targetCourse) {
      const res = await upsertCourseToSupabase(targetCourse);
      if (res.ok) {
        showToast(`Synced "${newMat.title}" to Supabase Cloud!`);
        return;
      }
      showToast(`Saved locally (Supabase sync failed: ${res.reason})`);
      return;
    }

    showToast(`Added "${newMat.title}" to ${selectedCourseCode}!`);
  }

  async function handleAddNewCourse() {
    if (!newCourseCode.trim() || !newCourseTitle.trim()) {
      showToast('Enter both Course Code and Title.');
      return;
    }
    const code = newCourseCode.trim().toUpperCase();
    if (courses.some(c => c.code === code)) {
      showToast(`Course ${code} already exists—select it above to add files.`);
      return;
    }
    const newCourse = {
      code,
      title: newCourseTitle.trim(),
      semester: newCourseSem,
      scheme: 'VTU 2022 Scheme',
      credits: Number(newCourseCredits) || 3,
      domain: newCourseDomain,
      topics: ['Module 1–5 Core Concepts', 'Lab & Practical Exercises'],
      materials: []
    };
    const updated = [...courses, newCourse];
    onSaveCourses(updated);
    setSelectedCourseCode(code);
    setNewCourseCode('');
    setNewCourseTitle('');

    if (supabaseReady && userEmail) {
      await upsertCourseToSupabase(newCourse);
    }

    showToast(`Created course ${code}! Now attach files to it above.`);
  }

  function handleExportJson() {
    const payload = JSON.stringify({ timetables, courses }, null, 2);
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pace-cse-portal-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported pace-cse-portal-data.json!');
  }

  function handleResetAll() {
    clearPortalOverrides();
    showToast('Reset local browser overrides back to defaults.');
  }

  const resolvedUrlPreview = resolveDriveUrls(matUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111111]/80 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#F6F2EB] border-2 border-[#111111] shadow-print-cobalt rounded-[2px] flex flex-col overflow-hidden z-10">

        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#111111] bg-[#E6DED4]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
              FACULTY SETUP
            </span>
            <span className="font-tech text-sm sm:text-base font-bold uppercase text-[#111111]">
              TIMETABLE IMAGE SCANNER &amp; COURSE FILE MANAGER
            </span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#111111] text-[#F6F2EB] font-mono text-[11px] font-bold uppercase cursor-pointer hover:bg-[#102D69]"
          >
            <X className="w-3.5 h-3.5" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Supabase Cloud & Faculty Auth Strip */}
        <div className="px-4 py-2 border-b-2 border-[#111111] bg-[#F6F2EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-tech font-bold uppercase">
            <Cloud className="w-4 h-4 text-[#102D69]" />
            {supabaseReady ? (
              userEmail ? (
                <span className="text-[#102D69]">
                  SUPABASE CLOUD CONNECTED · SIGNED IN AS <span className="font-mono text-[#111111]">{userEmail}</span>
                </span>
              ) : (
                <span className="text-[#111111]">
                  SUPABASE CONFIGURED — SIGN IN WITH <span className="font-mono">@pace.edu.in</span> TO PUBLISH TO ALL STUDENTS
                </span>
              )
            ) : (
              <span className="text-[#111111]/75">
                LOCAL PREVIEW MODE (ADD <code className="font-mono bg-[#E6DED4] px-1">VITE_SUPABASE_URL</code> IN <code className="font-mono bg-[#E6DED4] px-1">.env.local</code> FOR LIVE CLOUD SYNC)
              </span>
            )}
          </div>

          {supabaseReady && (
            userEmail ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#E6DED4] border border-[#111111] font-tech text-[11px] font-bold uppercase cursor-pointer self-start sm:self-auto"
              >
                <LogOut className="w-3 h-3" />
                <span>SIGN OUT</span>
              </button>
            ) : (
              <form onSubmit={handleSendMagicLink} className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  placeholder="faculty@pace.edu.in"
                  className="px-2 py-1 rounded-[2px] bg-[#E6DED4] border border-[#111111] font-mono text-[11px] w-44"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-[11px] font-bold uppercase cursor-pointer"
                >
                  <LogIn className="w-3 h-3" />
                  <span>SIGN IN</span>
                </button>
                {authStatus && <span className="font-sans text-[11px] text-[#102D69] font-semibold">{authStatus}</span>}
              </form>
            )
          )}
        </div>

        {/* Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b-2 border-[#111111] bg-[#E6DED4]/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('timetable')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer ${
                activeTab === 'timetable' ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm' : 'bg-[#F6F2EB] text-[#111111]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>1. TIMETABLE FROM IMAGE</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer ${
                activeTab === 'courses' ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm' : 'bg-[#F6F2EB] text-[#111111]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>2. COURSE DETAILS, DRIVE &amp; FILES</span>
            </button>
          </div>

          {statusToast && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111] font-tech text-xs font-bold uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {statusToast}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#E6DED4]">
          {activeTab === 'timetable' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left: Image Upload + Local AI Vision Extractor */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-3">
                  <span className="font-tech text-xs font-bold uppercase text-[#102D69] flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    UPLOAD TIMETABLE PHOTO / SCREENSHOT
                  </span>

                  <label className="block border-2 border-dashed border-[#111111] bg-[#E6DED4] hover:bg-[#DCD2C6] rounded-[2px] p-4 text-center cursor-pointer transition-colors">
                    <Upload className="w-6 h-6 mx-auto text-[#102D69] mb-1.5" />
                    <span className="font-tech text-xs font-bold uppercase text-[#111111] block">
                      CLICK TO CHOOSE TIMETABLE IMAGE (PNG / JPG)
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>

                  {imagePreview && (
                    <div className="border-2 border-[#111111] rounded-[2px] overflow-hidden bg-[#111111]">
                      <img src={imagePreview} alt="Uploaded timetable preview" className="w-full max-h-60 object-contain" />
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#111111]/20 space-y-2">
                    <label className="font-mono text-[10px] font-bold uppercase text-[#111111]/70 block">
                      LOCAL OLLAMA VISION MODEL (OPTIONAL AUTO-FILL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={visionModel}
                        onChange={(e) => setVisionModel(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] font-mono text-xs"
                        placeholder="llama3.2-vision"
                      />
                      <button
                        onClick={handleExtractWithOllama}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer shrink-0"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AUTO-EXTRACT</span>
                      </button>
                    </div>

                    {aiStatus.msg && (
                      <div className={`p-2.5 rounded-[2px] border border-[#111111] text-[11px] font-sans flex items-start gap-1.5 ${
                        aiStatus.type === 'error' ? 'bg-[#F5B700]/25' : 'bg-[#E6DED4]'
                      }`}>
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#102D69]" />
                        <span>{aiStatus.msg}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Section Editor */}
              <div className="lg:col-span-7 bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#111111]">
                  <span className="font-tech text-xs font-bold uppercase text-[#102D69]">
                    EDIT SECTION SCHEDULE (ONE SLOT PER LINE)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {timetables.map(t => (
                      <button
                        key={t.section}
                        onClick={() => handleLoadExistingSection(t.section)}
                        className="px-2 py-0.5 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] border border-[#111111] font-mono text-[10px] font-bold cursor-pointer"
                      >
                        {t.section}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-tech text-[11px] font-bold uppercase block mb-1">SECTION NAME</label>
                    <input
                      type="text"
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs font-bold"
                      placeholder="CSE-3A"
                    />
                  </div>
                  <div>
                    <label className="font-tech text-[11px] font-bold uppercase block mb-1">SEMESTER</label>
                    <input
                      type="text"
                      value={semesterLabel}
                      onChange={(e) => setSemesterLabel(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-tech text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-tech text-[11px] font-bold uppercase block mb-1">ROOM / BLOCK</label>
                    <input
                      type="text"
                      value={roomLabel}
                      onChange={(e) => setRoomLabel(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-tech text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DAYS.map(day => (
                    <div key={day}>
                      <label className="font-mono text-[11px] font-bold text-[#102D69] block mb-1">{day} SLOTS</label>
                      <textarea
                        rows={3}
                        value={dayTextMap[day] || ''}
                        onChange={(e) => setDayTextMap(prev => ({ ...prev, [day]: e.target.value }))}
                        className="w-full p-2 rounded-[2px] bg-[#E6DED4] border border-[#111111] font-sans text-xs"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSaveTimetable}
                  className="w-full py-2.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  SAVE &amp; PUBLISH TIMETABLE FOR {sectionName.toUpperCase()}
                </button>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left: Attach Notes / Drive Link / Supabase PDF to Course */}
              <div className="lg:col-span-7 bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-4">
                <span className="font-tech text-xs font-bold uppercase text-[#102D69] block pb-2 border-b-2 border-[#111111]">
                  ATTACH SYLLABUS, NOTES, LAB MANUAL OR PYQ TO A COURSE
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-tech text-[11px] font-bold uppercase block mb-1">SELECT COURSE</label>
                    <select
                      value={selectedCourseCode}
                      onChange={(e) => setSelectedCourseCode(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs font-bold"
                    >
                      {courses.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.code} — {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-tech text-[11px] font-bold uppercase block mb-1">MATERIAL TYPE</label>
                    <select
                      value={matType}
                      onChange={(e) => setMatType(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-tech text-xs font-bold uppercase"
                    >
                      <option value="Notes">Notes</option>
                      <option value="Syllabus">Syllabus</option>
                      <option value="Lab Manual">Lab Manual</option>
                      <option value="PYQ">PYQ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-tech text-[11px] font-bold uppercase block mb-1">MATERIAL TITLE</label>
                  <input
                    type="text"
                    value={matTitle}
                    onChange={(e) => setMatTitle(e.target.value)}
                    placeholder="e.g. Module 1–5 Handwritten Notes / VTU Dec 2025 PYQ"
                    className="w-full px-3 py-2 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-sans text-xs"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <label className="font-tech text-[11px] font-bold uppercase">
                      GOOGLE DRIVE (FILE/FOLDER/DOCS) OR PDF URL
                    </label>
                    {supabaseReady && userEmail && (
                      <label className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 bg-[#102D69] text-[#F6F2EB] rounded-[2px] cursor-pointer">
                        {uploadingFile ? 'UPLOADING...' : 'UPLOAD PDF TO SUPABASE'}
                        <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={handleUploadPdfToSupabase} className="hidden" />
                      </label>
                    )}
                  </div>
                  <input
                    type="url"
                    value={matUrl}
                    onChange={(e) => setMatUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/FOLDER_ID or .../file/d/FILE_ID/view"
                    className="w-full px-3 py-2 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs"
                  />
                  {matUrl.trim() && (
                    <p className="font-mono text-[10px] text-[#102D69] mt-1">
                      Detected format: <strong>{resolvedUrlPreview.kind}</strong> — embeds directly inside website viewer + 1-click download/open.
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-tech text-[11px] font-bold uppercase">
                      OR PASTE / UPLOAD MARKDOWN STUDY GUIDE (.MD / .TXT)
                    </label>
                    <label className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 bg-[#F5B700] border border-[#111111] rounded-[2px] cursor-pointer">
                      LOAD .MD/.TXT FILE
                      <input type="file" accept=".md,.txt" onChange={handleTextFileAttach} className="hidden" />
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    value={matContent}
                    onChange={(e) => setMatContent(e.target.value)}
                    placeholder="# Module Notes or Lab Program List..."
                    className="w-full p-2.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs"
                  />
                </div>

                <button
                  onClick={handleAddMaterial}
                  className="w-full py-2.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD MATERIAL TO {selectedCourseCode}</span>
                </button>
              </div>

              {/* Right: Add New Course */}
              <div className="lg:col-span-5 bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-3 h-fit">
                <span className="font-tech text-xs font-bold uppercase text-[#102D69] block pb-2 border-b-2 border-[#111111]">
                  OR CREATE A NEW COURSE ENTRY
                </span>
                <div>
                  <label className="font-tech text-[11px] font-bold uppercase block mb-1">SUBJECT CODE</label>
                  <input
                    type="text"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    placeholder="e.g. BCS503"
                    className="w-full px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs uppercase"
                  />
                </div>
                <div>
                  <label className="font-tech text-[11px] font-bold uppercase block mb-1">SUBJECT TITLE</label>
                  <input
                    type="text"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    placeholder="e.g. Theory of Computation"
                    className="w-full px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-sans text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-tech text-[11px] font-bold uppercase block mb-1">SEMESTER</label>
                    <select
                      value={newCourseSem}
                      onChange={(e) => setNewCourseSem(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-tech text-xs font-bold"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={`Semester ${n}`}>Semester {n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-tech text-[11px] font-bold uppercase block mb-1">CREDITS</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={newCourseCredits}
                      onChange={(e) => setNewCourseCredits(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-tech text-[11px] font-bold uppercase block mb-1">DOMAIN</label>
                  <input
                    type="text"
                    value={newCourseDomain}
                    onChange={(e) => setNewCourseDomain(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-sans text-xs"
                  />
                </div>
                <button
                  onClick={handleAddNewCourse}
                  className="w-full py-2 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  CREATE COURSE ENTRY
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Bottom Persistence & Export Bar */}
        <div className="px-4 py-2.5 border-t-2 border-[#111111] bg-[#E6DED4] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-sans text-[11px] font-medium text-[#111111]/80">
            {supabaseReady
              ? 'Supabase configured: signed-in faculty changes sync live to all students.'
              : 'Local preview mode: changes save in this browser; export JSON or configure .env.local for Supabase.'}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-[#F6F2EB] hover:bg-[#DCD2C6] text-[#111111] border border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] bg-[#111111] hover:bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#F5B700]" />
              <span>EXPORT PORTAL JSON</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
