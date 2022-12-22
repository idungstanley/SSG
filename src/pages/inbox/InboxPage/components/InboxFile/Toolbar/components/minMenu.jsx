import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ArchiveIcon,
  ChevronDownIcon,
  DownloadIcon,
  InboxIcon,
  InboxInIcon,
} from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  useArchiveOrUnarchiveInboxFile,
  useGetInboxFile,
} from '../../../../../../../features/inbox/inboxService';
import { setAssignInboxFileSlideOverVisibility } from '../../../../../../../features/general/slideOver/slideOverSlice';
import {
  useBlacklistFile,
  useGetBlacklistFiles,
} from '../../../../../../../features/inbox/inboxesService';
import { DownloadFile } from '../../../../../../../app/helpers';

const noSymbolIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="mr-2.5 h-5 w-5 text-gray-400"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);

export default function MinMenu() {
  const dispatch = useDispatch();
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);
  const { mutate: archiveFile } = useArchiveOrUnarchiveInboxFile();
  const { mutate: addOrRemoveFromBlacklist } = useBlacklistFile();
  const { data: bl } = useGetBlacklistFiles();
  const blacklistFiles = bl?.data.blacklist;

  const fileInBlacklist = blacklistFiles?.length > 0
    ? blacklistFiles?.find((i) => i.inbox_file.id === selectedInboxFileId)
    : null;

  const archive = () => {
    archiveFile({
      inboxFileId: inboxFile.id,
      type: inboxFile.archived_at ? 'unarchive' : 'archive',
    });
  };

  const blacklist = () => {
    addOrRemoveFromBlacklist({
      type: fileInBlacklist ? 'remove' : 'add',
      fileId: selectedInboxFileId,
    });
  };

  const onDownload = async () => {
    DownloadFile(
      'inboxFile',
      inboxFile.id,
      inboxFile.inbox_file_source.display_name,
    );
  };

  const items = [
    {
      label: inboxFile.archived_at ? 'Unarchive' : 'Archive',
      onClick: archive,
      icon: inboxFile.archived_at ? (
        <InboxIcon
          className="mr-2.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      ) : (
        <ArchiveIcon
          className="mr-2.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      label: 'Assign',
      onClick: () => dispatch(setAssignInboxFileSlideOverVisibility(true)),
      icon: (
        <InboxInIcon
          className="mr-2.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      label: fileInBlacklist ? 'Remove from blacklist' : 'Add to blacklist',
      onClick: blacklist,
      icon: noSymbolIcon,
    },
  ];

  return (
    <div className="inline-flex rounded-md shadow-sm bg-white">
      <Menu as="div" className="relative -ml-px block">
        <Menu.Button className="relative w-10 h-10 flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="h-7 w-7" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {items.map((item) => (
                <Menu.Item key={item.label}>
                  {() => (
                    <div
                      type="button"
                      onClick={item.onClick}
                      className="flex whitespace-nowrap items-center hover:bg-gray-100 px-3 cursor-pointer"
                    >
                      {item.icon}
                      <p className="block py-2 text-sm text-gray-700">
                        {item.label}
                      </p>
                    </div>
                  )}
                </Menu.Item>
              ))}

              <div className="flex whitespace-nowrap items-center hover:bg-gray-100 px-3">
                <DownloadIcon
                  className="mr-2.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={onDownload}
                  className="block py-2 text-sm text-gray-700"
                >
                  Download
                </button>
              </div>

            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
