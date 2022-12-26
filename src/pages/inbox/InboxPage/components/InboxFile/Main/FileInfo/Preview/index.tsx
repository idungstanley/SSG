import React, { useState, useEffect } from 'react';
import { useGetInboxFile } from '../../../../../../../../features/inbox/inboxService';
import { GetFileWithHeaders } from '../../../../../../../../app/helpers';
import FilePreview from '../../../../../../../../common/FilePreview';
import { Spinner } from '../../../../../../../../common';
import { useAppSelector } from '../../../../../../../../app/hooks';

function Preview() {
  const { selectedInboxFileId } = useAppSelector((state) => state.inbox);
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  const [fileData, setFileData] = useState<string | null>(null);

  useEffect(() => {
    const getFIle = async () => {
      if (selectedInboxFileId == null) {
        return setFileData(null);
      }

      const data = await GetFileWithHeaders('inboxFile', selectedInboxFileId);

      return setFileData(data);
    };
    getFIle();
  }, [selectedInboxFileId]);

  return inboxFile ? (
    <div className="h-full flex-1 select-none">
      <div className="relative h-full">
        <div className="flex h-full flex-col items-center">
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
