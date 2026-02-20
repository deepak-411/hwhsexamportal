'use server';
/**
 * @fileOverview AI flow to format and send Computer Exam answer sheets via email.
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
    
    // Construct HTML Answer Sheet
    let answersHtml = '';
    Object.entries(answers).forEach(([qId, answer]) => {
      answersHtml += `
        <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          <p style="color: #666; font-weight: bold; margin: 0;">Question: ${qId}</p>
          <p style="font-family: 'Courier New', Courier, monospace; white-space: pre-wrap; margin-top: 5px;">${answer}</p>
        </div>
      `;
    });

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 800px; margin: auto; border: 2px solid #000; padding: 20px;">
        <h1 style="text-align: center; color: #1e3a8a;">OFFICIAL ANSWER COPY</h1>
        <h2 style="text-align: center;">${examTitle}</h2>
        
        <div style="background: #f3f4f6; padding: 15px; margin-bottom: 20px; border: 1px solid #ccc;">
          <table style="width: 100%;">
            <tr>
              <td><strong>Student Name:</strong> ${student.name}</td>
              <td><strong>Roll Number:</strong> ${student.rollNumber}</td>
            </tr>
            <tr>
              <td><strong>Class:</strong> ${student.class}</td>
              <td><strong>Section:</strong> ${student.section}</td>
            </tr>
            <tr>
              <td colspan="2"><strong>Status:</strong> ${isViolation ? '<span style="color: red; font-weight: bold;">SUBMITTED DUE TO CHEATING/VIOLATION</span>' : '<span style="color: green; font-weight: bold;">NORMAL SUBMISSION</span>'}</td>
            </tr>
          </table>
        </div>

        <div style="border-left: 2px solid #ef4444; padding-left: 20px;">
          <h3 style="text-decoration: underline;">STUDENT RESPONSES:</h3>
          ${answersHtml}
        </div>

        <div style="margin-top: 50px; border-top: 1px solid #000; padding-top: 10px; text-align: right;">
          <p>Electronically generated on: ${new Date().toLocaleString()}</p>
          <p>Holy Writ High School Examination Portal</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: 'dk3624897@gmail.com',
        subject: `${isViolation ? '[VIOLATION] ' : ''}Exam Script: ${student.name} - ${student.rollNumber}`,
        text: `Answer copy for ${student.name}`,
        html: htmlBody
      });
      return { success: true };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false };
    }
  }
);
