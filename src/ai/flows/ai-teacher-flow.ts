'use server';
/**
 * @fileOverview High-Level AI Teacher Flow for HWHS.
 * 
 * Uses Gemini 1.5 Pro for advanced pedagogical support and mental health guidance.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AiTeacherInputSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() }))
  })).optional(),
});

export type AiTeacherInput = z.infer<typeof AiTeacherInputSchema>;

export async function askAiTeacher(input: AiTeacherInput) {
  return aiTeacherFlow(input);
}

const aiTeacherFlow = ai.defineFlow(
  {
    name: 'aiTeacherFlow',
    inputSchema: AiTeacherInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      const systemPrompt = `You are Mr. Deepak Kumar (Robotics & AI), the Virtual Teacher at Holy Writ High School & Junior College.
        
        IDENTITY:
        - If asked about your developer/creator: "I was developed by Deepak Kumar, Robotics & AI teacher at Holy Writ High School & Junior College."
        - Always maintain a highly professional, supportive, and pedagogical persona.
        
        CAPABILITIES & SUBJECTS:
        - Academic Support: Commerce (Accounts, Economics), Science (Physics, Chemistry), and Computer/Robotics (Python, HTML, AI logic).
        - Mental Health: Provide supportive, stress-management guidance for students.
        - Language: Multilingual. Auto-detect if the student uses Hindi, English, or mixed (Hinglish) and respond in the same language.
        
        RESPONSE STYLE:
        - Use clear, structured explanations. 
        - For coding, provide logic snippets and explain "why" things work.
        - If a student is stressed, be empathetic and encouraging.`;

      // CRITICAL FIX: Ensure strictly alternating user/model roles starting with 'user'
      const rawHistory = input.history || [];
      const sanitizedMessages: any[] = [];
      
      // Filter out any invalid messages or repeated roles
      let lastRole: string | null = null;
      for (const msg of rawHistory) {
        if (msg.role !== lastRole) {
          sanitizedMessages.push(msg);
          lastRole = msg.role;
        }
      }

      // Final verification of sequence for high-level model integrity
      const finalMessages: any[] = [];
      let expected = 'user';
      for (const msg of sanitizedMessages) {
        if (msg.role === expected) {
          finalMessages.push(msg);
          expected = expected === 'user' ? 'model' : 'user';
        }
      }

      // Add the new user message
      finalMessages.push({ role: 'user', content: [{ text: input.message }] });

      const { text } = await ai.generate({
        model: 'googleai/gemini-1.5-pro', // High-level reasoning model
        system: systemPrompt,
        messages: finalMessages,
        config: {
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          ],
        }
      });

      return text || "I'm currently reviewing the school logic grid. Could you please rephrase your query?";
    } catch (error) {
      console.error("Genkit Flow Error:", error);
      return "Hello! This is Deepak Kumar. I'm connected to the HWHS Knowledge Grid, but I'm currently experiencing a high load of queries. Please try again in a few moments or refresh your dashboard.";
    }
  }
);
