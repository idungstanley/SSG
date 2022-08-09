import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  selectItem,
} from '../../../../../features/search/searchSlice';

import {
  OutputDateTime,
  OutputFileSize,
} from '../../../../../app/helpers';

import { FileIcon, PathBadge } from '../../../../../common';

function FileListItem({ file }) {
  const dispatch = useDispatch();

  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const selectedItemType = useSelector((state) => state.search.selectedItemType);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selectedItemId === null || selectedItemType !== 'file') {
      return setSelected(false);
    }

    if (selectedItemId === file.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }

    return true;
  }, [selectedItemId]);

  const handleClick = () => {
    dispatch(selectItem({
      itemId: file.id,
      itemType: 'file',
    }));
  };

  return (
    <tr key={file.id} onClick={handleClick} className={`select-none cursor-default ${selected === true ? 'bg-gray-200' : 'hover:bg-gray-100 active:bg-gray-200'}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <FileIcon extensionKey={file.file_format.key} size={10} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 select-text">{file.display_name}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-pre-wrap">
        <PathBadge folder={file.folder} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ OutputDateTime(file.created_at) }</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ OutputFileSize(file.size) }</td>

    </tr>
  );
}

FileListItem.propTypes = {
  file: PropTypes.objectOf(PropTypes.object).isRequired,
};

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FileListItem));
