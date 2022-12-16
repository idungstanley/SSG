import React from 'react';
import { useSelector } from 'react-redux';
import { OutputFileSize } from '../../../app/helpers';
import { FileIcon, Spinner } from '../../../common';
import { useGetInboxFiles } from '../../../features/inbox/inboxService';
import OneThirdScreenMessage from '../../CenterMessage/OneThirdScreenMessage';

export default function InboxIndex() {
  const { currentItemId } = useSelector((state) => state.workspace);
  const { status, data: dt } = useGetInboxFiles({
    inboxId: currentItemId,
    isArchived: 0,
  });

  const data = dt?.pages.flatMap((page) => page.data.inbox_files);

  if (status === 'error') {
    return (
      <OneThirdScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-5 justify-center">
        <Spinner size={22} color="#0F70B7" />
      </div>
    );
  }

  return status === 'success' ? (
    !data.length ? (
      <div className="my-12">
        <OneThirdScreenMessage title="No files yet" description="Add one." />
      </div>
    ) : (
      <ul className="divide-y divide-gray-200">
        {data.map((item) => (
          <li key={item.id} className="flex py-4">
            <FileIcon
              extensionKey={item.inbox_file_source.file_format.extension}
              size={8}
            />
            <div className="ml-3">
              <p className="text-sm w-44 truncate font-medium text-gray-900">
                {item.inbox_file_source.display_name}
              </p>
              <p className="text-sm text-gray-500">
                {OutputFileSize(item.inbox_file_source.size)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )
  ) : null;
}
