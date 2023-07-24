import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAddOrRemoveItemToOrFromLink, useGetShareLink } from '../../../../../features/shared/sharedService';

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
      action: 'remove'
    });
  };

  return (
    <div className="flex gap-3 mt-3">
      {selectedFolders
        ? !selectedFolders.length
          ? null
          : selectedFolders.map((folder) => (
              <span
                key={folder.id}
                className="rounded-full flex py-1 px-2 items-center bg-indigo-100 text-sm font-medium text-indigo-700"
              >
                {folder.folder.name}
                <XMarkIcon
                  onClick={() => handleRemove(folder.id)}
                  className="h-4 w-4 mt-0.5 ml-2 cursor-pointer"
                  aria-hidden="true"
                />
              </span>
            ))
        : null}
    </div>
  );
}
