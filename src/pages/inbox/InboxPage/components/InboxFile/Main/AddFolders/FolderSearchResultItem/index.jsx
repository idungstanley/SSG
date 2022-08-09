import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { useGetSearchFoldersForFilingResult } from '../../../../../../../../features/inbox/inboxService';
import { FileIcon } from '../../../../../../../../common';
import { StackListItemNarrow, Button } from '../../../../../../../../components';

function FolderSearchResultItem({
  folderId,
  handleAddFolder,
  handleRemoveFolder,
}) {
  const folderIdsForFiling = useSelector((state) => state.inbox.folderIdsForFiling);
  const folder = useGetSearchFoldersForFilingResult(folderId);

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
      button={(
        <Button
          buttonStyle="white"
          onClick={selected ? () => handleRemoveFolder(folderId) : () => handleAddFolder(folderId)}
          loading={false}
          label={selected ? 'Added' : 'Add'}
          icon={selected ? <CheckCircleIcon className="mr-1 -ml-2 h-5 w-5 text-green-500" aria-hidden="true" /> : <PlusIcon className="mr-1 -ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />}
          width="w-32"
        />
      )}
    />
  ) : null;
}

FolderSearchResultItem.propTypes = {
  folderId: PropTypes.string.isRequired,
  handleAddFolder: PropTypes.func.isRequired,
  handleRemoveFolder: PropTypes.func.isRequired,
};

export default FolderSearchResultItem;
