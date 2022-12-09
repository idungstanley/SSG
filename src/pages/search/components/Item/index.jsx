import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FileIcon, PathBadge } from '../../../../common';
import { OutputDateTime, OutputFileSize } from '../../../../app/helpers';
import { setSelectedItem } from '../../../../features/search/searchSlice';

function Item({ data }) {
  const dispatch = useDispatch();
  const { selectedItemId } = useSelector((state) => state.search);

  const {
    id, name, icon, createdAt, size, from,
  } = data;

  const handleClick = () => {
    dispatch(setSelectedItem({
      selectedItemType: icon === 'folder' ? 'folder' : 'file',
      selectedItemId: id,
      selectedItemPath: from,
    }));
  };

  return (
    <tr
      key={id}
      onClick={handleClick}
      className={`select-none cursor-pointer ${
        selectedItemId === id
          ? 'bg-gray-200'
          : 'hover:bg-gray-100 active:bg-gray-200'
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <FileIcon extensionKey={icon} size={10} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 select-text">
              {name}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-pre-wrap">
        <PathBadge expanded={!!size} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {from}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {OutputDateTime(createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {size ? OutputFileSize(size) : '-'}
      </td>
    </tr>
  );
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Item;
