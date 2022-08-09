import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  selectItem,
} from '../../../../../features/search/searchSlice';

import {
  OutputDateTime,
} from '../../../../../app/helpers';

import { PathBadge, FileIcon } from '../../../../../common';

function FolderListItem({ folder }) {
  const dispatch = useDispatch();

  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const selectedItemType = useSelector((state) => state.search.selectedItemType);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selectedItemId === null || selectedItemType !== 'folder') {
      return setSelected(false);
    }

    if (selectedItemId === folder.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }

    return true;
  }, [selectedItemId]);

  const handleClick = () => {
    dispatch(selectItem({
      itemId: folder.id,
      itemType: 'folder',
    }));
  };

  return (
    <tr key={folder.id} onClick={handleClick} className={`select-none cursor-default ${selected === true ? 'bg-gray-200' : 'hover:bg-gray-100 active:bg-gray-200'}`}>
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
  );
}

FolderListItem.propTypes = {
  folder: PropTypes.objectOf(PropTypes.object).isRequired,
};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FolderListItem));
