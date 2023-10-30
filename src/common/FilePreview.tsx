import React from 'react';
import FullScreenMessage from '../components/CenterMessage/FullScreenMessage';

const docks = ['pdf', 'txt'];
const images = ['jpg', 'png'];

interface FilePreviewProps {
  fileData: string;
  fileExtension: string;
}

function FilePreview({ fileData, fileExtension }: FilePreviewProps) {
  return (
    <div className="overflow-y-scroll">
      {images.includes(fileExtension) ? (
        <img className="rounded-lg" src={fileData} alt="img" />
      ) : docks.includes(fileExtension) ? (
        <iframe width="100%" height="100%" src={fileData} itemType="application/pdf" className="internal">
          <embed src={fileData} type="application/pdf" />
        </iframe>
      ) : (
        <FullScreenMessage title="Unsupported file extension." description="Sorry :(" />
      )}
    </div>
  );
}

export default FilePreview;
