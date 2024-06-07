import { z } from 'zod';

const QuestionTypesEnum = z.enum([
  'Single Answer Test',
  'Multi Answer Test',
]);

const answerSchema = z.object({
  id: z.string().uuid(),
  answer: z
    .string({ required_error: 'Answer is required.' })
    .trim()
    .min(3, 'Minimum 3 characters are required.'),
  correct: z.boolean(),
  points: z
    .number({ required_error: 'Points is required.' })
    .min(1),
});

export type Answer = z.infer<typeof answerSchema>;

const questionSchema = z.object({
  id: z.string().uuid(),
  type: QuestionTypesEnum,
  question: z
    .string({ required_error: 'Question is required' })
    .trim()
    .min(20, 'Minimum 20 characters are required.'),
  answers: z.array(answerSchema),
});

export type Question = z.infer<typeof questionSchema>;

export { answerSchema, questionSchema, QuestionTypesEnum };
