import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Tippy from '@tippyjs/react';
import {
  DownloadIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
  InboxInIcon,
} from '@heroicons/react/outline';
import { setAssignInboxFileSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { setCurrentInboxFile } from '../../../../../../features/inbox/inboxSlice';
import {
  useGetInboxFile,
  fileInboxFileService,
} from '../../../../../../features/inbox/inboxService';
import { Button } from '../../../../../../components';
import { DownloadFile } from '../../../../../../app/helpers';
import Blacklist from './components/Blacklist';
import ArchiveInboxFile from '../../ArchiveInboxFile';

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

  const onDownload = async () => {
    DownloadFile(
      'inboxFile',
      inboxFile.id,
      inboxFile.inbox_file_source.display_name,
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

                    <div className="relative z-0 inline-flex mx-6 overflow-x-scroll max-w-[592px]">
                      <span className="inline-flex">
                        {/* <Button
                          buttonStyle="white"
                          label={
                            inboxFile.archived_at ? 'Unarchive' : 'Archive'
                          }
                          onClick={inboxFile.archived_at ? unarchive : archive}
                          icon={
                            inboxFile.archived_at ? (
                              <InboxIcon
                                className="mr-2.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArchiveIcon
                                className="mr-2.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            )
                          }
                          iconPosition="center"
                          disabled={false}
                          borderRight={false}
                          roundedRight={false}
                          ringOnFocus
                          loading={
                            archiveInboxFileMutation.status === 'loading'
                          }
                          width="w-36"
                        /> */}
                        <ArchiveInboxFile />
                        <Button
                          buttonStyle="white"
                          label="Assign"
                          onClick={() => dispatch(
                            setAssignInboxFileSlideOverVisibility(true),
                          )}
                          icon={(
                            <InboxInIcon
                              className="mr-2.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          )}
                          iconPosition="center"
                          disabled={false}
                          roundedLeft={false}
                          roundedRight={false}
                          borderRight={false}
                          ringOnFocus
                          width="w-36"
                        />
                        <Blacklist />
                        <Tippy
                          content={<span>Download</span>}
                          placement="bottom"
                        >
                          <div>
                            <Button
                              buttonStyle="white"
                              label="Download"
                              onClick={onDownload}
                              icon={(
                                <DownloadIcon
                                  className="mr-2.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}
                              iconPosition="center"
                              disabled={false}
                              borderLeft
                              roundedLeft={false}
                              ringOnFocus
                              width="w-36"
                            />
                          </div>
                        </Tippy>
                      </span>
                    </div>

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
          </section>
        </main>
      </div>
    </div>
  ) : null;
}

export default Toolbar;
