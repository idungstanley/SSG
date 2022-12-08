import React, {
  useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OutputDateTime, OutputFileSize } from '../../../../../app/helpers';
import { FileIcon, Spinner } from '../../../../../common';
import { useGetExplorerFilesAndFolders } from '../../../../../features/explorer/explorerService';
import {
  setSelectedFiles,
  setSelectedFolders,
  resetSelectedFilesAndFolders,
  setSelectedItem,
  setShowUploadModal,
} from '../../../../../features/explorer/explorerSlice';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';
import { sortItems } from '../Toolbar/SortingItems';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ExplorerTable() {
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const {
    selectedItemId,
    selectedFileIds,
    selectedFolderIds,
    selectedSorting,
  } = useSelector((state) => state.explorer);
  const selectedItems = [...selectedFileIds, ...selectedFolderIds];

  console.log(selectedItemId);

  const { data, status } = useGetExplorerFilesAndFolders(folderId);

  const items = [];

  data?.data.folders.map((i) => items.push({
    icon: 'folder',
    name: i.name,
    created_at: i.created_at,
    size: '-',
    item_type: 'folder',
    id: i.id,
    updated_at: i.updated_at,
  }));

  data?.data.files.map((i) => items.push({
    icon: i.file_format.key,
    name: i.display_name,
    created_at: i.created_at,
    size: i.size,
    item_type: 'file',
    id: i.id,
    updated_at: i.updated_at,
  }));

  useLayoutEffect(() => {
    const isIndeterminate = selectedItems.length > 0 && selectedItems.length < items?.length;

    if (
      selectedItems.length === items.length
      && +selectedItems.length + +items.length > 0
    ) {
      setChecked(selectedItems.length === items.length);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedItems]);

  function toggleAll() {
    if (checked || indeterminate) {
      dispatch(resetSelectedFilesAndFolders());
    } else {
      dispatch(
        setSelectedFiles([
          ...items.filter((i) => i.item_type === 'file').map((i) => i.id),
        ]),
      );
      dispatch(
        setSelectedFolders([
          ...items.filter((i) => i.item_type === 'folder').map((i) => i.id),
        ]),
      );
    }

    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleClick = (e, itemId, type) => {
    if (selectedItems.length && !e.target.value) {
      dispatch(resetSelectedFilesAndFolders());
    }

    if (!e.target.value) {
      dispatch(
        setSelectedItem({
          selectedItemId: itemId,
          selectedItemType: type,
        }),
      );
      dispatch(
        type === 'file'
          ? setSelectedFiles([itemId])
          : setSelectedFolders([itemId]),
      );
    }
  };

  const handleChangeItem = (e, itemId, type) => {
    if (!e.target.checked) {
      dispatch(
        type === 'file'
          ? setSelectedFiles([...selectedFileIds.filter((i) => i !== itemId)])
          : setSelectedFolders([
            ...selectedFolderIds.filter((i) => i !== itemId),
          ]),
      );
    } else {
      dispatch(
        type === 'file'
          ? setSelectedFiles([...selectedFileIds, itemId])
          : setSelectedFolders([...selectedFolderIds, itemId]),
      );
    }
  };

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={22} color="#0F70B7" />
      </div>
    );
  }

  const sortedItems = useMemo(
    () => [
      ...sortItems(
        items?.filter((i) => i.item_type === 'folder'),
        selectedSorting.id,
      ),
      ...sortItems(
        items?.filter((i) => i.item_type === 'file'),
        selectedSorting.id,
      ),
    ],
    [data, selectedSorting],
  );

  return !items.length ? (
    <FullScreenMessage
      title="No files or folders in your explorer"
      description="Upload one to start working"
      ctaText="Upload"
      ctaOnClick={() => dispatch(setShowUploadModal(true))}
      showCta
    />
  ) : (
    <div className="flex flex-col px-3 md:px-0">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            {/* <div className="grid grid-flow-row-dense grid-cols-3 xl:grid-cols-4 bg-white gap-3 p-4">
              {items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`${
                    selectedItems.includes(item.id) ? 'bg-gray-50' : null
                  }
                        ${selectedItemId === item.id ? 'bg-indigo-100' : null}
                         cursor-pointer flex items-center border rounded-xl p-3 gap-5`}
                  onClick={(e) => handleClick(e, item.id, item.item_type)}
                >
                  <div className="relative w-12 px-6 sm:w-16 sm:px-8 text-left">
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
                  <FileIcon extensionKey={item.icon} size={14} />
                  <div className="flex flex-col">
                    <p className="text-left">{item.name}</p>
                    <p className="text-sm text-gray-500">{OutputDateTime(item.created_at)}</p>
                  </div>
                </button>
              ))}
            </div> */}
            <Table
              checkbox={checkbox}
              checked={checked}
              toggleAll={() => toggleAll}
              sortedItems={sortedItems}
              selectedItems={selectedItems}
              handleChangeItem={handleChangeItem}
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table({
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
    <table className="min-w-full table-fixed divide-y divide-gray-300">
      <thead className="bg-white">
        <tr>
          <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
            <input
              type="checkbox"
              className="absolute cursor-pointer left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
              ref={checkbox}
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
                ? OutputFileSize(item.size)
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
