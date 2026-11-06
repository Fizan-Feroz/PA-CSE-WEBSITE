import React, { useState } from 'react';
import { 
  X, Lock, Unlock, Save, Plus, Trash2, Download, Upload, 
  RotateCcw, Check, AlertCircle, Building2, Users, Cpu, 
  BookOpen, Sparkles, Rocket, Calendar, Clock, Megaphone
} from 'lucide-react';
import { useDepartmentData } from '../context/DepartmentContextCore';

export default function AdminModal() {
  const {
    collegeInfo,
    domains,
    faculty,
    labs,
    curriculum,
    projects,
    events,
    milestones,
    announcement,
    isAdmin,
    isAdminModalOpen,
    adminActiveTab,
    loginAdmin,
    logoutAdmin,
    closeAdminModal,
    setAdminActiveTab,
    updateCollegeInfo,
    updateDomain,
    updateFaculty,
    addFaculty,
    deleteFaculty,
    updateLab,
    updateCourse,
    addCourse,
    deleteCourse,
    updateProject,
    addProject,
    deleteProject,
    updateEvent,
    addEvent,
    deleteEvent,
    updateMilestone,
    addMilestone,
    deleteMilestone,
    updateAnnouncement,
    exportDataJSON,
    importDataJSON,
    resetToDefaults
  } = useDepartmentData();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Editing state for sub-items
  const [editingFacultyId, setEditingFacultyId] = useState(null);
  const [newFacultyForm, setNewFacultyForm] = useState(null);

  const [editingDomainId, setEditingDomainId] = useState(null);
  const [editingLabId, setEditingLabId] = useState(null);

  const [editingCourseCode, setEditingCourseCode] = useState(null);
  const [newCourseForm, setNewCourseForm] = useState(null);

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [newProjectForm, setNewProjectForm] = useState(null);

  const [editingEventId, setEditingEventId] = useState(null);
  const [newEventForm, setNewEventForm] = useState(null);

  const [editingMilestoneIndex, setEditingMilestoneIndex] = useState(null);
  const [newMilestoneForm, setNewMilestoneForm] = useState(null);

  const [importJsonText, setImportJsonText] = useState('');

  if (!isAdminModalOpen) return null;

  function triggerToast(msg) {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  }

  function handleLogin(e) {
    e.preventDefault();
    const res = loginAdmin(pinInput);
    if (res.success) {
      setAuthError('');
      setPinInput('');
      triggerToast('Admin Mode unlocked successfully!');
    } else {
      setAuthError(res.message);
    }
  }

  const TABS = [
    { id: 'general', label: 'College & Dept', icon: Building2 },
    { id: 'announcement', label: 'Banner Alert', icon: Megaphone },
    { id: 'tracks', label: 'Tracks / Domains', icon: Sparkles },
    { id: 'faculty', label: 'Faculty Directory', icon: Users },
    { id: 'labs', label: 'Laboratories', icon: Cpu },
    { id: 'curriculum', label: 'Syllabus & Scheme', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'events', label: 'Events & Conf', icon: Calendar },
    { id: 'timeline', label: '3D Milestones', icon: Clock },
    { id: 'sync', label: 'Backup / Sync', icon: Download }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111111]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-5xl bg-[#E6DED4] border-2 border-[#111111] shadow-print rounded-[2px] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Top Header Strip */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 border-[#111111] bg-[#102D69] text-[#F6F2EB]">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111]">
              {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider leading-none">
                DEPARTMENT CMS &amp; CUSTOMIZER
              </h2>
              <p className="font-tech text-xs tracking-wider uppercase text-[#F6F2EB]/80 hidden sm:block">
                P.A. College of Engineering · Real-Time Content Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => {
                  logoutAdmin();
                  triggerToast('Logged out of Admin Mode');
                }}
                className="px-2.5 py-1 rounded-[2px] bg-[#E6DED4] text-[#111111] hover:bg-[#F6F2EB] font-tech text-xs font-bold uppercase border border-[#111111] cursor-pointer"
              >
                Log Out
              </button>
            )}
            <button
              onClick={closeAdminModal}
              className="p-1 rounded-[2px] hover:bg-[#F6F2EB]/20 text-[#F6F2EB] cursor-pointer transition-colors"
              title="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="bg-[#102D69] text-[#F5B700] px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider border-b-2 border-[#111111] flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Authentication Wall if not logged in */}
        {!isAdmin ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="size-14 rounded-full bg-[#102D69] text-[#F5B700] border-2 border-[#111111] shadow-print-sm flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase text-[#111111]">
              ADMIN AUTHENTICATION
            </h3>
            <p className="font-sans text-xs text-[#111111]/80 leading-relaxed font-medium">
              Enter the department administrator passcode to customize faculty, syllabi, research rigs, projects, and institutional parameters.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter administrator passcode..."
                className="w-full px-3 py-2.5 rounded-[2px] bg-[#F6F2EB] border-2 border-[#111111] font-mono text-sm text-center tracking-widest text-[#111111] focus:outline-none shadow-print-sm"
                autoFocus
              />
              {authError && (
                <p className="text-red-700 font-tech text-xs font-bold uppercase flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {authError}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] font-tech text-sm font-bold uppercase tracking-wider border-2 border-[#111111] shadow-print hover:-translate-x-px hover:-translate-y-px transition-all cursor-pointer"
              >
                UNLOCK ADMIN PANEL
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Tabbed CMS */
          <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 border-b-2 md:border-b-0 md:border-r-2 border-[#111111] bg-[#F6F2EB] p-2 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isSelected = adminActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAdminActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-[2px] font-tech text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap text-left border cursor-pointer ${
                      isSelected
                        ? 'bg-[#102D69] text-[#F6F2EB] border-[#111111] shadow-print-sm -translate-x-px'
                        : 'bg-[#E6DED4]/50 border-transparent hover:border-[#111111]/40 text-[#111111]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#F5B700]' : 'text-[#102D69]'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#E6DED4] min-w-0">
              
              {/* TAB 1: COLLEGE & GENERAL INFO */}
              {adminActiveTab === 'general' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3">
                    <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                      DEPARTMENT &amp; INSTITUTIONAL PARAMETERS
                    </h3>
                    <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                      Live values reflected across hero placards, navigation badges, and portal footers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        value={collegeInfo.name}
                        onChange={(e) => updateCollegeInfo({ name: e.target.value })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-tech text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Principal
                      </label>
                      <input
                        type="text"
                        value={collegeInfo.principal}
                        onChange={(e) => updateCollegeInfo({ principal: e.target.value })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-tech text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        HOD &amp; Vice-Principal
                      </label>
                      <input
                        type="text"
                        value={collegeInfo.vicePrincipalAndHod}
                        onChange={(e) => updateCollegeInfo({ vicePrincipalAndHod: e.target.value })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-tech text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Campus Coordinates
                      </label>
                      <input
                        type="text"
                        value={collegeInfo.coordinates}
                        onChange={(e) => updateCollegeInfo({ coordinates: e.target.value })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Accreditation Badge
                      </label>
                      <input
                        type="text"
                        value={collegeInfo.accreditation}
                        onChange={(e) => updateCollegeInfo({ accreditation: e.target.value })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-tech text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Affiliation
                      </label>
                      <input
                        type="text"
                        value={collegeInfo.affiliation}
                        onChange={(e) => updateCollegeInfo({ affiliation: e.target.value })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-tech text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Department Phone
                      </label>
                      <input
                        type="text"
                        value={collegeInfo.contact?.phone || ''}
                        onChange={(e) => updateCollegeInfo({ 
                          contact: { ...collegeInfo.contact, phone: e.target.value } 
                        })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        HOD Email
                      </label>
                      <input
                        type="email"
                        value={collegeInfo.contact?.hodEmail || ''}
                        onChange={(e) => updateCollegeInfo({ 
                          contact: { ...collegeInfo.contact, hodEmail: e.target.value } 
                        })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Vision & Mission */}
                  <div className="space-y-4 pt-4 border-t-2 border-[#111111]">
                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Department Vision Statement
                      </label>
                      <textarea
                        rows={2}
                        value={collegeInfo.vision}
                        onChange={(e) => updateCollegeInfo({ vision: e.target.value })}
                        className="w-full p-2 bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] font-sans text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Mission Objectives (M1 – M4)
                      </label>
                      <div className="space-y-2">
                        {collegeInfo.mission.map((m, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-1 bg-[#102D69] text-[#F6F2EB] rounded-[2px]">
                              M{idx + 1}
                            </span>
                            <input
                              type="text"
                              value={m}
                              onChange={(e) => {
                                const next = [...collegeInfo.mission];
                                next[idx] = e.target.value;
                                updateCollegeInfo({ mission: next });
                              }}
                              className="flex-1 p-2 bg-[#F6F2EB] border border-[#111111] rounded-[2px] font-sans text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => triggerToast('Institutional settings saved!')}
                      className="px-4 py-2 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-2 border-[#111111] shadow-print-sm hover:-translate-x-px hover:-translate-y-px cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-[#F5B700]" />
                      <span>SAVE CHANGES</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ANNOUNCEMENT BANNER */}
              {adminActiveTab === 'announcement' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3">
                    <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                      URGENT ANNOUNCEMENT / TOP TICKER
                    </h3>
                    <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                      Control the marquee notice displayed above the main navigation bar.
                    </p>
                  </div>

                  <div className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-5 shadow-print-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-tech text-sm font-bold uppercase text-[#111111]">
                        Display Announcement Ticker
                      </span>
                      <input
                        type="checkbox"
                        checked={announcement?.enabled || false}
                        onChange={(e) => updateAnnouncement({ enabled: e.target.checked })}
                        className="w-5 h-5 accent-[#102D69] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Notice Text
                      </label>
                      <input
                        type="text"
                        value={announcement?.text || ''}
                        onChange={(e) => updateAnnouncement({ text: e.target.value })}
                        placeholder="e.g. ADMISSIONS 2026–27 OPEN FOR B.E. COMPUTER SCIENCE & ENGINEERING"
                        className="w-full p-2 bg-[#E6DED4] border-2 border-[#111111] rounded-[2px] font-tech text-sm font-semibold uppercase"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs font-bold uppercase mb-1 text-[#102D69]">
                        Target Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={announcement?.link || ''}
                        onChange={(e) => updateAnnouncement({ link: e.target.value })}
                        placeholder="https://pace.edu.in"
                        className="w-full p-2 bg-[#E6DED4] border-2 border-[#111111] rounded-[2px] font-mono text-xs"
                      />
                    </div>

                    <div className="p-3 bg-[#102D69] text-[#F6F2EB] rounded-[2px] border border-[#111111] flex items-center justify-between text-xs font-tech font-bold uppercase">
                      <span>PREVIEW:</span>
                      <span className="text-[#F5B700] truncate max-w-md">{announcement?.text || 'No active text'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TRACKS / DOMAINS */}
              {adminActiveTab === 'tracks' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                        AUTONOMOUS TRACKS &amp; SPECIALIZATION DOMAINS ({domains.length})
                      </h3>
                      <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                        Controls the interactive SVG Branched Curriculum Circuit Tree.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {domains.map((domain) => {
                      const isEditing = editingDomainId === domain.id;
                      return (
                        <div
                          key={domain.id}
                          className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
                                {domain.code}
                              </span>
                              <h4 className="font-tech text-base font-bold uppercase text-[#111111]">
                                {domain.name}
                              </h4>
                            </div>
                            <button
                              onClick={() => setEditingDomainId(isEditing ? null : domain.id)}
                              className="px-3 py-1 bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] text-[#111111] border border-[#111111] rounded-[2px] font-tech text-xs font-bold uppercase cursor-pointer transition-colors"
                            >
                              {isEditing ? 'Close' : 'Edit Track'}
                            </button>
                          </div>

                          {isEditing ? (
                            <div className="space-y-3 pt-3 border-t border-[#111111]/30">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block font-tech text-xs font-bold uppercase mb-1">Track Name</label>
                                  <input
                                    type="text"
                                    value={domain.name}
                                    onChange={(e) => updateDomain(domain.id, { name: e.target.value })}
                                    className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block font-tech text-xs font-bold uppercase mb-1">Track Head</label>
                                  <input
                                    type="text"
                                    value={domain.head}
                                    onChange={(e) => updateDomain(domain.id, { head: e.target.value })}
                                    className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-sm"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block font-tech text-xs font-bold uppercase mb-1">Summary</label>
                                <textarea
                                  rows={2}
                                  value={domain.summary}
                                  onChange={(e) => updateDomain(domain.id, { summary: e.target.value })}
                                  className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-sans text-xs"
                                />
                              </div>

                              <div>
                                <label className="block font-tech text-xs font-bold uppercase mb-1">
                                  Skills (Comma Separated)
                                </label>
                                <input
                                  type="text"
                                  value={(domain.skills || []).join(', ')}
                                  onChange={(e) => {
                                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                    updateDomain(domain.id, { skills: arr });
                                  }}
                                  className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                />
                              </div>

                              <div>
                                <label className="block font-tech text-xs font-bold uppercase mb-1">
                                  Featured Curriculum Module
                                </label>
                                <input
                                  type="text"
                                  value={domain.featuredCourse}
                                  onChange={(e) => updateDomain(domain.id, { featuredCourse: e.target.value })}
                                  className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                />
                              </div>
                            </div>
                          ) : (
                            <p className="font-sans text-xs text-[#111111]/80">
                              {domain.summary}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: FACULTY DIRECTORY */}
              {adminActiveTab === 'faculty' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                        ACADEMIC COUNCIL &amp; FACULTY ({faculty.length})
                      </h3>
                      <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                        Add, edit, or update professors, specializations, office cabins, and tags.
                      </p>
                    </div>
                    <button
                      onClick={() => setNewFacultyForm({
                        id: `fac-${Date.now()}`,
                        name: '',
                        designation: 'Assistant Professor',
                        department: 'Artificial Intelligence & Machine Learning',
                        qualification: 'M.Tech., Ph.D.',
                        experience: '5+ Years',
                        specialization: '',
                        email: 'faculty@pace.edu.in',
                        office: 'Academic Block A',
                        publications: 5,
                        tags: ['AI', 'Research']
                      })}
                      className="px-3 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#111111] shadow-print-sm hover:-translate-x-px cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F5B700]" />
                      <span>ADD NEW FACULTY</span>
                    </button>
                  </div>

                  {/* Add Faculty Form */}
                  {newFacultyForm && (
                    <div className="p-4 bg-[#F6F2EB] border-2 border-[#102D69] rounded-[2px] shadow-print space-y-3">
                      <div className="flex items-center justify-between border-b border-[#111111]/30 pb-2">
                        <span className="font-tech text-sm font-bold uppercase text-[#102D69]">
                          Create New Faculty Profile
                        </span>
                        <button
                          onClick={() => setNewFacultyForm(null)}
                          className="text-[#111111]/60 hover:text-[#111111]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Name</label>
                          <input
                            type="text"
                            placeholder="Dr. John Doe"
                            value={newFacultyForm.name}
                            onChange={(e) => setNewFacultyForm({ ...newFacultyForm, name: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Designation</label>
                          <input
                            type="text"
                            placeholder="Professor & HOD"
                            value={newFacultyForm.designation}
                            onChange={(e) => setNewFacultyForm({ ...newFacultyForm, designation: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Department</label>
                          <input
                            type="text"
                            placeholder="Domain Track"
                            value={newFacultyForm.department}
                            onChange={(e) => setNewFacultyForm({ ...newFacultyForm, department: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Email</label>
                          <input
                            type="email"
                            value={newFacultyForm.email}
                            onChange={(e) => setNewFacultyForm({ ...newFacultyForm, email: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Office / Cabin</label>
                          <input
                            type="text"
                            value={newFacultyForm.office}
                            onChange={(e) => setNewFacultyForm({ ...newFacultyForm, office: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Experience</label>
                          <input
                            type="text"
                            value={newFacultyForm.experience}
                            onChange={(e) => setNewFacultyForm({ ...newFacultyForm, experience: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-tech text-xs font-bold uppercase mb-1">Specialization</label>
                        <input
                          type="text"
                          placeholder="e.g. Computer Networks, Cryptography, Machine Learning"
                          value={newFacultyForm.specialization}
                          onChange={(e) => setNewFacultyForm({ ...newFacultyForm, specialization: e.target.value })}
                          className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-sans text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setNewFacultyForm(null)}
                          className="px-3 py-1.5 rounded-[2px] bg-[#E6DED4] border border-[#111111] font-tech text-xs font-bold uppercase"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (!newFacultyForm.name) return;
                            addFaculty(newFacultyForm);
                            setNewFacultyForm(null);
                            triggerToast('New faculty member added!');
                          }}
                          className="px-4 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase border border-[#111111] shadow-print-sm cursor-pointer"
                        >
                          Save Faculty
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Faculty List */}
                  <div className="space-y-3">
                    {faculty.map((f) => {
                      const isEditing = editingFacultyId === f.id;
                      return (
                        <div
                          key={f.id}
                          className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-3.5 shadow-print-sm flex flex-col justify-between"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-tech text-[10px] font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
                                  {f.department}
                                </span>
                                <span className="font-mono text-[10px] text-[#111111]/60">
                                  {f.office || 'Academic Block A'}
                                </span>
                              </div>
                              <h4 className="font-tech text-base font-bold uppercase text-[#111111] truncate">
                                {f.name}
                              </h4>
                              <p className="font-tech text-xs text-[#102D69] font-semibold uppercase">
                                {f.designation} · {f.qualification}
                              </p>
                              <p className="font-sans text-xs text-[#111111]/75 mt-1 line-clamp-1">
                                {f.specialization}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => setEditingFacultyId(isEditing ? null : f.id)}
                                className="px-2.5 py-1 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] text-[#111111] border border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer"
                              >
                                {isEditing ? 'Close' : 'Edit'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove ${f.name} from faculty directory?`)) {
                                    deleteFaculty(f.id);
                                    triggerToast(`Removed ${f.name}`);
                                  }
                                }}
                                className="p-1 rounded-[2px] bg-[#E6DED4] hover:bg-red-700 hover:text-white text-[#111111] border border-[#111111] cursor-pointer"
                                title="Delete faculty"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {isEditing && (
                            <div className="mt-3 pt-3 border-t border-[#111111]/20 space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block font-tech text-[11px] font-bold uppercase">Name</label>
                                  <input
                                    type="text"
                                    value={f.name}
                                    onChange={(e) => updateFaculty(f.id, { name: e.target.value })}
                                    className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block font-tech text-[11px] font-bold uppercase">Designation</label>
                                  <input
                                    type="text"
                                    value={f.designation}
                                    onChange={(e) => updateFaculty(f.id, { designation: e.target.value })}
                                    className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block font-tech text-[11px] font-bold uppercase">Email</label>
                                  <input
                                    type="email"
                                    value={f.email}
                                    onChange={(e) => updateFaculty(f.id, { email: e.target.value })}
                                    className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-mono text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block font-tech text-[11px] font-bold uppercase">Office</label>
                                  <input
                                    type="text"
                                    value={f.office || ''}
                                    onChange={(e) => updateFaculty(f.id, { office: e.target.value })}
                                    className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block font-tech text-[11px] font-bold uppercase">Specialization</label>
                                <input
                                  type="text"
                                  value={f.specialization}
                                  onChange={(e) => updateFaculty(f.id, { specialization: e.target.value })}
                                  className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-sans text-xs"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5: LABORATORIES */}
              {adminActiveTab === 'labs' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                        CENTERS OF EXCELLENCE &amp; LABORATORIES ({labs.length})
                      </h3>
                      <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                        Edit hardware workstations, networking rigs, and lab coordinators.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {labs.map((lab) => {
                      const isEditing = editingLabId === lab.id;
                      return (
                        <div
                          key={lab.id}
                          className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
                                {lab.code}
                              </span>
                              <h4 className="font-tech text-base font-bold uppercase text-[#111111]">
                                {lab.name}
                              </h4>
                            </div>
                            <button
                              onClick={() => setEditingLabId(isEditing ? null : lab.id)}
                              className="px-2.5 py-1 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] text-[#111111] border border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer"
                            >
                              {isEditing ? 'Close' : 'Edit Specs'}
                            </button>
                          </div>

                          {isEditing ? (
                            <div className="space-y-3 pt-3 border-t border-[#111111]/20">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block font-tech text-xs font-bold uppercase mb-1">In-Charge</label>
                                  <input
                                    type="text"
                                    value={lab.inCharge}
                                    onChange={(e) => updateLab(lab.id, { inCharge: e.target.value })}
                                    className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block font-tech text-xs font-bold uppercase mb-1">Capacity</label>
                                  <input
                                    type="text"
                                    value={lab.capacity}
                                    onChange={(e) => updateLab(lab.id, { capacity: e.target.value })}
                                    className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block font-tech text-xs font-bold uppercase mb-1">Hardware Rig Specs</label>
                                <textarea
                                  rows={2}
                                  value={lab.hardware}
                                  onChange={(e) => updateLab(lab.id, { hardware: e.target.value })}
                                  className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-mono text-xs"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="font-mono text-xs text-[#111111]/80 bg-[#E6DED4] p-2.5 border border-[#111111]/30 rounded-[2px]">
                              {lab.hardware}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 6: AUTONOMOUS CURRICULUM */}
              {adminActiveTab === 'curriculum' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                        AUTONOMOUS SCHEME SYLLABI ({curriculum.length})
                      </h3>
                      <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                        Manage course codes, semesters, credit ratings, and syllabi topics.
                      </p>
                    </div>
                    <button
                      onClick={() => setNewCourseForm({
                        code: `21CS${Math.floor(100 + Math.random() * 900)}`,
                        title: '',
                        semester: 'Semester 5',
                        credits: 4,
                        domain: 'Artificial Intelligence & Machine Learning',
                        topics: ['Module 1', 'Module 2']
                      })}
                      className="px-3 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#111111] shadow-print-sm hover:-translate-x-px cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F5B700]" />
                      <span>ADD NEW COURSE</span>
                    </button>
                  </div>

                  {newCourseForm && (
                    <div className="p-4 bg-[#F6F2EB] border-2 border-[#102D69] rounded-[2px] shadow-print space-y-3">
                      <div className="flex items-center justify-between border-b border-[#111111]/30 pb-2">
                        <span className="font-tech text-sm font-bold uppercase text-[#102D69]">
                          Create New Course Module
                        </span>
                        <button onClick={() => setNewCourseForm(null)}><X className="w-4 h-4" /></button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Course Code</label>
                          <input
                            type="text"
                            placeholder="21CS501"
                            value={newCourseForm.code}
                            onChange={(e) => setNewCourseForm({ ...newCourseForm, code: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-mono text-xs uppercase"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Course Title</label>
                          <input
                            type="text"
                            placeholder="Course Name"
                            value={newCourseForm.title}
                            onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-tech text-xs font-bold uppercase mb-1">Semester</label>
                          <select
                            value={newCourseForm.semester}
                            onChange={(e) => setNewCourseForm({ ...newCourseForm, semester: e.target.value })}
                            className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                          >
                            <option value="Semester 3">Semester 3</option>
                            <option value="Semester 4">Semester 4</option>
                            <option value="Semester 5">Semester 5</option>
                            <option value="Semester 6">Semester 6</option>
                            <option value="Semester 7">Semester 7</option>
                            <option value="Semester 8">Semester 8</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-tech text-xs font-bold uppercase mb-1">Topics (Comma-separated)</label>
                        <input
                          type="text"
                          placeholder="Topic 1, Topic 2, Topic 3"
                          value={newCourseForm.topics.join(', ')}
                          onChange={(e) => setNewCourseForm({
                            ...newCourseForm,
                            topics: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full p-2 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-sans text-xs"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button onClick={() => setNewCourseForm(null)} className="px-3 py-1 bg-[#E6DED4] border border-[#111111] font-tech text-xs">Cancel</button>
                        <button
                          onClick={() => {
                            if (!newCourseForm.code || !newCourseForm.title) return;
                            addCourse(newCourseForm);
                            setNewCourseForm(null);
                            triggerToast('Course added successfully!');
                          }}
                          className="px-4 py-1 bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase border border-[#111111] cursor-pointer"
                        >
                          Save Course
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {curriculum.map((c) => {
                      const isEditing = editingCourseCode === c.code;
                      return (
                        <div key={c.code} className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-3.5 shadow-print-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
                                {c.code}
                              </span>
                              <span className="font-tech text-xs font-bold uppercase bg-[#F5B700] text-[#111111] px-1.5 py-0.2 rounded-[2px] border border-[#111111]">
                                {c.semester}
                              </span>
                              <h4 className="font-tech text-base font-bold uppercase text-[#111111]">
                                {c.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setEditingCourseCode(isEditing ? null : c.code)}
                                className="px-2.5 py-1 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] hover:text-[#F6F2EB] text-[#111111] border border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer"
                              >
                                {isEditing ? 'Close' : 'Edit'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete course ${c.code}?`)) {
                                    deleteCourse(c.code);
                                    triggerToast(`Course ${c.code} deleted.`);
                                  }
                                }}
                                className="p-1 rounded-[2px] bg-[#E6DED4] hover:bg-red-700 hover:text-white text-[#111111] border border-[#111111] cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="mt-3 pt-3 border-t border-[#111111]/20 space-y-2">
                              <div>
                                <label className="block font-tech text-xs font-bold uppercase mb-1">Course Title</label>
                                <input
                                  type="text"
                                  value={c.title}
                                  onChange={(e) => updateCourse(c.code, { title: e.target.value })}
                                  className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-tech text-xs"
                                />
                              </div>
                              <div>
                                <label className="block font-tech text-xs font-bold uppercase mb-1">Topics (comma separated)</label>
                                <input
                                  type="text"
                                  value={c.topics.join(', ')}
                                  onChange={(e) => updateCourse(c.code, { 
                                    topics: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                                  })}
                                  className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-sans text-xs"
                                />
                              </div>
                            </div>
                          ) : (
                            <p className="font-sans text-xs text-[#111111]/75 mt-1 line-clamp-1">
                              Topics: {c.topics.join(' · ')}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 7: PROJECTS */}
              {adminActiveTab === 'projects' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                        STUDENT INNOVATION &amp; KSCST RESEARCH ({projects.length})
                      </h3>
                      <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                        ASCII &amp; GLUG PACE prototypes, grant awards, and technologies.
                      </p>
                    </div>
                    <button
                      onClick={() => setNewProjectForm({
                        id: `proj-${Date.now()}`,
                        title: '',
                        team: 'ASCII Innovation Lab',
                        domain: 'Edge AI & Embedded',
                        status: 'KSCST Grant Funded',
                        description: '',
                        technologies: ['IoT', 'ESP32', 'Python']
                      })}
                      className="px-3 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#111111] shadow-print-sm hover:-translate-x-px cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F5B700]" />
                      <span>ADD NEW PROJECT</span>
                    </button>
                  </div>

                  {newProjectForm && (
                    <div className="p-4 bg-[#F6F2EB] border-2 border-[#102D69] rounded-[2px] shadow-print space-y-3">
                      <div className="flex items-center justify-between border-b border-[#111111]/30 pb-2">
                        <span className="font-tech text-sm font-bold uppercase text-[#102D69]">Create Project</span>
                        <button onClick={() => setNewProjectForm(null)}><X className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProjectForm.title}
                          onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-tech text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Award / Status (e.g. Winner, KSCST Grant)"
                          value={newProjectForm.status}
                          onChange={(e) => setNewProjectForm({ ...newProjectForm, status: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-tech text-sm"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={newProjectForm.description}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                        className="w-full p-2 bg-[#E6DED4] border border-[#111111] font-sans text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setNewProjectForm(null)} className="px-3 py-1 font-tech text-xs">Cancel</button>
                        <button
                          onClick={() => {
                            if (!newProjectForm.title) return;
                            addProject(newProjectForm);
                            setNewProjectForm(null);
                            triggerToast('Project added!');
                          }}
                          className="px-4 py-1 bg-[#102D69] text-[#F6F2EB] font-tech text-xs uppercase font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {projects.map((p) => {
                      const isEditing = editingProjectId === p.id;
                      return (
                        <div key={p.id} className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-tech text-xs font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
                                {p.status}
                              </span>
                              <h4 className="font-tech text-base font-bold uppercase text-[#111111]">
                                {p.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setEditingProjectId(isEditing ? null : p.id)}
                                className="px-2.5 py-1 rounded-[2px] bg-[#E6DED4] font-tech text-xs font-bold uppercase border border-[#111111] cursor-pointer"
                              >
                                {isEditing ? 'Close' : 'Edit'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete project ${p.title}?`)) {
                                    deleteProject(p.id);
                                    triggerToast('Project deleted');
                                  }
                                }}
                                className="p-1 rounded-[2px] bg-[#E6DED4] hover:bg-red-700 hover:text-white border border-[#111111] cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="pt-2 border-t border-[#111111]/20 space-y-2">
                              <input
                                type="text"
                                value={p.title}
                                onChange={(e) => updateProject(p.id, { title: e.target.value })}
                                className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] font-tech text-xs"
                              />
                              <textarea
                                rows={2}
                                value={p.description}
                                onChange={(e) => updateProject(p.id, { description: e.target.value })}
                                className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] font-sans text-xs"
                              />
                            </div>
                          ) : (
                            <p className="font-sans text-xs text-[#111111]/80">
                              {p.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 8: EVENTS */}
              {adminActiveTab === 'events' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                        ACADEMIC SYMPOSIA &amp; CONFERENCES ({events.length})
                      </h3>
                      <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                        Department calendar of technical events, workshops, and colloquiums.
                      </p>
                    </div>
                    <button
                      onClick={() => setNewEventForm({
                        id: `ev-${Date.now()}`,
                        title: '',
                        date: 'Dec 15, 2026',
                        venue: 'PACE Central Auditorium',
                        type: 'Technical Workshop',
                        description: ''
                      })}
                      className="px-3 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#111111] shadow-print-sm hover:-translate-x-px cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F5B700]" />
                      <span>ADD NEW EVENT</span>
                    </button>
                  </div>

                  {newEventForm && (
                    <div className="p-4 bg-[#F6F2EB] border-2 border-[#102D69] rounded-[2px] shadow-print space-y-3">
                      <div className="flex items-center justify-between border-b border-[#111111]/30 pb-2">
                        <span className="font-tech text-sm font-bold uppercase text-[#102D69]">Create Event</span>
                        <button onClick={() => setNewEventForm(null)}><X className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Event Title"
                          value={newEventForm.title}
                          onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-tech text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Date"
                          value={newEventForm.date}
                          onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-mono text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Type (e.g. Workshop)"
                          value={newEventForm.type}
                          onChange={(e) => setNewEventForm({ ...newEventForm, type: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-tech text-xs"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={newEventForm.description}
                        onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                        className="w-full p-2 bg-[#E6DED4] border border-[#111111] font-sans text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setNewEventForm(null)} className="px-3 py-1 font-tech text-xs">Cancel</button>
                        <button
                          onClick={() => {
                            if (!newEventForm.title) return;
                            addEvent(newEventForm);
                            setNewEventForm(null);
                            triggerToast('Event scheduled!');
                          }}
                          className="px-4 py-1 bg-[#102D69] text-[#F6F2EB] font-tech text-xs uppercase font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {events.map((ev) => {
                      const isEditing = editingEventId === ev.id;
                      return (
                        <div key={ev.id} className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-tech text-xs font-bold uppercase px-2 py-0.5 rounded-[2px] bg-[#F5B700] text-[#111111] border border-[#111111]">
                                {ev.type}
                              </span>
                              <h4 className="font-tech text-base font-bold uppercase text-[#111111]">
                                {ev.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setEditingEventId(isEditing ? null : ev.id)}
                                className="px-2.5 py-1 rounded-[2px] bg-[#E6DED4] font-tech text-xs font-bold uppercase border border-[#111111] cursor-pointer"
                              >
                                {isEditing ? 'Close' : 'Edit'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete event ${ev.title}?`)) {
                                    deleteEvent(ev.id);
                                    triggerToast('Event deleted');
                                  }
                                }}
                                className="p-1 rounded-[2px] bg-[#E6DED4] hover:bg-red-700 hover:text-white border border-[#111111] cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="pt-2 border-t border-[#111111]/20 space-y-2">
                              <input
                                type="text"
                                value={ev.title}
                                onChange={(e) => updateEvent(ev.id, { title: e.target.value })}
                                className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] font-tech text-xs"
                              />
                              <textarea
                                rows={2}
                                value={ev.description}
                                onChange={(e) => updateEvent(ev.id, { description: e.target.value })}
                                className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] font-sans text-xs"
                              />
                            </div>
                          ) : (
                            <p className="font-sans text-xs text-[#111111]/80">
                              {ev.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 9: 3D MILESTONES */}
              {adminActiveTab === 'timeline' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                        3D ASTROLABE CHRONOLOGY MILESTONES ({milestones.length})
                      </h3>
                      <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                        Controls the armillary rings and historical milestones rendered in the 3D observatory.
                      </p>
                    </div>
                    <button
                      onClick={() => setNewMilestoneForm({
                        year: `${new Date().getFullYear()}`,
                        title: 'New Strategic Initiative',
                        phase: 'Future Horizon',
                        desc: 'Description of milestone and department accomplishment.'
                      })}
                      className="px-3 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#111111] shadow-print-sm hover:-translate-x-px cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#F5B700]" />
                      <span>ADD MILESTONE</span>
                    </button>
                  </div>

                  {newMilestoneForm && (
                    <div className="p-4 bg-[#F6F2EB] border-2 border-[#102D69] rounded-[2px] shadow-print space-y-3">
                      <div className="flex items-center justify-between border-b border-[#111111]/30 pb-2">
                        <span className="font-tech text-sm font-bold uppercase text-[#102D69]">Create Milestone</span>
                        <button onClick={() => setNewMilestoneForm(null)}><X className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Year"
                          value={newMilestoneForm.year}
                          onChange={(e) => setNewMilestoneForm({ ...newMilestoneForm, year: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-mono text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Phase"
                          value={newMilestoneForm.phase}
                          onChange={(e) => setNewMilestoneForm({ ...newMilestoneForm, phase: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-tech text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={newMilestoneForm.title}
                          onChange={(e) => setNewMilestoneForm({ ...newMilestoneForm, title: e.target.value })}
                          className="p-2 bg-[#E6DED4] border border-[#111111] font-tech text-sm"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={newMilestoneForm.desc}
                        onChange={(e) => setNewMilestoneForm({ ...newMilestoneForm, desc: e.target.value })}
                        className="w-full p-2 bg-[#E6DED4] border border-[#111111] font-sans text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setNewMilestoneForm(null)} className="px-3 py-1 font-tech text-xs">Cancel</button>
                        <button
                          onClick={() => {
                            if (!newMilestoneForm.title || !newMilestoneForm.year) return;
                            addMilestone(newMilestoneForm);
                            setNewMilestoneForm(null);
                            triggerToast('Milestone saved to 3D clock!');
                          }}
                          className="px-4 py-1 bg-[#102D69] text-[#F6F2EB] font-tech text-xs uppercase font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {milestones.map((m, idx) => {
                      const isEditing = editingMilestoneIndex === idx;
                      return (
                        <div key={idx} className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-heading text-2xl font-bold text-[#102D69] leading-none">
                                {m.year}
                              </span>
                              <span className="font-tech text-xs font-bold uppercase bg-[#F5B700] text-[#111111] px-1.5 py-0.2 rounded-[2px] border border-[#111111]">
                                {m.phase}
                              </span>
                              <h4 className="font-tech text-base font-bold uppercase text-[#111111]">
                                {m.title}
                              </h4>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setEditingMilestoneIndex(isEditing ? null : idx)}
                                className="px-2.5 py-1 rounded-[2px] bg-[#E6DED4] font-tech text-xs font-bold uppercase border border-[#111111] cursor-pointer"
                              >
                                {isEditing ? 'Close' : 'Edit'}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete milestone ${m.year} - ${m.title}?`)) {
                                    deleteMilestone(idx);
                                    triggerToast('Milestone deleted');
                                  }
                                }}
                                className="p-1 rounded-[2px] bg-[#E6DED4] hover:bg-red-700 hover:text-white border border-[#111111] cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {isEditing ? (
                            <div className="pt-2 border-t border-[#111111]/20 space-y-2">
                              <input
                                type="text"
                                value={m.title}
                                onChange={(e) => updateMilestone(idx, { title: e.target.value })}
                                className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] font-tech text-xs"
                              />
                              <textarea
                                rows={2}
                                value={m.desc}
                                onChange={(e) => updateMilestone(idx, { desc: e.target.value })}
                                className="w-full p-1.5 bg-[#E6DED4] border border-[#111111] font-sans text-xs"
                              />
                            </div>
                          ) : (
                            <p className="font-sans text-xs text-[#111111]/80">
                              {m.desc}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 10: BACKUP & SYNC */}
              {adminActiveTab === 'sync' && (
                <div className="space-y-6">
                  <div className="border-b-2 border-[#111111] pb-3">
                    <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                      DATA PERSISTENCE, BACKUP &amp; RECOVERY
                    </h3>
                    <p className="font-tech text-xs uppercase text-[#111111]/70 font-semibold">
                      Export customized department data as JSON, import previous archives, or reset to canonical defaults.
                    </p>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-tech text-base font-bold uppercase text-[#102D69] flex items-center gap-1.5">
                          <Download className="w-4 h-4" />
                          EXPORT BACKUP (JSON)
                        </h4>
                        <p className="font-sans text-xs text-[#111111]/80 mt-1">
                          Download all department data, faculty, courses, and settings as a clean JSON snapshot.
                        </p>
                      </div>
                      <button
                        onClick={exportDataJSON}
                        className="w-full py-2 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] font-tech text-xs font-bold uppercase tracking-wider border border-[#111111] shadow-print-sm cursor-pointer"
                      >
                        DOWNLOAD JSON
                      </button>
                    </div>

                    <div className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-tech text-base font-bold uppercase text-[#111111] flex items-center gap-1.5">
                          <Upload className="w-4 h-4 text-[#102D69]" />
                          IMPORT JSON BACKUP
                        </h4>
                        <p className="font-sans text-xs text-[#111111]/80 mt-1">
                          Choose a JSON configuration file to restore or synchronize department state.
                        </p>
                      </div>
                      <label className="w-full py-2 text-center rounded-[2px] bg-[#E6DED4] hover:bg-[#F6F2EB] text-[#111111] font-tech text-xs font-bold uppercase tracking-wider border border-[#111111] shadow-print-sm cursor-pointer block">
                        CHOOSE FILE
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const text = event.target?.result;
                                if (typeof text === 'string') {
                                  const res = importDataJSON(text);
                                  if (res.success) {
                                    triggerToast('Data imported and restored successfully!');
                                  } else {
                                    alert('Failed to import JSON: ' + res.message);
                                  }
                                }
                              };
                              reader.readAsText(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-tech text-base font-bold uppercase text-red-700 flex items-center gap-1.5">
                          <RotateCcw className="w-4 h-4" />
                          RESET TO BASELINE
                        </h4>
                        <p className="font-sans text-xs text-[#111111]/80 mt-1">
                          Discard all custom local edits and restore authentic official data from pace.edu.in.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reset all data back to the default institutional baseline?')) {
                            resetToDefaults();
                            triggerToast('Reset to canonical default baseline.');
                          }
                        }}
                        className="w-full py-2 rounded-[2px] bg-red-700 hover:bg-red-800 text-white font-tech text-xs font-bold uppercase tracking-wider border border-[#111111] shadow-print-sm cursor-pointer"
                      >
                        RESET TO DEFAULTS
                      </button>
                    </div>
                  </div>

                  {/* Manual Paste Section */}
                  <div className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 shadow-print-sm space-y-3">
                    <h4 className="font-tech text-xs font-bold uppercase text-[#102D69]">
                      OR PASTE RAW JSON HERE:
                    </h4>
                    <textarea
                      rows={4}
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      placeholder='{"collegeInfo": {...}, "faculty": [...]}'
                      className="w-full p-2.5 bg-[#E6DED4] border border-[#111111] rounded-[2px] font-mono text-xs"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (!importJsonText.trim()) return;
                          const res = importDataJSON(importJsonText);
                          if (res.success) {
                            setImportJsonText('');
                            triggerToast('JSON imported successfully!');
                          } else {
                            alert('Import failed: ' + res.message);
                          }
                        }}
                        className="px-4 py-1.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB] font-tech text-xs font-bold uppercase border border-[#111111] shadow-print-sm cursor-pointer"
                      >
                        APPLY PASTE
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
