
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
    { selectedClass: '6', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '6', selectedSection: 'Daisies', selectedSet: '2' },
    { selectedClass: '7', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '7', selectedSection: 'Daisies', selectedSet: '2' },
    { selectedClass: '7', selectedSection: 'A', selectedSet: '3' },
    { selectedClass: '8', selectedSection: 'Daffodils', selectedSet: '1' },
    { selectedClass: '8', selectedSection: 'Daisies', selectedSet: '2' },
    { selectedClass: '9', selectedSection: 'Daffodils', selectedSet: '4' },
    { selectedClass: '9', selectedSection: 'Daisies', selectedSet: '5' },
];

const DEFAULT_RESULTS: { [studentId: string]: { [examId: string]: ExamResult } } = {
    // Class 6
    '01-6-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '02-6-Daffodils': { '1': { robotics: 11, coding: -1 } },
    '07-6-Daffodils': { '1': { robotics: 24, coding: -1 } },
    '10-6-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '11-6-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '12-6-Daffodils': { '1': { robotics: 8, coding: -1 } },
    '16-6-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '17-6-Daffodils': { '1': { robotics: 43, coding: -1 } },
    '19-6-Daffodils': { '1': { robotics: 43, coding: -1 } },
    '22-6-Daffodils': { '1': { robotics: 27, coding: -1 } },
    '24-6-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '25-6-Daffodils': { '1': { robotics: 29, coding: -1 } },
    '26-6-Daffodils': { '1': { robotics: 32, coding: -1 } },
    '27-6-Daffodils': { '1': { robotics: 40, coding: -1 } },
    '28-6-Daffodils': { '1': { robotics: 43, coding: -1 } },
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
    '30-7-Daffodils': { '1': { robotics: 37, coding: -1 } },
    '31-7-Daffodils': { '1': { robotics: 48, coding: -1 } },
    '03-7-Daisies': { '2': { robotics: 32, coding: -1 } },
    '04-7-Daisies': { '2': { robotics: 32, coding: -1 } },
    '06-7-Daisies': { '2': { robotics: 37, coding: -1 } },
    '11-7-Daisies': { '2': { robotics: 35, coding: -1 } },
    '14-7-Daisies': { '2': { robotics: 21, coding: -1 } },
    '15-7-Daisies': { '2': { robotics: 29, coding: -1 } },
    '17-7-Daisies': { '2': { robotics: 37, coding: -1 } },
    '20-7-Daisies': { '2': { robotics: 19, coding: -1 } },
    '23-7-Daisies': { '2': { robotics: 37, coding: -1 } },
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

    // Class 9 Daffodils
    '01-9-Daffodils': { '4': { robotics: 16, coding: -1 } },
    '02-9-Daffodils': { '4': { robotics: 21, coding: -1 } },
    '03-9-Daffodils': { '4': { robotics: 13, coding: -1 } },
    '04-9-Daffodils': { '4': { robotics: 21, coding: -1 } },
    '05-9-Daffodils': { '4': { robotics: 40, coding: -1 } },
    '07-9-Daffodils': { '4': { robotics: 3, coding: -1 } },
    '09-9-Daffodils': { '4': { robotics: 29, coding: -1 } },
    '10-9-Daffodils': { '4': { robotics: 21, coding: -1 } },
    '11-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '12-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '13-9-Daffodils': { '4': { robotics: 16, coding: -1 } },
    '14-9-Daffodils': { '4': { robotics: 40, coding: -1 } },
    '15-9-Daffodils': { '4': { robotics: 16, coding: -1 } },
    '16-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '19-9-Daffodils': { '4': { robotics: 3, coding: -1 } },
    '20-9-Daffodils': { '4': { robotics: 37, coding: -1 } },
    '21-9-Daffodils': { '4': { robotics: 29, coding: -1 } },
    '22-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '23-9-Daffodils': { '4': { robotics: 16, coding: -1 } },
    '24-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '25-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '26-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '27-9-Daffodils': { '4': { robotics: 11, coding: -1 } },
    '28-9-Daffodils': { '4': { robotics: 29, coding: -1 } },
    '29-9-Daffodils': { '4': { robotics: 40, coding: -1 } },
    '30-9-Daffodils': { '4': { robotics: 29, coding: -1 } },
    '33-9-Daffodils': { '4': { robotics: 32, coding: -1 } },
    '35-9-Daffodils': { '4': { robotics: 51, coding: -1 } },
    '36-9-Daffodils': { '4': { robotics: 5, coding: -1 } },
    '37-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '38-9-Daffodils': { '4': { robotics: 0, coding: -1 } },
    '39-9-Daffodils': { '4': { robotics: 13, coding: -1 } },
    '40-9-Daffodils': { '4': { robotics: 11, coding: -1 } },
    
    // Class 9 Daisies
    '02-9-Daisies': { '5': { robotics: 27, coding: -1 } }, // AASHVIK KADAM
    '03-9-Daisies': { '5': { robotics: 3, coding: -1 } }, // Amey jain
    '05-9-Daisies': { '5': { robotics: 37, coding: -1 } }, // Aniket Jadhav
    '06-9-Daisies': { '5': { robotics: 16, coding: -1 } }, // arnav patil
    '08-9-Daisies': { '5': { robotics: 24, coding: -1 } }, // Bhakti jain
    '09-9-Daisies': { '5': { robotics: 0, coding: -1 } }, // bilal.khan
    '10-9-Daisies': { '5': { robotics: 0, coding: -1 } }, // daksh umakant patil
    '13-9-Daisies': { '5': { robotics: 0, coding: -1 } }, // harsh shinde
    '14-9-Daisies': { '5': { robotics: 29, coding: -1 } }, // janak patel
    '15-9-Daisies': { '5': { robotics: 29, coding: -1 } }, // Janhavi Avinash Bhoir
    '16-9-Daisies': { '5': { robotics: 0, coding: -1 } }, // JIDNESH MOHAN SASE
    '19-9-Daisies': { '5': { robotics: 29, coding: -1 } }, // Ketki Jitendra Talele
    '20-9-Daisies': { '5': { robotics: 16, coding: -1 } }, // nikita mali
    '21-9-Daisies': { '5': { robotics: 3, coding: -1 } }, // NISHANT BRAMHARAKSHAS
    '23-9-Daisies': { '5': { robotics: 37, coding: -1 } }, // RAJ kante
    '26-9-Daisies': { '5': { robotics: 32, coding: -1 } }, // SOHAM MARBHAL
    '27-9-Daisies': { '5': { robotics: 27, coding: -1 } }, // Soham mishra
    '28-9-Daisies': { '5': { robotics: 0, coding: -1 } }, // SUYASH.RAUL
    '30-9-Daisies': { '5': { robotics: 0, coding: -1 } }, // Tanveer gaikwad
    '33-9-Daisies': { '5': { robotics: 24, coding: -1 } }, // VANSH MUKESH DALVI
    '35-9-Daisies': { '5': { robotics: 0, coding: -1 } }, // yuvraj patel
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
        const result = getResultForStudent(`${studentId.split('-')[0].padStart(2,'0')}-${studentId.split('-')[1]}-${studentId.split('-')[2]}`, examId);
        if (result) return true;

        // Fallback check for manually marked attempts, though the result check should be primary.
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        return attempts[attemptKey] || false;
    }
    return false;
}
