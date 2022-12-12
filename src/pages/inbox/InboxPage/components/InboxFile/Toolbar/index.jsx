import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import {
  useGetInboxFile,
  fileInboxFileService,
} from '../../../../../../features/inbox/inboxService';
import { Button } from '../../../../../../components';
import MinMenu from './components/minMenu';
import NavigationBetweenFiles from './components/navigationBetweenFiles';
import DeleteFile from './components/deleteFile';
import { setCurrentInboxFile } from '../../../../../../features/inbox/inboxSlice';

function Toolbar() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { selectedInboxFileId } = useSelector((state) => state.inbox);

  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  const folderIdsForFiling = useSelector(
    (state) => state.inbox.folderIdsForFiling,
  );

  const fileInboxFileMutation = useMutation(fileInboxFileService, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['inbox_file', data.data.inbox_file.id],
        data.data.inbox_file,
      );
      queryClient.invalidateQueries([
        'inbox_files',
        data.data.inbox_file.inbox_id,
        { isArchived: 0 },
      ]);
      queryClient.invalidateQueries(['inboxes_unfiled_count']);
    },
  });

  const fileDocument = async () => {
    await fileInboxFileMutation.mutateAsync({
      inboxFileId: inboxFile.id,
      folderIds: folderIdsForFiling,
    });
    dispatch(
      setCurrentInboxFile({
        selectedInboxFileId: null,
        selectedInboxFileIndex: 1,
      }),
    );
  };

  return inboxFile ? (
    <div className="flex flex-col">
      {/* Bottom section */}
      <div className="min-h-0 flex-1 flex">
        {/* Main area */}
        <main className="min-w-0 flex-1 border-gray-200 xl:flex">
          <section
            aria-labelledby="message-heading"
            className="min-w-0 flex-1 h-full flex flex-col xl:order-last"
          >
            {/* Top section */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200">
              {/* Toolbar */}
              <div className="h-16 flex flex-col justify-center">
                <div className="px-4 sm:px-6">
                  <div className="py-3 flex justify-between">
                    {/* Left buttons */}
                    <NavigationBetweenFiles />
                    <div className="flex gap-4 relative">
                      <MinMenu />
                      <DeleteFile />
                      <Button
                        buttonStyle="primary"
                        onClick={fileDocument}
                        loading={fileInboxFileMutation.status === 'loading'}
                        label="File document"
                        icon={(
                          <ArrowCircleRightIcon
                            className="ml-2.5 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        iconPosition="right"
                        width="w-48"
                        disabled={inboxFile.status === 'filed'}
                        ringOnFocus
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  ) : null;
}

export default Toolbar;
