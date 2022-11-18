import React from 'react';
import PropTypes from 'prop-types';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import FullScreenMessage from '../pages/shared/components/FullScreenMessage';

const docks = ['docx', 'doc'];
const images = ['jpg', 'png'];

function FilePreview({ fileData, fileExtension }) {
  const docs = [
    {
      fileType: fileExtension,
      fileData,
    },
  ];

  return (
    <div className="react-doc-viewer-wrapper h-full w-full overflow-y-scroll flex-1">
      {docks.includes(fileExtension) ? (
        <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
      ) : images.includes(fileExtension) ? (
        <img src={fileData} alt="img" />
      ) : (
        <FullScreenMessage title="Unsupported file extension." description="Sorry :(" />
      )}
    </div>
  );
}

FilePreview.propTypes = {
  fileData: PropTypes.string.isRequired,
  fileExtension: PropTypes.string.isRequired,
};

export default FilePreview;
