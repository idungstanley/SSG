import React, { LegacyRef } from 'react';
import {
  OutputDateTime,
  OutputFileSize,
} from '../../../../../../../app/helpers';
import { useAppSelector } from '../../../../../../../app/hooks';
import { FileIcon } from '../../../../../../../common';
import { classNames } from '../../../../../../../utils';
import { IStringifiedFile } from '../index';

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
  const { selectedFileIds, selectedFileId } = useAppSelector(
    (state) => state.explorer
  );
  const checkboxRef = checkbox as LegacyRef<HTMLInputElement>;

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300 overflow-x-scroll">
      <thead className="bg-white">
        <tr>
          <th scope="col" className="relative w-12 px-5 sm:w-16">
            <input
              type="checkbox"
              className="absolute cursor-pointer left-3 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0"
              ref={checkboxRef}
              checked={checked}
              onChange={toggleAll}
            />
          </th>
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
            className="px-3 py-3.5 uppercase pl-9 : sm:pl-0 text-left text-sm font-normal text-gray-400"
          >
            Size
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {items.map((item) => (
          <tr
            key={item.id}
            className={`${
              selectedFileIds.includes(item.id) ? 'bg-gray-50' : null
            }
                ${selectedFileId === item.id ? 'bg-indigo-100' : null} 
                 cursor-pointer`}
            // onClick={(e) => handleClick(e, item.id, item.item_type)}
          >
            <td className="relative sm:w-16 px-2">
              {selectedFileIds.includes(item.id) && (
                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
              )}
              <input
                type="checkbox"
                className="absolute left-3 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0"
                value={item.id}
                checked={selectedFileIds.includes(item.id)}
                // onChange={(e) => handleChangeItem(e, item.id, item.fileType)}
              />
            </td>
            <td
              className={classNames(
                'py-4 text-sm font-medium flex gap-4 items-center px-2',
                selectedFileIds.includes(item.id)
                  ? 'text-indigo-600'
                  : 'text-gray-900'
              )}
            >
              <FileIcon extensionKey={item.fileType} size={6} />
              <span className="truncate w-48">{item.name}</span>
            </td>
            <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
              {OutputDateTime(item.created_at)}
            </td>
            <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
              {OutputFileSize(item.size)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
