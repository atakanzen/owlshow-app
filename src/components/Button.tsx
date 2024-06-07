import React, {
  MouseEventHandler,
  ReactHTMLElement,
} from 'react';

type ButtonProps = {
  label: string;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  label,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`min-w-24 rounded bg-slate-800 px-4 py-2 text-lg text-white dark:bg-slate-500 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
