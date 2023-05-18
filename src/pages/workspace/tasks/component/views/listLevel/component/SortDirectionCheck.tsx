import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

interface SortDirectionProps {
  bgColor: string;
  handleRemoveSortFn: (value: string) => void;
  sortValue: string;
  sortDesc?: boolean;
  sortAsc?: boolean;
  sortItemLength: number;
  sortIndex: number;
}

export default function SortDirectionCheck({
  bgColor,
  handleRemoveSortFn,
  sortValue,
  sortDesc,
  sortItemLength = 0,
  sortIndex,
  sortAsc
}: SortDirectionProps) {
  console.log(sortAsc);
  return (
    <div className="sortClose-group rounded-xl">
      <div
        className={
          sortItemLength > 1
            ? 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium group relative cursor-pointer px-2 rounded-full'
            : 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium group relative cursor-pointer p-1 rounded-full'
        }
        style={{ backgroundColor: bgColor }}
      >
        {sortItemLength === 1 ? (
          sortDesc ? (
            <RiArrowDownSFill className="w-3 h-3" />
          ) : (
            <RiArrowUpSFill className="w-3 h-3" />
          )
        ) : (
          <span className="flex items-center justify-center" style={{ fontSize: '8px' }}>
            {sortIndex + 1}
            {sortDesc ? <RiArrowDownSFill className="w-3 h-3" /> : <RiArrowUpSFill className="w-3 h-3" />}
          </span>
        )}
      </div>
      <AiOutlineClose
        onClick={() => handleRemoveSortFn(sortValue)}
        className="w-3 h-3 m-1 font-bold text-white transition-opacity duration-500 opacity-100 sortClose"
      />
    </div>
  );
}
