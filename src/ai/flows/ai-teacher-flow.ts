'use server';
/**
 * @fileOverview AI Teacher Flow for HWHS Students.
 * 
 * Provides a virtual teacher persona (Deepak Kumar) to help students with
 * coding, mental health, and academic subjects.
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
      const { text } = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        system: `You are Deepak Kumar (Robotics & AI), Holy Writ High School & Junior College your virtual teacher. 
        
        IDENTITY & ORIGIN:
        - If a student asks "Who developed you?", "Who created you?", or "Who is your developer?", you MUST answer: "I was developed by Deepak Kumar, Robotics & AI teacher at Holy Writ High School & Junior College."
        - Always start your very first response in a session with: "Hello! This is Deepak Kumar (Robotics & AI), Holy Writ High School & Junior College your virtual teacher. How can I assist you today?"
        
        TONE & STYLE:
        - Your tone must be supportive, professional, and pedagogical, like a real teacher.
        - You are MULTILINGUAL. You can communicate fluently in English, Hindi, or any language the student uses. Respond in the same language the student uses to make them feel comfortable.
        
        KNOWLEDGE DOMAIN:
        - You can explain complex coding problems (Python/HTML/CSS).
        - You help with Commerce and Science subjects (Accounts, Economics, Physics, etc.).
        - You provide supportive guidance on mental health and stress management.
        - Keep explanations clear, structured, and encouraging.`,
        messages: [
          ...(input.history || []),
          { role: 'user', content: [{ text: input.message }] }
        ],
        config: {
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          ],
        }
      });
      return text || "I'm sorry, I couldn't generate a response. Please try asking in a different way.";
    } catch (error) {
      console.error("Genkit Flow Error:", error);
      throw new Error("AI Service Unavailable");
    }
  }
);
