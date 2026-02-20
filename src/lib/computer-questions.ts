
export type ComputerQuestion = {
    id: string;
    section: 'A' | 'B' | 'C';
    type: 'MCQ' | 'Short' | 'Long';
    text: string;
    options?: string[];
    answer?: string;
    marks: number;
};

export const computerPaper = {
    school: "Holy Writ High School & Junior College, Badlapur (W)",
    exam: "Annual Exam (2025-26)",
    subject: "Computer",
    class: "IX",
    time: "1 hours",
    totalMarks: 30,
    sections: [
        {
            id: 'A',
            title: "SECTION A – MCQ",
            marksPerQuestion: 1,
            questions: [
                {
                    id: 'Q1',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q1. Communication Process: Which option correctly shows the communication cycle in this case?",
                    options: ["Speaking, writing, reading", "Message, channel, audience", "Sender, receiver, feedback", "Thinking, speaking, listening"],
                    answer: "Sender, receiver, feedback",
                    marks: 1
                },
                {
                    id: 'Q2',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q2. Self-Confidence: Which action best represents self-confidence in Meera's case?",
                    options: ["Avoiding participation", "Practicing and believing in her abilities", "Ignoring preparation", "Asking someone else to speak"],
                    answer: "Practicing and believing in her abilities",
                    marks: 1
                },
                {
                    id: 'Q3',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q3. ICT in Daily Life: Which ICT tool is Ritu using?",
                    options: ["Television", "Radio", "Tablet", "Printer"],
                    answer: "Tablet",
                    marks: 1
                },
                {
                    id: 'Q4',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q4. Types of Business: What type of business is Rohan starting?",
                    options: ["Manufacturing", "Service-based", "Product-based", "Trading"],
                    answer: "Service-based",
                    marks: 1
                },
                {
                    id: 'Q5',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q5. Role of ICT in Business: Another name for web-enabled services is:",
                    options: ["Hardware services", "Web-enabled services", "Software coding", "Mechanical services"],
                    answer: "Web-enabled services",
                    marks: 1
                },
                {
                    id: 'Q6',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q6. Communication Barriers: Which of the following is the barrier to communication in this case?",
                    options: ["Feedback", "Noise", "Listening", "Message"],
                    answer: "Noise",
                    marks: 1
                }
            ]
        },
        {
            id: 'B',
            title: "SECTION B – SHORT ANSWER",
            marksPerQuestion: 2,
            questions: [
                { id: 'Q7', section: 'B', type: 'Short', text: "Q7. Based on the case, explain any two barriers to effective communication.", marks: 2 },
                { id: 'Q8', section: 'B', type: 'Short', text: "Q8. Explain the difference between interest and ability with reference to this situation.", marks: 2 },
                { id: 'Q9', section: 'B', type: 'Short', text: "Q9. What are the benefits of positive thinking in this situation?", marks: 2 },
                { id: 'Q10', section: 'B', type: 'Short', text: "Q10. How does entrepreneurship benefit society in this case?", marks: 2 },
                { id: 'Q11', section: 'B', type: 'Short', text: "Q11. Explain entrepreneurship with reference to this example. Also differentiate between entrepreneur and entrepreneurship.", marks: 2 },
                { id: 'Q12', section: 'B', type: 'Short', text: "Q12. Name any two ICT software used in such work and explain their importance.", marks: 2 },
                { id: 'Q13', section: 'B', type: 'Short', text: "Q13. Explain how such digital platforms improve the learning experience.", marks: 2 },
                { id: 'Q14', section: 'B', type: 'Short', text: "Q14. Mention any four guidelines Priya should follow to create an effective presentation.", marks: 2 },
                { id: 'Q15', section: 'B', type: 'Short', text: "Q15. Explain the importance of proper typing techniques in daily work.", marks: 2 }
            ]
        },
        {
            id: 'C',
            title: "SECTION C – LONG ANSWER",
            marksPerQuestion: 3,
            questions: [
                { id: 'Q16', section: 'C', type: 'Long', text: "Q16. Sonia is preparing for competitive exams. Explain the importance of communication and self-management skills in student life.", marks: 3 },
                { id: 'Q17', section: 'C', type: 'Long', text: "Q17. Explain any three entrepreneurial skills needed for success with reference to Aman's case.", marks: 3 }
            ]
        }
    ]
};
