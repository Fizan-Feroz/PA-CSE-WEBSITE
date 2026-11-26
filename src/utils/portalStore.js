// Client-side portal state, Supabase cloud sync & Local AI Vision parser
// Gracefully falls back to localStorage + cseData.js when Supabase env vars are not set.

import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const STORAGE_KEY = 'pace_cse_portal_overrides_v1';

export function loadPortalOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { timetables: null, courses: null };
    return JSON.parse(raw);
  } catch {
    return { timetables: null, courses: null };
  }
}

export function savePortalOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent('pace-portal-updated'));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearPortalOverrides() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('pace-portal-updated'));
  } catch {
    // Ignore
  }
}

export async function fetchLivePortalData(defaultTimetables, defaultCourses) {
  if (!isSupabaseConfigured() || !supabase) {
    const local = loadPortalOverrides();
    return {
      timetables: local.timetables || defaultTimetables,
      courses: local.courses || defaultCourses,
      source: 'local'
    };
  }

  try {
    const [{ data: ttData, error: ttErr }, { data: cData, error: cErr }] = await Promise.all([
      supabase.from('section_timetables').select('*').order('section', { ascending: true }),
      supabase.from('courses').select('*').order('semester', { ascending: true })
    ]);

    if (ttErr || cErr) throw new Error(ttErr?.message || cErr?.message);

    // Merge remote rows over defaults by key so seeded defaults still appear if DB is fresh
    const mergedTimetables = mergeByKey(defaultTimetables, ttData || [], 'section');
    const mergedCourses = mergeByKey(defaultCourses, cData || [], 'code');

    return {
      timetables: mergedTimetables,
      courses: mergedCourses,
      source: 'supabase'
    };
  } catch {
    const local = loadPortalOverrides();
    return {
      timetables: local.timetables || defaultTimetables,
      courses: local.courses || defaultCourses,
      source: 'local'
    };
  }
}

function mergeByKey(defaults, remoteRows, keyField) {
  const map = new Map();
  defaults.forEach(item => map.set(item[keyField], item));
  remoteRows.forEach(item => map.set(item[keyField], item));
  return Array.from(map.values());
}

export async function upsertTimetableToSupabase(entry) {
  if (!isSupabaseConfigured() || !supabase) return { ok: false, reason: 'not_configured' };
  const { error } = await supabase.from('section_timetables').upsert(
    {
      section: entry.section,
      semester: entry.semester,
      room: entry.room,
      schedule: entry.schedule,
      updated_at: new Date().toISOString()
    },
    { onConflict: 'section' }
  );
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}

export async function upsertCourseToSupabase(course) {
  if (!isSupabaseConfigured() || !supabase) return { ok: false, reason: 'not_configured' };
  const { error } = await supabase.from('courses').upsert(
    {
      code: course.code,
      title: course.title,
      semester: course.semester,
      scheme: course.scheme || 'VTU 2022 Scheme',
      credits: course.credits || 3,
      domain: course.domain,
      topics: course.topics || [],
      materials: course.materials || [],
      updated_at: new Date().toISOString()
    },
    { onConflict: 'code' }
  );
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}

export async function uploadFileToSupabaseStorage(file, folder = 'materials') {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured (.env.local missing).');
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}_${safeName}`;
  const { error } = await supabase.storage.from('course-materials').upload(path, file, {
    cacheControl: '3600',
    upsert: false
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from('course-materials').getPublicUrl(path);
  return data.publicUrl;
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve({ dataUrl: result, base64 });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function parseTimetableImageWithOllama({ base64, model = 'llama3.2-vision', sectionName = 'CSE-A' }) {
  const prompt = `Extract the college class timetable from this image for section "${sectionName}".
Return ONLY valid JSON matching this exact structure, with no markdown fences or extra text:
{
  "section": "${sectionName}",
  "semester": "Semester X",
  "room": "Room / Block",
  "schedule": [
    { "day": "MON", "slots": ["09:00 Subject (Code)", "10:00 Subject", "11:15 Subject", "02:00 Lab (LAB-101)"] }
  ]
}`;

  const res = await fetch('http://127.0.0.1:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        {
          role: 'user',
          content: prompt,
          images: [base64]
        }
      ]
    })
  });

  if (!res.ok) {
    throw new Error(`Ollama returned HTTP ${res.status}. Ensure model "${model}" is pulled.`);
  }

  const data = await res.json();
  const content = data?.message?.content || '';
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not find valid JSON in model response.');
  }
  return JSON.parse(jsonMatch[0]);
}
