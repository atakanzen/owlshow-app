import {
  ANSWER_REQUIRED_ERROR,
  ANSWER_MINIMUM_CHARACTERS_ERROR,
  QUESTION_REQUIRED_ERROR,
  QUESTION_MINIMUM_CHARACTERS_ERROR,
  ANSWER_ONLY_SINGLE_CORRECT_ERROR,
  QUESTION_MINIMUM_NO_OF_ANSWERS_ERROR,
} from '@/utils/constants';
import { z } from 'zod';

const QuestionTypesEnum = z.enum([
  'Single Answer Test',
  'Multi Answer Test',
]);

export type QuestionTypeEnum = z.infer<
  typeof QuestionTypesEnum
>;

const answerSchema = z.object({
  id: z.string().uuid(),
  answer: z
    .string({ required_error: ANSWER_REQUIRED_ERROR })
    .trim()
    .min(3, ANSWER_MINIMUM_CHARACTERS_ERROR),
  errorMessage: z.string().optional(),
  isSelected: z.boolean().optional(),
  correct: z.boolean(),
});

export type Answer = z.infer<typeof answerSchema>;

const questionSchema = z
  .object({
    id: z.string().uuid(),
    type: QuestionTypesEnum,
    question: z
      .string({ required_error: QUESTION_REQUIRED_ERROR })
      .trim()
      .min(20, QUESTION_MINIMUM_CHARACTERS_ERROR),
    titleError: z.string().optional(),
    numberOfCorrectAnswersError: z.string().optional(),
    numberOfAnswersError: z.string().optional(),
    isCurrent: z.boolean().optional(),
    isAnswered: z.boolean().optional(),
    answers: z
      .array(answerSchema)
      .min(2, QUESTION_MINIMUM_NO_OF_ANSWERS_ERROR),
  })
  .refine((val) => {
    if (
      val.type === 'Single Answer Test' &&
      val.answers.filter((a) => a.correct).length > 1
    ) {
      return false;
    }
    return true;
  }, ANSWER_ONLY_SINGLE_CORRECT_ERROR);

const questionConfigSchema = z.array(questionSchema);

export type Question = z.infer<typeof questionSchema>;

export {
  answerSchema,
  questionConfigSchema,
  QuestionTypesEnum,
};
