import React, { useState, useEffect } from 'react';
import { X, LogIn, LogOut, Shield, Settings, CheckCircle2 } from 'lucide-react';
import { resolveRoleForEmail, isManagerRole, PERMISSION_CATALOG } from '../utils/rbac';

export default function AccountModal({
  isOpen,
  onClose,
  rbacState,
  activeRole,
  onUpdateRbac,
  onOpenManage
}) {
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    function onKey(e) {
      if (isOpen && e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isLoggedIn = Boolean(rbacState.loggedInEmail);
  const canManage = isLoggedIn && isManagerRole(activeRole);

  function signInWithEmail(email) {
    const clean = email.trim().toLowerCase();
    if (!clean) return;
    const matchedRole = resolveRoleForEmail(clean, rbacState.roles, rbacState.assignments);
    onUpdateRbac({
      ...rbacState,
      loggedInEmail: clean,
      activeRoleId: matchedRole.id
    });
    setEmailInput('');
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmail(emailInput);
  }

  function handleSignOut() {
    onUpdateRbac({
      ...rbacState,
      loggedInEmail: '',
      activeRoleId: 'student'
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#F6F2EB] border-2 border-[#111111] shadow-print-cobalt rounded-[2px] overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[#111111] bg-[#E6DED4]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-[#102D69] text-[#F6F2EB]">
              PACE PORTAL
            </span>
            <span className="font-tech text-sm font-bold uppercase text-[#111111]">
              {isLoggedIn ? 'ACCOUNT & PERMISSIONS' : 'SIGN IN TO YOUR ACCOUNT'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] bg-[#111111] text-[#F6F2EB] font-mono text-[11px] font-bold uppercase cursor-pointer hover:bg-[#102D69]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 bg-[#E6DED4]">
          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#111111]/60 block">
                    SIGNED IN ACCOUNT
                  </span>
                  <p className="font-mono text-sm font-bold text-[#111111] truncate">
                    {rbacState.loggedInEmail}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] border-2 border-[#111111] font-tech text-xs font-bold uppercase shrink-0"
                  style={{
                    backgroundColor: activeRole.color,
                    color: activeRole.color === '#F5B700' ? '#111111' : '#F6F2EB'
                  }}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{activeRole.name}</span>
                </span>
              </div>

              <div className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 space-y-2">
                <span className="font-tech text-xs font-bold uppercase text-[#102D69] block">
                  YOUR ACTIVE PERMISSIONS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PERMISSION_CATALOG.filter(p => activeRole.permissions?.[p.key]).map(p => (
                    <span
                      key={p.key}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] bg-[#E6DED4] border border-[#111111] font-tech text-[11px] font-bold uppercase text-[#111111]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#102D69]" />
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                {canManage && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenManage();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#F5B700]" />
                    <span>OPEN PORTAL MANAGER</span>
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[2px] bg-[#F6F2EB] hover:bg-[#DCD2C6] text-[#111111] border-2 border-[#111111] shadow-print-sm font-tech text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>SIGN OUT</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-3">
                <label className="font-tech text-xs font-bold uppercase text-[#102D69] block">
                  ENTER YOUR INSTITUTIONAL EMAIL (@PACE.EDU.IN)
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. hod_cs@pace.edu.in or student@pace.edu.in"
                    className="flex-1 px-3 py-2 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>SIGN IN</span>
                  </button>
                </div>
                <p className="font-sans text-[11px] text-[#111111]/70">
                  Pages and edit controls appear dynamically based on your assigned role (HOD, Faculty, Class Rep, Club Lead, or Student).
                </p>
              </form>

              <div className="bg-[#F6F2EB] border-2 border-[#111111] rounded-[2px] p-4 space-y-2.5">
                <span className="font-tech text-[11px] font-bold uppercase text-[#111111]/70 block">
                  QUICK ACCOUNT PREVIEW (TEST DYNAMIC ROLES)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { email: 'hod_cs@pace.edu.in', title: 'HOD / Super Admin' },
                    { email: 'saifudeen@pace.edu.in', title: 'Faculty' },
                    { email: 'cr_cse3a@pace.edu.in', title: 'Class Rep (CR)' },
                    { email: 'embedclub@pace.edu.in', title: 'Club Lead' },
                    { email: 'student@pace.edu.in', title: 'Student (Read-Only)' }
                  ].map(item => (
                    <button
                      key={item.email}
                      type="button"
                      onClick={() => signInWithEmail(item.email)}
                      className="text-left px-3 py-2 rounded-[2px] bg-[#E6DED4] hover:bg-[#102D69] text-[#111111] hover:text-[#F6F2EB] border border-[#111111] cursor-pointer transition-colors"
                    >
                      <span className="font-tech text-xs font-bold uppercase block">{item.title}</span>
                      <span className="font-mono text-[10px] opacity-75 block truncate">{item.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
