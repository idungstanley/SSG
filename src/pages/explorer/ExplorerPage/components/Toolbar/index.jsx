import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Menu, Transition } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import toast from 'react-hot-toast';
import { ChevronDownIcon, FolderAddIcon } from '@heroicons/react/solid';
import {
  TrashIcon,
  DuplicateIcon,
  DownloadIcon,
  ViewListIcon,
  ViewGridIcon,
  PhotographIcon,
  SortDescendingIcon,
  SortAscendingIcon,
  SwitchHorizontalIcon,
  ClockIcon,
  ClipboardIcon,
  UploadIcon,
  PlusCircleIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import {
  setShowUploadModal,
  copyItems,
  resetSelectedFilesAndFolders,
  // setSelectedFiles,
  // setSelectedFolders,
} from '../../../../../features/explorer/explorerSlice';
import {
  deleteService,
  pasteService,
} from '../../../../../features/explorer/explorerActionsService';
import {
  useGetFile,
  useGetFolder,
} from '../../../../../features/explorer/explorerService';
import { Button } from '../../../../../components';
import {
  setCreateFolderSlideOverVisibility,
  setRenameFileSlideOverVisibility,
} from '../../../../../features/general/slideOver/slideOverSlice';
import Toast from '../../../../../common/Toast';
import { DownloadFile } from '../../../../../app/helpers';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Toolbar() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { folderId } = useParams();

  const selectedItemType = useSelector(
    (state) => state.explorer.selectedItemType,
  );
  const selectedItemId = useSelector((state) => state.explorer.selectedItemId);

  const { data: file } = useGetFile(
    selectedItemId,
    selectedItemType === 'file',
  );
  const { data: folder } = useGetFolder(
    selectedItemId,
    selectedItemType === 'folder',
  );

  const selectedFileIds = useSelector(
    (state) => state.explorer.selectedFileIds,
  );
  const selectedFolderIds = useSelector(
    (state) => state.explorer.selectedFolderIds,
  );

  const fileIdsToPaste = useSelector((state) => state.explorer.fileIdsToPaste);
  const folderIdsToPaste = useSelector(
    (state) => state.explorer.folderIdsToPaste,
  );

  const [totalSelectedItems, setTotalSelectedItems] = useState(0);

  const [canDelete, setCanDelete] = useState(false);
  const [canCopy, setCanCopy] = useState(false);

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

    setCanDelete(selectedFolderIds.length + selectedFileIds.length !== 0);
    setCanCopy(selectedFolderIds.length + selectedFileIds.length !== 0);
  }, [selectedFileIds, selectedFolderIds]);

  const openCreateNewFolder = () => {
    dispatch(setCreateFolderSlideOverVisibility(true));
  };

  const openRename = () => {
    dispatch(setRenameFileSlideOverVisibility(true));
  };

  const onCopy = () => {
    dispatch(
      copyItems({
        fileIds: selectedFileIds,
        folderIds: selectedFolderIds,
      }),
    );
    queryClient.invalidateQueries(['explorer_files_and_folders']);

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
    // queryClient.invalidateQueries(['explorer_files_and_folders']);
    dispatch(resetSelectedFilesAndFolders());

    // Update current list
  };

  const onDownload = () => {
    const itemName = selectedItemType === 'file' ? file.display_name : `${folder.name}.zip`;

    if (selectedFileIds.length === 1 || selectedFolderIds.length === 1) {
      DownloadFile(selectedItemType, selectedItemId, itemName);
    }
  };

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
                  <div className="py-4 flex justify-start space-x-6">
                    <div className="space-x-3">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => dispatch(setShowUploadModal(true))}
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 pr-5 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        >
                          <UploadIcon
                            className="mr-2.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          Upload
                        </button>
                      </div>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ring-0 focus:ring-0">
                            <PlusCircleIcon
                              className="mr-2.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Create
                            <ChevronDownIcon
                              className="-mr-1 ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-left absolute z-20 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    type="button"
                                    onClick={openCreateNewFolder}
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm w-full',
                                    )}
                                  >
                                    <FolderAddIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Folder
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>

                    <div className="">
                      <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                        <span className="inline-flex sm:shadow-sm">
                          <Button
                            buttonStyle="white"
                            onClick={onDownload}
                            disabled={
                              fileIdsToPaste.length
                                + folderIdsToPaste.length
                              !== 1
                            }
                            icon={(
                              <DownloadIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                            iconPosition="center"
                            borderRight={false}
                            roundedRight={false}
                            ringOnFocus
                            width="w-16"
                          />

                          <Button
                            disabled={!canDelete}
                            buttonStyle="white"
                            loading={deleteMutation.status === 'loading'}
                            onClick={onDelete}
                            icon={(
                              <TrashIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                            iconPosition="center"
                            roundedLeft={false}
                            roundedRight={false}
                            borderRight={false}
                            ringOnFocus
                            width="w-16"
                          />

                          <Tippy
                            content={(
                              <span>
                                Copy
                                {totalSelectedItems > 1
                                  && ` ${totalSelectedItems} items`}
                              </span>
                            )}
                            placement="bottom"
                          >
                            <div>
                              <Button
                                buttonStyle="white"
                                onClick={onCopy}
                                icon={(
                                  <DuplicateIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                                iconPosition="center"
                                disabled={!canCopy}
                                roundedLeft={false}
                                roundedRight={false}
                                borderRight={false}
                                width="w-16"
                              />
                            </div>
                          </Tippy>
                          <Tippy
                            content={<span>Paste</span>}
                            placement="bottom"
                          >
                            <div>
                              <Button
                                buttonStyle="white"
                                onClick={onPaste}
                                loading={pasteMutation.status === 'loading'}
                                disabled={
                                  fileIdsToPaste.length
                                    + folderIdsToPaste.length
                                  === 0
                                }
                                icon={(
                                  <ClipboardIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                                iconPosition="center"
                                roundedLeft={false}
                                roundedRight={false}
                                borderRight={false}
                                width="w-16"
                              />
                            </div>
                          </Tippy>
                          <Tippy
                            content={<span>Rename</span>}
                            placement="bottom"
                          >
                            <div>
                              <Button
                                buttonStyle="white"
                                onClick={openRename}
                                disabled={
                                  selectedFileIds.length > 1
                                  || selectedFolderIds.length > 1
                                }
                                icon={(
                                  <PencilIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                                iconPosition="center"
                                borderLeft
                                roundedLeft={false}
                                width="w-16"
                              />
                            </div>
                          </Tippy>
                        </span>
                      </span>
                    </div>

                    <div className="hidden">
                      <Menu
                        as="div"
                        className="relative inline-block text-left mr-2"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                            <SwitchHorizontalIcon
                              className="mr-2.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Sort by
                            <ChevronDownIcon
                              className="-mr-1 ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <ClockIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Created at (latest)
                                  </a>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <ClockIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Created at (oldest)
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <PencilIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Modified at (latest)
                                  </a>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <PencilIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Modified at (oldest)
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <SortAscendingIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Name (A-Z)
                                  </a>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <SortDescendingIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Name (Z-A)
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                            <ViewListIcon
                              className="mr-2.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            List
                            <ChevronDownIcon
                              className="-mr-1 ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <ViewListIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    List
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <ViewGridIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Thumbnails
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="tempurl"
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                      'group flex items-center px-4 py-2 text-sm',
                                    )}
                                  >
                                    <PhotographIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Gallery
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
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
