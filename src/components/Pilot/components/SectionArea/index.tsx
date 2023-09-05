import React, { ReactNode } from 'react';

interface SectionAreaProps {
  icon: JSX.Element;
  label: string;
  children?: ReactNode;
}

export default function SectionArea({ icon, label, children }: SectionAreaProps) {
  return (
    <div className="py-2 px-2 flex flex-col gap-2 justify-start w-full border-y">
      <div className="pl-4 flex space-x-2 items-center">
        {icon}
        <p className="font-medium">{label}</p>
      </div>
      {children}
    </div>
  );
}
