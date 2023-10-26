import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { OutputFileSize } from '../../../app/helpers';
import { useAppSelector } from '../../../app/hooks';
import { FileIcon, Spinner } from '../../../common';
import { setShowUploadModal } from '../../../features/general/uploadFile/uploadFileSlice';
import { useGetInboxFiles } from '../../../features/inbox/inboxService';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { IInboxFile } from '../../../features/inbox/inbox.interfaces';

export default function InboxIndex() {
  const dispatch = useDispatch();
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { status, data: dt } = useGetInboxFiles({
    inboxId: currentItemId,
    isArchived: false
  });

  const data = useMemo(() => dt?.pages.flatMap((page) => page.data.inbox_files) as IInboxFile[], [dt]);

  if (status === 'error') {
    return (
      <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." showOneThirdMessage />
    );
  }

  if (status === 'loading') {
    return (
      <div className="justify-center w-6 mx-auto mt-5">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  return status === 'success' ? (
    !data?.length ? (
      <div className="my-12">
        <FullScreenMessage
          title="No files yet"
          description="Upload one"
          ctaText="Upload"
          ctaOnClick={() => dispatch(setShowUploadModal(true))}
          showCta
          showOneThirdMessage
        />
      </div>
    ) : (
      <ul className="divide-y divide-gray-200">
        {data.map((item) => (
          <li key={item.id} className="flex py-4">
            <FileIcon extensionKey={item.inbox_file_source.file_format.extension} size={8} />
            <div className="ml-3">
              <p className="w-40 text-sm font-medium text-gray-900 truncate">{item.inbox_file_source.display_name}</p>
              <p className="text-sm text-gray-500">{OutputFileSize(item.inbox_file_source.size)}</p>
            </div>
            <MenuDropdown />
          </li>
        ))}
      </ul>
    )
  ) : null;
}
