import React, { ReactNode } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface SectionAreaProps {
  icon: JSX.Element;
  label: string;
  children?: ReactNode;
}

export default function SectionArea({ icon, label, children }: SectionAreaProps) {
  return (
    <div
      className="flex flex-col justify-start w-full gap-2 px-2 py-2 border-y bg-alsoit-gray-125 border-alsoit-gray-75"
      style={{ height: '50px', padding: '11px 5px 5px 6px', borderBottom: '0.25px solid rgba(178, 178, 178, 0.25)' }}
    >
      <div className="pl-2.5 flex space-x-2 items-center justify-between">
        <div className="flex">
          <span className="flex justify-center items-center" style={{ width: '20px' }}>
            {icon}
          </span>
          <p className="font-semibold" style={{ marginLeft: '5px' }}>
            {label}
          </p>
        </div>
        <div
          className="cursor-pointer p-1 hover:bg-white rounded transition duration-500"
          style={{ marginRight: '6px', marginTop: '-2px' }}
        >
          <EllipsisHorizontalIcon className="w-5 h-5" aria-hidden="true" style={{ color: 'orange' }} />
        </div>
      </div>
      {children}
    </div>
  );
}
