import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Preview from '../components/Preview';
import Toolbar from '../components/header/Toolbar';
import { useSearch } from '../../../features/search/searchService';
import { useDebounce } from '../../../hooks';
import { Spinner } from '../../../common';
import Results from '../components/Results';
import { resetSelectedItem } from '../../../features/search/searchSlice';
import FullScreenMessage from '../../../components/CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../../app/hooks';

interface Idata {
  id: string
  created_at: string
  size: number | null
  icon: string
  display_name: string
  name: string
  file_format: {
    extension: string
  }
  inbox_file_source: {
    size: number | null
    file_format: {
      extension: string
    }
    display_name: string
  }
  ancestor_path: string
  from: string
  updated_at: string
}

interface allResultData {
  id: string
  createdAt:string
  size: number | null
  icon:string
  name: string
  path: string | null
  from: string
  updatedAt: string
}

interface dataProps {
  files: Idata[];
  folders: Idata[];
  inbox: Idata[];
  explorerStatus: string;
  inboxStatus: string;
}

export default function SearchPage() {
  const dispatch = useDispatch();
  const { selectedItemId, searchQuery, searchFileContents } = useAppSelector(
    (state) => state.search
  );

  const debouncedValue = useDebounce(searchQuery, 300);

  const { files, folders, inbox, explorerStatus, inboxStatus }: dataProps =
    useSearch(searchQuery, searchFileContents, debouncedValue === searchQuery);

  useEffect(() => {
    if (selectedItemId) {
      dispatch(resetSelectedItem());
    }
  }, [debouncedValue]);

  const allResults: allResultData[] = [];
  files?.map((i) => allResults.push({
    id: i.id,
    createdAt: i.created_at,
    size: i.size,
    icon: i.file_format.extension,
    name: i.display_name,
    path: i.ancestor_path,
    from: 'Explorer',
    updatedAt: i.updated_at,
  }));

  folders?.map((i) =>
    allResults.push({
      id: i.id,
      createdAt: i.created_at,
      size: null,
      icon: 'folder',
      name: i.name,
      path: i.ancestor_path,
      from: 'Explorer',
      updatedAt: i.updated_at,
    })
  );

  inbox?.map((i) =>
    allResults.push({
      id: i.id,
      createdAt: i.created_at,
      size: i.inbox_file_source.size,
      icon: i.inbox_file_source.file_format.extension,
      name: i.inbox_file_source.display_name,
      path: null,
      from: 'Inbox',
      updatedAt: i.updated_at,
    })
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar />

      <div className="flex flex-row h-full overflow-hidden bg-gray-50">
        <div className="flex-1 overflow-y-scroll bg-gray-50">
          {searchQuery.length < 3 ? (
            <FullScreenMessage
              title="Enter a search query"
              description="Enter at least 2 characters to start searching"
            />
          ) : // checking error and loading
          explorerStatus === 'error' || inboxStatus === 'error' ? (
            <FullScreenMessage
              title="Oops, an error occurred :("
              description="Please try again later."
            />
          ) : explorerStatus === 'loading' || inboxStatus === 'loading' ? (
            <div className="justify-center w-6 mx-auto mt-10">
              <Spinner size={22} color="#0F70B7" />
            </div>
          ) : explorerStatus === 'success' && inboxStatus === 'success' ? (
            searchQuery.length < 2 ? (
              <FullScreenMessage
                title="Enter a search query"
                description="Enter at least 2 characters to start searching"
              />
            ) : !allResults.length ? (
              <FullScreenMessage
                title="Тo matches found :("
                description="Please, try again"
              />
            ) : (
              <div>
                <Results data={allResults} />

                {/* Details sidebar (separate files and folders) */}
                {selectedItemId ? <Preview /> : null}
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
