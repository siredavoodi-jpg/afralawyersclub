const fs = require("fs");
const path = require("path");

const CHAPTER = process.argv[2] ? Number(process.argv[2]) : 2;
const pad = (n) => String(n).padStart(2, "0");
const src = path.join(__dirname, "..", "src", "lib", "course", "data", `chapter-${pad(CHAPTER)}.json`);
const outDir = path.join(__dirname, "..", "src", "lib", "course", `chapter-${pad(CHAPTER)}`);

const raw = JSON.parse(fs.readFileSync(src, "utf8"));

// حذف فاصله‌های اضافی از نام کلیدها
function norm(v) {
  if (Array.isArray(v)) return v.map(norm);
  if (v && typeof v === "object") {
    const o = {};
    for (const k of Object.keys(v)) o[k.trim()] = norm(v[k]);
    return o;
  }
  return v;
}

const data = norm(raw);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const S = (v) => JSON.stringify(v ?? "");
const J = (v) => JSON.stringify(v ?? [], null, 2);

// تولید فایل هر درس
data.lessons.forEach((l) => {
  const n = pad(l.id);
  const gid = CHAPTER * 100 + l.id; // شناسه سراسری یکتا (جلوگیری از تداخل فصل‌ها)
  const L = [];
  L.push(`import type { Lesson } from "../types";`, ``);
  L.push(`const lesson${n}: Lesson = {`);
  L.push(`  id: ${gid},`);
  L.push(`  chapter: ${l.chapter},`);
  L.push(`  title: ${S(l.title)},`);
  L.push(`  icon: ${S(l.icon)},`);
  L.push(`  readingTime: ${S(l.readingTime)},`);
  L.push(`  difficulty: ${S(l.difficulty)},`);
  if (l.isFinal) L.push(`  isFinal: true,`);
  L.push(`  objectives: ${J(l.objectives)},`);
  L.push(`  sections: ${J(l.sections)},`);
  if (l.examples?.length) L.push(`  examples: ${J(l.examples)},`);
  if (l.tips?.length) L.push(`  tips: ${J(l.tips)},`);
  if (l.commonMistakes?.length) L.push(`  commonMistakes: ${J(l.commonMistakes)},`);
  if (l.exercise?.length) L.push(`  exercise: ${J(l.exercise)},`);
  if (l.answer?.length) L.push(`  answer: ${J(l.answer)},`);
  if (l.summary?.length) L.push(`  summary: ${J(l.summary)},`);
  if (l.keywords?.length) L.push(`  keywords: ${J(l.keywords)},`);
  if (l.glossary?.length) L.push(`  glossary: ${J(l.glossary)},`);
  if (l.prosCons) L.push(`  prosCons: ${J(l.prosCons)},`);
  if (l.comparisonTable) L.push(`  comparisonTable: ${J(l.comparisonTable)},`);
  if (l.sources?.length) L.push(`  sources: ${J(l.sources)},`);
  if (l.lastUpdated) L.push(`  lastUpdated: ${S(l.lastUpdated)},`);
  if (l.informationCurrencyNote) L.push(`  informationCurrencyNote: ${S(l.informationCurrencyNote)},`);
  L.push(`};`, ``);
  L.push(`export default lesson${n};`);
  fs.writeFileSync(path.join(outDir, `lesson-${n}.ts`), L.join("\n"), "utf8");
});

// تولید فایل آزمون فصل
const E = [];
E.push(`import type { QuizQuestion } from "../types";`, ``);
E.push(`const exam${pad(CHAPTER)}: QuizQuestion[] = ${J(data.quiz)};`, ``);
E.push(`export default exam${pad(CHAPTER)};`);
fs.writeFileSync(path.join(outDir, "exam.ts"), E.join("\n"), "utf8");

// تولید index فصل
const I = [];
I.push(`import type { Chapter } from "../types";`);
I.push(`import exam from "./exam";`);
data.lessons.forEach((l) => I.push(`import lesson${pad(l.id)} from "./lesson-${pad(l.id)}";`));
I.push(``);
I.push(`const chapter${pad(CHAPTER)}: Chapter = {`);
I.push(`  id: ${data.chapter},`);
I.push(`  title: ${S(data.title)},`);
I.push(`  description: ${S(data.goal || "")},`);
I.push(`  isActive: true,`);
I.push(`  isFree: ${CHAPTER === 1 ? "true" : "false"},`);
I.push(`  lessons: [${data.lessons.map((l) => `lesson${pad(l.id)}`).join(", ")}],`);
I.push(`  quiz: exam,`);
I.push(`  quizPassThreshold: ${data.quizPassThreshold ?? Math.ceil((data.quiz?.length || 0) * 0.7)},`);
I.push(`};`);
I.push(``);
I.push(`export default chapter${pad(CHAPTER)};`);
fs.writeFileSync(path.join(outDir, "index.ts"), I.join("\n"), "utf8");

console.log(`✅ فصل ${CHAPTER} تولید شد: ${data.lessons.length} درس + آزمون ${data.quiz.length} سوالی`);