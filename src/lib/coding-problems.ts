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
    description: 'Design a professional student marksheet for Holy Writ High School. Include the school logo, student details grid, and a marks table with automatic Grade and Result calculation using JavaScript.',
    language: 'html',
    initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  /* Design the professional layout here */
</style>
</head>
<body>
  <!-- Build the marksheet structure -->
  <script>
    /* Implement grading logic (A1, A2, etc.) */
  </script>
</body>
</html>`,
    referenceCode: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Official Marksheet</title>
<style>
body { font-family: Arial, sans-serif; background: #e6ecf0; }
.marksheet { width: 900px; margin: auto; background: white; padding: 20px; border: 4px solid #003366; }
.header { text-align: center; border-bottom: 3px solid #003366; padding-bottom: 10px; }
.header img { width: 90px; }
.header h1 { margin: 5px; color: #003366; font-size: 22px; }
.info { margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; }
.statement { margin-top: 20px; text-align: center; color: #cc0000; font-size: 20px; font-weight: bold; }
.center-box { margin-top: 15px; padding: 15px; border-radius: 10px; background: linear-gradient(to right, #e3f2fd, #ffffff, #e3f2fd); border: 2px solid #003366; }
table { width: 100%; border-collapse: collapse; }
th { background: #003366; color: white; padding: 10px; }
td { text-align: center; padding: 8px; border: 1px solid black; }
.footer { margin-top: 25px; display: flex; justify-content: space-between; align-items: flex-end; }
.footer-left { font-size: 18px; font-weight: bold; }
</style>
</head>
<body>
<div class="marksheet">
    <div class="header">
        <img src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png">
        <h1>HOLY WRIT HIGH SCHOOL AND JUNIOR COLLEGE BADLAPUR (W)</h1>
    </div>
    <div class="info">
        <div><b>Name:</b> ABCD</div>
        <div><b>Roll No:</b> 12345</div>
        <div><b>Class:</b> XII</div>
        <div><b>Section:</b> Daffodils</div>
        <div><b>Stream:</b> Commerce</div>
    </div>
    <div class="statement">STATEMENT OF MARKS</div>
    <div class="center-box">
        <table id="table">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Theory</th>
                    <th>Practical</th>
                    <th>Passing (33%)</th>
                    <th>Obtained</th>
                    <th>Maximum</th>
                    <th>Grade</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Business Studies</td><td>70</td><td>25</td><td>33</td><td class="obt">95</td><td class="max">100</td><td class="grade"></td><td class="result"></td></tr>
                <tr><td>Computer Science</td><td>65</td><td>30</td><td>33</td><td class="obt">95</td><td class="max">100</td><td class="grade"></td><td class="result"></td></tr>
                <tr><td>Economics</td><td>60</td><td>30</td><td>33</td><td class="obt">90</td><td class="max">100</td><td class="grade"></td><td class="result"></td></tr>
            </tbody>
        </table>
    </div>
    <div class="footer">
        <div class="footer-left">Percentage: <span id="percent"></span>% <br>Result: <span id="finalResult"></span></div>
        <div class="footer-right">Principal Signature</div>
    </div>
</div>
<script>
function getGrade(m){
    if(m>=91) return "A1"; if(m>=81) return "A2"; if(m>=71) return "B1"; if(m>=61) return "B2";
    if(m>=51) return "C1"; if(m>=41) return "C2"; if(m>=33) return "D"; return "F";
}
let total=0, maxTotal=0, fail=false;
document.querySelectorAll("#table tbody tr").forEach(row=>{
    let obt = parseInt(row.querySelector(".obt").innerText);
    let max = parseInt(row.querySelector(".max").innerText);
    total += obt; maxTotal += max;
    row.querySelector(".grade").innerText = getGrade(obt);
    if(obt < 33){ row.querySelector(".result").innerText = "Fail"; fail = true; } 
    else { row.querySelector(".result").innerText = "Pass"; }
});
let percent = (total/maxTotal)*100;
document.getElementById("percent").innerText = percent.toFixed(2);
document.getElementById("finalResult").innerText = fail ? "FAIL" : "PASS";
</script>
</body>
</html>`
  },
  {
    id: 'html-2',
    title: 'E-Commerce Product Card',
    description: 'Design a professional product card for a tech gadget with an "Add to Cart" animation and price discounting display.',
    language: 'html',
    initialCode: '<!-- Code your product card here -->',
    referenceCode: '<div class="card">Product Card Reference Code Omitted</div>'
  },
  {
    id: 'html-3',
    title: 'Portfolio Hero Section',
    description: 'Create a responsive hero section for a professional developer portfolio with a blurred background and floating image.',
    language: 'html',
    initialCode: '<!-- Code hero section -->',
    referenceCode: '<section>Hero Section Reference Code Omitted</section>'
  },
  {
    id: 'html-4',
    title: 'Admission Inquiry Form',
    description: 'Build a validation-ready inquiry form for Holy Writ High School using HTML5 form attributes and CSS Flexbox.',
    language: 'html',
    initialCode: '<form>Inquiry Form</form>',
    referenceCode: '<form>Admission Form Reference Code Omitted</form>'
  },
  {
    id: 'html-5',
    title: 'Animated Countdown Timer',
    description: 'Develop a countdown timer for the upcoming Board Exams using HTML, CSS animations, and JavaScript Date objects.',
    language: 'html',
    initialCode: '<div id="timer">00:00:00</div>',
    referenceCode: '<div>Countdown Reference Code Omitted</div>'
  },

  // --- Python (15 Problems) ---
  {
    id: 'py-1',
    title: 'Inventory Stock Auditor',
    description: 'Write a program to manage shop inventory. Calculate total stock value and flag items that need immediate reordering (stock < 5).',
    language: 'python',
    initialCode: '# Items: [Name, Price, Quantity]\nstock = [["Pen", 10, 100], ["Eraser", 5, 3]]\n',
    referenceCode: 'total = 0\nfor item in stock:\n    val = item[1] * item[2]\n    total += val\n    if item[2] < 5: print(f"Reorder {item[0]}")\nprint(f"Total Value: {total}")'
  },
  {
    id: 'py-2',
    title: 'Binary Search Algorithm',
    description: 'Implement a Binary Search function to find the position of a target number in a sorted list efficiently.',
    language: 'python',
    initialCode: 'def binary_search(arr, x):\n    pass\n\nnums = [1, 3, 5, 7, 9]\nprint(binary_search(nums, 7))',
    referenceCode: 'def binary_search(arr, x):\n    low = 0\n    high = len(arr) - 1\n    while low <= high:\n        mid = (high + low) // 2\n        if arr[mid] < x: low = mid + 1\n        elif arr[mid] > x: high = mid - 1\n        else: return mid\n    return -1'
  },
  {
    id: 'py-3',
    title: 'Payroll Management System',
    description: 'Calculate the monthly salary of 5 employees after deducting 10% tax and adding a 5% performance bonus.',
    language: 'python',
    initialCode: 'salaries = [50000, 60000, 45000, 70000, 55000]',
    referenceCode: 'for s in salaries:\n    net = s - (s*0.10) + (s*0.05)\n    print(f"Net Salary: {net}")'
  },
  {
    id: 'py-4',
    title: 'Student Grade Processor',
    description: 'Create a marksheet logic in Python. Take marks for 5 subjects, calculate percentage, and determine the board grade.',
    language: 'python',
    initialCode: 'marks = {"Eng": 85, "Math": 92, "CS": 95, "Eco": 88, "BS": 80}',
    referenceCode: 'avg = sum(marks.values())/5\nif avg >= 90: g = "A1"\nelif avg >= 80: g = "A2"\nelse: g = "B"\nprint(f"Avg: {avg}%, Grade: {g}")'
  },
  {
    id: 'py-5',
    title: 'Palindrome Checker',
    description: 'Write a program to check if a given string is a palindrome (reads the same backwards).',
    language: 'python',
    initialCode: 'def is_palindrome(s):\n    pass',
    referenceCode: 'def is_palindrome(s):\n    s = s.lower().replace(" ", "")\n    return s == s[::-1]'
  },
  {
    id: 'py-6',
    title: 'Compound Interest Calculator',
    description: 'Calculate the maturity amount for a fixed deposit given Principal, Rate, and Time.',
    language: 'python',
    initialCode: 'p, r, t = 10000, 7.5, 2',
    referenceCode: 'amount = p * (1 + r/100)**t\nprint(f"Maturity: {amount}")'
  },
  {
    id: 'py-7',
    title: 'Matrix Addition',
    description: 'Perform addition of two 2x2 matrices represented as nested lists.',
    language: 'python',
    initialCode: 'A = [[1,2],[3,4]]\nB = [[5,6],[7,8]]',
    referenceCode: 'res = [[A[i][j] + B[i][j] for j in range(len(A[0]))] for i in range(len(A))]\nprint(res)'
  },
  {
    id: 'py-8',
    title: 'Prime Number Generator',
    description: 'List all prime numbers between 1 and 100.',
    language: 'python',
    initialCode: 'for n in range(1, 101):',
    referenceCode: 'for n in range(2, 101):\n    for i in range(2, n):\n        if n % i == 0: break\n    else: print(n)'
  },
  {
    id: 'py-9',
    title: 'Dictionary Mapper',
    description: 'Merge two lists (Student Names and Roll Numbers) into a single dictionary.',
    language: 'python',
    initialCode: 'names = ["Vedant", "Ayush", "Rayyan"]\nrolls = [1, 2, 3]',
    referenceCode: 'students = dict(zip(names, rolls))\nprint(students)'
  },
  {
    id: 'py-10',
    title: 'Factorial Recursive',
    description: 'Find the factorial of a number using a recursive function.',
    language: 'python',
    initialCode: 'def fact(n):',
    referenceCode: 'def fact(n):\n    return 1 if n == 0 else n * fact(n-1)'
  },
  {
    id: 'py-11',
    title: 'Word Counter',
    description: 'Count the frequency of each word in a paragraph of text.',
    language: 'python',
    initialCode: 'text = "Holy Writ is the best school in Badlapur"',
    referenceCode: 'words = text.split()\nfreq = {w: words.count(w) for w in words}\nprint(freq)'
  },
  {
    id: 'py-12',
    title: 'Temperature Converter',
    description: 'Convert a list of Celsius values to Fahrenheit.',
    language: 'python',
    initialCode: 'celsius = [0, 25, 37, 100]',
    referenceCode: 'fahrenheit = [(c * 9/5) + 32 for c in celsius]\nprint(fahrenheit)'
  },
  {
    id: 'py-13',
    title: 'Bubble Sort Implementation',
    description: 'Sort a list of student marks in ascending order using Bubble Sort.',
    language: 'python',
    initialCode: 'marks = [88, 45, 92, 33, 76]',
    referenceCode: 'for i in range(len(marks)):\n    for j in range(0, len(marks)-i-1):\n        if marks[j] > marks[j+1]: marks[j], marks[j+1] = marks[j+1], marks[j]\nprint(marks)'
  },
  {
    id: 'py-14',
    title: 'Simple Calculator App',
    description: 'Build a menu-driven calculator for Add, Sub, Mul, Div.',
    language: 'python',
    initialCode: 'choice = input("1.Add 2.Sub...")',
    referenceCode: 'a, b = 10, 5\nif choice=="1": print(a+b)\nelif choice=="2": print(a-b)\nelse: print("Invalid")'
  },
  {
    id: 'py-15',
    title: 'File Content Reverser',
    description: 'Reverse the lines of a sample text block (simulating file operations).',
    language: 'python',
    initialCode: 'content = "Line 1\\nLine 2\\nLine 3"',
    referenceCode: 'lines = content.split("\\n")\nprint("\\n".join(lines[::-1]))'
  }
];
