import {
  NUMBER_OF_QUESTIONS_MAXIMUM_ERROR,
  NUMBER_OF_QUESTIONS_MINIMUM_ERROR,
  PLAYER_NUMBER_MAXIMUM_ERROR,
  PLAYER_NUMBER_MINIMUM_ERROR,
  POINTS_PER_QUESTION_MINIMUM_ERROR,
  TIME_FOR_SPLASH_SCREEN_MAXIMUM_ERROR,
  TIME_FOR_SPLASH_SCREEN_MINIMUM_ERROR,
  TIME_PER_QUESTION_MAXIMUM_ERROR,
  TIME_PER_QUESTION_MINIMUM_ERROR,
} from '@/utils/constants';
import { z } from 'zod';

const appSettingsSchema = z.object({
  numberOfPlayers: z
    .number()
    .min(1, PLAYER_NUMBER_MINIMUM_ERROR)
    .max(8, PLAYER_NUMBER_MAXIMUM_ERROR),
  numberOfPlayersError: z.string().optional(),
  numberOfQuestions: z
    .number()
    .min(1, NUMBER_OF_QUESTIONS_MINIMUM_ERROR)
    .max(64, NUMBER_OF_QUESTIONS_MAXIMUM_ERROR),
  numberOfQuestionsError: z.string().optional(),
  timePerQuestion: z
    .number()
    .min(10, TIME_PER_QUESTION_MINIMUM_ERROR)
    .max(60, TIME_PER_QUESTION_MAXIMUM_ERROR),
  timePerQuestionError: z.string().optional(),
  pointsPerQuestion: z
    .number()
    .min(1, POINTS_PER_QUESTION_MINIMUM_ERROR),
  pointsPerQuestionError: z.string().optional(),
  timeForSplashScreen: z
    .number()
    .min(1, TIME_FOR_SPLASH_SCREEN_MINIMUM_ERROR)
    .max(5, TIME_FOR_SPLASH_SCREEN_MAXIMUM_ERROR),
  timeForSplashScreenError: z.string().optional(),
  isSaved: z.boolean(),
});

type AppSettings = z.infer<typeof appSettingsSchema>;

export type { AppSettings };
export { appSettingsSchema };
