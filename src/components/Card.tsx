import React, { ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
};

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="flex w-full flex-col gap-y-2 rounded-lg border border-slate-800 bg-slate-300 p-6 drop-shadow-2xl dark:bg-slate-800">
      <span className="text-2xl font-bold">{title}</span>
      {children}
    </div>
  );
};

export default Card;
