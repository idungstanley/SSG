import React, {
  useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetExplorerFilesAndFolders } from '../../../../../features/explorer/explorerService';
import { setSelectedItem } from '../../../../../features/explorer/explorerSlice';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ExplorerTable() {
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const { data, status } = useGetExplorerFilesAndFolders(folderId);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const { selectedItemId } = useSelector((state) => state.explorer);

  const files = useMemo(
    () => data?.data.files.map((i) => ({
      icon: i.file_format.key,
      name: i.display_name,
      created_at: i.created_at,
      size: i.size,
      item_type: 'file',
      id: i.id,
    })),
    [data],
  );

  const folders = useMemo(
    () => data?.data.folders.map((i) => ({
      icon: 'folder',
      name: i.name,
      created_at: i.created_at,
      size: '-',
      item_type: 'folder',
      id: i.id,
    })),
    [data],
  );

  const items = [...folders, ...files];

  useLayoutEffect(() => {
    const isIndeterminate = selectedItems.length > 0 && selectedItems.length < items?.length;

    if (
      selectedItems.length === items.length
      && +selectedItems.length + +items.length > 0
    ) {
      setChecked(selectedItems.length === items.length);
    }
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedItems]);

  function toggleAll() {
    setSelectedItems(checked || indeterminate ? [] : items.map((i) => i.id));
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleChangeInbox = (e, fileId) => {
    setSelectedItem(
      e.target.checked
        ? [...selectedItems, fileId]
        : selectedItems.filter((p) => p !== fileId),
    );
  };

  const handleClick = (e, fileId, index) => {
    if (selectedItems.length) {
      setSelectedItems([]);
    }

    if (!e.target.value) {
      dispatch(
        setSelectedItem({
          inboxFileId: fileId,
          inboxFileIndex: index,
        }),
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

  console.log(files, folders);

  return status === 'success' && !items.length ? (
    <FullScreenMessage
      title="text"
      description="text"
      ctaText="Upload"
      // ctaOnClick={() => dispatch(setShowUploadModal(true))}
      // showCta={selectedInboxTabKey === 'inbox'}
    />
  ) : (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="relative w-12 px-6 sm:w-16 sm:px-8"
                  >
                    <input
                      type="checkbox"
                      className="absolute cursor-pointer bg-gray-50 left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    size
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      selectedItems.includes(item.id) ? 'bg-gray-50' : null
                    } ${
                      selectedItemId === item.id ? 'bg-indigo-100' : null
                    } cursor-pointer`}
                    onClick={(e) => handleClick(e, item.id, index)}
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
                        onChange={(e) => handleChangeInbox(e, item.id)}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedItems.includes(item.id)
                          ? 'text-indigo-600'
                          : 'text-gray-900',
                      )}
                    >
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
