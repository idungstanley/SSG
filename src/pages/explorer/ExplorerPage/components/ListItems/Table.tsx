import React, { LegacyRef } from 'react';
import PropTypes from 'prop-types';
import { FileIcon } from '../../../../../common';
import { OutputDateTime, OutputFileSize } from '../../../../../app/helpers';
import { useAppSelector } from '../../../../../app/hooks';
import { IItem } from '../ListItems';
import { classNames } from '../../../../../utils';

interface TableProps {
  checkbox: React.RefObject<{
    indeterminate: boolean;
  }>;
  checked: boolean;
  toggleAll: () => void;
  sortedItems: IItem[];
  selectedItems: string[];
  handleChangeItem: (e: React.ChangeEvent<HTMLInputElement>, itemId: string, type: string) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLTableRowElement, MouseEvent>, itemId: string, type: string) => void;
}

export default function Table({
  checkbox,
  checked,
  toggleAll,
  sortedItems,
  selectedItems,
  handleChangeItem,
  handleClick,
}: TableProps) {
  const { selectedItemId } = useAppSelector((state) => state.explorer);
  const checkboxRef = checkbox as LegacyRef<HTMLInputElement>;

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300">
      <thead className="bg-white">
        <tr>
          <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
            <input
              type="checkbox"
              className="absolute cursor-pointer left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
              ref={checkboxRef}
              checked={checked}
              onChange={toggleAll}
            />
          </th>
          <th
            scope="col"
            className="min-w-[12rem] py-3 pr-3.5 pl-1 uppercase text-left text-sm font-normal text-gray-400"
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
        {sortedItems.map((item) => (
          <tr
            key={item.id}
            className={`${
              selectedItems.includes(item.id) ? 'bg-gray-50' : null
            } 
                    ${selectedItemId === item.id ? 'bg-indigo-100' : null} 
                     cursor-pointer`}
            onClick={(e) => handleClick(e, item.id, item.item_type)}
          >
            <td className="relative w-12 px-6 sm:w-16 sm:px-8">
              {selectedItems.includes(item.id) && (
                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
              )}
              <input
                type="checkbox"
                className="absolute left-4 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
                value={item.id}
                checked={selectedItems.includes(item.id)}
                onChange={(e) => handleChangeItem(e, item.id, item.item_type)}
              />
            </td>
            <td
              className={classNames(
                'whitespace-nowrap py-4 pr-12 sm:pr-0 text-sm font-medium flex gap-4 items-center',
                selectedItems.includes(item.id)
                  ? 'text-indigo-600'
                  : 'text-gray-900',
              )}
            >
              <FileIcon extensionKey={item.icon} size={10} />
              {item.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {OutputDateTime(item.created_at)}
            </td>
            <td className="whitespace-nowrap pl-10 sm:pl-0 px-3 py-4 text-sm text-gray-500">
              {item.item_type === 'file'
                ? OutputFileSize(+item.size)
                : item.size}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  checkbox: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleAll: PropTypes.func.isRequired,
  sortedItems: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  handleChangeItem: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
