import { useMemo, useState } from 'react';
import Toolbar from './components/Toolbar';
import FilesList, { IStringifiedFile } from './components/FilesList';
import { useParams } from 'react-router-dom';
import { useGetExplorerFiles } from '../../../../../../features/explorer/explorerService';
import { useDebounce } from '../../../../../../hooks';
import { sortItems } from './components/FilesList/components/Sorting';
import { useAppSelector } from '../../../../../../app/hooks';
import UploadFileModal from '../../../../../../components/UploadFileModal';
import { InvalidateQueryFilters } from '@tanstack/react-query';

export default function FilesListWithToolbar() {
  const { folderId } = useParams();

  const { selectedSortingId, selectedFolderId } = useAppSelector((state) => state.explorer);

  const [query, setQuery] = useState('');

  const { data } = useGetExplorerFiles(folderId);

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
          id: i.id
        })),
      [data]
    ) || [];

  const searchedItems = useMemo(
    () => (debouncedQuery.length ? items.filter((i) => i.name.includes(debouncedQuery)) : items),
    [debouncedQuery, items]
  );

  const sortedItems = useMemo(
    () => [...sortItems(searchedItems, selectedSortingId)],
    [searchedItems, selectedSortingId]
  );

  return (
    <div className="relative w-full h-full">
      <section className="h-full border-r">
        <div className="flex flex-col w-full h-full">
          {/* <UploadModal /> */}
          <UploadFileModal
            endpoint={`files/${folderId || ''}`}
            invalidateQuery={['explorer-files', selectedFolderId || 'root'] as InvalidateQueryFilters<unknown>}
          />
          {/* toolbar */}
          <Toolbar data={sortedItems} query={query} setQuery={setQuery} />

          {/* file list */}
          <FilesList data={sortedItems} />
        </div>
      </section>
    </div>
  );
}
