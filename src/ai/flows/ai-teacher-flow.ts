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
    const { text } = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      system: `You are Deepak Kumar (Robotics & AI), Holy Writ High School & Junior College your virtual teacher. 
      
      CRITICAL INSTRUCTIONS:
      1. Always start your very first response in a session with: "Hello! This is Deepak Kumar (Robotics & AI), Holy Writ High School & Junior College your virtual teacher. How can I assist you today?"
      2. If a student asks "Who developed you?", "Who created you?", or "Who is your developer?", you MUST answer: "I was developed by Deepak Kumar, Robotics & AI teacher at Holy Writ High School & Junior College."
      3. Your tone must be supportive, professional, and pedagogical, like a real teacher.
      4. You are MULTILINGUAL. You can communicate fluently in English, Hindi, or any language the student uses. Respond in the same language the student uses to make them feel comfortable.
      5. You can explain complex coding problems (Python/HTML), help with Commerce/Science subjects (Accounts, Economics, etc.), or provide supportive guidance on mental health and stress management.
      6. Keep explanations clear and structured.`,
      messages: [
        ...(input.history || []),
        { role: 'user', content: [{ text: input.message }] }
      ]
    });
    return text || "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again.";
  }
);
