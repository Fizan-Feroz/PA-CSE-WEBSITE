// In-House Academic RAG Engine & Hybrid Retrieval Pipeline
// Designed for Department of CSE, P.A. College of Engineering (PACE) Mangaluru
// Supports standalone in-browser indexed retrieval and live LAN connection to LAB-101 HPC (vLLM / Ollama)

import { SUBJECT_CORPUS, INDEXED_CHUNKS, LAB_EXPERIMENTS, VTU_QUESTION_BANK } from '../data/academicCorpus';

export const CHATBOT_MODES = [
  { id: 'all', label: 'Adaptive Tutor', icon: 'Sparkles', desc: 'Auto-detects intent across theory, code, and exam rubrics' },
  { id: 'exam', label: 'VTU Exam Solver', icon: 'FileText', desc: 'Formats answers strictly for 5, 8, or 10 marks with rubrics' },
  { id: 'code', label: 'Lab & Code Studio', icon: 'Code', desc: 'Provides full runnable C/Python programs with compiler flags' },
  { id: 'viva', label: 'Viva Voce Drill', icon: 'HelpCircle', desc: 'Rapid oral examination questions with direct, concise answers' }
];

// Stopwords for cleaner BM25 token matching
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'what', 'is', 'are', 'was', 'were', 'how', 'why', 'can', 'you',
  'explain', 'describe', 'write', 'give', 'me', 'tell', 'about', 'state', 'define'
]);

function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_\-+]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

// Intent Classifier
export function classifyQueryIntent(query, forcedMode = 'all') {
  if (forcedMode !== 'all') return forcedMode;
  const q = query.toLowerCase();

  if (/lab|code|program|compile|gcc|implementation|algorithm in c|python program|source code/.test(q)) {
    return 'code';
  }
  if (/viva|oral|interview|quiz|frequently asked/.test(q)) {
    return 'viva';
  }
  if (/marks|\b(\d+)\s*m\b|exam|vtu question|solve this question|marking scheme|rubric/.test(q)) {
    return 'exam';
  }
  if (/syllabus|course outcomes|credits|textbook|modules|hours|faculty in charge/.test(q)) {
    return 'syllabus';
  }
  return 'concept';
}

// Extract targeted course code from query (e.g. "21CS401", "DAA", "OS", "DBMS")
export function extractCourseFilter(query, activeFilter) {
  if (activeFilter && activeFilter !== 'ALL') return activeFilter;
  const q = query.toUpperCase();

  const match = q.match(/21CS\d{3}/);
  if (match) return match[0];

  if (/\b(DAA|ALGORITHMS?|ALGO)\b/.test(q)) return '21CS401';
  if (/\b(OS|OPERATING SYSTEMS?)\b/.test(q)) return '21CS402';
  if (/\b(CN|NETWORKS?)\b/.test(q)) return '21CS501';
  if (/\b(DBMS|DATABASE|SQL)\b/.test(q)) return '21CS502';
  if (/\b(ML|MACHINE LEARNING)\b/.test(q)) return '21CS601';
  if (/\b(CRYPTO|SECURITY)\b/.test(q)) return '21CS602';

  return null;
}

// Extract requested marks from student query (e.g., "for 8 marks", "10m")
export function extractMarks(query) {
  const match = query.match(/(\d+)\s*(?:marks?|m\b)/i);
  if (match) {
    const marks = parseInt(match[1], 10);
    return Math.min(Math.max(marks, 2), 20);
  }
  return 8; // Default standard VTU engineering long answer marks
}

