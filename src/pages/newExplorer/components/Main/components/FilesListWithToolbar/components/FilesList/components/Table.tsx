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

export default function Table({
  checkbox,
  checked,
  toggleAll,
  items,
}: TableProps) {
  const { draggableId } = useAppSelector((state) => state.explorer);

  const checkboxRef = checkbox as LegacyRef<HTMLInputElement>;

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300 overflow-x-scroll bg-white">
      <thead>
        <tr>
          <th scope="col" className="relative px-2 pr-6">
            <input
              type="checkbox"
              className="absolute cursor-pointer left-3 -mt-2 top-1/2 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0"
              ref={checkboxRef}
              checked={checked}
              onChange={toggleAll}
            />
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 uppercase text-left text-sm font-normal text-gray-400"
          />
          <th
            scope="col"
            className="min-w-[12rem] py-3 pr-3.5 pl-3 uppercase text-left text-sm font-normal text-gray-400"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 uppercase text-left text-sm font-normal text-gray-400"
          >
            Created at
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 uppercase text-left text-sm font-normal text-gray-400"
          >
            Size
          </th>
        </tr>
      </thead>

      {/* draggable item */}
      {draggableId ? (
        <DragOverlay wrapperElement="tbody">
          <Row fileId={draggableId} />
        </DragOverlay>
      ) : null}

      {/* all items */}
      <tbody className="divide-y divide-gray-200 group">
        {items.map((file) => (
          <Row key={file.id} fileId={file.id} />
        ))}
      </tbody>
    </table>
  );
}
