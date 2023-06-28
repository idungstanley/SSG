import React from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

interface ArrowUpDownProps {
  id?: string;
  value: string;
  handleSort: (value: string, id: string | undefined, condition: 'asc' | 'desc') => void;
}
export default function RoundedArrowUpDown({ value, id, handleSort }: ArrowUpDownProps) {
  return (
    <div
      className="flex py-0.5 items-center justify-center w-5 h-5 -space-y-2.5 transition-opacity duration-500 bg-gray-300 rounded-full dNone "
      style={{ paddingLeft: '3px' }}
    >
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
