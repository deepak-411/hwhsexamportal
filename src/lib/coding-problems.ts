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
    <title>HWHS - Professional Marksheet</title>
    <style>
        /* Build the official structure here */
        body { font-family: sans-serif; background: #f0f2f5; }
    </style>
</head>
<body>
    <div class="marksheet">
        <!-- Official Marksheet Template -->
    </div>
</body>
</html>`,
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Official Marksheet - HWHS</title>
<style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #e6ecf0; padding: 20px; }
    .marksheet { width: 900px; margin: auto; background: white; padding: 40px; border: 15px double #003366; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; }
    .header { text-align: center; border-bottom: 4px solid #003366; padding-bottom: 20px; margin-bottom: 20px; }
    .header img { width: 100px; margin-bottom: 10px; }
    .header h1 { margin: 0; color: #003366; font-size: 28px; text-transform: uppercase; letter-spacing: 1px; }
    .header p { margin: 5px 0; color: #666; font-weight: bold; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
    .info-item { display: flex; font-size: 16px; }
    .info-label { font-weight: 800; color: #003366; width: 140px; }
    .statement-title { text-align: center; margin: 40px 0 20px; font-size: 24px; font-weight: 900; color: #cc0000; text-decoration: underline; letter-spacing: 5px; }
    .table-container { margin-top: 20px; border-radius: 12px; overflow: hidden; border: 2px solid #003366; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #003366; color: white; padding: 15px; font-size: 14px; text-transform: uppercase; }
    td { padding: 12px; text-align: center; border: 1px solid #cbd5e1; font-weight: 600; }
    .subject-col { text-align: left; padding-left: 20px; background: #f1f5f9; color: #003366; }
    .footer { margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end; }
    .result-summary { background: #003366; color: white; padding: 20px; border-radius: 8px; min-width: 300px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 18px; }
    .principal-sig { text-align: center; width: 250px; }
    .sig-line { border-top: 2px solid #000; margin-top: 10px; padding-top: 5px; font-weight: 900; text-transform: uppercase; }
    @media print { body { background: none; padding: 0; } .marksheet { margin: 0; border: none; box-shadow: none; } }
</style>
</head>
<body>
<div class="marksheet">
    <div class="header">
        <img src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" alt="Logo">
        <h1>Holy Writ High School and Junior College</h1>
        <p>Pimpoli, Barvi Dam Road, Badlapur (W), Dist. Thane</p>
        <p>Academic Session: 2025-2026</p>
    </div>
    <div class="info-grid">
        <div class="info-item"><span class="info-label">Student Name:</span> <span id="s_name">ABCD</span></div>
        <div class="info-item"><span class="info-label">Roll Number:</span> <span id="s_roll">12345</span></div>
        <div class="info-item"><span class="info-label">Class:</span> <span id="s_class">XII</span></div>
        <div class="info-item"><span class="info-label">Section:</span> <span id="s_sec">Daffodils</span></div>
        <div class="info-item"><span class="info-label">Stream:</span> <span id="s_stream">Commerce</span></div>
        <div class="info-item"><span class="info-label">Category:</span> <span id="s_cat">Regular</span></div>
    </div>
    <div class="statement-title">STATEMENT OF MARKS</div>
    <div class="table-container">
        <table id="marksTable">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Theory (80)</th>
                    <th>Practical (20)</th>
                    <th>Total (100)</th>
                    <th>Grade</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                <tr><td class="subject-col">Accountancy</td><td>72</td><td>18</td><td class="total">90</td><td class="grade"></td><td class="res"></td></tr>
                <tr><td class="subject-col">Business Studies</td><td>68</td><td>19</td><td class="total">87</td><td class="grade"></td><td class="res"></td></tr>
                <tr><td class="subject-col">Economics</td><td>65</td><td>18</td><td class="total">83</td><td class="grade"></td><td class="res"></td></tr>
                <tr><td class="subject-col">English Core</td><td>70</td><td>19</td><td class="total">89</td><td class="grade"></td><td class="res"></td></tr>
                <tr><td class="subject-col">Computer Science</td><td>75</td><td>20</td><td class="total">95</td><td class="grade"></td><td class="res"></td></tr>
            </tbody>
        </table>
    </div>
    <div class="footer">
        <div class="result-summary">
            <div class="summary-row"><span>Grand Total:</span> <span id="grandTotal">0</span></div>
            <div class="summary-row"><span>Percentage:</span> <span id="percent">0.00</span>%</div>
            <div class="summary-row"><span>Final Result:</span> <span id="finalRes">PASS</span></div>
        </div>
        <div class="principal-sig">
            <div style="height: 60px;"></div>
            <div class="sig-line">Principal Signature</div>
        </div>
    </div>
</div>
<script>
    function calculate() {
        let totalSum = 0; let fail = false;
        document.querySelectorAll("#marksTable tbody tr").forEach(row => {
            let total = parseInt(row.querySelector(".total").innerText);
            totalSum += total;
            let grade = "F";
            if(total >= 91) grade = "A1";
            else if(total >= 81) grade = "A2";
            else if(total >= 71) grade = "B1";
            else if(total >= 33) grade = "D";
            row.querySelector(".grade").innerText = grade;
            if(total < 33) { row.querySelector(".res").innerText = "FAIL"; fail = true; }
            else { row.querySelector(".res").innerText = "PASS"; }
        });
        document.getElementById("grandTotal").innerText = totalSum;
        let per = (totalSum / 500) * 100;
        document.getElementById("percent").innerText = per.toFixed(2);
        document.getElementById("finalRes").innerText = fail ? "FAIL" : "PASS";
    }
    calculate();
</script>
</body>
</html>`
  },
  {
    id: 'html-2',
    title: 'Enterprise Dashboard UI',
    description: 'Create a high-fidelity sidebar-based dashboard for a school administration system. Use CSS Grid for layout and Flexbox for navigation. Include stat cards with glassmorphism effects.',
    language: 'html',
    initialCode: `<!-- Enterprise Dashboard Template -->`,
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
    :root { --sidebar-w: 260px; --primary: #2563eb; --bg: #0f172a; --card: #1e293b; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: white; display: flex; min-height: 100vh; }
    aside { width: var(--sidebar-w); background: var(--card); border-right: 1px solid #334155; padding: 20px; display: flex; flex-direction: column; }
    .logo-area { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
    .logo-area div { width: 32px; height: 32px; background: var(--primary); border-radius: 8px; }
    nav ul { list-style: none; }
    nav li { padding: 12px 16px; border-radius: 8px; cursor: pointer; transition: 0.2s; margin-bottom: 4px; display: flex; align-items: center; gap: 12px; }
    nav li:hover { background: #334155; }
    nav li.active { background: var(--primary); }
    main { flex: 1; padding: 40px; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .stat-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 16px; transition: 0.3s; }
    .stat-card:hover { transform: translateY(-5px); border-color: var(--primary); }
    .stat-card h3 { color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .stat-card .val { font-size: 32px; font-weight: 800; }
</style>
</head>
<body>
<aside>
    <div class="logo-area"><div></div><strong>HWHS Admin</strong></div>
    <nav><ul><li class="active">Dashboard</li><li>Exams</li><li>Results</li><li>Students</li><li>Settings</li></ul></nav>
</aside>
<main>
    <div class="header"><h1>School Overview</h1><button style="padding: 10px 20px; border-radius: 8px; background: var(--primary); border: none; color: white; cursor: pointer;">Generate Report</button></div>
    <div class="stats-grid">
        <div class="stat-card"><h3>Total Students</h3><div class="val">1,248</div></div>
        <div class="stat-card"><h3>Pending Exams</h3><div class="val">12</div></div>
        <div class="stat-card"><h3>Avg Performance</h3><div class="val">84.2%</div></div>
        <div class="stat-card"><h3>Active Teachers</h3><div class="val">48</div></div>
    </div>
</main>
</body>
</html>`
  },
  {
    id: 'html-3',
    title: 'Advanced Auth System UI',
    description: 'Design a professional Login/Registration form with floating labels, password strength meter, and social login buttons using CSS Flexbox.',
    language: 'html',
    initialCode: `<!-- Auth UI Template -->`,
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
    body { background: linear-gradient(135deg, #1e3a8a, #1e1b4b); min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; }
    .auth-card { background: white; padding: 40px; border-radius: 20px; width: 400px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    h2 { text-align: center; color: #1e3a8a; margin-bottom: 30px; font-size: 24px; font-weight: 800; }
    .field { margin-bottom: 20px; position: relative; }
    input { width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 10px; outline: none; transition: 0.3s; font-size: 16px; }
    input:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
    label { position: absolute; left: 16px; top: 12px; color: #94a3b8; pointer-events: none; transition: 0.3s; }
    input:focus + label, input:not(:placeholder-shown) + label { transform: translateY(-25px) scale(0.85); background: white; padding: 0 4px; color: #3b82f6; font-weight: bold; }
    .btn { width: 100%; padding: 14px; background: #3b82f6; color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px; }
    .btn:hover { background: #2563eb; transform: scale(1.02); }
</style>
</head>
<body>
<div class="auth-card">
    <h2>Student Portal Login</h2>
    <div class="field"><input type="text" id="user" placeholder=" " required><label for="user">Roll Number</label></div>
    <div class="field"><input type="password" id="pass" placeholder=" " required><label for="pass">Password</label></div>
    <button class="btn">ACCESS PORTAL</button>
</div>
</body>
</html>`
  },
  {
    id: 'html-4',
    title: 'Animated Lab Portfolio',
    description: 'Develop a high-fidelity photo gallery for the Robotics & AI Lab using CSS Grid and sophisticated hover effects with transitions.',
    language: 'html',
    initialCode: `<!-- Lab Portfolio Template -->`,
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
    body { background: #000; color: #fff; font-family: sans-serif; padding: 50px; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
    .item { position: relative; height: 400px; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); transition: 0.5s; cursor: pointer; }
    .item img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; filter: grayscale(1); }
    .item:hover { transform: scale(1.03); border-color: #3b82f6; }
    .item:hover img { transform: scale(1.1); filter: grayscale(0); }
    .overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.9)); padding: 30px; transform: translateY(100%); transition: 0.5s; }
    .item:hover .overlay { transform: translateY(0); }
    .item h3 { font-size: 20px; margin-bottom: 5px; color: #3b82f6; }
    .item p { font-size: 14px; color: #cbd5e1; }
</style>
</head>
<body>
    <h1 style="text-align: center; margin-bottom: 50px; font-size: 40px; letter-spacing: 5px;">ADVANCED TECHNOLOGY LAB</h1>
    <div class="gallery">
        <div class="item"><img src="https://picsum.photos/seed/10/800/600" alt="Bot"><div class="overlay"><h3>Humanoid X1</h3><p>Research on bipedal stabilization logic.</p></div></div>
        <div class="item"><img src="https://picsum.photos/seed/11/800/600" alt="Lab"><div class="overlay"><h3>AI Vision Node</h3><p>Real-time neural network monitoring.</p></div></div>
        <div class="item"><img src="https://picsum.photos/seed/12/800/600" alt="Code"><div class="overlay"><h3>Quantum Sim</h3><p>Computing lab for Grade XII Science.</p></div></div>
    </div>
</body>
</html>`
  },
  {
    id: 'html-5',
    title: 'Real-time Event Countdown',
    description: 'Design a dynamic countdown timer for the upcoming school Annual Day. Include JS logic to calculate days, hours, and minutes remaining.',
    language: 'html',
    initialCode: `<!-- Event Countdown Template -->`,
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<style>
    body { background: #020617; color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; }
    .timer-wrap { text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 40px; background: linear-gradient(to right, #3b82f6, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .grid { display: flex; gap: 20px; }
    .box { background: #1e293b; padding: 30px; border-radius: 20px; min-width: 150px; border: 2px solid #334155; }
    .box div { font-size: 4rem; font-weight: 900; }
    .box span { text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 2px; }
</style>
</head>
<body>
<div class="timer-wrap">
    <h1>HWHS ANNUAL DAY 2026</h1>
    <div class="grid">
        <div class="box"><div id="d">00</div><span>Days</span></div>
        <div class="box"><div id="h">00</div><span>Hours</span></div>
        <div class="box"><div id="m">00</div><span>Mins</span></div>
    </div>
</div>
<script>
    const target = new Date("March 14, 2026 09:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        document.getElementById('d').innerText = Math.floor(diff/(1000*60*60*24));
        document.getElementById('h').innerText = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        document.getElementById('m').innerText = Math.floor((diff%(1000*60*60))/(1000*60));
    }, 1000);
</script>
</body>
</html>`
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
    referenceCode: `# HWHS Enterprise Payroll Engine v4.0
import datetime

employees = [
    {"id": "E101", "name": "VEDANT LIMBANI", "basic": 85000, "dept": "COMMERCE"},
    {"id": "E102", "name": "AYUSH CHATTARAJ", "basic": 78000, "dept": "SCIENCE"},
    {"id": "E103", "name": "RAYYAN NAI", "basic": 92000, "dept": "COMMERCE"},
    {"id": "E104", "name": "VINAYAK PANDEY", "basic": 65000, "dept": "SCIENCE"},
    {"id": "E105", "name": "T ROHIT RAO", "basic": 72000, "dept": "COMMERCE"}
]

def generate_salary_slip(emp):
    # Allowance Logic
    hra = emp['basic'] * 0.15
    da = emp['basic'] * 0.10
    gross = emp['basic'] + hra + da
    
    # Deduction Logic
    pf = emp['basic'] * 0.12
    pt = 200 if gross > 15000 else 0
    net_pay = gross - pf - pt
    
    return {
        "hra": hra, "da": da, "gross": gross,
        "pf": pf, "pt": pt, "net": net_pay
    }

def print_audit_report():
    print("="*60)
    print("      HWHS FACULTY PAYROLL AUDIT REPORT - 2025-26      ")
    print("="*60)
    print(f"{'EMP NAME':<15} {'DEPT':<12} {'GROSS':<10} {'PF':<8} {'NET PAY':<10}")
    print("-"*60)
    
    total_disbursement = 0
    for emp in employees:
        stats = generate_salary_slip(emp)
        total_disbursement += stats['net']
        print(f"{emp['name']:<15} {emp['dept']:<12} {stats['gross']:<10.2f} {stats['pf']:<8.2f} {stats['net']:<10.2f}")
    
    print("-"*60)
    print(f"TOTAL MONTHLY DISBURSEMENT: INR {total_disbursement:,.2f}")
    print("="*60)

if __name__ == "__main__":
    print_audit_report()`
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
    # Complete the logic to print table and grades
    pass`,
    referenceCode: `# HWHS Academic Reporting System v4.1
class MarksheetEngine:
    def __init__(self, name, roll, grade_class, section, stream):
        self.name = name
        self.roll = roll
        self.grade_class = grade_class
        self.section = section
        self.stream = stream
        self.marks = {}

    def add_marks(self, subject, score):
        if 0 <= score <= 100:
            self.marks[subject] = score
        else:
            print(f"Error: Invalid score for {subject}")

    def get_grade(self, score):
        if score >= 91: return "A1"
        if score >= 81: return "A2"
        if score >= 71: return "B1"
        if score >= 61: return "B2"
        if score >= 51: return "C1"
        if score >= 41: return "C2"
        if score >= 33: return "D"
        return "F"

    def display(self):
        print("\n" + "="*60)
        print("      HOLY WRIT HIGH SCHOOL - ANNUAL RESULT 2026      ")
        print("="*60)
        print(f"NAME: {self.name:<25} ROLL NO: {self.roll}")
        print(f"CLASS: {self.grade_class} - {self.section:<20} STREAM: {self.stream}")
        print("-"*60)
        print(f"{'SUBJECT':<20} {'MARKS':<10} {'MAX':<10} {'GRADE':<10}")
        print("-"*60)
        
        total = 0
        for sub, score in self.marks.items():
            total += score
            print(f"{sub:<20} {score:<10} {'100':<10} {self.get_grade(score):<10}")
        
        percentage = (total / (len(self.marks) * 100)) * 100
        result_status = "PASS" if all(s >= 33 for s in self.marks.values()) else "FAIL"
        
        print("-"*60)
        print(f"TOTAL: {total}/{len(self.marks)*100}   PERCENTAGE: {percentage:.2f}%")
        print(f"RESULT: {result_status}    OVERALL GRADE: {self.get_grade(percentage)}")
        print("="*60 + "\n")

# Execution Script
report = MarksheetEngine("AYUSH CHATTARAJ", "XII-02", "XII", "Daffodils", "COMMERCE")
report.add_marks("Physics", 85)
report.add_marks("Chemistry", 92)
report.add_marks("Maths", 88)
report.add_marks("English", 78)
report.add_marks("Computer", 95)
report.display()`
  },
  {
    id: 'py-3',
    title: 'Inventory & Stock Optimizer',
    description: 'Manage a store inventory. Add products, update stock, and calculate total value. Implement a "Low Stock" alert for items below 5 units.',
    language: 'python',
    initialCode: `inventory = {} # {id: {"name": str, "qty": int, "price": float}}`,
    referenceCode: `# HWHS Inventory Management System
class Inventory:
    def __init__(self):
        self.stock = {
            "S001": {"name": "LDR Sensors", "qty": 45, "price": 15},
            "S002": {"name": "Arduino UNO", "qty": 3, "price": 450},
            "S003": {"name": "Jumper Wires", "qty": 150, "price": 2},
            "S004": {"name": "BO Motors", "qty": 8, "price": 120}
        }

    def update_stock(self, item_id, amount):
        if item_id in self.stock:
            self.stock[item_id]['qty'] += amount
            print(f"Updated {self.stock[item_id]['name']} to {self.stock[item_id]['qty']} units.")

    def run_audit(self):
        print("\n" + "="*50)
        print("      HWHS ROBOTICS LAB - INVENTORY AUDIT      ")
        print("="*50)
        print(f"{'ITEM':<20} {'QTY':<8} {'PRICE':<8} {'TOTAL':<10}")
        print("-"*50)
        
        grand_total = 0
        for pid, data in self.stock.items():
            line_total = data['qty'] * data['price']
            grand_total += line_total
            status = "[!] LOW" if data['qty'] < 10 else "OK"
            print(f"{data['name']:<20} {data['qty']:<8} {data['price']:<8} {line_total:<10.2f} {status}")
            
        print("-"*50)
        print(f"LAB TOTAL ASSET VALUE: INR {grand_total:,.2f}")
        print("="*50)

lab_inv = Inventory()
lab_inv.run_audit()`
  },
  {
    id: 'py-4',
    title: 'Secure Banking Transaction Log',
    description: 'Simulate a bank account with Deposit, Withdraw, and Statement functions. Include transaction history tracking with timestamps.',
    language: 'python',
    initialCode: `class BankAccount:
    def __init__(self, owner, balance=0):
        pass`,
    referenceCode: `# HWHS Secure Banking Simulation
import time

class Account:
    def __init__(self, owner, account_no, initial_balance=5000):
        self.owner = owner
        self.acc_no = account_no
        self.balance = initial_balance
        self.ledger = [f"Account Created | Init Bal: {initial_balance} | {time.ctime()}"]

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self.ledger.append(f"DEPOSIT | +{amount} | {time.ctime()}")
            print(f"Successfully deposited INR {amount}")
        else:
            print("Error: Invalid deposit amount.")

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            self.ledger.append(f"WITHDRAW | -{amount} | {time.ctime()}")
            print(f"Successfully withdrawn INR {amount}")
        else:
            print("Error: Insufficient funds or invalid amount.")

    def print_statement(self):
        print("\n" + "#"*50)
        print(f"      OFFICIAL BANK STATEMENT: {self.owner}      ")
        print(f"      ACCOUNT NO: {self.acc_no}      ")
        print("#"*50)
        for entry in self.ledger:
            print(f"> {entry}")
        print("-"*50)
        print(f"CURRENT BALANCE: INR {self.balance:,.2f}")
        print("#"*50 + "\n")

acc = Account("VEDANT LIMBANI", "HW-998877")
acc.deposit(25000)
acc.withdraw(4500)
acc.print_statement()`
  },
  {
    id: 'py-5',
    title: 'Student Admission DB Engine',
    description: 'Store student profiles using a dictionary. Implement searching by Roll Number and filtering by Class/Faculty.',
    language: 'python',
    initialCode: `students = []`,
    referenceCode: `# HWHS Student Database Management System
class Database:
    def __init__(self):
        self.records = {}

    def add_student(self, sid, name, grade, stream):
        self.records[sid] = {"name": name, "class": grade, "stream": stream}

    def search(self, sid):
        if sid in self.records:
            data = self.records[sid]
            print(f"RECORD FOUND [{sid}]: {data['name']} (Class {data['class']} {data['stream']})")
        else:
            print(f"ERROR: Student ID {sid} not found.")

    def display_all(self):
        print("\n" + "="*50)
        print("      HWHS OFFICIAL STUDENT DATABASE 2026      ")
        print("="*50)
        print(f"{'ID':<10} {'NAME':<20} {'CLASS':<10} {'STREAM':<10}")
        print("-"*50)
        for sid, data in self.records.items():
            print(f"{sid:<10} {data['name']:<20} {data['class']:<10} {data['stream']:<10}")
        print("="*50)

db = Database()
db.add_student("101", "VEDANT LIMBANI", "XII", "COMMERCE")
db.add_student("102", "AYUSH CHATTARAJ", "XII", "SCIENCE")
db.add_student("103", "RAYYAN NAI", "XII", "COMMERCE")
db.display_all()`
  },
  {
    id: 'py-6',
    title: 'Financial Compound Interest Calc',
    description: 'Calculate future value of investments. Compare Simple vs Compound interest for a 10-year period with annual increments.',
    language: 'python',
    initialCode: `def calculate_finance(p, r, t):
    pass`,
    referenceCode: `# HWHS Financial Calculator - Investment Comparison
def analyze_investment(principal, rate, years):
    print("\n" + "*"*60)
    print(f"      INVESTMENT ANALYSIS REPORT - {years} YEARS      ")
    print(f"      PRINCIPAL: {principal} | RATE: {rate}%      ")
    print("*"*60)
    print(f"{'YEAR':<10} {'SIMPLE INT':<15} {'COMPOUND INT':<15} {'DIFF':<10}")
    print("-"*60)
    
    for year in range(1, years + 1):
        si = principal * (rate/100) * year
        ci = principal * ((1 + rate/100)**year) - principal
        diff = ci - si
        print(f"{year:<10} {si:<15.2f} {ci:<15.2f} {diff:<10.2f}")
    
    print("-"*60)
    print("ANALYSIS COMPLETE: COMPOUND INTEREST SUPERIORITY OBSERVED.")
    print("*"*60 + "\n")

analyze_investment(100000, 8.5, 10)`
  },
  {
    id: 'py-7',
    title: 'Algorithm: Search & Sort Pro',
    description: 'Implement Binary Search and Bubble Sort. Use Binary Search to find a specific student ID in a sorted list of 100 entries.',
    language: 'python',
    initialCode: `def binary_search(arr, target):
    pass`,
    referenceCode: `# HWHS Computer Science - Algorithm Workshop
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    steps = 0
    while low <= high:
        steps += 1
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid, steps
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1, steps

# Main Execution
data = [88, 12, 45, 99, 101, 23, 56, 77, 34, 1]
print(f"Raw Data: {data}")
sorted_data = bubble_sort(data)
print(f"Sorted Data: {sorted_data}")

target = 77
index, iterations = binary_search(sorted_data, target)
if index != -1:
    print(f"Target {target} found at index {index} in {iterations} steps.")
else:
    print(f"Target {target} not found after {iterations} steps.")`
  },
  {
    id: 'py-8',
    title: 'E-Commerce Bill Generator',
    description: 'Calculate a final bill including GST (18%) and a 10% discount for orders above 5000 INR. Print a professional receipt.',
    language: 'python',
    initialCode: `def generate_bill(items):
    pass`,
    referenceCode: `# HWHS Commerce - E-Commerce Billing Logic
class POS:
    def __init__(self, store_name):
        self.store = store_name
        self.cart = []

    def add_to_cart(self, item, price, qty):
        self.cart.append({"name": item, "price": price, "qty": qty})

    def generate_invoice(self):
        print("\n" + "="*50)
        print(f"      {self.store} - TAX INVOICE      ")
        print("="*50)
        print(f"{'ITEM':<20} {'QTY':<8} {'PRICE':<8} {'TOTAL':<10}")
        print("-"*50)
        
        subtotal = 0
        for item in self.cart:
            total = item['price'] * item['qty']
            subtotal += total
            print(f"{item['name']:<20} {item['qty']:<8} {item['price']:<8} {total:<10.2f}")
            
        discount = subtotal * 0.10 if subtotal > 5000 else 0
        taxable_amt = subtotal - discount
        gst = taxable_amt * 0.18
        final_bill = taxable_amt + gst
        
        print("-"*50)
        print(f"SUBTOTAL: {subtotal:>35.2f}")
        print(f"DISCOUNT (10%): {discount:>31.2f}")
        print(f"GST (18%): {gst:>36.2f}")
        print("-"*50)
        print(f"FINAL BILL AMOUNT: INR {final_bill:>27.2f}")
        print("="*50 + "\n")

shop = POS("HWHS CAMPUS STORE")
shop.add_to_cart("Physics NCERT", 450, 2)
shop.add_to_cart("Scientific Calc", 1200, 1)
shop.add_to_cart("Lab Manual Kit", 3800, 1)
shop.generate_invoice()`
  },
  {
    id: 'py-9',
    title: 'Scientific Calculator Engine',
    description: 'Build a calculator that handles basic arithmetic plus square roots, powers, and trigonometric functions using the math module.',
    language: 'python',
    initialCode: `import math`,
    referenceCode: `# HWHS Science - Scientific Computation Engine
import math

class SciCalc:
    @staticmethod
    def solve(op, *args):
        try:
            if op == "sqrt": return math.sqrt(args[0])
            if op == "pow": return math.pow(args[0], args[1])
            if op == "sin": return math.sin(math.radians(args[0]))
            if op == "cos": return math.cos(math.radians(args[0]))
            if op == "log": return math.log10(args[0])
            if op == "add": return sum(args)
            return "Unknown Operation"
        except Exception as e:
            return f"Error: {str(e)}"

calc = SciCalc()
print("--- SCIENTIFIC COMPUTATION NODES ---")
print(f"Square Root (144): {calc.solve('sqrt', 144)}")
print(f"Sin 90: {calc.solve('sin', 90)}")
print(f"Log 1000: {calc.solve('log', 1000)}")
print(f"Power (2, 10): {calc.solve('pow', 2, 10)}")`
  },
  {
    id: 'py-10',
    title: 'Hospital Management Billing',
    description: 'Calculate hospital bills based on Ward Type (General/ICU), Days, and Medication costs. Include 5% insurance discount.',
    language: 'python',
    initialCode: `def bill_patient(ward, days):
    pass`,
    referenceCode: `# HWHS Health Care - Billing Auditor
class MedicalBill:
    def __init__(self, p_name):
        self.p_name = p_name
        self.wards = {"GENERAL": 1500, "PRIVATE": 3500, "ICU": 7500}

    def generate(self, ward_type, days, med_cost, scan_cost):
        ward_rate = self.wards.get(ward_type.upper(), 1500)
        ward_total = ward_rate * days
        subtotal = ward_total + med_cost + scan_cost
        insurance_off = subtotal * 0.05
        final = subtotal - insurance_off
        
        print("\n" + "+" + "-"*50 + "+")
        print(f"| {'HWHS MEDICAL CENTER - DISCHARGE SUMMARY':^48} |")
        print("+" + "-"*50 + "+")
        print(f"| PATIENT: {self.p_name:<40} |")
        print(f"| WARD: {ward_type:<10} DAYS: {days:<5} RATE: {ward_rate:<10} |")
        print("|" + " "*50 + "|")
        print(f"| WARD CHARGES: {ward_total:>32.2f} |")
        print(f"| MEDICATIONS: {med_cost:>33.2f} |")
        print(f"| SCANS/TESTS: {scan_cost:>33.2f} |")
        print(f"| INSURANCE DISCOUNT (5%): {insurance_off:>22.2f} |")
        print("|" + "-"*50 + "|")
        print(f"| PAYABLE AMOUNT: INR {final:>26.2f} |")
        print("+" + "-"*50 + "+" + "\n")

summary = MedicalBill("RAYYAN NAI")
summary.generate("ICU", 4, 12500, 4500)`
  },
  {
    id: 'py-11',
    title: 'Flight Ticket Booking System',
    description: 'Manage seat availability for a flight. Check-in passengers and assign seat numbers dynamically.',
    language: 'python',
    initialCode: `seats = [0] * 50 # 0=Available, 1=Booked`,
    referenceCode: `# HWHS Aviation - Ticketing Logic
class Flight:
    def __init__(self, flight_no, total_seats):
        self.f_no = flight_no
        self.seats = [0] * total_seats # 0 is free, 1 is booked
        self.passengers = {}

    def book(self, p_name, seat_no):
        if 0 < seat_no <= len(self.seats):
            if self.seats[seat_no-1] == 0:
                self.seats[seat_no-1] = 1
                self.passengers[seat_no] = p_name
                print(f"Confirmed: {p_name} assigned Seat {seat_no}")
            else:
                print(f"Error: Seat {seat_no} is already occupied.")
        else:
            print("Error: Invalid seat number.")

    def manifest(self):
        print("\n" + "*"*40)
        print(f"      FLIGHT MANIFEST: {self.f_no}      ")
        print("*"*40)
        for seat, name in self.passengers.items():
            print(f"SEAT {seat:02}: {name}")
        print("-"*40)
        print(f"TOTAL OCCUPANCY: {len(self.passengers)}/{len(self.seats)}")
        print("*"*40 + "\n")

indigo = Flight("6E-990", 20)
indigo.book("VINAYAK PANDEY", 5)
indigo.book("ARVIND CHOUDHARY", 12)
indigo.book("YUKTA PATIL", 5) # Try duplicate
indigo.manifest()`
  },
  {
    id: 'py-12',
    title: 'Library Catalog Auditor',
    description: 'Track books borrowed and returned. Implement a system to calculate fine (5 INR/day) for late returns.',
    language: 'python',
    initialCode: `books = {}`,
    referenceCode: `# HWHS Library - Circulation Manager
class Library:
    def __init__(self):
        self.records = {}

    def issue_book(self, student, book_title):
        self.records[book_title] = {"student": student, "date": "March 01"}
        print(f"Issued: '{book_title}' to {student}")

    def return_book(self, book_title, days_late):
        if book_title in self.records:
            fine = days_late * 5
            print(f"Return: '{book_title}' from {self.records[book_title]['student']}")
            print(f"Fine Calculated: INR {fine}")
            del self.records[book_title]
        else:
            print("Error: Book record not found in circulation.")

hwhs_lib = Library()
hwhs_lib.issue_book("SOHAIL SHAIKH", "Python Programming")
hwhs_lib.return_book("Python Programming", 4)`
  },
  {
    id: 'py-13',
    title: 'Quiz Application Engine',
    description: 'Create a quiz with 10 questions. Track score, time taken per question, and generate a final performance report.',
    language: 'python',
    initialCode: `questions = []`,
    referenceCode: `# HWHS Academic - Quiz Logic Engine
class Quiz:
    def __init__(self):
        self.q_bank = [
            ("Who invented Python?", "Guido van Rossum"),
            ("What is HTML?", "Markup Language"),
            ("Is Python case-sensitive?", "Yes")
        ]
        self.score = 0

    def start(self, user_answers):
        print("\n--- HWHS RAPID QUIZ COMMENCING ---")
        for i, (q, a) in enumerate(self.q_bank):
            user_a = user_answers[i]
            print(f"Q{i+1}: {q}")
            if user_a.lower() == a.lower():
                self.score += 1
                print(">> CORRECT!")
            else:
                print(f">> WRONG! Correct answer: {a}")
        
        print(f"\nFINAL PERFORMANCE: {self.score}/{len(self.q_bank)}")

game = Quiz()
game.start(["Guido van Rossum", "Markup Language", "No"])`
  },
  {
    id: 'py-14',
    title: 'Weather Data Analyzer',
    description: 'Analyze temperature data for 7 days. Find Max, Min, and Average temperature. Count days above 40 degrees.',
    language: 'python',
    initialCode: `temps = [32, 35, 41, 38, 42, 39, 36]`,
    referenceCode: `# HWHS Geography Lab - Weather Auditor
def analyze_weather(data):
    avg = sum(data) / len(data)
    hottest = max(data)
    coolest = min(data)
    extreme_days = [t for t in data if t > 40]
    
    print("\n" + "~"*45)
    print("      HWHS METEOROLOGICAL DATA REPORT      ")
    print("~"*45)
    print(f"7-DAY OBSERVATION: {data}")
    print(f"AVERAGE TEMP: {avg:.2f}°C")
    print(f"MAXIMUM PEAK: {hottest}°C")
    print(f"MINIMUM DROP: {coolest}°C")
    print(f"CRITICAL HEAT ALERT (>40°C): {len(extreme_days)} days")
    print("~"*45 + "\n")

temps = [32, 35, 41, 38, 42, 39, 36]
analyze_weather(temps)`
  },
  {
    id: 'py-15',
    title: 'Voting System Integrity Check',
    description: 'Simulate a secure voting system. Count votes for 3 candidates and ensure no double voting using a set of Voter IDs.',
    language: 'python',
    initialCode: `votes = {"A": 0, "B": 0, "C": 0}`,
    referenceCode: `# HWHS Student Council - Election Auditor
class Election:
    def __init__(self):
        self.candidates = {"AYUSH": 0, "VEDANT": 0, "RAYYAN": 0}
        self.voters_verified = set()

    def cast_vote(self, voter_id, candidate):
        if voter_id in self.voters_verified:
            print(f"ERROR: Fraud detected! Voter {voter_id} already voted.")
            return
        
        cand = candidate.upper()
        if cand in self.candidates:
            self.candidates[cand] += 1
            self.voters_verified.add(voter_id)
            print(f"Success: Vote recorded for {cand}.")
        else:
            print(f"Error: Candidate {cand} not found.")

    def results(self):
        print("\n" + "="*40)
        print("      ELECTION RESULTS - 2026      ")
        print("="*40)
        for name, count in self.candidates.items():
            print(f"{name:<20}: {count} votes")
        print("-"*40)
        print(f"TOTAL BALLOTS CAST: {len(self.voters_verified)}")
        print("="*40 + "\n")

vote_box = Election()
vote_box.cast_vote("101", "AYUSH")
vote_box.cast_vote("102", "VEDANT")
vote_box.cast_vote("101", "RAYYAN") # Duplicate
vote_box.cast_vote("103", "AYUSH")
vote_box.results()`
  }
];
