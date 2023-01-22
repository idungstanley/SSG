import React, { useMemo, useState } from 'react';
import Toolbar from './components/Toolbar';
import FilesList, { IStringifiedFile } from './components/FilesList';
import { useParams } from 'react-router-dom';
import { useGetExplorerFiles } from '../../../../../../features/explorer/explorerService';
import Search from '../../../Search';
import { useDebounce } from '../../../../../../hooks';
import Sorting, { sortItems } from './components/FilesList/components/Sorting';
import { useAppSelector } from '../../../../../../app/hooks';
import UploadModal from '../../../../../../components/UploadModal';

export default function FilesListWithToolbar() {
  const { folderId } = useParams();
  const { data } = useGetExplorerFiles(folderId);
  const { selectedSortingId } = useAppSelector((state) => state.explorer);

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

  return (
    <div className="flex flex-col gap-2 h-full border-r">
      <UploadModal />
      {/* toolbar */}
      <Toolbar data={sortedItems} />

      <div className="flex gap-2 justify-between px-2">
        {/* Search */}
        <Search query={query} setQuery={setQuery} type="file" />

        {/* sorting */}
        <Sorting />
      </div>

      {/* file list */}
      <FilesList data={sortedItems} />
    </div>
  );
}
