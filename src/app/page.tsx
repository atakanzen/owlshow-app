'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import ExportQuestionsDialog from '@/components/ExportQuestionsDialog';
import ImportQuestionsDialog from '@/components/ImportQuestionsDialog';
import Input from '@/components/Input';
import QuestionConfiguration from '@/components/QuestionConfiguration';
import useModal from '@/hooks/useModal';
import {
  useAppDispatch,
  useAppSelector,
} from '@/store/hooks';
import {
  resetAppSettings,
  selectAppSettings,
  selectAppSettingsError,
  setIsSaved,
  setNumberOfPlayers,
  setNumberOfPlayersError,
  setNumberOfQuestions,
  setNumberOfQuestionsError,
  setPointsPerQuestion,
  setPointsPerQuestionError,
  setTimeForSplashScreen,
  setTimeForSplashScreenError,
  setTimePerQuestion,
  setTimePerQuestionError,
} from '@/store/slices/appsettings';
import {
  addQuestion,
  resetQuestions,
  selectQuestions,
  setAnswerError,
  setNumberOfAnswersError,
  setNumberOfCorrectAnswersError,
  setQuestionError,
  setIsSaved as setIsSavedQuestion,
  selectQuestionIsSaved,
} from '@/store/slices/question';
import { appSettingsSchema } from '@/types/appsettings';
import { questionConfigSchema } from '@/types/question';
import {
  ANSWER_MINIMUM_CHARACTERS_ERROR,
  ANSWER_ONLY_SINGLE_CORRECT_ERROR,
  QUESTION_MINIMUM_CHARACTERS_ERROR,
  QUESTION_MINIMUM_NO_OF_ANSWERS_ERROR,
} from '@/utils/constants';
import { jsonSerializerReplacer } from '@/utils/json';
import Link from 'next/link';
import {
  MouseEvent,
  MouseEventHandler,
  useState,
} from 'react';

export default function Home() {
  const questions = useAppSelector(selectQuestions);
  const isSavedQuestion = useAppSelector(
    selectQuestionIsSaved
  );
  const appSettings = useAppSelector(selectAppSettings);
  const {
    numberOfPlayersError,
    numberOfQuestionsError,
    timePerQuestionError,
  } = useAppSelector(selectAppSettingsError);
  const { numberOfQuestions } = useAppSelector(
    selectAppSettings
  );
  const dispatch = useAppDispatch();
  const { modal: exportModal, showModal: showExportModal } =
    useModal();
  const { modal: importModal, showModal: showImportModal } =
    useModal();

  const handleAddQuestion: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    if (questions.length === numberOfQuestions) {
      alert(
        'Maximum number of questions have been reached.'
      );
      return;
    }
    dispatch(addQuestion());
  };

  const handleSaveAppSettings: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    const appSettingsResult =
      appSettingsSchema.safeParse(appSettings);
    if (!appSettingsResult.success) {
      console.log(appSettingsResult.error.issues);
      for (const issue of appSettingsResult.error.issues) {
        switch (issue.path[0]) {
          case 'numberOfPlayers':
            dispatch(
              setNumberOfPlayersError(issue.message)
            );
            break;
          case 'numberOfQuestions':
            dispatch(
              setNumberOfQuestionsError(issue.message)
            );
            break;
          case 'timePerQuestion':
            dispatch(
              setTimePerQuestionError(issue.message)
            );
            break;
          case 'pointsPerQuestion':
            dispatch(
              setPointsPerQuestionError(issue.message)
            );
            break;
          case 'timeForSplashScreen':
            dispatch(
              setTimeForSplashScreenError(issue.message)
            );
            break;
          default:
            break;
        }
      }
    } else {
      dispatch(setIsSaved(true));
    }
  };

  const handleSaveQuestions: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    const questionConfigResult =
      questionConfigSchema.safeParse(questions);
    if (!questionConfigResult.success) {
      console.log(questionConfigResult.error.issues);
      for (const issue of questionConfigResult.error
        .issues) {
        switch (issue.message) {
          case QUESTION_MINIMUM_CHARACTERS_ERROR:
            dispatch(
              setQuestionError({
                questionIndex: issue.path[0] as number,
                errorMessage: issue.message,
              })
            );
            break;
          case ANSWER_MINIMUM_CHARACTERS_ERROR:
            dispatch(
              setAnswerError({
                questionIndex: issue.path[0] as number,
                answerIndex: issue.path[2] as number,
                errorMessage: issue.message,
              })
            );
            break;
          case ANSWER_ONLY_SINGLE_CORRECT_ERROR:
            dispatch(
              setNumberOfCorrectAnswersError({
                questionIndex: issue.path[0] as number,
                errorMessage: issue.message,
              })
            );
            break;
          case QUESTION_MINIMUM_NO_OF_ANSWERS_ERROR:
            dispatch(
              setNumberOfAnswersError({
                questionIndex: issue.path[0] as number,
                errorMessage: issue.message,
              })
            );
          default:
            break;
        }
      }
    } else {
      dispatch(setIsSavedQuestion(true));
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
            onClick={(e) => {
              dispatch(resetAppSettings());
              dispatch(resetQuestions());
            }}
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
                setNumberOfPlayers(e.target.valueAsNumber)
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
          title="Time per question (in seconds)"
          required
          error={timePerQuestionError}
          props={{
            type: 'number',
            min: 5,
            max: 60,
            value: appSettings.timePerQuestion,
            onChange: (e) =>
              dispatch(
                setTimePerQuestion(e.target.valueAsNumber)
              ),
          }}
        />
        <Input
          title="Points per question"
          required
          error={appSettings.pointsPerQuestionError}
          props={{
            type: 'number',
            min: 1,
            value: appSettings.pointsPerQuestion,
            onChange: (e) =>
              dispatch(
                setPointsPerQuestion(e.target.valueAsNumber)
              ),
          }}
        />
        <Input
          title="Time for splash screen (in seconds)"
          required
          error={appSettings.timeForSplashScreenError}
          props={{
            type: 'number',
            min: 1,
            max: 5,
            value: appSettings.timeForSplashScreen,
            onChange: (e) =>
              dispatch(
                setTimeForSplashScreen(
                  e.target.valueAsNumber
                )
              ),
          }}
        />
        <div className="mt-2 flex items-center gap-x-2 self-end">
          {!appSettings.isSaved && (
            <span>
              Please save the configuration first to add
              questions.
            </span>
          )}
          <Button
            label="Save"
            onClick={handleSaveAppSettings}
          />
        </div>
      </Card>
      {appSettings.isSaved && (
        <Card
          title="Questions"
          actions={[
            <Button
              key="Add Question"
              label="Add Question"
              onClick={handleAddQuestion}
            />,
            <Button
              key="Export Questions"
              label="Export Questions"
              onClick={(e) =>
                showExportModal(
                  'Export Questions',
                  (onClose) => (
                    <ExportQuestionsDialog
                      onClose={onClose}
                    />
                  )
                )
              }
            />,
            <Button
              key="Import Questions"
              label="Import Questions"
              onClick={(e) =>
                showImportModal(
                  'Import Questions',
                  (onClose) => (
                    <ImportQuestionsDialog
                      onClose={onClose}
                    />
                  )
                )
              }
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
                onClick={handleSaveQuestions}
              />
            </>
          )}
        </Card>
      )}
      {isSavedQuestion && (
        <Link
          className="self-end rounded bg-slate-800 p-4 text-white"
          href="/show-mode"
        >
          Go Show Mode
        </Link>
      )}
      {exportModal}
      {importModal}
    </main>
  );
}
