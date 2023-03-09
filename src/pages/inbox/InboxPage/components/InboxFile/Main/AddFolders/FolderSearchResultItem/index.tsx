import React, { useEffect, useState } from 'react';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useGetSearchFoldersForFilingResult } from '../../../../../../../../features/inbox/inboxService';
import { FileIcon } from '../../../../../../../../common';
import { StackListItemNarrow, Button } from '../../../../../../../../components';
import { useAppSelector } from '../../../../../../../../app/hooks';

interface FolderSearchResultItemProps {
  folderId: string;
  handleAddFolder: (i: string) => void;
  handleRemoveFolder: (i: string) => void;
}

function FolderSearchResultItem({ folderId, handleAddFolder, handleRemoveFolder }: FolderSearchResultItemProps) {
  const { folderIdsForFiling } = useAppSelector((state) => state.inbox);
  const { data: folder } = useGetSearchFoldersForFilingResult(folderId);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (folderIdsForFiling.find((currentFolderId) => currentFolderId === folderId)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [folderIdsForFiling]);

  return folder ? (
    <StackListItemNarrow
      key={folder.id}
      title={folder.name}
      description={folder.full_path}
      icon={<FileIcon size={10} extensionKey="folder" />}
      button={
        <Button
          buttonStyle="white"
          onClick={selected ? () => handleRemoveFolder(folderId) : () => handleAddFolder(folderId)}
          loading={false}
          label={selected ? 'Added' : 'Add'}
          icon={
            selected ? (
              <CheckCircleIcon className="mr-1 -ml-2 h-5 w-5 text-green-500" aria-hidden="true" />
            ) : (
              <PlusIcon className="mr-1 -ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            )
          }
          width="w-32"
        />
      }
    />
  ) : null;
}

export default FolderSearchResultItem;
