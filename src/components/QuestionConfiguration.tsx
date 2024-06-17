import {
  Question,
  QuestionTypeEnum,
  QuestionTypesEnum,
} from '@/types/question';
import React from 'react';
import Button from './Button';
import { useAppDispatch } from '@/store/hooks';
import {
  addAnswerToQuestion,
  removeAnswer,
  removeQuestion,
  setAnswerIsCorrect,
  setAnswerTitle,
  setQuestionTitle,
  setQuestionType,
} from '@/store/slices/question';
import Input from './Input';

type QuestionConfigurationProps = {
  question: Question;
};

const QuestionConfiguration = ({
  question,
}: QuestionConfigurationProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex w-full items-start justify-between gap-x-2 rounded border p-4">
      <div className="flex w-full flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <select
            name={`question-type-${question.id}`}
            id={`question-type-${question.id}`}
            className="max-w-48 rounded p-2 dark:bg-slate-600"
            onChange={(e) =>
              dispatch(
                setQuestionType({
                  questionId: question.id,
                  type: e.target.value as QuestionTypeEnum,
                })
              )
            }
            value={question.type}
          >
            {QuestionTypesEnum.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {question.numberOfCorrectAnswersError && (
            <span className="text-red-500">
              {question.numberOfCorrectAnswersError}
            </span>
          )}
          {question.numberOfAnswersError && (
            <span className="text-red-500">
              {question.numberOfAnswersError}
            </span>
          )}
        </div>
        <Input
          required
          title="Question"
          error={question.titleError}
          props={{
            type: 'text',
            onChange: (e) =>
              dispatch(
                setQuestionTitle({
                  questionId: question.id,
                  title: e.target.value,
                })
              ),
            value: question.question,
          }}
        />
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <span className="text-lg font-semibold">
              <span className="text-red-500">*</span>
              Answers
            </span>
            <Button
              label={'Add Answer'}
              onClick={() =>
                dispatch(
                  addAnswerToQuestion({
                    questionId: question.id,
                  })
                )
              }
            />
          </div>
          {question.answers.length >= 1 && (
            <div className="flex flex-col">
              {question.answers.map((ans) => (
                <div
                  key={ans.id}
                  className="flex items-start justify-start gap-x-2"
                >
                  <Input
                    title={'Title'}
                    required
                    error={ans.errorMessage}
                    props={{
                      type: 'text',
                      onChange: (e) =>
                        dispatch(
                          setAnswerTitle({
                            questionId: question.id,
                            answerId: ans.id,
                            title: e.target.value,
                          })
                        ),
                      value: ans.answer,
                    }}
                  />
                  <Input
                    title={'Is Correct'}
                    displayTitle={true}
                    required
                    props={{
                      type: 'checkbox',
                      className:
                        'w-5 h-5 mt-2 hover:cursor-pointer',
                      onChange: (e) =>
                        dispatch(
                          setAnswerIsCorrect({
                            questionId: question.id,
                            answerId: ans.id,
                            isCorrect: e.target.checked,
                          })
                        ),
                      checked: ans.correct,
                    }}
                  />
                  <Button
                    label={'Delete Answer'}
                    onClick={() =>
                      dispatch(
                        removeAnswer({
                          questionId: question.id,
                          answerId: ans.id,
                        })
                      )
                    }
                    className="mt-4"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button
        label="Delete"
        onClick={() =>
          dispatch(removeQuestion(question.id))
        }
      />
    </div>
  );
};

export default QuestionConfiguration;
