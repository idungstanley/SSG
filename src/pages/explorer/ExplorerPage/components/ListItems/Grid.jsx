import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { OutputDateTime } from '../../../../../app/helpers';
import { FileIcon } from '../../../../../common';

export default function Grid({
  checkbox,
  checked,
  toggleAll,
  sortedItems,
  selectedItems,
  handleChangeItem,
  handleClick,
}) {
  const { selectedItemId } = useSelector((state) => state.explorer);

  return (
    <>
      <div className="w-full h-10 border-b">
        <div className="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            className="absolute cursor-pointer left-4 top-1/2 mt-3 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
            ref={checkbox}
            checked={checked}
            onChange={toggleAll}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
        {sortedItems.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={(e) => handleClick(e, item.id, item.item_type)}
            className={`relative flex items-center cursor-pointer space-x-3 rounded-lg border border-gray-300 bg-white px-3 py-5 shadow-sm rind-0 focus:ring-0 hover:border-gray-400 ${
              selectedItems.includes(item.id) ? 'bg-gray-50' : null
            } ${selectedItemId === item.id ? 'bg-indigo-100' : null}`}
          >
            <div className="relative w-12 px-6 sm:w-16 sm:px-8">
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
            </div>
            <div className="flex-shrink-0">
              <FileIcon extensionKey={item.icon} size={14} />
            </div>
            <div className="min-w-0 flex-1 pl-5">
              <p
                className={`text-sm font-medium overflow-hidden overflow-ellipsis text-left text-gray-900 ${
                  selectedItems.includes(item.id)
                    ? 'text-indigo-600'
                    : 'text-gray-900'
                }`}
              >
                {item.name}
              </p>
              <p className="truncate text-sm text-left text-gray-500">
                {OutputDateTime(item.created_at)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

Grid.propTypes = {
  checkbox: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleAll: PropTypes.func.isRequired,
  sortedItems: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  handleChangeItem: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
