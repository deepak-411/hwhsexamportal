
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
    // Class 6 Daffodils - Set 4
    '01-6-Daffodils': { '4': { robotics: 40, coding: 0 } }, // Aarav jadhav
    '2-6-Daffodils': { '4': { robotics: 8, coding: 0 } }, // Aarush PATIL
    '7-6-Daffodils': { '4': { robotics: 27, coding: 0 } }, // ARNAV SINGH
    '10-6-Daffodils': { '4': { robotics: 29, coding: 0 } }, // AYESHA.KHAN
    '11-6-Daffodils': { '4': { robotics: 32, coding: 0 } }, // Daksh Saud
    '12-6-Daffodils': { '4': { robotics: 8, coding: 0 } }, // DHRUVIK SUMIT TAWARE
    '16-6-Daffodils': { '4': { robotics: 37, coding: 0 } }, // kshitij gopal tapare
    '17-6-Daffodils': { '4': { robotics: 35, coding: 0 } }, // MANEET TALAMPALLI
    '19-6-Daffodils': { '4': { robotics: 40, coding: 0 } }, // Mishti Malviya / nirved nilesh bhoir
    '22-6-Daffodils': { '4': { robotics: 29, coding: 0 } }, // raj santosh gondhale
    '24-6-Daffodils': { '4': { robotics: 32, coding: 0 } }, // Reva.Borate
    '25-6-Daffodils': { '4': { robotics: 29, coding: 0 } }, // rudraunsh agawane
    '26-6-Daffodils': { '4': { robotics: 35, coding: 0 } }, // SAKET.ISHWARDAS.NIMBARK
    '27-6-Daffodils': { '4': { robotics: 40, coding: 0 } }, // sayaan patel
    '28-6-Daffodils': { '4': { robotics: 43, coding: 0 } }, // shaurya shingankar
    '29-6-Daffodils': { '4': { robotics: 19, coding: 0 } }, // Shaurya . manchgar
    '30-6-Daffodils': { '4': { robotics: 37, coding: 0 } }, // Shourya Swapnil Barde
    '31-6-Daffodils': { '4': { robotics: 48, coding: 0 } }, // Suhas patro
    '33-6-Daffodils': { '4': { robotics: 32, coding: 0 } }, // Tanaswi Telange
    '36-6-Daffodils': { '4': { robotics: 13, coding: 0 } }, // Zahraa Al Friawi

    // Class 7 - A - Set 1
    '18-7-A': { '1': { robotics: 25, coding: 0 } }, // Rishita Singh

    // Class 7 - Daffodils - Set 1
    '01-7-Daffodils': { '1': { robotics: 40, coding: 0 } }, // Aadya Amit Wani
    '2-7-Daffodils': { '1': { robotics: 8, coding: 0 } }, // AALIYA ANSARI
    '3-7-Daffodils': { '1': { robotics: 32, coding: 0 } }, // Aastha lokhande
    '4-7-Daffodils': { '1': { robotics: 16, coding: 0 } }, // Aayansh jha
    '7-7-Daffodils': { '1': { robotics: 27, coding: 0 } }, // arpit randive
    '8-7-Daffodils': { '1': { robotics: 29, coding: 0 } }, // bhargav kerkar
    '11-7-Daffodils': { '1': { robotics: 32, coding: 0 } }, // himani yogendra yadav
    '13-7-Daffodils': { '1': { robotics: 32, coding: 0 } }, // keshav jha
    '14-7-Daffodils': { '1': { robotics: 35, coding: 0 } }, // kinjal.pandit
    '15-7-Daffodils': { '1': { robotics: 16, coding: 0 } }, // Merriza John
    '16-7-Daffodils': { '1': { robotics: 37, coding: 0 } }, // Nattansh.Nardia
    '17-7-Daffodils': { '1': { robotics: 35, coding: 0 } }, // jivika deepnarayan mishra
    '19-7-Daffodils': { '1': { robotics: 40, coding: 0 } }, // Rishi Maurya
    '20-7-Daffodils': { '1': { robotics: 27, coding: 0 } }, // sai parkar
    '21-7-Daffodils': { '1': { robotics: 32, coding: 0 } }, // satyam kumar
    '22-7-Daffodils': { '1': { robotics: 29, coding: 0 } }, // Saumya chavan
    '26-7-Daffodils': { '1': { robotics: 35, coding: 0 } }, // Soham Sonawane
    '27-7-Daffodils': { '1': { robotics: 48, coding: 0 } }, // Surabhi Parekh
    '30-7-Daffodils': { '1': { robotics: 37, coding: 0 } }, // Vihaan Dudani
    '31-7-Daffodils': { '1': { robotics: 48, coding: 0 } }, // VRITIKA.ZENDE

    // Class 7 - Daisies - Set 1
    '3-7-Daisies': { '1': { robotics: 32, coding: 0 } }, // arnav parkar
    '4-7-Daisies': { '1': { robotics: 16, coding: 0 } }, // Aryan Nigam
    '06-7-Daisies': { '1': { robotics: 35, coding: 0 } }, // Gauri Chavan
    '11-7-Daisies': { '1': { robotics: 32, coding: 0 } }, // mukta sagar tawale
    '14-7-Daisies': { '1': { robotics: 21, coding: 0 } }, // PRAVEENSINGH RAO
    '15-7-Daisies': { '1': { robotics: 29, coding: 0 } }, // pruthviraj Patil
    '17-7-Daisies': { '1': { robotics: 37, coding: 0 } }, // Risheesh Kannoly
    '20-7-Daisies': { '1': { robotics: 19, coding: 0 } }, // ROHITSETHIYA
    '23-7-Daisies': { '1': { robotics: 37, coding: 0 } }, // Samyak Chaandrikapure
    '25-7-Daisies': { '1': { robotics: 27, coding: 0 } }, // shaurya patil
    '27-7-Daisies': { '1': { robotics: 24, coding: 0 } }, // shriyan.patel
    '28-7-Daisies': { '1': { robotics: 32, coding: 0 } }, // sridharshan
    '29-7-Daisies': { '1': { robotics: 29, coding: 0 } }, // tirth dhiwar

    // Class 8 - Daffodils - Set 2
    '01-8-Daffodils': { '2': { robotics: 45, coding: 0 } }, // ABHIUDAY SINGH
    '02-8-Daffodils': { '2': { robotics: 37, coding: 0 } }, // Adiraj Hole
    '3-8-Daffodils': { '2': { robotics: 40, coding: 0 } }, // ADVAIT MULEY
    '5-8-Daffodils': { '2': { robotics: 24, coding: 0 } }, // ARNAV PANSARE
    '06-8-Daffodils': { '2': { robotics: 43, coding: 0 } }, // Atharv Ray
    '10-8-Daffodils': { '2': { robotics: 45, coding: 0 } }, // dimple.shekhawat
    '11-8-Daffodils': { '2': { robotics: 32, coding: 0 } }, // Harshada Tamhane
    '12-8-Daffodils': { '2': { robotics: 29, coding: 0 } }, // HIND PATEL
    '13-8-Daffodils': { '2': { robotics: 27, coding: 0 } }, // janvi Singh
    '15-8-Daffodils': { '2': { robotics: 48, coding: 0 } }, // Keren Daniel
    '16-8-Daffodils': { '2': { robotics: 16, coding: 0 } }, // KRISHAY SHIVLAL MAKANI
    '17-8-Daffodils': { '2': { robotics: 27, coding: 0 } }, // MANNAT KOKATE
    '19-8-Daffodils': { '2': { robotics: 27, coding: 0 } }, // MUJTABAKHAN
    '20-8-Daffodils': { '2': { robotics: 37, coding: 0 } }, // Mishwa pokar
    '22-8-Daffodils': { '2': { robotics: 37, coding: 0 } }, // MUKUND PATEL
    '23-8-Daffodils': { '2': { robotics: 27, coding: 0 } }, // NIDHI SARMA
    '24-8-Daffodils': { '2': { robotics: 24, coding: 0 } }, // piyu.sirohi
    '27-8-Daffodils': { '2': { robotics: 0, coding: 0 } }, // Rohan Saha
    '28-8-Daffodils': { '2': { robotics: 43, coding: 0 } }, // RUCHI RAMESH CHAUBEY
    '29-8-Daffodils': { '2': { robotics: 37, coding: 0 } }, // sayali sharad gund
    '30-8-Daffodils': { '2': { robotics: 29, coding: 0 } }, // shanttah dabhadkar
    '31-8-Daffodils': { '2': { robotics: 21, coding: 0 } }, // subhransu sahoo
    '33-8-Daffodils': { '2': { robotics: 0, coding: 0 } }, // sujal.pandit
    '35-8-Daffodils': { '2': { robotics: 24, coding: 0 } }, // ved .mavani
    '36-8-Daffodils': { '2': { robotics: 19, coding: 0 } }, // vidhyesh nikam
    '37-8-Daffodils': { '2': { robotics: 19, coding: 0 } }, // vidhi dhonde
    '38-8-Daffodils': { '2': { robotics: 29, coding: 0 } }, // vijay gupta

    // Class 8 - Daisies - Set 2
    '02-8-Daisies': { '2': { robotics: 43, coding: 0 } }, // Aditya Kumar raj
    '5-8-Daisies': { '2': { robotics: 21, coding: 0 } }, // Arnav Ashok Godambe
    '06-8-Daisies': { '2': { robotics: 35, coding: 0 } }, // athang koli
    '7-8-Daisies': { '2': { robotics: 32, coding: 0 } }, // devansh koli
    '09-8-Daisies': { '2': { robotics: 35, coding: 0 } }, // gauri prajapati
    '10-8-Daisies': { '2': { robotics: 3, coding: 0 } }, // harsh pravin bhoir
    '12-8-Daisies': { '2': { robotics: 35, coding: 0 } }, // jjjeshon rex
    '13-8-Daisies': { '2': { robotics: 21, coding: 0 } }, // jalad tiwari
    '14-8-Daisies': { '2': { robotics: 35, coding: 0 } }, // JAY JADHAV
    '15-8-Daisies': { '2': { robotics: 0, coding: 0 } }, // jignesh jitendra patil
    '16-8-Daisies': { '2': { robotics: 27, coding: 0 } }, // kanak shah
    '17-8-Daisies': { '2': { robotics: 29, coding: 0 } }, // Kashish sonawale
    '19-8-Daisies': { '2': { robotics: 37, coding: 0 } }, // lucky tiwari
    '20-8-Daisies': { '2': { robotics: 29, coding: 0 } }, // mher.pokar
    '21-8-Daisies': { '2': { robotics: 29, coding: 0 } }, // moksh rakesh more
    '22-8-Daisies': { '2': { robotics: 48, coding: 0 } }, // Naitik Jaiswal
    '24-8-Daisies': { '2': { robotics: 27, coding: 0 } }, // pari baviskar
    '25-8-Daisies': { '2': { robotics: 48, coding: 0 } }, // ParthVishalMane
    '26-8-Daisies': { '2': { robotics: 37, coding: 0 } }, // PIVALJANGID
    '27-8-Daisies': { '2': { robotics: 27, coding: 0 } }, // Pratik Prem Kumar
    '28-8-Daisies': { '2': { robotics: 27, coding: 0 } }, // pratik jadhav
    '29-8-Daisies': { '2': { robotics: 24, coding: 0 } }, // rajpal yadav
    '30-8-Daisies': { '2': { robotics: 16, coding: 0 } }, // riya helode
    '31-8-Daisies': { '2': { robotics: 40, coding: 0 } }, // rudra tarmale
    '32-8-Daisies': { '2': { robotics: 32, coding: 0 } }, // SANDEEP SETHI
    '33-8-Daisies': { '2': { robotics: 29, coding: 0 } }, // sarah shirsat
    '34-8-Daisies': { '2': { robotics: 40, coding: 0 } }, // Shriyaan Nalawade
    '35-8-Daisies': { '2': { robotics: 29, coding: 0 } }, // shubham raj
    '37-8-Daisies': { '2': { robotics: 21, coding: 0 } }, // sriaadityaa kumar
    '38-8-Daisies': { '2': { robotics: 32, coding: 0 } }, // Veer mugdiya
    '39-8-Daisies': { '2': { robotics: 40, coding: 0 } }, // Vivaan Pokar
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
        const studentId = `${studentRoll}-${studentClass}-${studentSection}`;
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
        const uniqueStudentKey = `${studentId}-${examId}`; // This logic might need to be more sophisticated
        const result = getResultForStudent(uniqueStudentKey, examId);
        if (result) return true;

        // Fallback check for manually marked attempts, though the result check should be primary.
        const attempts = getStoredAttempts();
        const attemptKey = `${studentId}_${examId}`;
        return attempts[attemptKey] || false;
    }
    return false;
}
