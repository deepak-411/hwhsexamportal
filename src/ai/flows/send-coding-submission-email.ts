'use server';
/**
 * @fileOverview Flow to send Coding Studio submissions to faculty.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { sendEmail } from '@/lib/email-service';

const CodingSubmissionSchema = z.object({
  student: z.object({
    name: z.string(),
    rollNumber: z.string(),
    class: z.string(),
    faculty: z.string(),
  }),
  problemTitle: z.string(),
  language: z.string(),
  code: z.string(),
  output: z.string(),
});

export type CodingSubmissionData = z.infer<typeof CodingSubmissionSchema>;

export async function sendCodingSubmission(input: CodingSubmissionData) {
  return codingEmailFlow(input);
}

const codingEmailFlow = ai.defineFlow(
  {
    name: 'codingEmailFlow',
    inputSchema: CodingSubmissionSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    const { student, problemTitle, language, code, output } = input;

    const htmlBody = `
      <div style="font-family: sans-serif; padding: 20px; background: #f9fafb; color: #1f2937;">
        <div style="max-width: 800px; margin: auto; background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background: #1e3a8a; color: white; padding: 20px;">
            <h1 style="margin: 0; font-size: 20px;">HWHS CODING SUBMISSION</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Problem: ${problemTitle} [${language.toUpperCase()}]</p>
          </div>
          
          <div style="padding: 20px;">
            <h3 style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">Student Profile</h3>
            <p><b>Name:</b> ${student.name}</p>
            <p><b>Roll Number:</b> ${student.rollNumber}</p>
            <p><b>Class:</b> ${student.class}</p>
            <p><b>Faculty/Stream:</b> ${student.faculty}</p>

            <h3 style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-top: 30px;">Submission Details</h3>
            <div style="background: #111827; color: #10b981; padding: 15px; border-radius: 6px; font-family: monospace; white-space: pre-wrap; margin-bottom: 20px;">
${code}
            </div>

            <h3 style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">Execution Output</h3>
            <div style="background: #f3f4f6; color: #374151; padding: 15px; border-radius: 6px; font-family: monospace; white-space: pre-wrap;">
${output || 'No text output (HTML Rendered)'}
            </div>
          </div>

          <div style="background: #f9fafb; padding: 10px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
            Sent from HWHS Coding Studio | ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: 'dk3624897@gmail.com',
        subject: `[CODING] ${student.name} - ${problemTitle}`,
        text: `Submission from ${student.name} for ${problemTitle}`,
        html: htmlBody
      });
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
);
