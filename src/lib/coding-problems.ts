export type CodingProblem = {
  id: string;
  title: string;
  description: string;
  language: 'python' | 'html';
  initialCode: string;
  referenceCode: string;
};

export const codingProblems: CodingProblem[] = [
  // --- HTML/CSS/JS (5 Problems) ---
  {
    id: 'html-1',
    title: 'Official Student Marksheet',
    description: 'Design a professional student marksheet using HTML and CSS. The layout must include a school header with logo, student details grid, and a marks table with pass/fail logic.',
    language: 'html',
    initialCode: `<!DOCTYPE html>
<html>
<head>
<style>
  /* Write your CSS here */
</style>
</head>
<body>
  <!-- Build your marksheet here -->
</body>
</html>`,
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
body { font-family: Arial, sans-serif; background: #e6ecf0; padding: 20px; }
.marksheet { width: 800px; margin: auto; background: white; padding: 30px; border: 4px solid #003366; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
.header { text-align: center; border-bottom: 3px solid #003366; padding-bottom: 15px; margin-bottom: 20px; }
.header img { width: 80px; }
.header h1 { margin: 10px 0; color: #003366; font-size: 24px; text-transform: uppercase; }
.info { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; font-size: 16px; }
.statement { text-align: center; color: #cc0000; font-size: 22px; font-weight: bold; margin: 20px 0; text-decoration: underline; }
table { width: 100%; border-collapse: collapse; margin-top: 10px; }
th { background: #003366; color: white; padding: 12px; font-size: 14px; }
td { text-align: center; padding: 10px; border: 1px solid #ccc; }
.footer { margin-top: 30px; display: flex; justify-content: space-between; font-weight: bold; }
</style>
</head>
<body>
<div class="marksheet">
    <div class="header">
        <img src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png">
        <h1>Holy Writ High School and Junior College</h1>
    </div>
    <div class="info">
        <div><b>Name:</b> VEDANT LIMBANI</div>
        <div><b>Roll No:</b> 12345</div>
        <div><b>Class:</b> XII</div>
        <div><b>Stream:</b> Commerce</div>
    </div>
    <div class="statement">STATEMENT OF MARKS</div>
    <table>
        <thead>
            <tr><th>Subject</th><th>Theory</th><th>Practical</th><th>Total</th><th>Grade</th></tr>
        </thead>
        <tbody>
            <tr><td>Business Studies</td><td>75</td><td>20</td><td>95</td><td>A1</td></tr>
            <tr><td>Economics</td><td>70</td><td>25</td><td>95</td><td>A1</td></tr>
            <tr><td>English</td><td>65</td><td>28</td><td>93</td><td>A1</td></tr>
        </tbody>
    </table>
    <div class="footer">
        <div>Percentage: 94.33%</div>
        <div>Principal Signature</div>
    </div>
</div>
</body>
</html>`
  },
  {
    id: 'html-2',
    title: 'School Event Landing Page',
    description: 'Create a responsive landing page for the "Advance Technology Lab" annual exhibition. Use CSS Flexbox for the layout.',
    language: 'html',
    initialCode: '<!-- Code your landing page -->',
    referenceCode: '<!-- Official Reference Code Omitted for Brevity -->'
  },
  // --- Python (15 Problems) ---
  {
    id: 'py-1',
    title: 'Student Grade Calculator',
    description: 'Write a Python program that takes marks of 5 subjects as input and calculates the total, percentage, and assigned grade (A, B, C, or F).',
    language: 'python',
    initialCode: '# Write your code here\nmarks = [85, 90, 78, 92, 88]\n',
    referenceCode: `marks = [85, 90, 78, 92, 88]
total = sum(marks)
percentage = (total / 500) * 100
if percentage >= 90: grade = 'A'
elif percentage >= 80: grade = 'B'
else: grade = 'C'
print(f"Total: {total}, Percentage: {percentage}%, Grade: {grade}")`
  },
  {
    id: 'py-2',
    title: 'Fibonacci Sequence Generator',
    description: 'Write a function to generate the first N numbers of the Fibonacci sequence.',
    language: 'python',
    initialCode: 'def fibonacci(n):\n    # implementation\n    pass\n\nprint(fibonacci(10))',
    referenceCode: `def fibonacci(n):
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]
print(fibonacci(10))`
  }
];
