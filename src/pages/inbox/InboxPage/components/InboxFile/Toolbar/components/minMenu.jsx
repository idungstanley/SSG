import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ArchiveIcon,
  ChevronDownIcon,
  InboxIcon,
} from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import {
  useArchiveOrUnarchiveInboxFile,
  useGetInboxFile,
} from '../../../../../../../features/inbox/inboxService';

export default function MinMenu() {
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);
  const { mutate: archiveFile } = useArchiveOrUnarchiveInboxFile();

  const archive = () => {
    archiveFile({
      inboxFileId: inboxFile.id,
      type: inboxFile.archived_at ? 'unarchive' : 'archive',
    });
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
  ];

  return (
    <div className="inline-flex rounded-md shadow-sm z-50 bg-white">
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
                    <div className="flex items-center justify-center gap-3 hover:bg-gray-100 px-3">
                      {item.icon}
                      <button
                        type="button"
                        onClick={item.onClick}
                        className="block py-2 text-sm text-gray-700"
                      >
                        {item.label}
                      </button>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
