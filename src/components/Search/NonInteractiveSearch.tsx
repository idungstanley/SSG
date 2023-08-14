import React, { ReactNode } from 'react';

interface SearchProps {
  children: ReactNode;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: JSX.Element;
}
export default function NonInteractiveSearch({ children, setAction, modal }: SearchProps) {
  return (
    <>
      <button
        type="button"
        className="relative flex items-center w-full p-1 px-3 mt-4 mb-1 transition duration-300 rounded-md cursor-pointer focus:outline-0 group"
        onClick={() => setAction(true)}
      >
        {children}
        <input
          className="w-full h-10 pl-3 text-xs border-transparent border-none rounded-lg bg-alsoit-gray-50 group-hover:border-fuchsia-500 focus:border-transparent focus:ring-0 group-hover:text-primary-400"
          disabled
          type="text"
        />
      </button>
      {modal}
    </>
  );
}
