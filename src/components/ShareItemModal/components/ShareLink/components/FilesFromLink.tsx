import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAddOrRemoveItemToOrFromLink, useGetShareLink } from '../../../../../features/shared/sharedService';

interface FilesFromLinkProps {
  shareLinkId: string;
}

export default function FilesFromLink({ shareLinkId }: FilesFromLinkProps) {
  const { data } = useGetShareLink(shareLinkId);
  const selectedFiles = data?.shared_files;

  const { mutate: onRemove } = useAddOrRemoveItemToOrFromLink(shareLinkId);

  const handleRemove = (fileId: string) => {
    onRemove({
      type: 'file',
      linkId: shareLinkId,
      itemId: fileId,
      action: 'remove'
    });
  };

  return (
    <div className="flex gap-3 mt-3">
      {selectedFiles
        ? !selectedFiles.length
          ? null
          : selectedFiles.map((file) => (
              <span
                key={file.id}
                className="rounded-full flex py-1 px-2 items-center bg-indigo-100 text-sm font-medium text-indigo-700"
              >
                {file.file.display_name}
                <XMarkIcon
                  onClick={() => handleRemove(file.id)}
                  className="h-4 w-4 mt-0.5 ml-2 cursor-pointer"
                  aria-hidden="true"
                />
              </span>
            ))
        : null}
    </div>
  );
}
