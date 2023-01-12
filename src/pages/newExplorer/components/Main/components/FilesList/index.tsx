import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { Spinner } from '../../../../../../common';
import FullScreenMessage from '../../../../../../components/CenterMessage/FullScreenMessage';
import { useGetExplorerFiles } from '../../../../../../features/explorer/explorerService';
import {
  setSelectedFileId,
  setSelectedFiles,
} from '../../../../../../features/explorer/explorerSlice';
import { setShowUploadModal } from '../../../../../../features/general/uploadFile/uploadFileSlice';
import { useDebounce } from '../../../../../../hooks';
import Search from '../../../Search';
import Table from './components/Table';
import Sorting, { sortItems } from './components/Sorting';

export interface IStringifiedFile {
  name: string;
  created_at: string;
  updated_at: string;
  size: number;
  fileType: string;
  id: string;
}

export default function FilesList() {
  const { folderId } = useParams();
  const dispatch = useAppDispatch();

  const { data, status } = useGetExplorerFiles(folderId);

  const checkbox = useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const { selectedFileIds, selectedSortingId } = useAppSelector(
    (state) => state.explorer
  );

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const items: IStringifiedFile[] =
    useMemo(
      () =>
        data?.map((i) => ({
          name: i.display_name,
          created_at: i.created_at,
          updated_at: i.created_at,
          size: i.size,
          fileType: i.file_format.extension,
          id: i.id,
        })),
      [data]
    ) || [];

  const searchedItems = useMemo(
    () =>
      debouncedQuery.length
        ? items.filter((i) => i.name.includes(debouncedQuery))
        : items,
    [debouncedQuery, items]
  );

  const sortedItems = useMemo(
    () => [...sortItems(searchedItems, selectedSortingId)],
    [searchedItems, selectedSortingId]
  );

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedFileIds.length > 0 &&
      selectedFileIds.length < sortedItems?.length;

    if (
      selectedFileIds.length === sortedItems.length &&
      +selectedFileIds.length + +sortedItems.length > 0
    ) {
      setChecked(selectedFileIds.length === sortedItems.length);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedFileIds]);

  useEffect(() => {
    if (selectedFileIds.length) {
      dispatch(setSelectedFiles([]));
      setChecked(false);
    }
  }, [folderId]);

  function toggleAll() {
    if (checked || indeterminate) {
      dispatch(setSelectedFiles([]));
    } else {
      dispatch(setSelectedFiles([...sortedItems.map((i) => i.id)]));
    }

    dispatch(setSelectedFileId(null));

    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="flex flex-col w-full overflow-x-scroll gap-2 p-2">
      <div className="flex gap-2 justify-between">
        {/* Search */}
        <Search query={query} setQuery={setQuery} type="file" />

        {/* sorting */}
        <Sorting />
      </div>

      {/* file table with selection */}
      {/* status checking */}
      {status === 'loading' ? (
        <div className="mx-auto w-6 mt-10 justify-center">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : status === 'error' ? (
        <FullScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
        />
      ) : null}

      {/* table */}
      {status == 'success' ? (
        !sortedItems.length ? (
          <FullScreenMessage
            title="No files in your folder"
            description="Upload one to start working"
            ctaText="Upload"
            ctaOnClick={() => dispatch(setShowUploadModal(true))}
            showCta
          />
        ) : (
          <div className="flex flex-col h-full w-full">
            <Table
              checkbox={checkbox}
              checked={checked}
              toggleAll={toggleAll}
              items={sortedItems}
            />
          </div>
        )
      ) : null}
    </div>
  );
}
