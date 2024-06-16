import classNames from 'classnames';
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

type InputProps = {
  title: string;
  displayTitle?: boolean;
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
  displayTitle = true,
  required,
  error,
}: InputProps) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-start justify-center',
        {
          'w-1/3': props.type !== 'checkbox',
        }
      )}
    >
      {displayTitle && (
        <label
          className="text-lg font-semibold"
          htmlFor={title}
        >
          {required && (
            <span className="text-red-500">*</span>
          )}
          {title}
        </label>
      )}
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
