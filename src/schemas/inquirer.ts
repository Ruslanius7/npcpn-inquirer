import { z } from "astro:content";

export const answerSchema = z.object({
  id: z.string(),
  text: z.string(),
  weight: z.number().optional(),
});

export const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  answers: z.array(answerSchema),
});

export const inquirerSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(questionSchema),
});
