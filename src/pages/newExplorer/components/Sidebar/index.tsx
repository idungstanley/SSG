import React, { useMemo, useState } from 'react';
import {
  useGetExplorerFolders,
  useGetSearchFolders,
} from '../../../../features/explorer/explorerService';
import { FolderAddIcon, XIcon } from '@heroicons/react/outline';
import { Input } from '../../../../components';
import FoldersList from './components/FoldersList';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../../components/CenterMessage/FullScreenMessage';
import { useAppDispatch } from '../../../../app/hooks';
import { setItemActionForSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import Dropdown from '../../../../components/Dropdown/index';
import { useDebounce } from '../../../../hooks';
import { IExplorerFolder } from '../../../../features/explorer/explorer.interfaces';

const stringifyFolders = (
  query: string,
  allFolders?: IExplorerFolder[],
  searchedFolders?: IExplorerFolder[]
) => {
  const data = query.length > 2 ? searchedFolders : allFolders;

  return useMemo(
    () =>
      data?.map((i) => ({
        name: i.name,
        id: i.id,
        ancestors: i.ancestors,
        parentId: i.parent_id,
      })),
    [data, searchedFolders]
  );
};

export default function Sidebar() {
  const { folderId } = useParams();
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { data: searchedFolders } = useGetSearchFolders(debouncedQuery);

  // ? results includes children for some reason, this value remove unsuitable folders
  const filteredSearchedFolders = searchedFolders?.filter((i) =>
    i.name.includes(query)
  );

  const { data: allFolders, status } = useGetExplorerFolders();

  const [selectedFolderId, setSelectedFolderId] = useState<null | string>(
    folderId || null
  );

  const folders = stringifyFolders(
    debouncedQuery,
    allFolders,
    filteredSearchedFolders
  );

  const configForDropdown = [
    {
      label: 'Folder',
      icon: <FolderAddIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: () =>
        dispatch(
          setItemActionForSideOver({
            action: 'create',
            id: folderId || '',
          })
        ),
    },
  ];

  return (
    <aside className="border-r p-2">
      {/* header */}
      <div className="p-2 w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1>Explorer</h1>
          <Dropdown config={configForDropdown} iconType="plus" />
        </div>
        {/* search  */}
        <Search query={query} setQuery={setQuery} />
      </div>

      {/* checking status */}
      {status === 'loading' ? (
        <div className="mx-auto w-6 mt-8 justify-center">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : status === 'error' ? (
        <FullScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
        />
      ) : null}

      {/* folder list */}
      {folders ? (
        folders.length ? (
          <FoldersList
            folders={folders}
            isSearchedResults={!!filteredSearchedFolders?.length}
            setSelectedFolderId={setSelectedFolderId}
            selectedFolderId={selectedFolderId}
          />
        ) : (
          <FullScreenMessage
            title="No folders yet."
            description="Create one."
          />
        )
      ) : null}
    </aside>
  );
}

interface SearchProps {
  query: string;
  setQuery: (i: string) => void;
}

function Search({ query, setQuery }: SearchProps) {
  return (
    <div className="relative">
      <Input
        name="explorer-folder-search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="enter folder name"
      />
      {query.length ? (
        <XIcon
          onClick={() => setQuery('')}
          className="h-5 w-5 cursor-pointer stroke-current text-gray-500 absolute right-2 top-2.5"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
