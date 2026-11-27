// Discord-style Role-Based Access Control (RBAC) for PA-CSE Portal
// Supports multiple account types: HOD/Admin, Faculty, Class Rep (CR), Club Lead, Student, plus custom roles.

const RBAC_STORAGE_KEY = 'pace_cse_rbac_v1';

export const PERMISSION_CATALOG = [
  {
    key: 'manage_roles',
    label: 'Manage Roles & Members',
    group: 'Administration',
    desc: 'Create or edit roles, toggle permissions, and assign user emails to roles.'
  },
  {
    key: 'manage_timetables',
    label: 'Manage Timetables',
    group: 'Academics',
    desc: 'Scan timetable images with AI and publish/edit section class schedules.'
  },
  {
    key: 'manage_courses',
    label: 'Manage Courses & Materials',
    group: 'Academics',
    desc: 'Create courses and attach Google Drive folders, PDFs, or study guides.'
  },
  {
    key: 'manage_notices',
    label: 'Post Notices & Circulars',
    group: 'Communication',
    desc: 'Publish exam schedules, placement drives, and club announcements.'
  },
  {
    key: 'upload_files',
    label: 'Upload Files to Storage',
    group: 'Storage',
    desc: 'Upload PDFs and timetable screenshots to Supabase Storage.'
  },
  {
    key: 'export_data',
    label: 'Export / Reset Portal Data',
    group: 'Administration',
    desc: 'Export portal JSON backups and reset local overrides.'
  },
  {
    key: 'use_ai_tools',
    label: 'Use AI Tutor & Student Tools',
    group: 'Student Tools',
    desc: 'Access VTU AI Study Tutor, Local AI Workbench, and SGPA Calculator.'
  }
];

export const ROLE_COLORS = [
  { name: 'Saffron Gold', hex: '#F5B700' },
  { name: 'Heritage Cobalt', hex: '#102D69' },
  { name: 'Teal', hex: '#0F766E' },
  { name: 'Amber Rust', hex: '#B45309' },
  { name: 'Crimson', hex: '#991B1B' },
  { name: 'Deep Ink', hex: '#111111' }
];

export const DEFAULT_ROLES = [
  {
    id: 'hod_admin',
    name: 'HOD / Super Admin',
    color: '#F5B700',
    rank: 100,
    isSystem: true,
    permissions: {
      manage_roles: true,
      manage_timetables: true,
      manage_courses: true,
      manage_notices: true,
      upload_files: true,
      export_data: true,
      use_ai_tools: true
    }
  },
  {
    id: 'faculty',
    name: 'Faculty',
    color: '#102D69',
    rank: 70,
    isSystem: true,
    permissions: {
      manage_roles: false,
      manage_timetables: true,
      manage_courses: true,
      manage_notices: true,
      upload_files: true,
      export_data: true,
      use_ai_tools: true
    }
  },
  {
    id: 'class_rep',
    name: 'Class Rep (CR)',
    color: '#0F766E',
    rank: 40,
    isSystem: false,
    permissions: {
      manage_roles: false,
      manage_timetables: true,
      manage_courses: false,
      manage_notices: true,
      upload_files: true,
      export_data: false,
      use_ai_tools: true
    }
  },
  {
    id: 'club_lead',
    name: 'Club Lead (ASCII / GLUG)',
    color: '#B45309',
    rank: 30,
    isSystem: false,
    permissions: {
      manage_roles: false,
      manage_timetables: false,
      manage_courses: false,
      manage_notices: true,
      upload_files: true,
      export_data: false,
      use_ai_tools: true
    }
  },
  {
    id: 'student',
    name: 'Student',
    color: '#111111',
    rank: 10,
    isSystem: true,
    permissions: {
      manage_roles: false,
      manage_timetables: false,
      manage_courses: false,
      manage_notices: false,
      upload_files: false,
      export_data: false,
      use_ai_tools: true
    }
  }
];

export const DEFAULT_ASSIGNMENTS = [
  { email: 'hod_cs@pace.edu.in', roleId: 'hod_admin', label: 'Dr. Sharmila Kumari M.' },
  { email: 'saifudeen@pace.edu.in', roleId: 'faculty', label: 'Prof. Mohammed Saifudeen' },
  { email: 'habeeb@pace.edu.in', roleId: 'faculty', label: 'Prof. Habeeb Ur Rehman P.B.' },
  { email: 'anushree@pace.edu.in', roleId: 'faculty', label: 'Prof. Anushree Raj' },
  { email: 'embedclub@pace.edu.in', roleId: 'club_lead', label: 'Embed Club / ASCII Lead' },
  { email: 'cr_cse3a@pace.edu.in', roleId: 'class_rep', label: 'CSE-3A Class Representative' }
];

export function loadRbacState() {
  try {
    const raw = localStorage.getItem(RBAC_STORAGE_KEY);
    if (!raw) {
      return {
        roles: DEFAULT_ROLES,
        assignments: DEFAULT_ASSIGNMENTS,
        loggedInEmail: '',
        activeRoleId: 'student'
      };
    }
    const parsed = JSON.parse(raw);
    return {
      roles: Array.isArray(parsed.roles) && parsed.roles.length > 0 ? parsed.roles : DEFAULT_ROLES,
      assignments: Array.isArray(parsed.assignments) ? parsed.assignments : DEFAULT_ASSIGNMENTS,
      loggedInEmail: parsed.loggedInEmail || '',
      activeRoleId: parsed.loggedInEmail ? (parsed.activeRoleId || 'student') : 'student'
    };
  } catch {
    return {
      roles: DEFAULT_ROLES,
      assignments: DEFAULT_ASSIGNMENTS,
      loggedInEmail: '',
      activeRoleId: 'student'
    };
  }
}

export function isManagerRole(role) {
  if (!role || !role.permissions) return false;
  return Boolean(
    role.permissions.manage_roles ||
    role.permissions.manage_timetables ||
    role.permissions.manage_courses ||
    role.permissions.manage_notices
  );
}

export function saveRbacState(state) {
  try {
    localStorage.setItem(RBAC_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('pace-rbac-updated'));
  } catch {
    // Ignore storage errors
  }
}

export function resetRbacState() {
  try {
    localStorage.removeItem(RBAC_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('pace-rbac-updated'));
  } catch {
    // Ignore
  }
}

export function hasPermission(role, permKey) {
  if (!role || !role.permissions) return false;
  return Boolean(role.permissions[permKey]);
}

export function resolveRoleForEmail(email, roles, assignments) {
  if (!email) return roles.find(r => r.id === 'student') || roles[roles.length - 1];
  const clean = email.trim().toLowerCase();
  const match = assignments.find(a => a.email.toLowerCase() === clean);
  if (match) {
    return roles.find(r => r.id === match.roleId) || roles[0];
  }
  return roles.find(r => r.id === 'student') || roles[roles.length - 1];
}
