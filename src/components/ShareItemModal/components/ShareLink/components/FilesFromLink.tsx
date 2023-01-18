import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import {
  useAddOrRemoveItemToOrFromLink,
  useGetShareLink,
} from '../../../../../features/shared/sharedService';

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
      action: 'remove',
    });
  };

  return (
    <div className="flex gap-3 mt-3">
      {selectedFiles
        ? !selectedFiles.length
          ? null
          : selectedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 border rounded-lg p-2 px-3"
              >
                <p>{file.file.display_name}</p>
                <TrashIcon
                  onClick={() => handleRemove(file.id)}
                  className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
                />
              </div>
            ))
        : null}
    </div>
  );
}
