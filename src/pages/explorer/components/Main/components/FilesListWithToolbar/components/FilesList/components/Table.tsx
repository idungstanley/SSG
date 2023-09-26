import React, { LegacyRef } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useAppSelector } from '../../../../../../../../../app/hooks';
import { IStringifiedFile } from '../index';
import Row from './Row';
interface TableProps {
  checkbox: React.RefObject<{
    indeterminate: boolean;
  }>;
  checked: boolean;
  toggleAll: () => void;
  items: IStringifiedFile[];
}

export default function Table({ checkbox, checked, toggleAll, items }: TableProps) {
  const { draggableItem } = useAppSelector((state) => state.explorer);

  const checkboxRef = checkbox as LegacyRef<HTMLInputElement>;

  return (
    <table className="min-w-full bg-white table-fixed">
      <thead>
        <tr className="border">
          <th scope="col" className="relative px-2 py-2 pr-6">
            <input
              type="checkbox"
              className="absolute -mt-2 text-green-500 border-gray-300 rounded cursor-pointer left-3 top-1/2 ring-0 focus:ring-0"
              ref={checkboxRef}
              checked={checked}
              onChange={toggleAll}
            />
          </th>
          {/* eye */}
          <th scope="col" className="px-3 py-2 pl-5 text-sm font-normal text-left text-gray-400 uppercase" />
          <th
            scope="col"
            className="min-w-[12rem] pr-3.5 py-2  pl-3 uppercase text-left text-sm font-normal text-gray-400"
          >
            Name
          </th>
          <th scope="col" className="px-3 py-2 text-xs font-normal text-left text-gray-400 uppercase">
            Created at
          </th>
          <th scope="col" className="px-3 py-2 text-xs font-normal text-left text-gray-400 uppercase">
            Size
          </th>
        </tr>
      </thead>

      {/* draggable item */}
      {draggableItem?.isFile ? (
        <DragOverlay wrapperElement="tbody">
          <Row fileId={draggableItem.id} />
        </DragOverlay>
      ) : null}

      {/* all items */}
      <tbody>
        {items.map((file) => (
          <Row key={file.id} fileId={file.id} />
        ))}
      </tbody>
    </table>
  );
}
