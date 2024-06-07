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
  addQuestion,
  selectQuestions,
} from '@/store/slices/question';
import { MouseEventHandler } from 'react';

export default function Home() {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  const handleAddQuestion: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    dispatch(addQuestion());
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
          props={{
            type: 'number',
            min: 1,
            max: 8,
          }}
        />
        <Input
          title="Number of questions"
          required
          props={{
            type: 'number',
            min: 1,
            max: 64,
          }}
        />
        <Input
          title="Time per question"
          required
          props={{
            type: 'number',
            min: 5,
            max: 60,
          }}
        />
        <Button
          className="mt-2 self-end"
          label="Save"
          onClick={() => alert('not implemented')}
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
