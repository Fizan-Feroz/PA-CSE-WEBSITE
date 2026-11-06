import React, { useState, useEffect, useCallback } from 'react';
import { DepartmentDataContext } from './DepartmentContextCore';
import {
  COLLEGE_INFO as DEFAULT_COLLEGE_INFO,
  CSE_DOMAINS as DEFAULT_DOMAINS,
  FACULTY_MEMBERS as DEFAULT_FACULTY,
  LABORATORIES as DEFAULT_LABS,
  COURSES_SYLLABI as DEFAULT_COURSES,
  STUDENT_PROJECTS as DEFAULT_PROJECTS,
  UPCOMING_EVENTS as DEFAULT_EVENTS,
  DEPARTMENT_MILESTONES as DEFAULT_MILESTONES
} from '../data/cseData';

const STORAGE_KEY = 'PACE_CSE_DATA_V2';
const ADMIN_AUTH_KEY = 'PACE_CSE_ADMIN_AUTH';
const DEFAULT_PASSCODE = 'pace2026';

export function DepartmentDataProvider({ children }) {
  // Load saved data or initialize from defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          collegeInfo: parsed.collegeInfo || DEFAULT_COLLEGE_INFO,
          domains: parsed.domains || DEFAULT_DOMAINS,
          faculty: parsed.faculty || DEFAULT_FACULTY,
          labs: parsed.labs || DEFAULT_LABS,
          curriculum: parsed.curriculum || DEFAULT_COURSES,
          projects: parsed.projects || DEFAULT_PROJECTS,
          events: parsed.events || DEFAULT_EVENTS,
          milestones: parsed.milestones || DEFAULT_MILESTONES,
          announcement: parsed.announcement || {
            enabled: true,
            text: 'ADMISSIONS 2026–27 OPEN FOR B.E. COMPUTER SCIENCE & ENGINEERING · NBA TIER-1 ACCREDITED',
            link: 'https://pace.edu.in'
          }
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved department data from localStorage', e);
    }
    return {
      collegeInfo: DEFAULT_COLLEGE_INFO,
      domains: DEFAULT_DOMAINS,
      faculty: DEFAULT_FACULTY,
      labs: DEFAULT_LABS,
      curriculum: DEFAULT_COURSES,
      projects: DEFAULT_PROJECTS,
      events: DEFAULT_EVENTS,
      milestones: DEFAULT_MILESTONES,
      announcement: {
        enabled: true,
        text: 'ADMISSIONS 2026–27 OPEN FOR B.E. COMPUTER SCIENCE & ENGINEERING · NBA TIER-1 ACCREDITED',
        link: 'https://pace.edu.in'
      }
    };
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('general');

  // Sync state to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save department data to localStorage', e);
    }
  }, [data]);

  const loginAdmin = useCallback((passcode) => {
    if (passcode === DEFAULT_PASSCODE || passcode === 'admin') {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {}
      return { success: true };
    }
    return { success: false, message: 'Invalid passcode. Default passcode is pace2026' };
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {}
  }, []);

  const openAdminModal = useCallback((tab = 'general') => {
    setAdminActiveTab(tab);
    setIsAdminModalOpen(true);
  }, []);

  const closeAdminModal = useCallback(() => {
    setIsAdminModalOpen(false);
  }, []);

  // Update College Info
  const updateCollegeInfo = useCallback((updatedFields) => {
    setData(prev => ({
      ...prev,
      collegeInfo: {
        ...prev.collegeInfo,
        ...updatedFields
      }
    }));
  }, []);

  // Domains / Tracks
  const updateDomain = useCallback((id, updated) => {
    setData(prev => ({
      ...prev,
      domains: prev.domains.map(d => d.id === id ? { ...d, ...updated } : d)
    }));
  }, []);

  const addDomain = useCallback((newDomain) => {
    setData(prev => ({
      ...prev,
      domains: [...prev.domains, newDomain]
    }));
  }, []);

  const deleteDomain = useCallback((id) => {
    setData(prev => ({
      ...prev,
      domains: prev.domains.filter(d => d.id !== id)
    }));
  }, []);

  // Faculty Directory
  const updateFaculty = useCallback((id, updated) => {
    setData(prev => ({
      ...prev,
      faculty: prev.faculty.map(f => f.id === id ? { ...f, ...updated } : f)
    }));
  }, []);

  const addFaculty = useCallback((newMember) => {
    setData(prev => ({
      ...prev,
      faculty: [newMember, ...prev.faculty]
    }));
  }, []);

  const deleteFaculty = useCallback((id) => {
    setData(prev => ({
      ...prev,
      faculty: prev.faculty.filter(f => f.id !== id)
    }));
  }, []);

  // Labs
  const updateLab = useCallback((id, updated) => {
    setData(prev => ({
      ...prev,
      labs: prev.labs.map(l => l.id === id ? { ...l, ...updated } : l)
    }));
  }, []);

  const addLab = useCallback((newLab) => {
    setData(prev => ({
      ...prev,
      labs: [...prev.labs, newLab]
    }));
  }, []);

  const deleteLab = useCallback((id) => {
    setData(prev => ({
      ...prev,
      labs: prev.labs.filter(l => l.id !== id)
    }));
  }, []);

  // Courses / Syllabi
  const updateCourse = useCallback((code, updated) => {
    setData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(c => c.code === code ? { ...c, ...updated } : c)
    }));
  }, []);

  const addCourse = useCallback((newCourse) => {
    setData(prev => ({
      ...prev,
      curriculum: [newCourse, ...prev.curriculum]
    }));
  }, []);

  const deleteCourse = useCallback((code) => {
    setData(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter(c => c.code !== code)
    }));
  }, []);

  // Projects
  const updateProject = useCallback((id, updated) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updated } : p)
    }));
  }, []);

  const addProject = useCallback((newProject) => {
    setData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  }, []);

  const deleteProject = useCallback((id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  }, []);

  // Events
  const updateEvent = useCallback((id, updated) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === id ? { ...e, ...updated } : e)
    }));
  }, []);

  const addEvent = useCallback((newEvent) => {
    setData(prev => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }));
  }, []);

  const deleteEvent = useCallback((id) => {
    setData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id)
    }));
  }, []);

  // Milestones
  const updateMilestone = useCallback((index, updated) => {
    setData(prev => {
      const next = [...prev.milestones];
      next[index] = { ...next[index], ...updated };
      return { ...prev, milestones: next };
    });
  }, []);

  const addMilestone = useCallback((newMilestone) => {
    setData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
  }, []);

  const deleteMilestone = useCallback((index) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  }, []);

  // Announcement Ticker
  const updateAnnouncement = useCallback((updated) => {
    setData(prev => ({
      ...prev,
      announcement: { ...prev.announcement, ...updated }
    }));
  }, []);

  // Reset to Baseline
  const resetToDefaults = useCallback(() => {
    const defaults = {
      collegeInfo: DEFAULT_COLLEGE_INFO,
      domains: DEFAULT_DOMAINS,
      faculty: DEFAULT_FACULTY,
      labs: DEFAULT_LABS,
      curriculum: DEFAULT_COURSES,
      projects: DEFAULT_PROJECTS,
      events: DEFAULT_EVENTS,
      milestones: DEFAULT_MILESTONES,
      announcement: {
        enabled: true,
        text: 'ADMISSIONS 2026–27 OPEN FOR B.E. COMPUTER SCIENCE & ENGINEERING · NBA TIER-1 ACCREDITED',
        link: 'https://pace.edu.in'
      }
    };
    setData(defaults);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  // Export JSON
  const exportDataJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pace-cse-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  // Import JSON
  const importDataJSON = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON structure');
      }
      setData({
        collegeInfo: parsed.collegeInfo || DEFAULT_COLLEGE_INFO,
        domains: parsed.domains || DEFAULT_DOMAINS,
        faculty: parsed.faculty || DEFAULT_FACULTY,
        labs: parsed.labs || DEFAULT_LABS,
        curriculum: parsed.curriculum || DEFAULT_COURSES,
        projects: parsed.projects || DEFAULT_PROJECTS,
        events: parsed.events || DEFAULT_EVENTS,
        milestones: parsed.milestones || DEFAULT_MILESTONES,
        announcement: parsed.announcement || {
          enabled: true,
          text: 'ADMISSIONS 2026–27 OPEN FOR B.E. COMPUTER SCIENCE & ENGINEERING · NBA TIER-1 ACCREDITED',
          link: 'https://pace.edu.in'
        }
      });
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }, []);

  const value = {
    // Data State
    collegeInfo: data.collegeInfo,
    domains: data.domains,
    faculty: data.faculty,
    labs: data.labs,
    curriculum: data.curriculum,
    projects: data.projects,
    events: data.events,
    milestones: data.milestones,
    announcement: data.announcement,
    
    // Auth & Modal
    isAdmin,
    isAdminModalOpen,
    adminActiveTab,
    loginAdmin,
    logoutAdmin,
    openAdminModal,
    closeAdminModal,
    setAdminActiveTab,

    // CRUD
    updateCollegeInfo,
    updateDomain,
    addDomain,
    deleteDomain,
    updateFaculty,
    addFaculty,
    deleteFaculty,
    updateLab,
    addLab,
    deleteLab,
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

    // Persistence
    exportDataJSON,
    importDataJSON,
    resetToDefaults
  };

  return (
    <DepartmentDataContext.Provider value={value}>
      {children}
    </DepartmentDataContext.Provider>
  );
}
