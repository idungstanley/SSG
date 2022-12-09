/* eslint-disable react/jsx-no-bind */
import React, {
  useEffect,
  useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../../../../common';
import { useGetExplorerFilesAndFolders } from '../../../../../features/explorer/explorerService';
import {
  setSelectedFiles,
  setSelectedFolders,
  resetSelectedFilesAndFolders,
  setSelectedItem,
  setShowUploadModal,
} from '../../../../../features/explorer/explorerSlice';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';
import { sortItems } from '../Toolbar/components/SortingItems';
import Table from './Table';
import Grid from './Grid';

export default function ExplorerTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const {
    selectedFileIds,
    selectedFolderIds,
    selectedSortingId,
    selectedViewId,
  } = useSelector((state) => state.explorer);
  const selectedItems = [...selectedFileIds, ...selectedFolderIds];

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

  useEffect(() => {
    if (selectedItems.length) {
      dispatch(resetSelectedFilesAndFolders());
    }
  }, []);

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

    if (!e.target.value && selectedFolderIds.includes(itemId)) {
      navigate(`${itemId}`, { replace: false });
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
        selectedSortingId,
      ),
      ...sortItems(
        items?.filter((i) => i.item_type === 'file'),
        selectedSortingId,
      ),
    ],
    [data, selectedSortingId],
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
            {selectedViewId === 1 ? (
              <Table
                checkbox={checkbox}
                checked={checked}
                toggleAll={toggleAll}
                sortedItems={sortedItems}
                selectedItems={selectedItems}
                handleChangeItem={handleChangeItem}
                handleClick={handleClick}
              />
            ) : (
              <Grid
                checkbox={checkbox}
                checked={checked}
                toggleAll={toggleAll}
                sortedItems={sortedItems}
                selectedItems={selectedItems}
                handleChangeItem={handleChangeItem}
                handleClick={handleClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
