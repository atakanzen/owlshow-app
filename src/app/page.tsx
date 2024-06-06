'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';

export default function Home() {
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
      </Card>
      <Card title="Question Settings">
        <p>question setup here</p>
      </Card>
    </main>
  );
}
