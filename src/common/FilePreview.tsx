import React from 'react';
import FullScreenMessage from '../components/CenterMessage/FullScreenMessage';
import DocViewer from '@cyntler/react-doc-viewer';

const supportedExtensions = ['jpg', 'png', 'pdf'];

interface FilePreviewProps {
  fileData: string;
  fileExtension: string;
}

function FilePreview({ fileData, fileExtension }: FilePreviewProps) {
  return (
    <div className="overflow-y-scroll">
      {supportedExtensions.includes(fileExtension) ? (
        <DocViewer documents={[{ uri: fileData }]} />
      ) : (
        <FullScreenMessage title="Unsupported file extension." description="Sorry :(" />
      )}
    </div>
  );
}

export default FilePreview;
