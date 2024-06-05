import React, { MouseEventHandler, ReactHTMLElement } from 'react';

type ButtonProps = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="min-w-24 rounded bg-slate-800 px-4 py-2 text-lg text-white dark:bg-slate-500"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
