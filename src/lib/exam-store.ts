'use client';

export type ScheduledExam = {
  selectedClass: string;
  selectedSection: string;
  selectedSet: string;
  subject?: string;
};

export type ExamResult = {
    robotics: number; // MCQ score
    coding: number; // -1 if pending, 0 if evaluated as 0, or other score, -2 for Computer Paper
}

export type CodingSubmission = {
  problemId: string;
  problemTitle: string;
  language: string;
  code: string;
  timestamp: number;
};

const EXAMS_STORAGE_KEY = 'activeExams';
const RESULTS_STORAGE_KEY = 'examResults';
const ATTEMPTS_STORAGE_KEY = 'examAttempts';
const CODING_SUBMISSIONS_KEY = 'codingSubmissions';


const DEFAULT_EXAMS: ScheduledExam[] = [
    { selectedClass: '6', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '6', selectedSection: 'Daisies', selectedSet: '2' },
    { selectedClass: '7', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '7', selectedSection: 'Daisies', selectedSet: '2' },
    { selectedClass: '7', selectedSection: 'A', selectedSet: '3' },
    { selectedClass: '8', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '8', selectedSection: 'Daisies', selectedSet: '2' },
    { selectedClass: '9', selectedSection: 'Daffodils', selectedSet: 'COMP-ANNUAL-9', subject: 'Computer' },
    { selectedClass: '9', selectedSection: 'Daisies', selectedSet: 'COMP-ANNUAL-9', subject: 'Computer' },
];

const DEFAULT_RESULTS: { [studentId: string]: { [examId: string]: ExamResult } } = {
    // Class 6
    '19-6-Daffodils': { '1': { robotics: 80, coding: -1 } }, // Mishti Malviya - Gold (Score 80/80)
    '28-6-Daffodils': { '1': { robotics: 79, coding: -1 } }, // shaurya shingankar - Silver (Score 79/80)
    '17-6-Daffodils': { '1': { robotics: 78, coding: -1 } }, // MANEET TALAMPALLI - Bronze (Score 78/80)
};


export function storeExam(exam: ScheduledExam) {
  if (typeof window !== 'undefined') {
    const exams = getStoredExams();
    const existingIndex = exams.findIndex(e => e.selectedClass === exam.selectedClass && e.selectedSection === exam.selectedSection);
    if (existingIndex > -1) {
        exams[existingIndex] = exam;
    } else {
        exams.push(exam);
    }
    window.localStorage.setItem(EXAMS_STORAGE_KEY, JSON.stringify(exams));
  }
}

export function getStoredExams(): ScheduledExam[] {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(EXAMS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_EXAMS;
  }
  return DEFAULT_EXAMS;
}


export function getExamForStudent(studentClass: string, studentSection: string): ScheduledExam | null {
    const exams = getStoredExams();
    return exams.find(e => e.selectedClass === studentClass && e.selectedSection === studentSection) || null;
}

// --- Result Management ---
export function getStoredResults(): { [studentId: string]: { [examId: string]: ExamResult } } {
    if (typeof window === 'undefined') {
        return DEFAULT_RESULTS;
    }
    const stored = window.localStorage.getItem(RESULTS_STORAGE_KEY);
    const localStorageResults = stored ? JSON.parse(stored) : {};
    const allResults = JSON.parse(JSON.stringify(DEFAULT_RESULTS));
    for (const studentId in localStorageResults) {
        if (!allResults[studentId]) {
            allResults[studentId] = localStorageResults[studentId];
        } else {
            allResults[studentId] = {
                ...allResults[studentId],
                ...localStorageResults[studentId]
            };
        }
    }
    window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(allResults));
    return allResults;
}


export function storeResult(studentRoll: string, studentClass: string, studentSection: string, examId: string, result: ExamResult) {
    if (typeof window !== 'undefined') {
        const results = getStoredResults();
        const studentId = `${studentRoll.padStart(2, '0')}-${studentClass}-${studentSection}`;
        if (!results[studentId]) {
            results[studentId] = {};
        }
        results[studentId][examId] = result;
        window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
    }
}

export function getResultForStudent(studentId: string, examId: string): ExamResult | null {
    const allResults = getStoredResults();
    return allResults[studentId]?.[examId] || null;
}

// --- Coding Submissions Store ---
export function storeCodingSubmission(studentId: string, submission: CodingSubmission) {
  if (typeof window !== 'undefined') {
    const key = `${CODING_SUBMISSIONS_KEY}_${studentId}`;
    const stored = window.localStorage.getItem(key);
    const submissions: CodingSubmission[] = stored ? JSON.parse(stored) : [];
    submissions.push(submission);
    window.localStorage.setItem(key, JSON.stringify(submissions));
  }
}

export function getCodingSubmissions(studentId: string): CodingSubmission[] {
  if (typeof window !== 'undefined') {
    const key = `${CODING_SUBMISSIONS_KEY}_${studentId}`;
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

// --- Attempt Management ---
function getStoredAttempts(): { [key: string]: boolean } {
    if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(ATTEMPTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    return {};
}

export function markExamAsAttempted(studentId: string, examId: string) {
    if (typeof window !== 'undefined') {
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        attempts[attemptKey] = true;
        window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    }
}

export function hasAttemptedExam(studentId: string, examId: string): boolean {
    if (typeof window !== 'undefined') {
        const studentKey = `${studentId.split('-')[0].padStart(2,'0')}-${studentId.split('-')[1]}-${studentId.split('-')[2]}`;
        const result = getResultForStudent(studentKey, examId);
        if (result) return true;
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        return attempts[attemptKey] || false;
    }
    return false;
}

export function clearAttempt(studentId: string, examId: string) {
    if (typeof window !== 'undefined') {
        const results = getStoredResults();
        if (results[studentId]) {
            delete results[studentId][examId];
            window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
        }
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        delete attempts[attemptKey];
        window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    }
}
