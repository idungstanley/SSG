import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetInboxFile } from '../../../../../../../../features/inbox/inboxService';
import { GetFileWithHeaders } from '../../../../../../../../app/helpers';
import FilePreview from '../../../../../../../../common/FilePreview';
import { Spinner } from '../../../../../../../../common';

function Preview() {
  const selectedInboxFileId = useSelector((state) => state.inbox.selectedInboxFileId);
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  const [fileData, setFileData] = useState(null);

  useEffect(async () => {
    if (selectedInboxFileId == null) {
      return setFileData(null);
    }

    const data = await GetFileWithHeaders('inboxFile', selectedInboxFileId);
    return setFileData(data);
  }, [selectedInboxFileId]);

  return inboxFile ? (
    <div className="h-full flex-1 select-none">
      <div className="relative h-full">

        <div className="flex h-full flex-col">
          {fileData ? (
            <FilePreview
              fileData={fileData}
              fileExtension={inboxFile.inbox_file_source.file_format.extension}
            />
          ) : (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default Preview;
