import React from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

interface ArrowUpDownProps {
  id?: string;
  value: string;
  handleSort: (value: string, id: string | undefined, condition: 'asc' | 'desc', isDefault?: boolean) => void;
  isDefault?: boolean;
}
export default function RoundedArrowUpDown({ value, id, handleSort, isDefault }: ArrowUpDownProps) {
  return (
    <div
      className="flex py-0.5 items-center justify-center w-4 h-4 -space-y-2.5 transition-opacity duration-500 bg-gray-300 rounded-full dNone "
      style={{ paddingLeft: '3px' }}
    >
      <FaSortUp
        className="text-white cursor-pointer hover:text-fuchsia-400"
        onClick={() => handleSort(value, id, 'asc', isDefault)}
      />
      <FaSortDown
        className="text-white cursor-pointer hover:text-fuchsia-400"
        onClick={() => handleSort(value, id, 'desc', isDefault)}
      />
    </div>
  );
}
