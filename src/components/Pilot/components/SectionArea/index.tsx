import React, { ReactNode } from 'react';
import { FaSort } from 'react-icons/fa';

interface SectionAreaProps {
  icon: JSX.Element;
  label: string;
  children?: ReactNode;
}

export default function SectionArea({ icon, label, children }: SectionAreaProps) {
  const filterItemsHeader = [
    { title: 'Me', id: 1 },
    { title: 'Assignee', id: 2 }
  ];

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
