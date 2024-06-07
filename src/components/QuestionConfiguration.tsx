import {
  Question,
  QuestionTypesEnum,
} from '@/types/question';
import React from 'react';
import Button from './Button';
import { useAppDispatch } from '@/store/hooks';
import { removeQuestion } from '@/store/slices/question';
import Input from './Input';

type QuestionConfigurationProps = {
  question: Question;
};

const QuestionConfiguration = ({
  question,
}: QuestionConfigurationProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex w-full items-start justify-between gap-x-2 border p-4">
      <div className="flex w-full flex-col gap-y-2">
        <select
          name={`question-type-${question.id}`}
          id={`question-type-${question.id}`}
          className="max-w-48 rounded bg-slate-600 p-2"
        >
          {QuestionTypesEnum.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <Input
          required
          title="Question"
          props={{ type: 'text' }}
        />
        <p>Answers Section</p>
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
