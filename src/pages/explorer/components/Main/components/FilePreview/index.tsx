import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { Spinner } from '../../../../../../common';
import { useGetExplorerFile, useGetFileBuffers } from '../../../../../../features/explorer/explorerService';
import FullScreenMessage from '../../../../../../components/CenterMessage/FullScreenMessage';

const contentType = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
  'image/jpeg',
  'application/msword',
  'text/plain'
];

export default function FilePreview() {
  const { selectedFileId } = useAppSelector((state) => state.explorer);

  const { data } = useGetExplorerFile(selectedFileId);

  const extension = data?.file_format.key;

  const { data: headers, status } = useGetFileBuffers(
    selectedFileId,
    extension === 'word'
      ? contentType[0]
      : extension === 'pdf'
      ? contentType[1]
      : extension === 'image'
      ? contentType[2]
      : contentType[4]
  );

  return (
    <div className={`w-full h-full p-2 pr-1 ${extension === 'word' ? '' : 'flex justify-center items-start'}`}>
      {/* checking selected file and loading */}
      {!selectedFileId ? (
        <FullScreenMessage title="No selected file." description="Select one." />
      ) : status === 'loading' ? (
        <div className="mx-auto w-6 mt-10">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : status === 'success' ? (
        extension === 'pdf' || extension === 'text' ? (
          <iframe width="100%" height="100%" src={headers} itemType="application/pdf" className="internal">
            <embed src={headers} type="application/pdf" />
          </iframe>
        ) : extension === 'image' ? (
          <img src={headers} className="max-h-204" alt="img" />
        ) : (
          <FullScreenMessage title="Unsupported file extension." description="Sorry :(" />
        )
      ) : (
        <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
      )}
    </div>
  );
}
