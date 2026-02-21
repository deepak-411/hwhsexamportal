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
        <div style="margin-bottom: 30px; position: relative; padding-left: 80px; min-height: 60px;">
          <div style="position: absolute; left: 0; top: 0; width: 60px; text-align: right; color: #1e3a8a; font-weight: bold; border-right: 2px solid #ef4444; padding-right: 15px;">
            Ans ${qId}
          </div>
          <div style="font-family: 'Courier New', Courier, monospace; color: #1e40af; font-size: 18px; line-height: 30px; white-space: pre-wrap; padding-top: 2px;">${answer}</div>
        </div>
      `;
    });

    const htmlBody = `
      <div style="background-color: #f3f4f6; padding: 40px; font-family: sans-serif;">
        <div style="max-width: 800px; margin: auto; background: #fff9e6; border: 2px solid #000; box-shadow: 0 10px 25px rgba(0,0,0,0.1); position: relative; min-height: 1000px; padding: 0;">
          
          <!-- Official Header -->
          <div style="padding: 30px; border-bottom: 3px double #000; text-align: center; background: #ffffff;">
            <h1 style="margin: 0; color: #1e3a8a; font-size: 26px; text-transform: uppercase;">HOLY WRIT HIGH SCHOOL & JUNIOR COLLEGE</h1>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">Pimpoli, Barvi Dam Road, Badlapur (W)</p>
            <div style="background: #1e3a8a; color: white; display: inline-block; padding: 5px 20px; border-radius: 4px; margin-top: 10px; font-weight: bold;">
              ${examTitle}
            </div>
            
            <div style="margin-top: 20px; display: table; width: 100%; border-top: 1px solid #ccc; padding-top: 15px; text-align: left;">
              <div style="display: table-cell; width: 50%;">
                <p style="margin: 2px 0;"><strong>Student Name:</strong> ${student.name}</p>
                <p style="margin: 2px 0;"><strong>Roll Number:</strong> ${student.rollNumber}</p>
              </div>
              <div style="display: table-cell; width: 50%; text-align: right;">
                <p style="margin: 2px 0;"><strong>Class & Section:</strong> ${student.class} - ${student.section}</p>
                <p style="margin: 2px 0;"><strong>Status:</strong> ${isViolation ? '<span style="color: #dc2626; font-weight: bold; border: 1px solid #dc2626; padding: 2px 5px;">VIOLATION (AUTO-SUBMITTED)</span>' : '<span style="color: #16a34a; font-weight: bold;">NORMAL SUBMISSION</span>'}</p>
              </div>
            </div>
          </div>

          <!-- Answer Sheet Body -->
          <div style="position: relative; padding: 40px 20px; background-image: linear-gradient(#d1d5db 1px, transparent 1px); background-size: 100% 30px; line-height: 30px;">
            <!-- Red Margin Line -->
            <div style="position: absolute; left: 75px; top: 0; bottom: 0; width: 2px; background-color: #ef4444;"></div>
            
            <div style="position: relative; z-index: 1;">
              <h3 style="text-align: center; color: #1e3a8a; text-decoration: underline; margin-bottom: 40px; letter-spacing: 2px;">OFFICIAL ANSWER COPY</h3>
              ${answersHtml}
            </div>

            <!-- Signatures Section -->
            <div style="margin-top: 100px; display: table; width: 100%; padding: 40px 20px; border-top: 1px dashed #000;">
              <div style="display: table-cell; width: 50%; text-align: center;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 36px; color: #1e40af; border-bottom: 2px solid #000; display: inline-block; padding: 0 30px; margin-bottom: 5px;">Deepak Kumar</div>
                <p style="margin: 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #333;">Signature of Invigilator</p>
              </div>
              <div style="display: table-cell; width: 50%; text-align: center;">
                <div style="font-family: 'Brush Script MT', cursive; font-size: 36px; color: #1e40af; border-bottom: 2px solid #000; display: inline-block; padding: 0 30px; margin-bottom: 5px; opacity: 0.6;">${student.name}</div>
                <p style="margin: 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #333;">Signature of Candidate</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 15px; text-align: center; font-size: 10px; color: #999; background: #ffffff; border-top: 1px solid #eee;">
            This is a digitally generated Answer Copy | IP: PROCTORING_VERIFIED | Generated: ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: 'dk3624897@gmail.com',
        subject: `${isViolation ? '[VIOLATION ALERT] ' : ''}Physical Answer Copy: ${student.name} - ${student.rollNumber}`,
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