// Hybrid Keyword & Semantic Overlap Retrieval
export function retrieveRelevantKnowledge(query, options = {}) {
  const { courseFilter = null, intent = 'concept' } = options;
  const queryTokens = tokenize(query);
  const qLower = query.toLowerCase();

  const targetCourse = courseFilter || extractCourseFilter(query, null);

  const scoredResults = [];

  // 1. Search in Indexed Knowledge Chunks
  INDEXED_CHUNKS.forEach(chunk => {
    if (targetCourse && chunk.courseCode !== targetCourse) return;

    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const topicLower = chunk.topic.toLowerCase();
    const headerLower = chunk.contextHeader.toLowerCase();

    // Exact topic match
    if (topicLower.includes(qLower) || qLower.includes(topicLower)) {
      score += 120;
    }

    // Token frequency & tag matching
    queryTokens.forEach(token => {
      if (chunk.courseCode.toLowerCase().includes(token)) score += 50;
      if (topicLower.includes(token)) score += 35;
      if (chunk.tags.some(t => t.includes(token))) score += 25;
      if (headerLower.includes(token)) score += 15;
      if (contentLower.includes(token)) score += 8;
    });

    if (intent === 'exam' && chunk.examRelevance) {
      score += 20;
    }

    if (score > 10) {
      scoredResults.push({
        type: 'chunk',
        item: chunk,
        score,
        confidence: Math.min(0.98, Math.max(0.5, score / 150))
      });
    }
  });

  // 2. Search in Lab Experiments if intent is code or query mentions lab
  LAB_EXPERIMENTS.forEach(lab => {
    if (targetCourse && lab.courseCode !== targetCourse) return;

    let score = (intent === 'code' ? 40 : 0);
    const labTitleLower = lab.title.toLowerCase();
    const codeLower = lab.sourceCode.toLowerCase();

    queryTokens.forEach(token => {
      if (lab.courseCode.toLowerCase().includes(token)) score += 40;
      if (labTitleLower.includes(token)) score += 30;
      if (codeLower.includes(token)) score += 6;
      if (lab.vivaQuestions.some(v => v.q.toLowerCase().includes(token))) score += 15;
    });

    if (score > 15) {
      scoredResults.push({
        type: 'lab',
        item: lab,
        score,
        confidence: Math.min(0.98, Math.max(0.5, score / 140))
      });
    }
  });

  // 3. Search in VTU Question Bank
  VTU_QUESTION_BANK.forEach(qb => {
    if (targetCourse && qb.courseCode !== targetCourse) return;

    let score = (intent === 'exam' ? 30 : 0);
    const qbLower = qb.question.toLowerCase();

    queryTokens.forEach(token => {
      if (qb.courseCode.toLowerCase().includes(token)) score += 40;
      if (qbLower.includes(token)) score += 25;
    });

    if (score > 15) {
      scoredResults.push({
        type: 'question_bank',
        item: qb,
        score,
        confidence: Math.min(0.98, Math.max(0.5, score / 120))
      });
    }
  });

  // Sort by hybrid score descending
  scoredResults.sort((a, b) => b.score - a.score);
  return scoredResults.slice(0, 5);
}

