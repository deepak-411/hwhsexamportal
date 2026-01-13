
'use client';

export type ScheduledExam = {
  selectedClass: string;
  selectedSection: string;
  selectedSet: string;
};

export type ExamResult = {
    robotics: number; // MCQ score
    coding: number; // -1 if pending, 0 if evaluated as 0, or other score
}

const EXAMS_STORAGE_KEY = 'activeExams';
const RESULTS_STORAGE_KEY = 'examResults';
const ATTEMPTS_STORAGE_KEY = 'examAttempts';


const DEFAULT_EXAMS: ScheduledExam[] = [
    { selectedClass: '6', selectedSection: 'Daffodils', selectedSet: '4' },
    { selectedClass: '7', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '7', selectedSection: 'Daisies', selectedSet: '1' },
    { selectedClass: '7', selectedSection: 'A', selectedSet: '1' },
    { selectedClass: '8', selectedSection: 'Daffodils', selectedSet: '2' },
    { selectedClass: '8', selectedSection: 'Daisies', selectedSet: '2' },
    { selectedClass: '9', selectedSection: 'Daffodils', selectedSet: '7' },
    { selectedClass: '9', selectedSection: 'Daisies', selectedSet: '8' },
];

const DEFAULT_RESULTS: { [studentId: string]: { [examId: string]: ExamResult } } = {
    // Class 6
    '01-6-Daffodils': { '4': { robotics: 37, coding: 0 } },
    '02-6-Daffodils': { '4': { robotics: 11, coding: 0 } },
    '07-6-Daffodils': { '4': { robotics: 24, coding: 0 } },
    '10-6-Daffodils': { '4': { robotics: 29, coding: 0 } },
    '11-6-Daffodils': { '4': { robotics: 27, coding: 0 } },
    '12-6-Daffodils': { '4': { robotics: 8, coding: 0 } },
    '16-6-Daffodils': { '4': { robotics: 29, coding: 0 } },
    '17-6-Daffodils': { '4': { robotics: 43, coding: 0 } },
    '19-6-Daffodils': { '4': { robotics: 43, coding: 0 } },
    '22-6-Daffodils': { '4': { robotics: 27, coding: 0 } },
    '24-6-Daffodils': { '4': { robotics: 32, coding: 0 } },
    '25-6-Daffodils': { '4': { robotics: 29, coding: 0 } },
    '26-6-Daffodils': { '4': { robotics: 32, coding: 0 } },
    '27-6-Daffodils': { '4': { robotics: 40, coding: 0 } },
    '28-6-Daffodils': { '4': { robotics: 43, coding: 0 } },
    '29-6-Daffodils': { '4': { robotics: 19, coding: 0 } },
    '30-6-Daffodils': { '4': { robotics: 19, coding: 0 } },
    '31-6-Daffodils': { '4': { robotics: 35, coding: 0 } },
    '33-6-Daffodils': { '4': { robotics: 32, coding: 0 } },
    '36-6-Daffodils': { '4': { robotics: 13, coding: 0 } },

    // Class 7
    '18-7-A': { '1': { robotics: 35, coding: 0 } },
    '01-7-Daffodils': { '1': { robotics: 40, coding: 0 } },
    '02-7-Daffodils': { '1': { robotics: 8, coding: 0 } },
    '03-7-Daffodils': { '1': { robotics: 32, coding: 0 } },
    '04-7-Daffodils': { '1': { robotics: 16, coding: 0 } },
    '07-7-Daffodils': { '1': { robotics: 27, coding: 0 } },
    '08-7-Daffodils': { '1': { robotics: 29, coding: 0 } },
    '11-7-Daffodils': { '1': { robotics: 32, coding: 0 } },
    '13-7-Daffodils': { '1': { robotics: 32, coding: 0 } },
    '14-7-Daffodils': { '1': { robotics: 35, coding: 0 } },
    '15-7-Daffodils': { '1': { robotics: 16, coding: 0 } },
    '16-7-Daffodils': { '1': { robotics: 37, coding: 0 } },
    '17-7-Daffodils': { '1': { robotics: 35, coding: 0 } },
    '19-7-Daffodils': { '1': { robotics: 40, coding: 0 } },
    '20-7-Daffodils': { '1': { robotics: 27, coding: 0 } },
    '21-7-Daffodils': { '1': { robotics: 32, coding: 0 } },
    '22-7-Daffodils': { '1': { robotics: 29, coding: 0 } },
    '26-7-Daffodils': { '1': { robotics: 35, coding: 0 } },
    '27-7-Daffodils': { '1': { robotics: 48, coding: 0 } },
    '30-7-Daffodils': { '1': { robotics: 37, coding: 0 } },
    '31-7-Daffodils': { '1': { robotics: 48, coding: 0 } },
    '03-7-Daisies': { '1': { robotics: 32, coding: 0 } },
    '04-7-Daisies': { '1': { robotics: 32, coding: 0 } }, // Note: Roll 4 has two entries in class 7, different sections. This is fine.
    '06-7-Daisies': { '1': { robotics: 37, coding: 0 } },
    '11-7-Daisies': { '1': { robotics: 35, coding: 0 } },
    '14-7-Daisies': { '1': { robotics: 21, coding: 0 } },
    '15-7-Daisies': { '1': { robotics: 29, coding: 0 } },
    '17-7-Daisies': { '1': { robotics: 37, coding: 0 } },
    '20-7-Daisies': { '1': { robotics: 19, coding: 0 } },
    '23-7-Daisies': { '1': { robotics: 37, coding: 0 } },
    '25-7-Daisies': { '1': { robotics: 27, coding: 0 } },
    '27-7-Daisies': { '1': { robotics: 24, coding: 0 } },
    '28-7-Daisies': { '1': { robotics: 32, coding: 0 } },
    '29-7-Daisies': { '1': { robotics: 29, coding: 0 } },

    // Class 8
    '01-8-Daffodils': { '2': { robotics: 45, coding: 0 } },
    '02-8-Daffodils': { '2': { robotics: 37, coding: 0 } },
    '03-8-Daffodils': { '2': { robotics: 40, coding: 0 } },
    '05-8-Daffodils': { '2': { robotics: 24, coding: 0 } },
    '06-8-Daffodils': { '2': { robotics: 43, coding: 0 } },
    '10-8-Daffodils': { '2': { robotics: 45, coding: 0 } },
    '11-8-Daffodils': { '2': { robotics: 32, coding: 0 } },
    '12-8-Daffodils': { '2': { robotics: 29, coding: 0 } },
    '13-8-Daffodils': { '2': { robotics: 27, coding: 0 } },
    '15-8-Daffodils': { '2': { robotics: 48, coding: 0 } },
    '16-8-Daffodils': { '2': { robotics: 16, coding: 0 } },
    '17-8-Daffodils': { '2': { robotics: 27, coding: 0 } },
    '19-8-Daffodils': { '2': { robotics: 27, coding: 0 } },
    '20-8-Daffodils': { '2': { robotics: 37, coding: 0 } },
    '22-8-Daffodils': { '2': { robotics: 37, coding: 0 } },
    '23-8-Daffodils': { '2': { robotics: 27, coding: 0 } },
    '24-8-Daffodils': { '2': { robotics: 24, coding: 0 } },
    '27-8-Daffodils': { '2': { robotics: 0, coding: 0 } },
    '28-8-Daffodils': { '2': { robotics: 43, coding: 0 } },
    '29-8-Daffodils': { '2': { robotics: 37, coding: 0 } },
    '30-8-Daffodils': { '2': { robotics: 29, coding: 0 } },
    '31-8-Daffodils': { '2': { robotics: 21, coding: 0 } },
    '33-8-Daffodils': { '2': { robotics: 0, coding: 0 } },
    '35-8-Daffodils': { '2': { robotics: 24, coding: 0 } },
    '36-8-Daffodils': { '2': { robotics: 19, coding: 0 } },
    '37-8-Daffodils': { '2': { robotics: 19, coding: 0 } },
    '38-8-Daffodils': { '2': { robotics: 29, coding: 0 } },
    '02-8-Daisies': { '2': { robotics: 37, coding: 0 } },
    '05-8-Daisies': { '2': { robotics: 21, coding: 0 } },
    '06-8-Daisies': { '2': { robotics: 35, coding: 0 } },
    '07-8-Daisies': { '2': { robotics: 32, coding: 0 } },
    '09-8-Daisies': { '2': { robotics: 35, coding: 0 } },
    '10-8-Daisies': { '2': { robotics: 27, coding: 0 } },
    '12-8-Daisies': { '2': { robotics: 35, coding: 0 } },
    '13-8-Daisies': { '2': { robotics: 21, coding: 0 } },
    '14-8-Daisies': { '2': { robotics: 35, coding: 0 } },
    '15-8-Daisies': { '2': { robotics: 29, coding: 0 } },
    '16-8-Daisies': { '2': { robotics: 27, coding: 0 } },
    '17-8-Daisies': { '2': { robotics: 29, coding: 0 } },
    '19-8-Daisies': { '2': { robotics: 37, coding: 0 } },
    '20-8-Daisies': { '2': { robotics: 29, coding: 0 } },
    '21-8-Daisies': { '2': { robotics: 29, coding: 0 } },
    '22-8-Daisies': { '2': { robotics: 48, coding: 0 } },
    '24-8-Daisies': { '2': { robotics: 27, coding: 0 } },
    '25-8-Daisies': { '2': { robotics: 29, coding: 0 } },
    '26-8-Daisies': { '2': { robotics: 37, coding: 0 } },
    '27-8-Daisies': { '2': { robotics: 27, coding: 0 } },
    '28-8-Daisies': { '2': { robotics: 27, coding: 0 } },
    '29-8-Daisies': { '2': { robotics: 24, coding: 0 } },
    '30-8-Daisies': { '2': { robotics: 16, coding: 0 } },
    '31-8-Daisies': { '2': { robotics: 40, coding: 0 } },
    '32-8-Daisies': { '2': { robotics: 32, coding: 0 } },
    '33-8-Daisies': { '2': { robotics: 29, coding: 0 } },
    '34-8-Daisies': { '2': { robotics: 40, coding: 0 } },
    '35-8-Daisies': { '2': { robotics: 29, coding: 0 } },
    '37-8-Daisies': { '2': { robotics: 21, coding: 0 } },
    '38-8-Daisies': { '2': { robotics: 32, coding: 0 } },
    '39-8-Daisies': { '2': { robotics: 40, coding: 0 } },
};


