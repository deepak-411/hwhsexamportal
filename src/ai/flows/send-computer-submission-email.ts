'use server';
/**
 * @fileOverview AI flow to format and send Computer Exam answer sheets as a high-fidelity 'Physical Copy'.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { sendEmail } from '@/lib/email-service';

const ComputerSubmissionSchema = z.object({
  student: z.object({
    name: z.string(),
    rollNumber: z.string(),
    class: z.string(),
    section: z.string(),
  }),
  answers: z.record(z.string()),
  isViolation: z.boolean(),
  examTitle: z.string(),
});

export type ComputerSubmissionData = z.infer<typeof ComputerSubmissionSchema>;

export async function sendComputerSubmissionEmail(input: ComputerSubmissionData) {
  return computerEmailFlow(input);
}

const computerEmailFlow = ai.defineFlow(
  {
    name: 'computerEmailFlow',
    inputSchema: ComputerSubmissionSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    const { student, answers, isViolation, examTitle } = input;
    
    // Construct HTML Answer Script Rows
    let answersHtml = '';
    Object.entries(answers).forEach(([qId, answer]) => {
      answersHtml += `
        <div style="margin-bottom: 30px; position: relative; padding-left: 80px;">
          <div style="position: absolute; left: 0; top: 0; width: 60px; text-align: right; color: #1e3a8a; font-weight: bold; border-right: 2px solid #ef4444; padding-right: 15px;">
            Ans ${qId}
          </div>
          <div style="font-family: 'Courier New', Courier, monospace; color: #1e40af; font-size: 18px; line-height: 30px; white-space: pre-wrap; padding-top: 2px;">${answer}</div>
        </div>
      `;
    });

    const htmlBody = `
      <div style="background-color: #f3f4f6; padding: 40px; font-family: sans-serif;">
        <div style="max-width: 800px; margin: auto; background: #fff9e6; border: 2px solid #000; box-shadow: 0 10px 25px rgba(0,0,0,0.1); position: relative; min-height: 1000px;">
          
          <!-- Official Header -->
          <div style="padding: 20px; border-bottom: 2px solid #000; text-align: center; background: #fff;">
            <h1 style="margin: 0; color: #1e3a8a; font-size: 24px;">HOLY WRIT HIGH SCHOOL & JUNIOR COLLEGE</h1>
            <p style="margin: 5px 0; font-weight: bold;">${examTitle}</p>
            <div style="margin-top: 15px; display: table; width: 100%; border-top: 1px solid #ccc; padding-top: 10px;">
              <div style="display: table-cell; width: 50%; text-align: left;">
                <strong>Candidate:</strong> ${student.name} <br/>
                <strong>Roll Number:</strong> ${student.rollNumber}
              </div>
              <div style="display: table-cell; width: 50%; text-align: right;">
                <strong>Class:</strong> ${student.class} - ${student.section} <br/>
                <strong>Status:</strong> ${isViolation ? '<span style="color: red;">VIOLATION</span>' : '<span style="color: green;">NORMAL</span>'}
              </div>
            </div>
          </div>

          <!-- Answer Sheet Body -->
          <div style="position: relative; padding: 40px 20px; background-image: linear-gradient(#d1d5db 1px, transparent 1px); background-size: 100% 30px; line-height: 30px;">
            <!-- Red Margin Line -->
            <div style="position: absolute; left: 75px; top: 0; bottom: 0; width: 2px; background-color: #ef4444;"></div>
            
            <div style="position: relative; z-index: 1;">
              <h3 style="text-align: center; color: #1e3a8a; text-decoration: underline; margin-bottom: 40px;">OFFICIAL ANSWER COPY</h3>
              ${answersHtml}
            </div>

            <!-- Signatures -->
            <div style="margin-top: 100px; display: table; width: 100%; padding-top: 50px;">
              <div style="display: table-cell; width: 50%; text-align: center;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 32px; color: #1e40af; border-bottom: 1px solid #000; display: inline-block; padding: 0 20px;">Deepak Kumar</div>
                <p style="margin-top: 5px; font-size: 10px; font-weight: bold; text-transform: uppercase;">Invigilator Signature</p>
              </div>
              <div style="display: table-cell; width: 50%; text-align: center;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 32px; color: #1e40af; border-bottom: 1px solid #000; display: inline-block; padding: 0 20px; opacity: 0.7;">${student.name}</div>
                <p style="margin-top: 5px; font-size: 10px; font-weight: bold; text-transform: uppercase;">Candidate Signature</p>
              </div>
            </div>
          </div>

          <div style="padding: 10px; text-align: right; font-size: 10px; color: #666; background: #fff; border-top: 1px solid #eee;">
            Generated on: ${new Date().toLocaleString()} | HWHS Exam Portal
          </div>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: 'dk3624897@gmail.com',
        subject: `${isViolation ? '[VIOLATION] ' : ''}Physical Answer Copy: ${student.name} - ${student.rollNumber}`,
        text: `Official Answer Copy for ${student.name}`,
        html: htmlBody
      });
      return { success: true };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false };
    }
  }
);