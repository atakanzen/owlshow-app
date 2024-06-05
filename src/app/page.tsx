'use client';

import Button from '@/components/Button';

export default function Home() {
  return (
    <main className="flex flex-col items-start p-24">
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
    </main>
  );
}