export function storeExam(exam: ScheduledExam) {
  if (typeof window !== 'undefined') {
    const exams = getStoredExams();
    // Prevent duplicates - only one exam per class/section combo
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
function getLocalStorageResults(): { [studentId: string]: { [examId: string]: ExamResult } } {
    if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(RESULTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    }
    return {};
}

export function storeResult(studentRoll: string, studentClass: string, studentSection: string, examId: string, result: ExamResult) {
    if (typeof window !== 'undefined') {
        const results = getLocalStorageResults();
        const studentId = `${studentRoll.padStart(2, '0')}-${studentClass}-${studentSection}`;
        if (!results[studentId]) {
            results[studentId] = {};
        }
        results[studentId][examId] = result;
        window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
    }
}

export function getStoredResults(): { [studentId: string]: { [examId: string]: ExamResult } } {
    const localStorageResults = getLocalStorageResults();
    // Deep merge, with localStorageResults overriding DEFAULT_RESULTS
    const allResults = JSON.parse(JSON.stringify(DEFAULT_RESULTS));
    for (const studentId in localStorageResults) {
        if (!allResults[studentId]) {
            allResults[studentId] = {};
        }
        for (const examId in localStorageResults[studentId]) {
            allResults[studentId][examId] = localStorageResults[studentId][examId];
        }
    }
  return allResults;
}

export function getResultForStudent(studentId: string, examId: string): ExamResult | null {
    const allResults = getStoredResults();
    return allResults[studentId]?.[examId] || null;
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
        // An exam is considered attempted if a result exists for it (either hardcoded or in local storage).
        const result = getResultForStudent(studentId, examId);
        if (result) return true;

        // Fallback check for manually marked attempts, though the result check should be primary.
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        return attempts[attemptKey] || false;
    }
    return false;
}
