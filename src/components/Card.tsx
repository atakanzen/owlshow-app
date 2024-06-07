import React, { ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
};

const Card = ({ children, title, actions }: CardProps) => {
  return (
    <div className="flex w-full flex-col gap-y-2 rounded-lg border border-slate-800 bg-slate-300 p-6 drop-shadow-2xl dark:bg-slate-800">
      <div className="flex w-full items-center justify-between">
        <span className="text-2xl font-bold">{title}</span>
        {actions && (
          <div className="flex items-center gap-x-2">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;
