
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
            title: "SECTION A – MCQ (1 × 6 = 6 Marks)",
            marksPerQuestion: 1,
            questions: [
                {
                    id: 'Q1',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q1. Communication Process\n\nYour school is planning an inter-school cultural event. The student council is responsible for organizing different activities such as dance, drama, and music competitions. Aman is selected as the coordinator. He prepares a detailed plan and shares it with his team through email and school notice boards. After reading the message, some students misunderstand their responsibilities because they did not read the instructions carefully. Aman calls a meeting and explains the tasks again. He also encourages students to ask questions and give feedback so that confusion can be avoided. During the preparation, he regularly checks whether everyone has understood their roles. Because of this, teamwork improves, and the event becomes successful. The principal appreciates Aman for using effective communication and coordination. This situation shows how important communication is in real life.\n\nWhich option correctly shows the communication cycle in this case?",
                    options: ["A. Speaking, writing, reading", "B. Message, channel, audience", "C. Sender, receiver, feedback", "D. Thinking, speaking, listening"],
                    answer: "C. Sender, receiver, feedback",
                    marks: 1
                },
                {
                    id: 'Q2',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q2. Self-Confidence\n\nMeera comes from a small town and studies in a government school. She gets an opportunity to represent her school in a state-level debate competition. Initially, she feels nervous because she has never spoken in front of a large audience. Some classmates also make fun of her English. However, her teacher motivates her to practice daily. She starts reading newspapers, improving her vocabulary, and practicing in front of her family. She also records her speech and works on her mistakes. On the day of the competition, she speaks clearly and confidently. She answers the judges’ questions calmly and wins second prize. Her success inspires other students to participate in competitions. This case shows that confidence develops through preparation and belief in oneself.\n\nWhich action best represents self-confidence in this case?",
                    options: ["A. Avoiding participation", "B. Practicing and believing in her abilities", "C. Ignoring preparation", "D. Asking someone else to speak"],
                    answer: "B. Practicing and believing in her abilities",
                    marks: 1
                },
                {
                    id: 'Q3',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q3. ICT in Daily Life\n\nDuring the pandemic, Ritu’s school shifted to online classes. She used a portable digital device to attend live sessions, read e-books, submit assignments, and communicate with teachers. She also used this device to search for information, watch educational videos, and collaborate with classmates. This helped her continue learning even when schools were closed. After schools reopened, she continued using technology for projects and presentations. Her parents realized that ICT tools play an important role in modern education and future careers.\n\nWhich ICT tool is Ritu using?",
                    options: ["A. Television", "B. Radio", "C. Tablet", "D. Printer"],
                    answer: "C. Tablet",
                    marks: 1
                },
                {
                    id: 'Q4',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q4. Types of Business\n\nRohan started a small business where he provides home cleaning and maintenance services. He does not manufacture any product but earns by offering professional services. His business became popular because he provides quality work and customer satisfaction. Later, he hires more workers and expands his services to nearby cities. Many unemployed youth also get jobs through his business.\n\nWhat type of business is this?",
                    options: ["A. Manufacturing", "B. Service-based", "C. Product-based", "D. Trading"],
                    answer: "B. Service-based",
                    marks: 1
                },
                {
                    id: 'Q5',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q5. Role of ICT in Business\n\nAn entrepreneur starts a company that handles customer complaints, data entry, and online support for international clients. Employees work on computers and communicate through the internet. The company provides services to many countries and creates employment opportunities. This type of service is growing rapidly in India and contributes to economic development.\n\nAnother name for this type of service is:",
                    options: ["A. Hardware services", "B. Web-enabled services", "C. Software coding", "D. Mechanical services"],
                    answer: "B. Web-enabled services",
                    marks: 1
                },
                {
                    id: 'Q6',
                    section: 'A',
                    type: 'MCQ',
                    text: "Q6. Communication Barriers\n\nDuring a classroom discussion, loud traffic noise outside the school disturbs students. Many students cannot hear the teacher properly and misunderstand the topic. As a result, they perform poorly in the test. Later, the teacher explains that external disturbances affect understanding and learning.\n\nWhich of the following is the barrier to communication in this case?",
                    options: ["A. Feedback", "B. Noise", "C. Listening", "D. Message"],
                    answer: "B. Noise",
                    marks: 1
                }
            ]
        },
        {
            id: 'B',
            title: "SECTION B – SHORT ANSWER (2 × 9 = 18 Marks)",
            marksPerQuestion: 2,
            questions: [
                { 
                    id: 'Q7', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q7. Barriers to Communication\n\nA large organization arranged training for its employees about new technology. People from different regions attended the program. The trainer used complex language and spoke very fast. Some employees felt shy to ask questions. Many of them were distracted by mobile phones and side conversations. As a result, they did not understand the training properly. Later, the company noticed that employees made mistakes in their work. The management realized that communication barriers were the main reason. They decided to use simple language, visual aids, and interactive methods. Employees were also encouraged to ask questions and give feedback. After these improvements, the training became more effective, and productivity increased. This case highlights the importance of effective communication in professional life.\n\nBased on the case, explain any two barriers to effective communication.", 
                    marks: 2 
                },
                { 
                    id: 'Q8', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q8. Interest and Ability\n\nAman loves playing cricket and watches matches regularly. He wants to become a professional player. However, when he joined a sports academy, the coach noticed that he lacked physical fitness and technical skills. The coach explained that liking a game is different from having the ability to perform well. Aman started practicing daily, followed a proper diet, and improved his skills through regular training. Over time, he became a better player and started winning matches. This situation helped him understand the importance of both interest and ability.\n\nExplain the difference between interest and ability with reference to this situation.", 
                    marks: 2 
                },
                { 
                    id: 'Q9', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q9. Positive Thinking\n\nNeha failed in an important examination and felt disappointed. Many relatives criticized her, and she started losing confidence. Her parents and teachers motivated her to think positively and focus on improvement. She made a study schedule, avoided distractions, and practiced regularly. She also joined a study group and discussed her doubts. Slowly, her confidence improved, and she performed well in the next exam. She realized that failure is not the end but a chance to learn and grow.\n\nWhat are the benefits of positive thinking in this situation?", 
                    marks: 2 
                },
                { 
                    id: 'Q10', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q10. Role of Entrepreneur in Society\n\nIn a rural area, farmers were facing losses because they did not get proper market prices. A young woman started a business that connected farmers directly with buyers using mobile applications. She also trained farmers in digital payments and modern farming. This increased their income and improved their standard of living. Many youth also got employment.\n\nHow does entrepreneurship benefit society in this case?", 
                    marks: 2 
                },
                { 
                    id: 'Q11', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q11. Entrepreneurship Concept\n\nA college student noticed that many local artists were unable to sell their handmade products. He created an online platform where artists could sell their work directly to customers. Initially, he faced many challenges such as lack of funds and awareness. However, he worked hard and expanded his business. His platform helped many artists earn income and become independent.\n\nExplain entrepreneurship with reference to this example. Also differentiate between entrepreneur and entrepreneurship.", 
                    marks: 2 
                },
                { 
                    id: 'Q12', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q12. ICT in Engineering\n\nAn automobile engineer uses computer software to design and test new vehicle parts before manufacturing. This helps reduce errors and improve quality. The company saves time and money. Engineers can also make changes easily using digital tools.\n\nName any two ICT software used in such work and explain their importance.", 
                    marks: 2 
                },
                { 
                    id: 'Q13', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q13. Digital Learning\n\nA school introduced a digital learning system where students attend classes online, access study materials, submit assignments, and communicate with teachers. Parents can also monitor student performance. Students find learning more interactive and flexible.\n\nExplain how such digital platforms improve the learning experience.", 
                    marks: 2 
                },
                { 
                    id: 'Q14', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q14. Presentation Skills\n\nPriya is preparing for an entrepreneurship competition. She is designing a presentation to explain her business idea. She wants to make her slides attractive and professional so that judges can understand her ideas clearly.\n\nMention any four guidelines she should follow to create an effective presentation.", 
                    marks: 2 
                },
                { 
                    id: 'Q15', 
                    section: 'B', 
                    type: 'Short', 
                    text: "Q15. Typing Skills\n\nAarav joined a computer course to improve his typing speed. His teacher explained the importance of correct finger placement, posture, and regular practice. Aarav realized that good typing skills improve productivity and reduce stress.\n\nExplain the importance of proper typing techniques in daily work.", 
                    marks: 2 
                }
            ]
        },
        {
            id: 'C',
            title: "SECTION C – LONG ANSWER (3 × 2 = 6 Marks)",
            marksPerQuestion: 3,
            questions: [
                { 
                    id: 'Q16', 
                    section: 'C', 
                    type: 'Long', 
                    text: "Q16. Communication and Self-Management\n\nSonia is preparing for competitive exams. She manages her time between studies, family responsibilities, and personal health. She communicates regularly with teachers and friends to clear doubts. She sets goals, avoids distractions, and maintains discipline. She also practices meditation to reduce stress. Her habits improve her performance and confidence.\n\nExplain the importance of communication and self-management skills in student life.", 
                    marks: 3 
                },
                { 
                    id: 'Q17', 
                    section: 'C', 
                    type: 'Long', 
                    text: "Q17. Entrepreneurial Skills\n\nAman started an online business selling eco-friendly products. He identified customer needs, planned his work, managed finances, and used digital marketing. He faced challenges but learned from failures. Gradually, his business became successful.\n\nExplain any three entrepreneurial skills needed for success with reference to this case.", 
                    marks: 3 
                }
            ]
        }
    ]
};
