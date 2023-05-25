import React from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

interface ArrowUpDownProps {
  id?: string;
  value: string;
  handleSort: (value: string, id: string | undefined, condition: 'asc' | 'desc') => void;
}
export default function RoundedArrowUpDown({ value, id, handleSort }: ArrowUpDownProps) {
  return (
    <div className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-2 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100">
      <FaSortUp
        className="text-white cursor-pointer hover:text-fuchsia-400"
        onClick={() => handleSort(value, id, 'asc')}
      />
      <FaSortDown
        className="text-white cursor-pointer hover:text-fuchsia-400"
        onClick={() => handleSort(value, id, 'desc')}
      />
    </div>
  );
}
