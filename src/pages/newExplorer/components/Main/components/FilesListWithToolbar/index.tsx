import React, { useMemo, useRef, useState } from 'react';
import Toolbar from './components/Toolbar';
import FilesList, { IStringifiedFile } from './components/FilesList';
import { useParams } from 'react-router-dom';
import { useGetExplorerFiles } from '../../../../../../features/explorer/explorerService';
import Search from '../../../Search';
import { useDebounce } from '../../../../../../hooks';
import Sorting, { sortItems } from './components/FilesList/components/Sorting';
import { useAppSelector } from '../../../../../../app/hooks';
import UploadModal from '../../../../../../components/UploadModal';
import { useDispatch } from 'react-redux';
import { setFileSelectWidth } from '../../../../../../features/explorer/explorerSlice';

export default function FilesListWithToolbar() {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const { data } = useGetExplorerFiles(folderId);
  const { selectedSortingId, fileSelectWidth } = useAppSelector(
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
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);
  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);
  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (sidebarRef !== undefined) {
        if (sidebarRef.current !== undefined && sidebarRef.current !== null)
          if (isResizing) {
            dispatch(
              setFileSelectWidth(
                mouseMoveEvent.clientX -
                  sidebarRef?.current?.getBoundingClientRect().left
              )
            );
          }
      }
    },
    [isResizing]
  );
  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);
  console.log(fileSelectWidth);

  return (
    <div
      className="h-full relative"
      ref={sidebarRef}
      style={{
        maxWidth: '600px',
        width: `${fileSelectWidth}px`,
        minWidth: '300px',
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <section className="border-r h-full overflow-y-auto overflow-x-hidden border-gray">
        <div className="flex flex-col w-full ">
          <UploadModal />
          {/* toolbar */}
          <Toolbar data={sortedItems} />

          <div className="flex gap-2 justify-between px-2">
            {/* Search */}
            {/* <Search query={query} setQuery={setQuery} type="file" /> */}

            {/* sorting */}
            {/* <Sorting /> */}
          </div>

          {/* file list */}
          <FilesList data={sortedItems} query={query} setQuery={setQuery} />
        </div>
        <div
          className="justify-self-end absolute shrink-0 grow-0 h-full cursor-all-scroll hover:bg-green-100 right-0 bottom-0 top-0"
          onMouseDown={startResizing}
          style={{ cursor: 'col-resize', width: '3px' }}
        ></div>
      </section>
    </div>
  );
}
