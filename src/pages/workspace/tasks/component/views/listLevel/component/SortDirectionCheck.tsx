import { Tooltip } from '@mui/material';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { SortOption } from '../TaskListViews';
import { setSortArray } from '../../../../../../../features/task/taskSlice';

interface SortDirectionProps {
  bgColor: string;
  handleRemoveSortFn: (value?: string, sortCriteria?: string) => void;
  sortValue?: string;
  sortDesc?: boolean;
  sortItemLength: number;
  sortIndex: number;
  sortCriteria?: string;
  propertyHeaderTxt?: string;
  handleOrder?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value?: string) => void;
}

export default function SortDirectionCheck({
  bgColor,
  handleRemoveSortFn,
  sortValue,
  sortDesc,
  sortItemLength,
  sortIndex,
  sortCriteria,
  propertyHeaderTxt,
  handleOrder
}: SortDirectionProps) {
  return sortItemLength >= 1 ? (
    <Tooltip title={sortDesc ? 'Sorting Z - A' : 'Sorting A - Z'} arrow>
      <div className="sortClose-group rounded-xl">
        <div
          className={
            sortItemLength > 1
              ? 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium group relative cursor-pointer px-2 rounded-full'
              : 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium group relative cursor-pointer p-1 rounded-full'
          }
          style={{ backgroundColor: bgColor }}
          onClick={(e) => handleOrder?.(e, propertyHeaderTxt)}
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
          onClick={() => handleRemoveSortFn(sortValue, sortCriteria)}
          className="w-3 h-3 m-1 font-bold text-white transition-opacity duration-500 opacity-100 sortClose"
        />
      </div>
    </Tooltip>
  ) : null;
}
