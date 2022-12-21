import React from 'react';
import FileViewer from 'react-file-viewer';
import PropTypes from 'prop-types';
import FullScreenMessage from '../components/CenterMessage/FullScreenMessage';

const docks = ['docx', 'doc', 'pdf'];
const images = ['jpg', 'png'];

function FilePreview({ fileData, fileExtension }) {
  const onError = (e) => {
    // eslint-disable-next-line no-console
    console.error('error in file viewer:', e);
  };

  return (
    <div className="overflow-y-scroll">
      {images.includes(fileExtension) ? (
        <img className="rounded-lg" src={fileData} alt="img" />
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
