import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

type InputProps = {
  title: string;
  required: boolean;
  error?: string;
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const Input = ({
  props,
  title,
  required,
  error,
}: InputProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <label className="text-lg" htmlFor={title}>
        {required && (
          <span className="text-red-500">*</span>
        )}
        {title}
      </label>
      <input
        name={title}
        className="w-full rounded p-2 dark:bg-slate-500"
        {...props}
      />
      {error && (
        <span className="text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;
