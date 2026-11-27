import React, { useState } from 'react';
import { Shield, Plus, Trash2, UserPlus, Check, RotateCcw } from 'lucide-react';
import { PERMISSION_CATALOG, ROLE_COLORS, DEFAULT_ROLES, DEFAULT_ASSIGNMENTS } from '../utils/rbac';

export default function RoleManagerPanel({
  roles,
  assignments,
  activeRoleId,
  onUpdateRbac,
  onToast
}) {
  const sortedRoles = [...roles].sort((a, b) => b.rank - a.rank);
  const [selectedRoleId, setSelectedRoleId] = useState(sortedRoles[0]?.id || 'hod_admin');
  const [newRoleName, setNewRoleName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberLabel, setNewMemberLabel] = useState('');

  const selectedRole = roles.find(r => r.id === selectedRoleId) || sortedRoles[0];
  const roleMembers = assignments.filter(a => a.roleId === selectedRole?.id);

  function handleCreateRole(e) {
    e.preventDefault();
    const trimmed = newRoleName.trim();
    if (!trimmed) return;
    const id = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + Date.now().toString().slice(-3);
    const created = {
      id,
      name: trimmed,
      color: '#0F766E',
      rank: 25,
      isSystem: false,
      permissions: {
        manage_roles: false,
        manage_timetables: false,
        manage_courses: false,
        manage_notices: true,
        upload_files: false,
        export_data: false,
        use_ai_tools: true
      }
    };
    onUpdateRbac({ roles: [...roles, created], assignments, activeRoleId });
    setSelectedRoleId(id);
    setNewRoleName('');
    onToast(`Created role "${trimmed}"`);
  }

  function handleDeleteRole(roleId) {
    const nextRoles = roles.filter(r => r.id !== roleId);
    const nextAssignments = assignments.map(a => (a.roleId === roleId ? { ...a, roleId: 'student' } : a));
    const nextActive = activeRoleId === roleId ? 'hod_admin' : activeRoleId;
    onUpdateRbac({ roles: nextRoles, assignments: nextAssignments, activeRoleId: nextActive });
    setSelectedRoleId(nextRoles[0]?.id || 'hod_admin');
    onToast('Deleted custom role');
  }

  function handleTogglePerm(permKey) {
    if (!selectedRole) return;
    const nextRoles = roles.map(r => {
      if (r.id !== selectedRole.id) return r;
      return {
        ...r,
        permissions: {
          ...r.permissions,
          [permKey]: !r.permissions[permKey]
        }
      };
    });
    onUpdateRbac({ roles: nextRoles, assignments, activeRoleId });
  }

  function handleUpdateRoleField(field, value) {
    if (!selectedRole) return;
    const nextRoles = roles.map(r => (r.id === selectedRole.id ? { ...r, [field]: value } : r));
    onUpdateRbac({ roles: nextRoles, assignments, activeRoleId });
  }

  function handleAssignMember(e) {
    e.preventDefault();
    const email = newMemberEmail.trim().toLowerCase();
    if (!email || !selectedRole) return;
    const filtered = assignments.filter(a => a.email.toLowerCase() !== email);
    const nextAssignments = [
      ...filtered,
      { email, roleId: selectedRole.id, label: newMemberLabel.trim() || email.split('@')[0] }
    ];
    onUpdateRbac({ roles, assignments: nextAssignments, activeRoleId });
    setNewMemberEmail('');
    setNewMemberLabel('');
    onToast(`Assigned ${email} to ${selectedRole.name}`);
  }

  function handleRemoveMember(email) {
    const nextAssignments = assignments.filter(a => a.email.toLowerCase() !== email.toLowerCase());
    onUpdateRbac({ roles, assignments: nextAssignments, activeRoleId });
    onToast(`Removed ${email}`);
  }

  function handleResetRoles() {
    onUpdateRbac({
      roles: DEFAULT_ROLES,
      assignments: DEFAULT_ASSIGNMENTS,
      activeRoleId: 'hod_admin'
    });
    setSelectedRoleId('hod_admin');
    onToast('Reset all roles & permissions to defaults');
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* Left Sidebar: Discord-style Roles List */}
      <div className="lg:col-span-4 bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 flex flex-col justify-between space-y-4 h-fit">
        <div>
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-[#111111]">
            <span className="font-tech text-xs font-bold uppercase text-[#102D69] flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              ACCOUNT ROLES ({sortedRoles.length})
            </span>
            <button
              onClick={handleResetRoles}
              title="Reset roles to defaults"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-[#E6DED4] hover:bg-[#DCD2C6] border border-[#111111] font-mono text-[10px] font-bold uppercase cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          </div>

          <div className="space-y-1.5 mb-4">
            {sortedRoles.map(role => {
              const isSelected = selectedRole?.id === role.id;
              const count = assignments.filter(a => a.roleId === role.id).length;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[2px] border-2 border-[#111111] text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#102D69] text-[#F6F2EB] shadow-print-sm -translate-x-px -translate-y-px'
                      : 'bg-[#E6DED4] text-[#111111] hover:bg-[#DCD2C6]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full border border-[#111111] shrink-0"
                      style={{ backgroundColor: role.color }}
                    />
                    <span className="font-tech text-xs font-bold uppercase truncate">
                      {role.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
                    <span className={`px-1.5 py-0.2 rounded-[2px] border ${
                      isSelected ? 'border-[#F6F2EB]/40 text-[#F5B700]' : 'border-[#111111]/30 text-[#111111]/70'
                    }`}>
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Create New Role */}
          <form onSubmit={handleCreateRole} className="pt-3 border-t-2 border-[#111111] space-y-2">
            <label className="font-tech text-[11px] font-bold uppercase text-[#111111] block">
              + CREATE CUSTOM ROLE
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="e.g. Lab Assistant"
                className="flex-1 px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-sans text-xs min-w-0"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-[2px] bg-[#F5B700] hover:bg-[#e0a800] text-[#111111] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer shrink-0 inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel: Selected Role Permissions & Member Assignments */}
      {selectedRole && (
        <div className="lg:col-span-8 space-y-5">

          {/* Role Identity & Color */}
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b-2 border-[#111111]">
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border-2 border-[#111111]"
                  style={{ backgroundColor: selectedRole.color }}
                />
                <span className="font-tech text-sm font-bold uppercase text-[#111111]">
                  EDIT ROLE — {selectedRole.name}
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#E6DED4] border border-[#111111] rounded-[2px]">
                  RANK {selectedRole.rank}
                </span>
              </div>

              {!selectedRole.isSystem && (
                <button
                  onClick={() => handleDeleteRole(selectedRole.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#991B1B] text-[#F6F2EB] font-tech text-[11px] font-bold uppercase cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>DELETE ROLE</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-tech text-[11px] font-bold uppercase block mb-1">ROLE NAME</label>
                <input
                  type="text"
                  value={selectedRole.name}
                  onChange={(e) => handleUpdateRoleField('name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-tech text-sm font-bold uppercase"
                />
              </div>

              <div>
                <label className="font-tech text-[11px] font-bold uppercase block mb-1">ROLE BADGE COLOR</label>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {ROLE_COLORS.map(c => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => handleUpdateRoleField('color', c.hex)}
                      className={`w-7 h-7 rounded-[2px] border-2 cursor-pointer flex items-center justify-center ${
                        selectedRole.color === c.hex ? 'border-[#111111] scale-110 shadow-print-sm' : 'border-[#111111]/40'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedRole.color === c.hex && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === '#F5B700' ? 'text-[#111111]' : 'text-[#F6F2EB]'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Discord-Style Permission Toggles */}
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-3">
            <span className="font-tech text-xs font-bold uppercase text-[#102D69] block pb-2 border-b-2 border-[#111111]">
              PERMISSIONS MATRIX
            </span>

            <div className="space-y-2">
              {PERMISSION_CATALOG.map(perm => {
                const enabled = Boolean(selectedRole.permissions?.[perm.key]);
                return (
                  <div
                    key={perm.key}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-[2px] bg-[#E6DED4] border border-[#111111]"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-tech text-xs sm:text-sm font-bold uppercase text-[#111111]">
                          {perm.label}
                        </span>
                        <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-[2px] bg-[#F6F2EB] border border-[#111111]/40 text-[#111111]/70">
                          {perm.group}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-[#111111]/75 leading-snug mt-0.5">
                        {perm.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      onClick={() => handleTogglePerm(perm.key)}
                      className={`shrink-0 px-3 py-1.5 rounded-[2px] border-2 border-[#111111] font-mono text-[11px] font-bold uppercase cursor-pointer transition-all ${
                        enabled
                          ? 'bg-[#102D69] text-[#F5B700] shadow-print-sm'
                          : 'bg-[#F6F2EB] text-[#111111]/60'
                      }`}
                    >
                      {enabled ? 'ALLOW' : 'DENY'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Members / Emails */}
          <div className="bg-[#F6F2EB] border-2 border-[#111111] shadow-print-sm rounded-[2px] p-4 space-y-3">
            <span className="font-tech text-xs font-bold uppercase text-[#102D69] block pb-2 border-b-2 border-[#111111]">
              ASSIGNED ACCOUNTS ({roleMembers.length})
            </span>

            <form onSubmit={handleAssignMember} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <input
                type="email"
                required
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="email@pace.edu.in"
                className="sm:col-span-5 px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-mono text-xs"
              />
              <input
                type="text"
                value={newMemberLabel}
                onChange={(e) => setNewMemberLabel(e.target.value)}
                placeholder="Name / Section (e.g. CSE-5A CR)"
                className="sm:col-span-5 px-2.5 py-1.5 rounded-[2px] bg-[#E6DED4] border-2 border-[#111111] font-sans text-xs"
              />
              <button
                type="submit"
                className="sm:col-span-2 px-3 py-1.5 rounded-[2px] bg-[#102D69] hover:bg-[#163A96] text-[#F6F2EB] border-2 border-[#111111] font-tech text-xs font-bold uppercase cursor-pointer inline-flex items-center justify-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </button>
            </form>

            {roleMembers.length === 0 ? (
              <p className="font-sans text-xs text-[#111111]/65 italic">
                No specific emails assigned to this role yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roleMembers.map(member => (
                  <div
                    key={member.email}
                    className="flex items-center justify-between px-3 py-2 rounded-[2px] bg-[#E6DED4] border border-[#111111]"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-tech text-xs font-bold uppercase text-[#111111] block truncate">
                        {member.label}
                      </span>
                      <span className="font-mono text-[10px] text-[#102D69] block truncate">
                        {member.email}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.email)}
                      title="Remove member"
                      className="p-1 rounded-[2px] hover:bg-[#991B1B] hover:text-[#F6F2EB] text-[#111111]/70 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
