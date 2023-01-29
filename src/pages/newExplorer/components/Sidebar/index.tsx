import React, {
  useEffect,
  useMemo,
  //  useState
} from 'react';
import {
  useGetExplorerFolders,
  // useGetSearchFolders,
} from '../../../../features/explorer/explorerService';
// import { FolderPlusIcon } from '@heroicons/react/24/outline';
import FoldersList from './components/FoldersList';
// import Search from '../Search';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../../components/CenterMessage/FullScreenMessage';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
// import { setItemActionForSideOver } from '../../../../features/general/slideOver/slideOverSlice';
// import Dropdown from '../../../../components/Dropdown/index';
// import { useDebounce } from '../../../../hooks';
import { IExplorerFolder } from '../../../../features/explorer/explorer.interfaces';
import {
  // setQuery,
  setSelectedFileId,
  setSelectedFolderId,
} from '../../../../features/explorer/explorerSlice';

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

export default function ExtendedBar() {
  const { folderId } = useParams();
  const dispatch = useAppDispatch();

  const { selectedFileId } = useAppSelector((state) => state.explorer);

  // const [query, setQuery] = useState('');
  // const debouncedQuery = useDebounce(query, 500);
  // const { data: searchedFolders } = useGetSearchFolders(debouncedQuery);

  // ? results includes children for some reason, this value remove unsuitable folders
  // const filteredSearchedFolders = searchedFolders?.filter((i) =>
  //   i.name.includes(query)
  // );

  const { data: allFolders, status } = useGetExplorerFolders();

  useEffect(() => {
    dispatch(setSelectedFolderId(folderId || null));
    if (selectedFileId) {
      dispatch(setSelectedFileId(null));
    }
  }, [folderId]);

  // const folders = stringifyFolders(
  //   debouncedQuery,
  //   allFolders,
  //   filteredSearchedFolders
  // );
  const folders = stringifyFolders('', allFolders, []);

  // const configForDropdown = [
  //   {
  //     label: 'Folder',
  //     icon: <FolderPlusIcon className="h-5 w-5" aria-hidden="true" />,
  //     onClick: () =>
  //       dispatch(
  //         setItemActionForSideOver({
  //           action: 'create',
  //           id: folderId || '',
  //         })
  //       ),
  //   },
  // ];

  return (
    <aside className="border-r">
      {/* header */}
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
            // isSearchedResults={!!filteredSearchedFolders?.length}
            isSearchedResults={false}
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
