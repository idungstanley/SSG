import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectItem } from '../../../../../../features/search/searchSlice';
import { useGetSearchEverythingFolder } from '../../../../../../features/search/searchService';
import { OutputDateTime } from '../../../../../../app/helpers';
import { PathBadge, FileIcon } from '../../../../../../common';

function FolderListItem({ folderId }) {
  const dispatch = useDispatch();

  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const { data: folder } = useGetSearchEverythingFolder(folderId);

  const handleClick = () => {
    dispatch(selectItem({
      itemId: folder.id,
      itemType: 'folder',
    }));
  };

  return folder ? (
    <tr key={folder.id} onClick={handleClick} className={`select-none cursor-default ${selectedItemId === folderId ? 'bg-gray-200' : 'hover:bg-gray-100 active:bg-gray-200'}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <FileIcon extensionKey="folder" size={10} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 select-text">{folder.name}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-pre-wrap">
        <PathBadge folder={folder} expanded={false} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ OutputDateTime(folder.created_at) }</td>
    </tr>
  ) : null;
}

FolderListItem.propTypes = {
  folderId: PropTypes.string.isRequired,
};

export default FolderListItem;
