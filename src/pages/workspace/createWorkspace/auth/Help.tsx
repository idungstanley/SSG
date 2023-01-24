import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Help() {
  return (
    <div className="absolute bottom-0 -right-16 bg-gray-200 p-2 cursor-pointer sm:flex flex-col items-center border transition hover:bg-opacity-70 bg-opacity-50 rounded-lg hidden">
      <QuestionMarkCircleIcon
        className="h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      <p className="text-gray-500">Help</p>
    </div>
  );
}
