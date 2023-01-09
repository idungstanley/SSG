import React from 'react';
import { BsPlusLg } from 'react-icons/bs';

interface CreateNewItemBtnProps {
  onClick: () => void;
  title: string;
}

export default function CreateNewItemBtn({
  onClick,
  title,
}: CreateNewItemBtnProps) {
  return (
    <div className="flex justify-center mb-1.5">
      <button
        type="button"
        className="flex items-center self-center justify-center w-4/6 py-1 space-x-1 bg-gray-100 rounded"
        onClick={onClick}
      >
        <BsPlusLg className="w-3.5 h-3.5" aria-hidden="true" />
        <p className="font-md" style={{ fontSize: '10px' }}>
          {title}
        </p>
      </button>
    </div>
  );
}
