
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
];

const DEFAULT_RESULTS: { [studentId: string]: { [examId: string]: ExamResult } } = {
    // Class 6 - Daffodils - Set 4
    '01': { '4': { robotics: 40, coding: 0 } }, // Aarav jadhav
    '2': { '4': { robotics: 8, coding: 0 } }, // Aarush PATIL
    '7': { '4': { robotics: 27, coding: 0 } }, // ARNAV SINGH
    '10': { '4': { robotics: 29, coding: 0 } }, // AYESHA.KHAN
    '11': { '4': { robotics: 32, coding: 0 } }, // Daksh Saud
    '12': { '4': { robotics: 8, coding: 0 } }, // DHRUVIK SUMIT TAWARE
    '16': { '4': { robotics: 37, coding: 0 } }, // kshitij gopal tapare
    '17': { '4': { robotics: 35, coding: 0 } }, // MANEET TALAMPALLI
    '19': { '4': { robotics: 40, coding: 0 } }, // Mishti Malviya / nirved nilesh bhoir
    '22': { '4': { robotics: 29, coding: 0 } }, // raj santosh gondhale
    '24': { '4': { robotics: 32, coding: 0 } }, // Reva.Borate
    '25': { '4': { robotics: 29, coding: 0 } }, // rudraunsh agawane
    '26': { '4': { robotics: 35, coding: 0 } }, // SAKET.ISHWARDAS.NIMBARK
    '27': { '4': { robotics: 40, coding: 0 } }, // sayaan patel
    '28': { '4': { robotics: 43, coding: 0 } }, // shaurya shingankar
    '29': { '4': { robotics: 19, coding: 0 } }, // Shaurya . manchgar
    '30': { '4': { robotics: 37, coding: 0 } }, // Shourya Swapnil Barde
    '31': { '4': { robotics: 48, coding: 0 } }, // Suhas patro
    '33': { '4': { robotics: 32, coding: 0 } }, // Tanaswi Telange
    '36': { '4': { robotics: 13, coding: 0 } }, // Zahraa Al Friawi

    // Class 7 - A - Set 1
    '18': { '1': { robotics: 25, coding: 0 } }, // Rishita Singh

    // Class 7 - Daffodils - Set 1
    '01': { '1': { robotics: 40, coding: 0 } }, // Aadya Amit Wani
    // '2': { '1': { robotics: 8, coding: 0 } }, // AALIYA ANSARI - roll number exists in another class
    '3': { '1': { robotics: 32, coding: 0 } }, // Aastha lokhande
    '4': { '1': { robotics: 16, coding: 0 } }, // Aayansh jha
    // '7': { '1': { robotics: 27, coding: 0 } }, // arpit randive
    '8': { '1': { robotics: 29, coding: 0 } }, // bhargav kerkar
    // '11': { '1': { robotics: 32, coding: 0 } }, // himani yogendra yadav
    '13': { '1': { robotics: 32, coding: 0 } }, // keshav jha
    '14': { '1': { robotics: 35, coding: 0 } }, // kinjal.pandit
    '15': { '1': { robotics: 16, coding: 0 } }, // Merriza John
    // '16': { '1': { robotics: 37, coding: 0 } }, // Nattansh.Nardia
    // '17': { '1': { robotics: 35, coding: 0 } }, // jivika deepnarayan mishra
    // '19': { '1': { robotics: 40, coding: 0 } }, // Rishi Maurya
    '20': { '1': { robotics: 27, coding: 0 } }, // sai parkar
    '21': { '1': { robotics: 32, coding: 0 } }, // satyam kumar
    // '22': { '1': { robotics: 29, coding: 0 } }, // Saumya chavan
    // '26': { '1': { robotics: 35, coding: 0 } }, // Soham Sonawane
    '27': { '1': { robotics: 40, coding: 0 } }, // Surabhi Parekh
    // '30': { '1': { robotics: 37, coding: 0 } }, // Vihaan Dudani
    // '31': { '1': { robotics: 48, coding: 0 } }, // VRITIKA.ZENDE

    // Class 7 - Daisies - Set 1
    // '3': { '1': { robotics: 32, coding: 0 } }, // arnav parkar
    // '4': { '1': { robotics: 16, coding: 0 } }, // Aryan Nigam
    '06': { '1': { robotics: 35, coding: 0 } }, // Gauri Chavan
    '11': { '1': { robotics: 32, coding: 0 } }, // mukta sagar tawale
    // '14': { '1': { robotics: 35, coding: 0 } }, // PRAVEENSINGH RAO
    // '15': { '1': { robotics: 16, coding: 0 } }, // pruthviraj Patil
    '17': { '1': { robotics: 35, coding: 0 } }, // Risheesh Kannoly
    // '20': { '1': { robotics: 27, coding: 0 } }, // ROHITSETHIYA
    '23': { '1': { robotics: 27, coding: 0 } }, // Samyak Chaandrikapure
    // '25': { '1': { robotics: 29, coding: 0 } }, // shaurya patil
    // '27': { '1': { robotics: 40, coding: 0 } }, // shriyan.patel
    '28': { '1': { robotics: 43, coding: 0 } }, // sridharshan
    '29': { '1': { robotics: 19, coding: 0 } }, // tirth dhiwar

    // Class 8 - Daffodils - Set 2
    // '01': { '2': { robotics: 40, coding: 0 } }, // ABHIUDAY SINGH
    '02': { '2': { robotics: 37, coding: 0 } }, // Adiraj Hole
    // '3': { '2': { robotics: 32, coding: 0 } }, // ADVAIT MULEY
    '5': { '2': { robotics: 24, coding: 0 } }, // ARNAV PANSARE
    // '06': { '2': { robotics: 35, coding: 0 } }, // Atharv Ray
    // '10': { '2': { robotics: 29, coding: 0 } }, // dimple.shekhawat
    // '11': { '2': { robotics: 32, coding: 0 } }, // Harshada Tamhane
    // '12': { '2': { robotics: 8, coding: 0 } }, // HIND PATEL
    // '13': { '2': { robotics: 32, coding: 0 } }, // janvi Singh
    // '15': { '2': { robotics: 16, coding: 0 } }, // Keren Daniel
    '16': { '2': { robotics: 37, coding: 0 } }, // KRISHAY SHIVLAL MAKANI
    // '17': { '2': { robotics: 35, coding: 0 } }, // MANNAT KOKATE
    '19': { '2': { robotics: 40, coding: 0 } }, // MUJTABAKHAN
    // '20': { '2': { robotics: 27, coding: 0 } }, // Mishwa pokar
    '22': { '2': { robotics: 29, coding: 0 } }, // MUKUND PATEL
    // '23': { '2': { robotics: 27, coding: 0 } }, // NIDHI SARMA
    // '24': { '2': { robotics: 32, coding: 0 } }, // piyu.sirohi
    // '27': { '2': { robotics: 40, coding: 0 } }, // Rohan Saha
    // '28': { '2': { robotics: 43, coding: 0 } }, // RUCHI RAMESH CHAUBEY
    // '29': { '2': { robotics: 19, coding: 0 } }, // sayali sharad gund
    '30': { '2': { robotics: 37, coding: 0 } }, // shanttah dabhadkar
    // '31': { '2': { robotics: 48, coding: 0 } }, // subhransu sahoo
    '33': { '2': { robotics: 32, coding: 0 } }, // sujal.pandit
    '35': { '2': { robotics: 24, coding: 0 } }, // ved .mavani
    // '36': { '2': { robotics: 13, coding: 0 } }, // vidhyesh nikam
    // '37': { '2': { robotics: 19, coding: 0 } }, // vidhi dhonde
    '38': { '2': { robotics: 29, coding: 0 } }, // vijay gupta

    // Class 8 - Daisies - Set 2
    // '02': { '2': { robotics: 37, coding: 0 } }, // Aditya Kumar raj
    // '5': { '2': { robotics: 24, coding: 0 } }, // Arnav Ashok Godambe
    '06': { '2': { robotics: 35, coding: 0 } }, // athang koli
    // '7': { '2': { robotics: 27, coding: 0 } }, // devansh koli
    '09': { '2': { robotics: 35, coding: 0 } }, // gauri prajapati
    '10': { '2': { robotics: 29, coding: 0 } }, // harsh pravin bhoir
    '12': { '2': { robotics: 8, coding: 0 } }, // jjjeshon rex
    // '13': { '2': { robotics: 32, coding: 0 } }, // jalad tiwari
    '14': { '2': { robotics: 35, coding: 0 } }, // JAY JADHAV
    '15': { '2': { robotics: 16, coding: 0 } }, // jignesh jitendra patil
    // '16': { '2': { robotics: 37, coding: 0 } }, // kanak shah
    // '17': { '2': { robotics: 35, coding: 0 } }, // Kashish sonawale
    // '19': { '2': { robotics: 40, coding: 0 } }, // lucky tiwari
    '20': { '2': { robotics: 27, coding: 0 } }, // mher.pokar
    // '21': { '2': { robotics: 32, coding: 0 } }, // moksh rakesh more
    // '22': { '2': { robotics: 29, coding: 0 } }, // Naitik Jaiswal
    '24': { '2': { robotics: 32, coding: 0 } }, // pari baviskar
    '25': { '2': { robotics: 29, coding: 0 } }, // ParthVishalMane
    '26': { '2': { robotics: 35, coding: 0 } }, // PIVALJANGID
    // '27': { '2': { robotics: 40, coding: 0 } }, // Pratik Prem Kumar
    '28': { '2': { robotics: 43, coding: 0 } }, // pratik jadhav
    // '29': { '2': { robotics: 19, coding: 0 } }, // rajpal yadav
    // '30': { '2': { robotics: 37, coding: 0 } }, // riya helode
    '31': { '2': { robotics: 48, coding: 0 } }, // rudra tarmale
    '32': { '2': { robotics: 32, coding: 0 } }, // SANDEEP SETHI
    // '33': { '2': { robotics: 32, coding: 0 } }, // sarah shirsat
    '34': { '2': { robotics: 40, coding: 0 } }, // Shriyaan Nalawade
    // '35': { '2': { robotics: 24, coding: 0 } }, // shubham raj
    '37': { '2': { robotics: 19, coding: 0 } }, // sriaadityaa kumar
    // '38': { '2': { robotics: 29, coding: 0 } }, // Veer mugdiya
    '39': { '2': { robotics: 40, coding: 0 } }, // Vivaan Pokar
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

export function storeResult(studentId: string, examId: string, result: ExamResult) {
    if (typeof window !== 'undefined') {
        const results = getLocalStorageResults();
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

