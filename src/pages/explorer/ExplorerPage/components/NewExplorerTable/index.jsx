import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetExplorerFilesAndFolders } from '../../../../../features/explorer/explorerService';
import {
  resetSelectedFilesAndFolders,
  resetSelectedItem,
  setSelectedFiles,
  setSelectedFolders,
  setSelectedItem,
} from '../../../../../features/explorer/explorerSlice';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';
import { sortItems } from '../ExplorerTable';

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
  // const [selectedItems, setSelectedItems] = useState([]);
  const {
    selectedFileIds,
    selectedSorting,
    selectedFolderIds,
    selectedItemId,
  } = useSelector((state) => state.explorer);
  const selectedItemsPool = [...selectedFileIds, ...selectedFolderIds, selectedItemId];
  const [processedData, setProcessedData] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate = selectedItemsPool.length > 0 && selectedItemsPool.length < processedData?.length;

    if (
      selectedItemsPool.length === processedData.length
      && +selectedItemsPool.length + +processedData.length > 0
    ) {
      setChecked(selectedItemsPool.length === processedData.length);
    }
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedItemsPool]);

  useEffect(() => {
    dispatch(resetSelectedItem());

    if (status !== 'success') {
      return false;
    }

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

    setProcessedData([
      ...sortItems(folders, selectedSorting.id),
      ...sortItems(files, selectedSorting.id),
    ]);

    return true;
  }, [data, selectedSorting]);

  useEffect(() => {
    // Set selected item for preview

    if (selectedFileIds.length === 1 && selectedFolderIds.length === 0) {
      dispatch(
        setSelectedItem({
          selectedItemId: selectedFileIds[0],
          selectedItemType: 'file',
        }),
      );
    } else if (selectedFolderIds.length === 1 && selectedFileIds.length === 0) {
      dispatch(
        setSelectedItem({
          selectedItemId: selectedFolderIds[0],
          selectedItemType: 'folder',
        }),
      );
    } else {
      // Multiple items selected
      dispatch(resetSelectedItem());
    }
  }, [selectedFileIds, selectedFolderIds]);

  function toggleAll() {
    const files = processedData.filter((i) => i.item_type === 'file');
    const folders = processedData.filter((i) => i.item_type === 'folder');

    dispatch(checked || indeterminate ? resetSelectedFilesAndFolders() : setSelectedFiles(files));
    dispatch(checked || !indeterminate ? setSelectedFolders(folders) : null);

    // setSelectedItems(checked || indeterminate ? [] : processedData.map((i) => i.id));

    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleChangeItem = (e, itemId, type) => {
    setSelectedItem(
      e.target.checked
        ? [...selectedItemsPool, itemId]
        : selectedItemsPool.filter((p) => p !== itemId),
    );

    dispatch(
      type === 'file'
        ? setSelectedFiles([...selectedFileIds, itemId])
        : setSelectedFolders([...selectedFolderIds, itemId]),
    );
  };

  const handleClick = (e, fileId, type) => {
    if (selectedItemsPool.length) {
      dispatch(resetSelectedFilesAndFolders());
    }

    // if (selectedItems.length) {
    //   setSelectedItems([]);
    // }

    if (!e.target.value) {
      dispatch(
        setSelectedItem({
          selectedItemId: fileId,
          selectedItemType: type,
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

  return status === 'success' && !processedData.length ? (
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
                {processedData.map((item) => (
                  <tr
                    key={item.id}
                    className={`${
                      // selectedItemId === item.id ? 'bg-indigo-100' : null
                      selectedItemsPool.includes(
                        item.id,
                      )
                        ? 'bg-indigo-100'
                        : null
                    } cursor-pointer`}
                    onClick={(e) => handleClick(e, item.id, item.item_type)}
                  >
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      {selectedItemsPool.includes(item.id) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
                        value={item.id}
                        checked={selectedItemsPool.includes(item.id)}
                        onChange={(e) => handleChangeItem(e, item.id, item.item_type)}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedItemsPool.includes(item.id)
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
