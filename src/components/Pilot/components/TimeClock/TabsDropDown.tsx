import React from 'react';

interface Props {
  header: string;
  subHeader: string;
  children: React.ReactNode;
  styles: string;
  subStyles?: string;
}

export function TabsDropDown({ children, header, subHeader, styles, subStyles }: Props) {
  return (
    <div className={`absolute z-40 flex flex-col p-2 space-y-3 bg-white rounded-md shadow-xl ${styles}`}>
      <div className="flex flex-col space-y-3.5">
        <span className="font-semibold text-center uppercase">{header}</span>
        <div className="relative border-b-2">
          <span
            className={`absolute bg-white px-1.5 py-0.5 capitalize text-alsoit-text-sm font-semibold -top-2 ${
              subStyles ? subStyles : 'left-10'
            }`}
          >
            {subHeader}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