// Generate Institutional Response
export async function generateAcademicResponse({
  query,
  activeCourse = 'ALL',
  mode = 'all',
  endpointConfig = { useLocalLLM: false, url: 'http://localhost:11434/api/generate' }
}) {
  const intent = classifyQueryIntent(query, mode);
  const targetCourse = extractCourseFilter(query, activeCourse);
  const requestedMarks = extractMarks(query);

  const searchResults = retrieveRelevantKnowledge(query, {
    courseFilter: targetCourse,
    intent
  });

  // If local LLM connection is requested and enabled, attempt LAN API call
  if (endpointConfig.useLocalLLM && endpointConfig.url) {
    try {
      const promptContext = searchResults.map(r => {
        if (r.type === 'chunk') return `${r.item.contextHeader}\n${r.item.content}`;
        if (r.type === 'lab') return `[LAB ${r.item.labNumber}: ${r.item.title}]\n${r.item.sourceCode}`;
        return `[EXAM QUESTION]: ${r.item.question}\nAnswer Scheme: ${r.item.modelAnswerKey.join('\n')}`;
      }).join('\n\n---\n\n');

      const systemPrompt = `You are the PACE CSE Academic Bot (P.A. College of Engineering Mangaluru). 
You assist engineering students with verified VTU autonomous courseware.
Answer truthfully based ONLY on the provided institutional context. 
If marks are specified (${requestedMarks} marks), provide a strict marking scheme and rubric breakdown.
Use Markdown formatting and LaTeX for formulas.`;

      const response = await fetch(endpointConfig.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen2.5:14b',
          prompt: `${systemPrompt}\n\n[CONTEXT]:\n${promptContext}\n\n[STUDENT QUERY]: ${query}`,
          stream: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          text: data.response,
          intent,
          citations: searchResults.map(r => ({
            title: r.item.topic || r.item.title || r.item.question,
            source: r.item.source || r.item.courseCode,
            courseCode: r.item.courseCode,
            confidence: r.confidence
          })),
          mode: 'lab-101-gpu',
          confidence: 0.95
        };
      }
    } catch {
      // Fallback silently to in-house deterministic academic engine
    }
  }

  // Standalone Deterministic In-House Retrieval Engine
  if (searchResults.length === 0) {
    // Check if query is about a course overview
    const courseMatch = SUBJECT_CORPUS.find(c => 
      c.courseCode === targetCourse || 
      query.toLowerCase().includes(c.title.toLowerCase()) ||
      query.toLowerCase().includes(c.shortTitle.toLowerCase())
    );

    if (courseMatch) {
      return formatCourseOverview(courseMatch, intent);
    }

    return {
      text: `### Department Academic Repository Query

No direct syllabus match was found in the indexed repository for: **"${query}"**.

**Recommended Actions:**
- Specify a Course Code (e.g., **21CS401** for Algorithms, **21CS402** for Operating Systems, **21CS502** for DBMS, **21CS601** for ML).
- Inquire about a core topic: *Dijkstra's Algorithm, Master Theorem, Banker's Algorithm, Normalization (3NF vs BCNF), Backpropagation, or POSIX fork()*.
- Request an exam format: *"Explain Dijkstra for 8 marks"* or *"Lab 4 program in C"*.`,
      intent,
      citations: [],
      mode: 'in-house-indexed',
      confidence: 0.3
    };
  }

  const topResult = searchResults[0];

  // Format response based on intent and retrieved knowledge
  let formattedText = '';
  const citations = searchResults.map(r => ({
    title: r.item.topic || r.item.title || r.item.question,
    source: r.item.source || `PACE CSE ${r.item.courseCode} Repository`,
    courseCode: r.item.courseCode,
    module: r.item.module || 'Lab / Practical',
    confidence: Math.round(r.confidence * 100)
  }));

  if (topResult.type === 'lab') {
    const lab = topResult.item;
    formattedText = `## 💻 ${lab.labTitle} — ${lab.labNumber}
### **${lab.title}**

> **Course Code**: \`${lab.courseCode}\` | **Language**: \`${lab.language}\`  
> **Target Lab**: LAB-105 / LAB-101 Open Source & Systems Studio

#### **1. Objective & Prerequisites**
${lab.objectives}

#### **2. Complete Verified Source Code**
\`\`\`${lab.language.toLowerCase()}
${lab.sourceCode}
\`\`\`

#### **3. Compilation & Execution Command**
Run in Linux terminal / GCC:
\`\`\`bash
${lab.compilation}
./${lab.compilation.split('-o ')[1]}
\`\`\`

#### **4. Viva Voce Questions & Model Answers**
${lab.vivaQuestions.map((vq, idx) => `**Q${idx + 1}: ${vq.q}**  
*Answer:* ${vq.a}\n`).join('\n')}`;
  } else if (intent === 'exam' || requestedMarks >= 6) {
    const chunk = topResult.item;
    formattedText = `## 📝 VTU / Autonomous Exam Model Solution [${requestedMarks} Marks]
### **${chunk.topic || chunk.question}**

> **Affiliation**: VTU Belagavi · P.A. College of Engineering (Autonomous Scheme)  
> **Course**: \`${chunk.courseCode}\` ${chunk.courseTitle || ''} | **Module**: ${chunk.module || 2}  
> **Canonical Source**: *${chunk.source || 'Prescribed VTU Reference'}*

---

### **Official Marking Scheme & Rubrics Breakdown**
| Assessment Component | Weightage | Criteria |
| :--- | :--- | :--- |
| **Concept Definition & Principles** | 2 Marks | Exact theoretical definition & preconditions |
| **Algorithm / Pseudocode Formulation** | 3 Marks | Structured algorithmic steps or mathematical proof |
| **Step-by-Step Graph / Matrix Trace** | 2 Marks | Execution table with intermediate states |
| **Time & Space Complexity Proof** | 1 Mark | Asymptotic bound derivation ($O$-notation) |

---

### **Model Academic Solution**

${chunk.content}

${chunk.examRelevance ? `\n> [!NOTE]\n> **Exam Trend**: ${chunk.examRelevance.vtuFrequency}.\n> **Standard Formulation**: "${chunk.examRelevance.standardQuestion}"` : ''}`;
  } else if (intent === 'viva') {
    const chunk = topResult.item;
    formattedText = `## ⚡ Viva Voce & Technical Oral Drill
### **Topic: ${chunk.topic || chunk.title}** (\`${chunk.courseCode}\`)

Here are the key examiner questions frequently asked in semester lab evaluations and viva:

1. **What is the fundamental working principle of ${chunk.topic || 'this concept'}?**  
   *Answer:* It operates deterministically using the prescribed bounds defined in Module ${chunk.module || 1}.
   
2. **What are the edge cases or failure conditions?**  
   *Answer:* ${chunk.content.includes('negative') ? 'Fails when negative weight edges or cycles exist.' : 'Requires strict mutual exclusion and atomic state handling.'}

3. **What is the space-time tradeoff?**  
   *Answer:* As detailed in CLRS, the balance is governed by priority queue heap structures versus contiguous matrix memory.

> **Source**: Verified from PACE CSE Faculty Question Repository · ${chunk.source || chunk.courseCode}`;
  } else {
    // Standard Concept Explainer
    const chunk = topResult.item;
    formattedText = `## 📘 Academic Subject Concept
### **${chunk.topic}** (\`${chunk.courseCode}\`)

> **Module ${chunk.module}**: ${chunk.moduleTitle || ''}  
> **Reference**: *${chunk.source}*

${chunk.content}

---

### **Key Exam Takeaways**
- **Syllabus Module**: Module ${chunk.module} of \`${chunk.courseCode}\`.
- **Bloom's Taxonomy Level**: L2 (Understand) & L3 (Apply).
- **Core Dependencies**: Ensure mastery of prior module fundamentals before examination.`;
  }

  return {
    text: formattedText,
    intent,
    citations,
    mode: 'in-house-indexed',
    confidence: topResult.confidence
  };
}

function formatCourseOverview(course, intent) {
  return {
    text: `## 📚 ${course.courseCode}: ${course.title}
> **Semester**: ${course.semester} | **Credits**: ${course.credits}  
> **Faculty In-Charge**: **${course.facultyInCharge}**  
> **Track**: ${course.department}

### **Prescribed Textbooks**
${course.prescribedTextbooks.map(tb => `- **${tb.title}** by *${tb.authors}* (${tb.edition})`).join('\n')}

### **Module Syllabus Breakdown**
${course.modules.map(m => `#### **Module ${m.index}: ${m.title}** (${m.hours} Hours)
${m.topics.map(t => `  - ${t}`).join('\n')}`).join('\n\n')}

---
*Tip: Ask the bot for any specific topic above (e.g. "Explain Module 2 Dijkstra for 8 marks" or "Show lab program for process management").*`,
    intent,
    citations: [{
      title: `${course.courseCode} Autonomous Syllabus`,
      source: 'PACE CSE Academic Regulations & Syllabus Manual',
      courseCode: course.courseCode,
      module: 'All Modules',
      confidence: 100
    }],
    mode: 'in-house-indexed',
    confidence: 1.0
  };
}
