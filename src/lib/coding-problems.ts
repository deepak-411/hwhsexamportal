export type CodingProblem = {
  id: string;
  title: string;
  description: string;
  language: 'python' | 'html';
  initialCode: string;
  referenceCode: string;
};

export const codingProblems: CodingProblem[] = [
  // --- HTML/CSS/JS (5 PROBLEMS) ---
  {
    id: 'html-1',
    title: 'Official Student Marksheet Pro',
    description: 'Design a highly professional student marksheet for Holy Writ High School. The layout must include a high-fidelity school header with logo, a student details grid, a marks table with pass/fail logic, and a dynamic signature area.',
    language: 'html',
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  /* Professional Marksheet CSS */
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; }
  .marksheet { width: 850px; margin: 30px auto; background: #fff; padding: 40px; border: 10px double #1e3a8a; position: relative; }
</style>
</head>
<body>
  <div class="marksheet">
    <!-- Build the official structure here -->
  </div>
</body>
</html>`,
    referenceCode: `<!-- Reference Template Included -->`
  },
  {
    id: 'html-2',
    title: 'Modern Corporate Portal',
    description: 'Create a responsive landing page for an AI laboratory. Must feature a glassmorphism navbar, hero section with gradient text, and a services grid.',
    language: 'html',
    initialCode: `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #0f172a; color: white; font-family: sans-serif; }
  .nav { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); padding: 20px; }
</style>
</head>
<body>
  <!-- Design the portal -->
</body>
</html>`,
    referenceCode: `/* Professional Glassmorphism Landing Page */`
  },
  {
    id: 'html-3',
    title: 'Advanced Auth System UI',
    description: 'Design a professional Login/Registration form with floating labels, password strength meter, and social login buttons using CSS Flexbox.',
    language: 'html',
    initialCode: `<!-- Auth UI Template -->`,
    referenceCode: `/* Modern Auth Reference */`
  },
  {
    id: 'html-4',
    title: 'Interactive Data Dashboard',
    description: 'Build a sidebar-based dashboard layout with statistics cards and a responsive table for student attendance tracking.',
    language: 'html',
    initialCode: `<!-- Dashboard Template -->`,
    referenceCode: `/* Dashboard Layout Reference */`
  },
  {
    id: 'html-5',
    title: 'School Event Portfolio',
    description: 'Develop a high-fidelity photo gallery for school events using CSS Grid and lightbox-style hover effects.',
    language: 'html',
    initialCode: `<!-- Portfolio Template -->`,
    referenceCode: `/* CSS Grid Portfolio Reference */`
  },

  // --- PYTHON (15 PROBLEMS) ---
  {
    id: 'py-1',
    title: 'Advanced Payroll & Tax Auditor',
    description: 'Build a comprehensive payroll system for 10 employees. Logic: Base Salary + 15% HRA + 10% DA. Deduct 12% PF and Professional Tax based on slabs.',
    language: 'python',
    initialCode: `# Employee Database: [Name, BaseSalary]
employees = [
    ["Vedant", 85000], ["Ayush", 78000], ["Rayyan", 92000]
]

def calculate_payroll(data):
    # Implement detailed payroll logic here
    pass`,
    referenceCode: `/* Python Payroll Engine */`
  },
  {
    id: 'py-2',
    title: 'Python Marksheet Generator',
    description: 'Create a system that inputs student data and prints a formatted console-based marksheet. Calculate Total, Percentage, and Grade (A1, A2, etc.) for 5 subjects.',
    language: 'python',
    initialCode: `# HWHS Python Marksheet Generator
student_name = "AYUSH CHATTARAJ"
roll_no = "XII-02"
marks = {
    "Physics": 85,
    "Chemistry": 92,
    "Maths": 88,
    "English": 78,
    "Computer": 95
}

def print_marksheet(name, roll, subject_marks):
    print("="*50)
    print(f"      HOLY WRIT HIGH SCHOOL - ANNUAL RESULT      ")
    print("="*50)
    # Complete the logic to print table and grades
    pass

print_marksheet(student_name, roll_no, marks)`,
    referenceCode: `/* Python Formatting Reference */`
  },
  {
    id: 'py-3',
    title: 'Inventory & Stock Optimizer',
    description: 'Manage a store inventory. Add products, update stock, and calculate total value. Implement a "Low Stock" alert for items below 5 units.',
    language: 'python',
    initialCode: `inventory = {} # {id: {"name": str, "qty": int, "price": float}}`,
    referenceCode: `/* Inventory Logic Reference */`
  },
  {
    id: 'py-4',
    title: 'Secure Banking Transaction Log',
    description: 'Simulate a bank account with Deposit, Withdraw, and Statement functions. Include transaction history tracking with timestamps.',
    language: 'python',
    initialCode: `class BankAccount:
    def __init__(self, owner, balance=0):
        pass`,
    referenceCode: `/* OOP Banking Reference */`
  },
  {
    id: 'py-5',
    title: 'Student Admission DB Engine',
    description: 'Store student profiles using a dictionary. Implement searching by Roll Number and filtering by Class/Faculty.',
    language: 'python',
    initialCode: `students = []`,
    referenceCode: `/* Data Filtering Reference */`
  },
  {
    id: 'py-6',
    title: 'Financial Compound Interest Calc',
    description: 'Calculate future value of investments. Compare Simple vs Compound interest for a 10-year period with annual increments.',
    language: 'python',
    initialCode: `def calculate_finance(p, r, t):
    pass`,
    referenceCode: `/* Finance Formula Reference */`
  },
  {
    id: 'py-7',
    title: 'Algorithm: Search & Sort Pro',
    description: 'Implement Binary Search and Bubble Sort. Use Binary Search to find a specific student ID in a sorted list of 100 entries.',
    language: 'python',
    initialCode: `def binary_search(arr, target):
    pass`,
    referenceCode: `/* Algorithm Reference */`
  },
  {
    id: 'py-8',
    title: 'E-Commerce Bill Generator',
    description: 'Calculate a final bill including GST (18%) and a 10% discount for orders above 5000 INR. Print a professional receipt.',
    language: 'python',
    initialCode: `def generate_bill(items):
    pass`,
    referenceCode: `/* E-Commerce Logic */`
  },
  {
    id: 'py-9',
    title: 'Scientific Calculator Engine',
    description: 'Build a calculator that handles basic arithmetic plus square roots, powers, and trigonometric functions using the math module.',
    language: 'python',
    initialCode: `import math`,
    referenceCode: `/* Math Module Reference */`
  },
  {
    id: 'py-10',
    title: 'Hospital Management Billing',
    description: 'Calculate hospital bills based on Ward Type (General/ICU), Days, and Medication costs. Include 5% insurance discount.',
    language: 'python',
    initialCode: `def bill_patient(ward, days):
    pass`,
    referenceCode: `/* Billing Logic */`
  },
  {
    id: 'py-11',
    title: 'Flight Ticket Booking System',
    description: 'Manage seat availability for a flight. Check-in passengers and assign seat numbers dynamically.',
    language: 'python',
    initialCode: `seats = [0] * 50 # 0=Available, 1=Booked`,
    referenceCode: `/* Reservation System */`
  },
  {
    id: 'py-12',
    title: 'Library Catalog Auditor',
    description: 'Track books borrowed and returned. Implement a system to calculate fine (5 INR/day) for late returns.',
    language: 'python',
    initialCode: `books = {}`,
    referenceCode: `/* Library Logic */`
  },
  {
    id: 'py-13',
    title: 'Quiz Application Engine',
    description: 'Create a quiz with 10 questions. Track score, time taken per question, and generate a final performance report.',
    language: 'python',
    initialCode: `questions = []`,
    referenceCode: `/* Quiz Engine Logic */`
  },
  {
    id: 'py-14',
    title: 'Weather Data Analyzer',
    description: 'Analyze temperature data for 7 days. Find Max, Min, and Average temperature. Count days above 40 degrees.',
    language: 'python',
    initialCode: `temps = [32, 35, 41, 38, 42, 39, 36]`,
    referenceCode: `/* Analytics Reference */`
  },
  {
    id: 'py-15',
    title: 'Voting System Integrity Check',
    description: 'Simulate a secure voting system. Count votes for 3 candidates and ensure no double voting using a set of Voter IDs.',
    language: 'python',
    initialCode: `votes = {"A": 0, "B": 0, "C": 0}`,
    referenceCode: `/* Security Logic Reference */`
  }
];
