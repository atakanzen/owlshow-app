import React, { MouseEventHandler, useState } from 'react';
import Button from './Button';

type ImportQuestionsDialogProps = {
  onClose: () => void;
};

const ImportQuestionsDialog = ({
  onClose,
}: ImportQuestionsDialogProps) => {
  const [questionsJSON, setQuestionsJSON] =
    useState<string>('');
  const handleImportButtonClick: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    alert('not implemented yet.');
  };

  return (
    <div className="flex flex-col gap-y-2">
      <textarea
        className="h-full w-[750px] rounded border p-2 font-mono text-lg"
        placeholder="Paste JSON representation of questions here."
        rows={12}
        onChange={(e) => setQuestionsJSON(e.target.value)}
        value={questionsJSON}
      />
      <div className="flex items-center gap-x-2 self-end">
        <Button label="Cancel" onClick={onClose} />
        <Button
          label={'Import'}
          onClick={handleImportButtonClick}
        />
      </div>
    </div>
  );
};

export default ImportQuestionsDialog;
