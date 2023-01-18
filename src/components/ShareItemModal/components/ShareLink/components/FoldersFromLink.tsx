import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import {
  useAddOrRemoveItemToOrFromLink,
  useGetShareLink,
} from '../../../../../features/shared/sharedService';

interface FoldersFromLinkProps {
  shareLinkId: string;
}

export default function FoldersFromLink({ shareLinkId }: FoldersFromLinkProps) {
  const { data } = useGetShareLink(shareLinkId);
  const selectedFolders = data?.shared_folders;

  const { mutate: onRemove } = useAddOrRemoveItemToOrFromLink(shareLinkId);

  const handleRemove = (folderId: string) => {
    onRemove({
      type: 'folder',
      linkId: shareLinkId,
      itemId: folderId,
      action: 'remove',
    });
  };

  return (
    <div className="flex gap-3 mt-3">
      {selectedFolders
        ? !selectedFolders.length
          ? null
          : selectedFolders.map((folder) => (
              <div
                key={folder.id}
                className="flex items-center gap-2 border rounded-lg p-2 px-3"
              >
                <p>{folder.folder.name}</p>
                <TrashIcon
                  onClick={() => handleRemove(folder.id)}
                  className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
                />
              </div>
            ))
        : null}
    </div>
  );
}
