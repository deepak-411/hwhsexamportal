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

const EXAMS_STORAGE_KEY = 'activeExams';
const RESULTS_STORAGE_KEY = 'examResults';
const ATTEMPTS_STORAGE_KEY = 'examAttempts';


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
    '01-6-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '02-6-Daffodils': { '1': { robotics: 11, coding: -1 } },
    '07-6-Daffodils': { '1': { robotics: 24, coding: -1 } },
    '10-6-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '11-6-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '12-6-Daffodils': { '1': { robotics: 8, coding: -1 } },
    '16-6-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '22-6-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '24-6-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '25-6-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '26-6-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '27-6-Daffodils': { '1': { robotics: 39, coding: -1 } },
    '29-6-Daffodils': { '1': { robotics: 19, coding: -1 } },
    '30-6-Daffodils': { '1': { robotics: 19, coding: -1 } },
    '31-6-Daffodils': { '1': { robotics: 35, coding: -1 } },
    '33-6-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '36-6-Daffodils': { '1': { robotics: 13, coding: -1 } },

    // Class 7
    '18-7-A': { '3': { robotics: 35, coding: -1 } },
    '01-7-Daffodils': { '1': { robotics: 40, coding: -1 } },
    '02-7-Daffodils': { '1': { robotics: 8, coding: -1 } },
    '03-7-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '04-7-Daffodils': { '1': { robotics: 16, coding: -1 } },
    '07-7-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '08-7-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '11-7-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '13-7-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '14-7-Daffodils': { '1': { robotics: 35, coding: -1 } },
    '15-7-Daffodils': { '1': { robotics: 16, coding: -1 } },
    '16-7-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '17-7-Daffodils': { '1': { robotics: 35, coding: -1 } },
    '19-7-Daffodils': { '1': { robotics: 40, coding: -1 } },
    '20-7-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '21-7-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '22-7-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '26-7-Daffodils': { '1': { robotics: 35, coding: -1 } },
    '27-7-Daffodils': { '1': { robotics: 48, coding: -1 } },
    '28-7-Daffodils': { '1': { robotics: 24, coding: -1 } },
    '30-7-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '31-7-Daffodils': { '1': { robotics: 48, coding: -1 } },
    '03-7-Daisies': { '2': { robotics: 32, coding: -1 } },
    '04-7-Daisies': { '2': { robotics: 32, coding: -1 } },
    '05-7-Daisies': { '2': { robotics: 29, coding: -1 } },
    '06-7-Daisies': { '2': { robotics: 37, coding: -1 } },
    '11-7-Daisies': { '2': { robotics: 35, coding: -1 } },
    '14-7-Daisies': { '2': { robotics: 21, coding: -1 } },
    '15-7-Daisies': { '2': { robotics: 29, coding: -1 } },
    '17-7-Daisies': { '2': { robotics: 37, coding: -1 } },
    '20-7-Daisies': { '2': { robotics: 19, coding: -1 } },
    '23-7-Daisies': { '2': { robotics: 37, coding: -1 } },
    '24-7-Daisies': { '2': { robotics: 3, coding: -1 } },
    '25-7-Daisies': { '2': { robotics: 27, coding: -1 } },
    '27-7-Daisies': { '2': { robotics: 24, coding: -1 } },
    '28-7-Daisies': { '2': { robotics: 32, coding: -1 } },
    '29-7-Daisies': { '2': { robotics: 29, coding: -1 } },

    // Class 8
    '01-8-Daffodils': { '1': { robotics: 45, coding: -1 } },
    '02-8-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '03-8-Daffodils': { '1': { robotics: 40, coding: -1 } },
    '05-8-Daffodils': { '1': { robotics: 24, coding: -1 } },
    '06-8-Daffodils': { '1': { robotics: 43, coding: -1 } },
    '10-8-Daffodils': { '1': { robotics: 45, coding: -1 } },
    '11-8-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '12-8-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '13-8-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '15-8-Daffodils': { '1': { robotics: 48, coding: -1 } },
    '16-8-Daffodils': { '1': { robotics: 16, coding: -1 } },
    '17-8-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '19-8-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '20-8-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '22-8-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '23-8-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '24-8-Daffodils': { '1': { robotics: 24, coding: -1 } },
    '27-8-Daffodils': { '1': { robotics: 0, coding: -1 } },
    '28-8-Daffodils': { '1': { robotics: 43, coding: -1 } },
    '29-8-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '30-8-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '31-8-Daffodils': { '1': { robotics: 21, coding: -1 } },
    '33-8-Daffodils': { '1': { robotics: 0, coding: -1 } },
    '35-8-Daffodils': { '1': { robotics: 24, coding: -1 } },
    '36-8-Daffodils': { '1': { robotics: 19, coding: -1 } },
    '37-8-Daffodils': { '1': { robotics: 19, coding: -1 } },
    '38-8-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '02-8-Daisies': { '2': { robotics: 37, coding: -1 } },
    '05-8-Daisies': { '2': { robotics: 21, coding: -1 } },
    '06-8-Daisies': { '2': { robotics: 35, coding: -1 } },
    '07-8-Daisies': { '2': { robotics: 32, coding: -1 } },
    '09-8-Daisies': { '2': { robotics: 35, coding: -1 } },
    '10-8-Daisies': { '2': { robotics: 27, coding: -1 } },
    '12-8-Daisies': { '2': { robotics: 35, coding: -1 } },
    '13-8-Daisies': { '2': { robotics: 21, coding: -1 } },
    '14-8-Daisies': { '2': { robotics: 35, coding: -1 } },
    '15-8-Daisies': { '2': { robotics: 29, coding: -1 } },
    '16-8-Daisies': { '2': { robotics: 27, coding: -1 } },
    '17-8-Daisies': { '2': { robotics: 29, coding: -1 } },
    '19-8-Daisies': { '2': { robotics: 37, coding: -1 } },
    '20-8-Daisies': { '2': { robotics: 29, coding: -1 } },
    '21-8-Daisies': { '2': { robotics: 29, coding: -1 } },
    '22-8-Daisies': { '2': { robotics: 48, coding: -1 } },
    '24-8-Daisies': { '2': { robotics: 27, coding: -1 } },
    '25-8-Daisies': { '2': { robotics: 29, coding: -1 } },
    '26-8-Daisies': { '2': { robotics: 37, coding: -1 } },
    '27-8-Daisies': { '2': { robotics: 27, coding: -1 } },
    '28-8-Daisies': { '2': { robotics: 27, coding: -1 } },
    '29-8-Daisies': { '2': { robotics: 24, coding: -1 } },
    '30-8-Daisies': { '2': { robotics: 16, coding: -1 } },
    '31-8-Daisies': { '2': { robotics: 40, coding: -1 } },
    '32-8-Daisies': { '2': { robotics: 32, coding: -1 } },
    '33-8-Daisies': { '2': { robotics: 29, coding: -1 } },
    '34-8-Daisies': { '2': { robotics: 40, coding: -1 } },
    '35-8-Daisies': { '2': { robotics: 29, coding: -1 } },
    '37-8-Daisies': { '2': { robotics: 21, coding: -1 } },
    '38-8-Daisies': { '2': { robotics: 32, coding: -1 } },
    '39-8-Daisies': { '2': { robotics: 40, coding: -1 } },

    // Class 9 Computer (Out of 30)
    '01-9-Daffodils': { 'COMP-ANNUAL-9': { robotics: 30, coding: -2 } }, // Aarav - Gold
    '02-9-Daffodils': { 'COMP-ANNUAL-9': { robotics: 29, coding: -2 } }, // Aayush - Silver
    '03-9-Daffodils': { 'COMP-ANNUAL-9': { robotics: 28, coding: -2 } }, // Aditya - Bronze
    '04-9-Daffodils': { 'COMP-ANNUAL-9': { robotics: 24, coding: -2 } },
    '05-9-Daffodils': { 'COMP-ANNUAL-9': { robotics: 22, coding: -2 } },
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
export function getStoredResults(): { [studentId: string]: { [examId: string]: ExamResult } } {
    if (typeof window === 'undefined') {
        return DEFAULT_RESULTS;
    }

    const stored = window.localStorage.getItem(RESULTS_STORAGE_KEY);
    const localStorageResults = stored ? JSON.parse(stored) : {};

    // Deep merge: localStorage overrides defaults
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
    
    // Persist the merged results back to localStorage to keep it updated
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
        const studentKey = `${studentId.split('-')[0].padStart(2,'0')}-${studentId.split('-')[1]}-${studentId.split('-')[2]}`;
        const result = getResultForStudent(studentKey, examId);
        if (result) return true;

        // Fallback check for manually marked attempts, though the result check should be primary.
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        return attempts[attemptKey] || false;
    }
    return false;
}

export function clearAttempt(studentId: string, examId: string) {
    if (typeof window !== 'undefined') {
        // Clear from results
        const results = getStoredResults();
        if (results[studentId]) {
            delete results[studentId][examId];
            window.localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
        }

        // Clear from attempts
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        delete attempts[attemptKey];
        window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
    }
}