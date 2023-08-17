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
      {label === 'Time Clock' && (
        <div className="flex space-x-2 my-2">
          {filterItemsHeader.map((x) => (
            <div className="bg-gray-100 rounded-sm p-2 flex space-x-1 cursor-pointer group" key={x.id}>
              <span>{x.title}</span>
              <div className="opacity-0 group-hover:opacity-100 flex items-center">
                <FaSort className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
              </div>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
