import React, { Fragment } from 'react';
import { Menu as HeadlessUIMenu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import {
  useArchiveOrUnarchiveInbox,
  useHideOrUnhideInbox,
  usePinOrUnpinInbox,
  useRestoreOrDeleteInbox,
} from '../../../../../../features/inbox/inboxesService';
import { inboxType } from '../../../../../../features/inbox/inbox.interfaces';
import { classNames } from '../../../../../../utils';

interface MenuProps {
  inboxId: string;
  type: inboxType;
}

export default function Menu({ inboxId, type }: MenuProps) {
  const navigate = useNavigate();

  const { mutate: pinOrUnpinInbox } = usePinOrUnpinInbox();
  const { mutate: hideOrShowInbox } = useHideOrUnhideInbox();
  const { mutate: archiveInbox } = useArchiveOrUnarchiveInbox();
  const { mutate: restoreInbox } = useRestoreOrDeleteInbox();

  const onViewInbox = () => {
    navigate(`/inbox/${inboxId}`);
  };

  const onPinInbox = () => {
    pinOrUnpinInbox({
      inboxId,
      isPinned: false,
    });
  };

  const onHideInbox = () => {
    hideOrShowInbox({ id: inboxId, isHidden: type === 'hidden' });
  };

  const onArchiveInbox = () => {
    archiveInbox({
      id: inboxId,
      isArchived: type === 'archived',
    });
  };

  const onRestoreInbox = () => {
    restoreInbox({
      inboxId,
      isDeleted: type === 'trashed',
    });
  };

  const menuItems = [
    {
      id: 2,
      onClick: onViewInbox,
      title: 'View',
      isVisible: type === 'active' || type === 'archived',
    },
    {
      id: 3,
      onClick: onPinInbox,
      title: 'Pin',
      isVisible: type === 'active',
    },
    {
      id: 4,
      onClick: onHideInbox,
      title: type === 'hidden' ? 'Unhide' : 'Hide',
      isVisible: type === 'active' || type === 'hidden',
    },
    {
      id: 5,
      onClick: onArchiveInbox,
      title: type === 'archived' ? 'Unarchive' : 'Archive',
      isVisible: type === 'active' || type === 'archived',
    },
    {
      id: 1,
      onClick: onRestoreInbox,
      title: type === 'trashed' ? 'Restore' : 'Delete',
      isVisible: true,
    },
  ];

  return (
    <HeadlessUIMenu as="div" className="relative inline-block text-left">
      <div>
        <HeadlessUIMenu.Button className="relative top-1 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </HeadlessUIMenu.Button>
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
        <HeadlessUIMenu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-200">
          {menuItems.map((i) =>
            i.isVisible ? (
              <div className="py-1" key={i.id}>
                <HeadlessUIMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={i.onClick}
                      type="button"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-sm text-left'
                      )}
                    >
                      {i.title}
                    </button>
                  )}
                </HeadlessUIMenu.Item>
              </div>
            ) : null
          )}
        </HeadlessUIMenu.Items>
      </Transition>
    </HeadlessUIMenu>
  );
}
