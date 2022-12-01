import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from '@heroicons/react/outline';
import { setCurrentInboxFile } from '../../../../../../features/inbox/inboxSlice';
import {
  useGetInboxFile,
  fileInboxFileService,
} from '../../../../../../features/inbox/inboxService';
import { Button } from '../../../../../../components';
import MinMenu from './components/minMenu';

function Toolbar() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Selectors
  const selectedInboxFileIndex = useSelector(
    (state) => state.inbox.selected_inbox_file_index,
  );
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
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
      queryClient.invalidateQueries(['inboxes']);
      queryClient.invalidateQueries(['inboxes_unfiled_count']);

      // TODO: Select next... if there is... (otherwise keep current selected)
    },
  });

  const handleNavigateToFile = (action) => {
    const relative = action === 'previous' ? -1 : 1;

    const navigateToFileIndex = selectedInboxFileIndex + relative;
    const navigateToFileId = null;

    if (navigateToFileId != null && navigateToFileId !== undefined) {
      dispatch(
        setCurrentInboxFile({
          inboxFileId: navigateToFileId,
          inboxFileIndex: navigateToFileIndex,
        }),
      );
    }
  };

  const fileDocument = () => {
    fileInboxFileMutation.mutate({
      inboxFileId: inboxFile.id,
      folderIds: folderIdsForFiling,
    });
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
                    <div className="relative z-0 inline-flex space-x-2">
                      <Button
                        buttonStyle="white"
                        onClick={() => handleNavigateToFile('previous')}
                        icon={(
                          <ArrowCircleLeftIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                        iconPosition="center"
                        disabled={false}
                        ringOnFocus
                      />

                      <Button
                        buttonStyle="white"
                        onClick={() => handleNavigateToFile('next')}
                        icon={(
                          <ArrowCircleRightIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                        iconPosition="center"
                        disabled={false}
                        ringOnFocus
                      />
                    </div>
                    <div className="flex gap-4 relative">
                      <MinMenu />
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
