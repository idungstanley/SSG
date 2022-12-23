import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  TrashIcon,
  DuplicateIcon,
  DownloadIcon,
  ClipboardIcon,
  UploadIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import {
  setCopyItems,
  resetSelectedFilesAndFolders,
} from '../../../../../features/explorer/explorerSlice';
import {
  deleteService,
  pasteService,
} from '../../../../../features/explorer/explorerActionsService';
import {
  useGetFile,
  useGetFolder,
} from '../../../../../features/explorer/explorerService';
import { setRenameFileSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import Toast from '../../../../../common/Toast';
import { DownloadFile } from '../../../../../app/helpers';
import CreateNewSelect from './components/CreateNewSelect';
import SortingItems from './components/SortingItems';
import ChangeView from './components/ChangeView';
import { setShowUploadModal } from '../../../../../features/general/uploadFile/uploadFileSlice';
import { useAppSelector } from '../../../../../app/hooks';

export default function Toolbar() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { folderId } = useParams();

  const {
    selectedItemId,
    selectedFileIds,
    selectedFolderIds,
    fileIdsToPaste,
    folderIdsToPaste,
    selectedItemType,
  } = useAppSelector((state) => state.explorer);

  const { data: file } = useGetFile(
    selectedItemId,
    selectedItemType === 'file',
  );
  const { data: folder } = useGetFolder(
    selectedItemId,
    selectedItemType === 'folder',
  );

  const [totalSelectedItems, setTotalSelectedItems] = useState(0);

  const deleteMutation = useMutation(deleteService, {
    onSuccess: () => {
      dispatch(resetSelectedFilesAndFolders());
      queryClient.invalidateQueries([
        'explorer_files_and_folders',
        folderId == null ? 'root-folder' : folderId,
      ]);
    },
  });

  const pasteMutation = useMutation(pasteService, {
    onSuccess: () => {
      dispatch(resetSelectedFilesAndFolders());
      queryClient.invalidateQueries([
        'explorer_files_and_folders',
        folderId == null ? 'root-folder' : folderId,
      ]);
    },
  });

  useEffect(() => {
    setTotalSelectedItems(selectedFileIds.length + selectedFolderIds.length);
  }, [selectedFileIds, selectedFolderIds]);

  const openRename = () => {
    dispatch(setRenameFileSlideOverVisibility(true));
  };

  const onCopy = () => {
    dispatch(
      setCopyItems({
        fileIdsToPaste: selectedFileIds,
        folderIdsToPaste: selectedFolderIds,
      }),
    );

    localStorage.setItem('fileIdsToPaste', JSON.stringify(selectedFileIds));
    localStorage.setItem('folderIdsToPaste', JSON.stringify(selectedFolderIds));

    queryClient.invalidateQueries([
      'explorer_files_and_folders',
      folderId == null ? 'root-folder' : folderId,
    ]);

    toast.custom((t) => (
      <Toast
        type="success"
        title={`Copied ${
          totalSelectedItems > 1 ? `${totalSelectedItems} items ` : ' '
        }to clipboard`}
        body={null}
        toastId={t.id}
      />
    ));
  };

  const onPaste = () => {
    pasteMutation.mutate({
      copyToFolderId: folderId,
      fileIds: fileIdsToPaste,
      folderIds: folderIdsToPaste,
    });
  };

  const onDelete = () => {
    // If can delete multiple (multiple selected) - delete... remove above delete...
    deleteMutation.mutate({
      fileIds: selectedFileIds,
      folderIds: selectedFolderIds,
    });
  };

  const onDownload = () => {
    const itemName = selectedItemType === 'file' ? file?.display_name : `${folder?.name}.zip`;

    if ((selectedFileIds.length === 1 || selectedFolderIds.length === 1) && selectedItemType && selectedItemId && itemName) {
      DownloadFile(selectedItemType, selectedItemId, itemName);
    }
  };

  const toolbarItems = [
    {
      icon: <DownloadIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: onDownload,
      disabled: selectedFileIds.length + selectedFolderIds.length === 0,
      title: 'Download',
      isInLeft: true,
    },
    {
      icon: <TrashIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: onDelete,
      disabled: selectedFileIds.length + selectedFolderIds.length === 0,
      title: 'Delete',
    },
    {
      icon: <DuplicateIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: onCopy,
      disabled: selectedFileIds.length + selectedFolderIds.length === 0,
      title: 'Copy',
    },
    {
      icon: <ClipboardIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: onPaste,
      disabled: fileIdsToPaste.length + folderIdsToPaste.length === 0,
      title: 'Paste',
    },
    {
      icon: <PencilIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: openRename,
      disabled: selectedFileIds.length + selectedFolderIds.length !== 1,
      title: 'Rename',
      isInRight: true,
    },
  ];

  return (
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
              <div className="flex flex-col justify-center">
                <div className="px-4 sm:px-6">
                  <div className="py-4">
                    {/* <div className="space-x-3"> */}
                    <div className="flex flex-wrap justify-between gap-y-4 sm:gap-x-4 gap-x-2">
                      <div className="space-x-3 sm:space-x-6">
                        <Upload />
                        <CreateNewSelect />
                      </div>

                      <span className="isolate h-10 w-full lg:w-auto order-1 lg:order-none inline-flex rounded-md shadow-sm">
                        {toolbarItems.map((i) => (
                          <button
                            key={i.title}
                            title={i.title}
                            onClick={i.onClick}
                            type="button"
                            disabled={i.disabled}
                            className={`relative inline-flex items-center ${
                              i?.isInLeft
                                ? 'rounded-l-md'
                                : i?.isInRight
                                  ? 'rounded-r-md'
                                  : null
                            } border border-gray-300 justify-center bg-white px-3 sm:px-6 flex-grow lg:flex-grow-0 py-2 text-sm font-medium hover:bg-gray-50 focus:z-10 ring-0 focus:ring-0 ${
                              i.disabled
                                ? 'border-opacity-40 text-gray-300'
                                : 'text-gray-400'
                            }`}
                          >
                            {i.icon}
                          </button>
                        ))}
                      </span>
                      <div className="space-x-3 sm:space-x-6">
                        <SortingItems />
                        <ChangeView />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Message header */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Upload() {
  const dispatch = useDispatch();

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => dispatch(setShowUploadModal(true))}
        type="button"
        className="flex justify-center px-4 rounded-md border border-gray-300 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ring-0 focus:ring-0"
      >
        <UploadIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        <span className="sm:ml-2.5 hidden sm:block">Upload</span>
      </button>
    </div>
  );
}
