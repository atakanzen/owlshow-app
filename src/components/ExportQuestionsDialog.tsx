import { useAppSelector } from '@/store/hooks';
import { selectQuestions } from '@/store/slices/question';
import { jsonSerializerReplacer } from '@/utils/json';
import React, { MouseEventHandler } from 'react';
import Button from './Button';

type ExportQuestionsDialogProps = {
  onClose: () => void;
};

const ExportQuestionsDialog = ({
  onClose,
}: ExportQuestionsDialogProps) => {
  const questions = useAppSelector(selectQuestions);

  const handleCopyButtonClick: MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    // TODO: Improve this.
    e.preventDefault();
    let questionJson =
      document.getElementById('question-json');
    navigator.clipboard.writeText(
      questionJson!.textContent as string
    );
  };

  return (
    <div className="flex flex-col gap-y-2">
      <pre className="text-wrap rounded border p-2 text-lg">
        <code id="question-json">
          {JSON.stringify(
            questions,
            jsonSerializerReplacer
          )}
        </code>
      </pre>
      <div className="flex items-start gap-x-2 self-end">
        <Button label="Cancel" onClick={onClose} />
        <Button
          label="Copy"
          onClick={handleCopyButtonClick}
        />
      </div>
    </div>
  );
};

export default ExportQuestionsDialog;
