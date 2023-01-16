import React from 'react';
import FileViewer from 'react-file-viewer';
import FullScreenMessage from '../components/CenterMessage/FullScreenMessage';

const docks = ['docx', 'doc', 'pdf'];
const images = ['jpg', 'png'];

interface FilePreviewProps {
  fileData : string;
  fileExtension: string;
}

function FilePreview({ fileData, fileExtension }: FilePreviewProps) {
  return (
    <div className="overflow-y-scroll">
      {images.includes(fileExtension) ? (
        <img className="rounded-lg" src={fileData} alt="img" />
      ) : docks.includes(fileExtension) ? (
        <FileViewer
          fileType={fileExtension}
          filePath={fileData}
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

export default FilePreview;
