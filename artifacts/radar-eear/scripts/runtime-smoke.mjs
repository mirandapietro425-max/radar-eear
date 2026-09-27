import assert from 'node:assert/strict';
import { computeProgress, getValidActivityDays, recommendNext, updateMemory } from '../src/lib/learning/engines.ts';
import { books, bibleBooks, thinkers, places, games, questions } from '../src/experience-data.ts';
import { broaderBooks } from '../src/data/catalog.ts';
import { apocrypha } from '../src/data/apocrypha.ts';
import { hardwareModules } from '../src/data/hardware.ts';
import { mathMicroconcepts, physicsMicroconcepts } from '../src/data/microconcepts.ts';
import { generatedQuestions } from '../src/data/question-bank.ts';
import { previousExamCatalog } from '../src/data/exam-archive.ts';
import fs from 'node:fs';

const base='2026-01-10T10:00:00.000Z';
const events=[
  {type:'question_answered',entityId:'q1',createdAt:base,correct:false,subject:'Matemática',meta:{topic:'Álgebra',confidence:1,elapsed_ms:9000}},
  {type:'question_answered',entityId:'q2',createdAt:'2026-01-10T10:01:00.000Z',correct:true,subject:'Física',meta:{topic:'Mecânica',confidence:3,elapsed_ms:5000}},
  {type:'session_completed',entityId:'topic:Mecânica',createdAt:'2026-01-10T10:40:00.000Z',seconds:1800,subject:'Física'},
  {type:'bible_chapter_opened',entityId:'genesis:1',createdAt:'2026-01-10T10:41:00.000Z',subject:'Bíblia'},
  {type:'bible_chapter_completed',entityId:'genesis:1',createdAt:'2026-01-10T10:50:00.000Z',subject:'Bíblia',meta:{chapter:1}},
  {type:'game_completed',entityId:'calc',createdAt:'2026-01-10T11:00:00.000Z',subject:'Matemática',meta:{score:240}}
];
const p=computeProgress(events);
assert.equal(p.attempts,2); assert.equal(p.correct,1); assert.equal(p.seconds,1800); assert.equal(p.bibleChaptersCompleted,1); assert.equal(p.completed,1);
assert.equal(getValidActivityDays([{...events[3]}]),0,'opening a chapter alone is not study completion');
assert.equal(getValidActivityDays([{...events[4]}]),1,'chapter completion is valid product activity');
const weakReview=updateMemory(undefined,false,3,9000,new Date(base));
assert.equal(weakReview.intervalDays,1); assert.equal(weakReview.memoryState,'learning');
const high=updateMemory(undefined,true,3,5000,new Date(base));
const low=updateMemory(undefined,true,1,5000,new Date(base));
assert.ok(high.intervalDays>=1 && low.intervalDays>=1);
const rec= recommendNext({events:[],reviews:{'question:q1':weakReview},goalMinutes:120,availableMinutes:20,preferredSubjects:[],now:new Date('2026-01-12T12:00:00.000Z')});
assert.equal(rec.type,'review');
const resumed=recommendNext({events:[],reviews:{},lastResume:{user_id:'u',content_type:'book',content_id:'guerra-e-paz',route:'/biblioteca/guerra-e-paz',elapsed_seconds:0,started_at:base,last_activity_at:base,status:'paused'},goalMinutes:120,availableMinutes:20});
assert.equal(resumed.type,'continue');
assert.equal(bibleBooks.length,66); assert.equal(bibleBooks.reduce((n,b)=>n+b[2],0),1189);
assert.equal(books.length+broaderBooks.length,30); assert.ok(thinkers.length>=20); assert.ok(places.length>=10); assert.ok(apocrypha.length>=20); assert.equal(hardwareModules.length,20); assert.equal(mathMicroconcepts.length,214); assert.equal(physicsMicroconcepts.length,240); assert.equal(questions.length+generatedQuestions.length,98); assert.ok(previousExamCatalog.length>=60);
const mustExist=['public/assets/bible/books/genesis.svg','public/assets/bible/books/revelation.svg','public/assets/apocrypha/1-enoque.svg','public/assets/hardware/20.svg'];
for(const f of mustExist) assert.ok(fs.existsSync(f),`missing ${f}`);
console.log(JSON.stringify({ok:true,progress:p,counts:{books:30,bibleBooks:66,bibleChapters:1189,thinkers:thinkers.length,places:places.length,apocrypha:apocrypha.length,hardware:hardwareModules.length,math:mathMicroconcepts.length,physics:physicsMicroconcepts.length,questions:98,previousExams:previousExamCatalog.length,games:11}},null,2));
