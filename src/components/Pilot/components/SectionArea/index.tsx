import React, { ReactNode } from 'react';

interface SectionAreaProps {
  icon: JSX.Element;
  label: string;
  children?: ReactNode;
}

export default function SectionArea({ icon, label, children }: SectionAreaProps) {
  return (
    <div className="flex flex-col justify-start w-full gap-2 px-2 py-2 mb-px border-y bg-alsoit-gray-125 border-alsoit-gray-75">
      <div className="pl-2.5 flex space-x-2 items-center">
        <span className="flex justify-center" style={{ width: '20px' }}>
          {icon}
        </span>
        <p className="font-medium">{label}</p>
      </div>
      {children}
    </div>
  );
}
