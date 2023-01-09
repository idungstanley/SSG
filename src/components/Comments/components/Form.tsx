import React from 'react';
import { AtSymbolIcon } from '@heroicons/react/outline';

interface FormType {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Form({
  handleSubmit,
  message,
  setMessage,
  setShowDropdown,
}: FormType) {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="relative">
      <input
        type="text"
        className="block w-full pr-20 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        placeholder="Enter comment"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="absolute flex gap-4 top-2 right-2">
        <AtSymbolIcon
          onClick={() => setShowDropdown((prev) => !prev)}
          className="w-6 h-6 text-gray-300 transition-all duration-300 cursor-pointer hover:text-indigo-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 cursor-pointer transition-all duration-300 ${
            message.length > 2 ? 'stroke-current text-indigo-600' : null
          } stroke-current hover:text-indigo-600 `}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </div>
    </form>
  );
}
