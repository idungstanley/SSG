import React, { useMemo, useState } from 'react';
import { useGetExplorerFolders } from '../../../../features/explorer/explorerService';
import { PlusIcon } from '@heroicons/react/outline';
import { Input } from '../../../../components';
import FoldersList from './components/FoldersList';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../../components/CenterMessage/FullScreenMessage';

export default function Sidebar() {
  const { folderId } = useParams();

  const { data, status } = useGetExplorerFolders();

  const [selectedFolderId, setSelectedFolderId] = useState<null | string>(
    folderId || null
  );

  const folders = useMemo(
    () =>
      data?.map((i) => ({
        name: i.name,
        id: i.id,
        ancestors: i.ancestors,
        parentId: i.parent_id,
      })),
    [data]
  );

  return (
    <aside className="border-r p-2">
      {/* header */}
      <div className="border-b p-2 w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1>Explorer</h1>
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        {/* search  */}
        <div>
          <Input
            name="explorer-folder-search"
            onChange={() => ({})}
            placeholder="enter folder name"
          />
        </div>
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
