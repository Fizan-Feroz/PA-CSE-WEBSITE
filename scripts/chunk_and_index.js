#!/usr/bin/env node
/**
 * Academic Corpus Chunker & Indexing Pipeline
 * Department of Computer Science & Engineering, P.A. College of Engineering (PACE)
 * 
 * Usage:
 *   node scripts/chunk_and_index.js [--export-json] [--target-qdrant]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SUBJECT_CORPUS, INDEXED_CHUNKS, LAB_EXPERIMENTS, VTU_QUESTION_BANK } from '../src/data/academicCorpus.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('='.repeat(70));
console.log(' PACE CSE ACADEMIC CORPUS INGESTION & INDEXING PIPELINE');
console.log(' Department of Computer Science & Engineering · pace.edu.in');
console.log('='.repeat(70));

function buildVectorPayload() {
  const points = [];
  let pointIdCounter = 1;

  // 1. Process Concept Chunks
  INDEXED_CHUNKS.forEach(chunk => {
    points.push({
      id: pointIdCounter++,
      payload: {
        type: 'concept_chunk',
        chunkId: chunk.id,
        courseCode: chunk.courseCode,
        courseTitle: chunk.courseTitle,
        semester: chunk.semester,
        module: chunk.module,
        topic: chunk.topic,
        source: chunk.source,
        tags: chunk.tags,
        contextHeader: chunk.contextHeader,
        content: chunk.content,
        tokenEstimate: Math.round(chunk.content.length / 4),
        examMarks: chunk.examRelevance?.marks || 8
      }
    });
  });

  // 2. Process Lab Experiments
  LAB_EXPERIMENTS.forEach(lab => {
    points.push({
      id: pointIdCounter++,
      payload: {
        type: 'lab_experiment',
        courseCode: lab.courseCode,
        labNumber: lab.labNumber,
        title: lab.title,
        language: lab.language,
        objectives: lab.objectives,
        compilation: lab.compilation,
        sourceCode: lab.sourceCode,
        vivaCount: lab.vivaQuestions.length
      }
    });
  });

  // 3. Process VTU Question Bank
  VTU_QUESTION_BANK.forEach(qb => {
    points.push({
      id: pointIdCounter++,
      payload: {
        type: 'vtu_question',
        questionId: qb.id,
        courseCode: qb.courseCode,
        question: qb.question,
        module: qb.module,
        marks: qb.marks,
        frequency: qb.frequency,
        modelAnswerKey: qb.modelAnswerKey
      }
    });
  });

  return points;
}

const points = buildVectorPayload();

console.log(`\n✓ Ingested ${SUBJECT_CORPUS.length} Pilot Engineering Courses`);
console.log(`✓ Processed ${INDEXED_CHUNKS.length} Contextual Knowledge Chunks (with Anthropic-style headers)`);
console.log(`✓ Processed ${LAB_EXPERIMENTS.length} Full Laboratory Code Experiments`);
console.log(`✓ Processed ${VTU_QUESTION_BANK.length} VTU Exam Question Bank Entries`);
console.log(`✓ Total Vector Points Formatted: ${points.length}`);

// Output summary manifest
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const manifestPath = path.resolve(distDir, 'academic_qdrant_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify({
  collectionName: 'pace_cse_academic_corpus',
  vectorSize: 1024,
  distanceMetric: 'Cosine',
  generatedAt: new Date().toISOString(),
  totalPoints: points.length,
  points
}, null, 2));

console.log(`\n📦 Vector payload exported to: ${manifestPath}`);
console.log(' Ready for Qdrant / pgvector loading on LAB-101 GPU server.');
console.log('='.repeat(70));
