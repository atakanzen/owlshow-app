'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import QuestionConfiguration from '@/components/QuestionConfiguration';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';
import {
  selectAppSettings,
  selectAppSettingsError,
  setNumberOfPlayers,
  setNumberOfPlayersError,
  setNumberOfQuestions,
  setNumberOfQuestionsError,
  setTimePerQuestion,
  setTimePerQuestionError,
} from '@/store/slices/appsettings';
import {
  addQuestion,
  selectQuestions,
} from '@/store/slices/question';
import { appSettingsSchema } from '@/types/appsettings';
import { MouseEventHandler } from 'react';

export default function Home() {
  const questions = useAppSelector(selectQuestions);
  const appSettings = useAppSelector(selectAppSettings);
  const {
    numberOfPlayersError,
    numberOfQuestionsError,
    timePerQuestionError,
  } = useAppSelector(selectAppSettingsError);
  const dispatch = useAppDispatch();

  const handleAddQuestion: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    dispatch(addQuestion());
  };

  const handleSaveAppSettings: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    const appSettingsResult =
      appSettingsSchema.safeParse(appSettings);
    if (!appSettingsResult.success) {
      for (const err of appSettingsResult.error.issues) {
        switch (err.path[0]) {
          case 'numberOfPlayers':
            dispatch(setNumberOfPlayersError(err.message));
            break;
          case 'numberOfQuestions':
            dispatch(
              setNumberOfQuestionsError(err.message)
            );
            break;
          case 'timePerQuestion':
            dispatch(setTimePerQuestionError(err.message));
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <main className="flex flex-col items-start gap-y-12 p-24">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-4xl font-bold">
          Configuration Page
        </h1>
        <div className="flex items-center gap-x-2">
          <Button
            label="Reset"
            onClick={(e) => alert('not implemented yet')}
          />
          <Button
            label="Export"
            onClick={(e) => alert('not implemented yet')}
          />
          <Button
            label="Import"
            onClick={(e) => alert('not implemented yet')}
          />
        </div>
      </div>
      <Card title="Game Settings">
        <Input
          title="Number of players"
          required
          error={numberOfPlayersError}
          props={{
            type: 'number',
            min: 1,
            max: 8,
            value: appSettings.numberOfPlayers,
            onChange: (e) =>
              dispatch(
                setNumberOfPlayers(parseInt(e.target.value))
              ),
          }}
        />
        <Input
          title="Number of questions"
          required
          error={numberOfQuestionsError}
          props={{
            type: 'number',
            min: 1,
            max: 64,
            value: appSettings.numberOfQuestions,
            onChange: (e) =>
              dispatch(
                setNumberOfQuestions(
                  parseInt(e.target.value)
                )
              ),
          }}
        />
        <Input
          title="Time per question"
          required
          error={timePerQuestionError}
          props={{
            type: 'number',
            min: 5,
            max: 60,
            value: appSettings.timePerQuestion,
            onChange: (e) =>
              dispatch(
                setTimePerQuestion(parseInt(e.target.value))
              ),
          }}
        />
        <Button
          className="mt-2 self-end"
          label="Save"
          onClick={handleSaveAppSettings}
        />
      </Card>
      <Card
        title="Question Settings"
        actions={[
          <Button
            key="Add Question"
            label="Add Question"
            onClick={handleAddQuestion}
          />,
        ]}
      >
        {questions.length >= 1 && (
          <>
            {questions.map((q) => (
              <QuestionConfiguration
                key={q.id}
                question={q}
              />
            ))}
            <Button
              className="mt-2 self-end"
              label="Save"
              onClick={() => alert('not implemented')}
            />
          </>
        )}
      </Card>
    </main>
  );
}
