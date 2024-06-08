import { z } from 'zod';

const appSettingsSchema = z.object({
  numberOfPlayers: z
    .number()
    .min(
      1,
      'Player number must be greater than or equal to 1'
    )
    .max(
      8,
      'Player number must be less than or equal to 8'
    ),
  numberOfPlayersError: z.string().optional(),
  numberOfQuestions: z
    .number()
    .min(
      1,
      'Question number must be greater than or equal to 1'
    )
    .max(
      64,
      'Question number must be less than or equal to 64'
    ),
  numberOfQuestionsError: z.string().optional(),
  timePerQuestion: z
    .number()
    .min(
      10,
      'Time per question must be greater than or equal to 10 seconds'
    )
    .max(
      60,
      'Time per question must be less than or equal to 60 seconds'
    ),
  timePerQuestionError: z.string().optional(),
  pointsPerQuestion: z.number().nonnegative(),
  timeForSplashScreen: z.number().min(1).max(5),
});

type AppSettings = z.infer<typeof appSettingsSchema>;

export type { AppSettings };
export { appSettingsSchema };
