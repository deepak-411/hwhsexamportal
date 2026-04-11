export type CodingProblem = {
  id: string;
  title: string;
  description: string;
  language: 'python' | 'html';
  initialCode: string;
  referenceCode: string;
};

export const codingProblems: CodingProblem[] = [
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
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>HWHS Official Marksheet 2026</title>
<style>
    :root { --primary: #1e3a8a; --secondary: #cc0000; --accent: #e3f2fd; }
    body { font-family: 'Arial', sans-serif; background: #e6ecf0; padding: 20px; }
    .marksheet { width: 900px; margin: auto; background: white; padding: 30px; border: 5px solid var(--primary); box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 3px solid var(--primary); padding-bottom: 15px; margin-bottom: 20px; }
    .header img { width: 100px; border-radius: 50%; border: 2px solid var(--primary); padding: 5px; background: white; }
    .header h1 { margin: 10px 0 5px; color: var(--primary); font-size: 26px; text-transform: uppercase; letter-spacing: 1px; }
    .header p { margin: 0; color: #666; font-size: 14px; font-weight: bold; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; background: var(--accent); padding: 15px; border-radius: 8px; border: 1px solid #bbdefb; }
    .info-item { display: flex; border-bottom: 1px dashed #90caf9; padding: 5px 0; }
    .info-label { font-weight: bold; width: 120px; color: var(--primary); }
    .statement-title { margin: 25px 0; text-align: center; color: var(--secondary); font-size: 22px; font-weight: 900; letter-spacing: 3px; text-decoration: underline; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th { background: var(--primary); color: white; padding: 12px; font-size: 14px; text-transform: uppercase; }
    td { text-align: center; padding: 10px; border: 1px solid #ccc; font-weight: 500; }
    .pass { color: green; font-weight: bold; }
    .fail { color: var(--secondary); font-weight: bold; }
    .footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
    .footer-box { text-align: center; width: 200px; }
    .sig-line { border-top: 2px solid #333; margin-top: 50px; padding-top: 5px; font-weight: bold; }
    .result-summary { margin-top: 30px; padding: 20px; border: 2px solid var(--primary); border-radius: 10px; background: #f9f9f9; }
    .summary-row { display: flex; justify-content: space-around; font-size: 18px; font-weight: bold; }
    .grade-box { font-size: 24px; color: var(--primary); border: 3px solid var(--primary); padding: 10px 20px; border-radius: 5px; }
</style>
</head>
<body>
<div class="marksheet">
    <div class="header">
        <img src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" alt="Logo">
        <h1>Holy Writ High School & Junior College</h1>
        <p>Badlapur (W), Dist. Thane - 421503 | Academic Session 2025-2026</p>
    </div>
    <div class="info-grid">
        <div class="info-item"><span class="info-label">Name:</span> <span>AYUSH ARUP CHATTARAJ</span></div>
        <div class="info-item"><span class="info-label">Roll No:</span> <span>XII-COMM-02</span></div>
        <div class="info-item"><span class="info-label">Class:</span> <span>XII (Twelve)</span></div>
        <div class="info-item"><span class="info-label">Section:</span> <span>Daffodils</span></div>
        <div class="info-item"><span class="info-label">Stream:</span> <span>Commerce</span></div>
        <div class="info-item"><span class="info-label">Date:</span> <span id="currentDate"></span></div>
    </div>
    <div class="statement-title">OFFICIAL STATEMENT OF MARKS</div>
    <table id="marksTable">
        <thead>
            <tr>
                <th>Subject Name</th>
                <th>Theory (80)</th>
                <th>Practical (20)</th>
                <th>Obtained</th>
                <th>Passing</th>
                <th>Grade</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Business Studies</td><td>72</td><td>19</td><td class="obt">91</td><td>33</td><td class="grade"></td><td class="res"></td></tr>
            <tr><td>Accountancy</td><td>68</td><td>20</td><td class="obt">88</td><td>33</td><td class="grade"></td><td class="res"></td></tr>
            <tr><td>Economics</td><td>75</td><td>18</td><td class="obt">93</td><td>33</td><td class="grade"></td><td class="res"></td></tr>
            <tr><td>English Core</td><td>70</td><td>19</td><td class="obt">89</td><td>33</td><td class="grade"></td><td class="res"></td></tr>
            <tr><td>Informatics Prac.</td><td>65</td><td>30</td><td class="obt">95</td><td>33</td><td class="grade"></td><td class="res"></td></tr>
        </tbody>
    </table>
    <div class="result-summary">
        <div class="summary-row">
            <div>TOTAL PERCENTAGE: <span id="perc">0</span>%</div>
            <div>OVERALL GRADE: <span class="grade-box" id="finalGrade">-</span></div>
            <div>STATUS: <span id="finalRes">-</span></div>
        </div>
    </div>
    <div class="footer">
        <div class="footer-box"><div class="sig-line">Class Teacher</div></div>
        <div class="footer-box"><div class="sig-line">Exam Controller</div></div>
        <div class="footer-box"><div class="sig-line">Principal</div></div>
    </div>
</div>
<script>
    document.getElementById('currentDate').innerText = new Date().toLocaleDateString();
    function calcGrade(m) {
        if(m>=91) return "A1"; if(m>=81) return "A2"; if(m>=71) return "B1"; if(m>=61) return "B2";
        if(m>=51) return "C1"; if(m>=41) return "C2"; if(m>=33) return "D"; return "F";
    }
    let total=0, count=0, isFail=false;
    document.querySelectorAll('#marksTable tbody tr').forEach(row => {
        let obt = parseInt(row.querySelector('.obt').innerText);
        total += obt; count++;
        let g = calcGrade(obt);
        row.querySelector('.grade').innerText = g;
        if(obt < 33) { row.querySelector('.res').innerText = "FAIL"; row.querySelector('.res').classList.add('fail'); isFail=true; }
        else { row.querySelector('.res').innerText = "PASS"; row.querySelector('.res').classList.add('pass'); }
    });
    let p = (total/(count*100))*100;
    document.getElementById('perc').innerText = p.toFixed(2);
    document.getElementById('finalRes').innerText = isFail ? "FAILED" : "PASSED";
    document.getElementById('finalGrade').innerText = calcGrade(p);
</script>
</body>
</html>`
  },
  {
    id: 'py-1',
    title: 'Advanced Payroll & Tax Auditor',
    description: 'Build a comprehensive payroll system for 10 employees. Logic: Base Salary + 15% HRA + 10% DA. Deduct 12% PF and Professional Tax based on slabs. Finally, generate a formatted payslip for all.',
    language: 'python',
    initialCode: `# Employee Database: [Name, BaseSalary]
employees = [
    ["Vedant", 85000], ["Ayush", 78000], ["Rayyan", 92000],
    ["Vinayak", 65000], ["Rohit", 72000], ["Arvind", 58000],
    ["Yukta", 88000], ["Sohail", 71000], ["Aditya", 95000], ["Meera", 82000]
]

def calculate_payroll(data):
    # Implement detailed payroll logic here
    pass

calculate_payroll(employees)`,
    referenceCode: `def calculate_payroll(data):
    print("="*60)
    print(f"{'HWHS CORPORATE PAYROLL SYSTEM 2026':^60}")
    print("="*60)
    print(f"{'EMP NAME':<15} {'GROSS':<10} {'PF (12%)':<10} {'TAX':<10} {'NET PAY':<10}")
    print("-"*60)
    
    grand_total = 0
    for emp in data:
        name, base = emp
        # Allowances
        hra = base * 0.15
        da = base * 0.10
        gross = base + hra + da
        
        # Deductions
        pf = gross * 0.12
        # Tax Slabs
        if gross > 90000: tax = 5000
        elif gross > 70000: tax = 2500
        else: tax = 1000
        
        net = gross - pf - tax
        grand_total += net
        
        print(f"{name:<15} {gross:<10.2f} {pf:<10.2f} {tax:<10.2f} {net:<10.2f}")
    
    print("="*60)
    print(f"TOTAL DISBURSEMENT: INR {grand_total:,.2f}")
    print("="*60)

employees = [
    ["Vedant", 85000], ["Ayush", 78000], ["Rayyan", 92000],
    ["Vinayak", 65000], ["Rohit", 72000], ["Arvind", 58000],
    ["Yukta", 88000], ["Sohail", 71000], ["Aditya", 95000], ["Meera", 82000]
]
calculate_payroll(employees)`
  }
  // ... Rest of the 20 problems would follow a similar high-density pattern ...
];
