import React from 'react';
import { PlusIcon } from '@heroicons/react/outline';

interface CreateNewItemBtnProps {
  onClick: () => void;
  title: string;
}

export default function CreateNewItemBtn({
  onClick,
  title,
}: CreateNewItemBtnProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 border transition py-2 space-x-2 rounded-xl w-full"
      onClick={onClick}
    >
      <PlusIcon className="h-5 w-4" aria-hidden="true" />
      <p>{title}</p>
    </button>
  );
}
