import React from 'react';
import FileViewer from 'react-file-viewer';
import PropTypes from 'prop-types';
import FullScreenMessage from '../pages/shared/components/FullScreenMessage';

const docks = ['docx', 'doc', 'pdf'];
const images = ['jpg', 'png'];

function FilePreview({ fileData, fileExtension }) {
  const onError = (e) => {
    // eslint-disable-next-line no-console
    console.error('error in file viewer:', e);
  };

  return (
    <div className="react-doc-viewer-wrapper h-full w-full overflow-y-scroll flex-1">
      {images.includes(fileExtension) ? (
        <img src={fileData} alt="img" />
      ) : docks.includes(fileExtension) ? (
        <FileViewer
          fileType={fileExtension}
          filePath={fileData}
          onError={onError}
        />
      ) : (
        <FullScreenMessage
          title="Unsupported file extension."
          description="Sorry :("
        />
      )}
    </div>
  );
}

FilePreview.propTypes = {
  fileData: PropTypes.string.isRequired,
  fileExtension: PropTypes.string.isRequired,
};

export default FilePreview;
