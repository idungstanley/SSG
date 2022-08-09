import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Tippy from '@tippyjs/react';
import {
  DownloadIcon,
  ArchiveIcon,
  InboxIcon,
  ExternalLinkIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
  InboxInIcon,
} from '@heroicons/react/outline';
import { setAssignInboxFileSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { setCurrentInboxFile } from '../../../../../../features/inbox/inboxSlice';
import {
  useGetInboxFile,
  fileInboxFileService,
  archiveInboxFileService,
  unarchiveInboxFileService,
} from '../../../../../../features/inbox/inboxService';
import { Button } from '../../../../../../components';

function Toolbar() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // Selectors

  const selectedInboxFileIndex = useSelector((state) => state.inbox.selected_inbox_file_index);
  const selectedInboxFileId = useSelector((state) => state.inbox.selectedInboxFileId);
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);
  const folderIdsForFiling = useSelector((state) => state.inbox.folderIdsForFiling);

  // Mutations

  const archiveInboxFileMutation = useMutation(archiveInboxFileService, {
    onSuccess: (data) => {
      queryClient.setQueryData(['inbox_file', data.data.inbox_file.id], data.data.inbox_file);
      queryClient.invalidateQueries(['inbox_files', data.data.inbox_file.inbox_id, { isArchived: 0 }]);
      queryClient.invalidateQueries(['inbox_files', data.data.inbox_file.inbox_id, { isArchived: 1 }]);
    },
  });

  const unarchiveInboxFileMutation = useMutation(unarchiveInboxFileService, {
    onSuccess: (data) => {
      queryClient.setQueryData(['inbox_file', data.data.inbox_file.id], data.data.inbox_file);
      queryClient.invalidateQueries(['inbox_files', data.data.inbox_file.inbox_id, { isArchived: 0 }]);
      queryClient.invalidateQueries(['inbox_files', data.data.inbox_file.inbox_id, { isArchived: 1 }]);
    },
  });

  const fileInboxFileMutation = useMutation(fileInboxFileService, {
    onSuccess: (data) => {
      queryClient.setQueryData(['inbox_file', data.data.inbox_file.id], data.data.inbox_file);
      queryClient.invalidateQueries(['inbox_files', data.data.inbox_file.inbox_id, { isArchived: 0 }]);
      queryClient.invalidateQueries(['inboxes']);

      // TODO: Select next... if there is... (otherwise keep current selected)
    },
  });

  const handleNavigateToFile = (action) => {
    const relative = (action === 'previous' ? -1 : 1);

    const navigateToFileIndex = selectedInboxFileIndex + relative;
    const navigateToFileId = null;

    if (navigateToFileId != null && navigateToFileId !== undefined) {
      dispatch(setCurrentInboxFile({
        inboxFileId: navigateToFileId,
        inboxFileIndex: navigateToFileIndex,
      }));
    }
  };

  const fileDocument = async () => {
    fileInboxFileMutation.mutate({
      inboxFileId: inboxFile.id,
      folderIds: folderIdsForFiling,
    });
  };

  const archive = () => {
    archiveInboxFileMutation.mutate({
      inboxFileId: inboxFile.id,
    });
  };

  const unarchive = () => {
    unarchiveInboxFileMutation.mutate({
      inboxFileId: inboxFile.id,
    });
  };

  const onDownload = async () => {
    console.log('download');
  };

  const onFullPagePreview = async () => {
    console.log('full page preview');
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
                    <div className="relative z-0 inline-flex inline-flex space-x-2">
                      <Button
                        buttonStyle="white"
                        onClick={() => handleNavigateToFile('previous')}
                        icon={<ArrowCircleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                        iconPosition="center"
                        disabled={false}
                        ringOnFocus
                      />

                      <Button
                        buttonStyle="white"
                        onClick={() => handleNavigateToFile('next')}
                        icon={<ArrowCircleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                        iconPosition="center"
                        disabled={false}
                        ringOnFocus
                      />
                    </div>

                    <div className="relative z-0 inline-flex">
                      <span className="inline-flex">
                        {inboxFile.archived_at == null ? (
                          <Button
                            buttonStyle="white"
                            label="Archive"
                            onClick={archive}
                            icon={<ArchiveIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                            iconPosition="center"
                            disabled={false}
                            borderRight={false}
                            roundedRight={false}
                            ringOnFocus
                            loading={archiveInboxFileMutation.status === 'loading'}
                            width="w-36"
                          />
                        ) : (
                          <Button
                            buttonStyle="white"
                            label="Unarchive"
                            onClick={unarchive}
                            icon={<InboxIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                            iconPosition="center"
                            disabled={false}
                            borderRight={false}
                            roundedRight={false}
                            ringOnFocus
                            loading={unarchiveInboxFileMutation.status === 'loading'}
                            width="w-36"
                          />
                        )}
                        <Button
                          buttonStyle="white"
                          label="Assign"
                          onClick={() => dispatch(setAssignInboxFileSlideOverVisibility(true))}
                          icon={<InboxInIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                          iconPosition="center"
                          disabled={false}
                          roundedLeft={false}
                          roundedRight={false}
                          borderRight={false}
                          ringOnFocus
                          width="w-36"
                        />
                        <Button
                          buttonStyle="white"
                          label="Download"
                          onClick={onDownload}
                          icon={<DownloadIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                          iconPosition="center"
                          disabled={false}
                          roundedLeft={false}
                          roundedRight={false}
                          ringOnFocus
                          width="w-36"
                        />
                        <Tippy content={<span>Open full page preview</span>} placement="bottom">
                          <div>
                            <Button
                              buttonStyle="white"
                              label="Preview"
                              onClick={onFullPagePreview}
                              icon={<ExternalLinkIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />}
                              iconPosition="center"
                              disabled={false}
                              borderLeft={false}
                              roundedLeft={false}
                              ringOnFocus
                              width="w-36"
                            />
                          </div>
                        </Tippy>
                      </span>
                    </div>

                    <div>
                      <Button
                        buttonStyle="primary"
                        onClick={fileDocument}
                        loading={fileInboxFileMutation.status === 'loading'}
                        label="File document"
                        icon={<ArrowCircleRightIcon className="ml-2.5 mr-2 h-5 w-5" aria-hidden="true" />}
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
