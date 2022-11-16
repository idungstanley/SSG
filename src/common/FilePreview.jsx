import React from 'react';
import PropTypes from 'prop-types';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

function FilePreview({ fileData, fileExtension }) {
  const docs = [
    {
      fileType: fileExtension,
      fileData,
    },
  ];
  return (
    <div className="react-doc-viewer-wrapper h-full w-full overflow-y-scroll flex-1">
      {fileExtension === 'bin' ? (
        <p className="text-center mt-2 text-red-500">Unsupported file extension</p>
      ) : (
        <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
      )}
    </div>
  );
}

FilePreview.propTypes = {
  fileData: PropTypes.string.isRequired,
  fileExtension: PropTypes.string.isRequired,
};

export default FilePreview;
