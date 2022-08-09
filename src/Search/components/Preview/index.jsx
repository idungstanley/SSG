import React from 'react';
import { connect, useSelector } from 'react-redux';
import FolderPreview from './FolderPreview';
import FilePreview from './FilePreview';

function Preview() {
  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const selectedItemType = useSelector((state) => state.search.selectedItemType);

  return (
    <>
      {selectedItemType === 'folder' && selectedItemId !== null && (
        <FolderPreview />
      )}
      {selectedItemType === 'file' && selectedItemId !== null && (
        <FilePreview />
      )}
    </>
  );
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
