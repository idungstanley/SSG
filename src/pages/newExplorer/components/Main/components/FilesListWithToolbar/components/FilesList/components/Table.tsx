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
  const { draggableItem } = useAppSelector((state) => state.explorer);

  const checkboxRef = checkbox as LegacyRef<HTMLInputElement>;

  return (
    <table className="min-w-full table-fixed bg-white">
      <thead>
        <tr className="border">
          <th scope="col" className="relative px-2 pr-6 py-2">
            <input
              type="checkbox"
              className="absolute cursor-pointer left-3 -mt-2 top-1/2 rounded border-gray-300 text-green-500 ring-0 focus:ring-0"
              ref={checkboxRef}
              checked={checked}
              onChange={toggleAll}
            />
          </th>
          {/* eye */}
          <th
            scope="col"
            className="px-3 pl-5 py-2 uppercase text-left text-sm font-normal text-gray-400"
          />
          <th
            scope="col"
            className="min-w-[12rem] pr-3.5 py-2  pl-3 uppercase text-left text-sm font-normal text-gray-400"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-2  uppercase text-left text-xs font-normal text-gray-400"
          >
            Created at
          </th>
          <th
            scope="col"
            className="px-3 py-2  uppercase text-left text-xs font-normal text-gray-400"
          >
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
