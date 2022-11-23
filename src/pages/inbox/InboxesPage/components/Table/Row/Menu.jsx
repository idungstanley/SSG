import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu as HeadlessUIMenu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetHiddenInbox,
  useGetInbox,
  useGetPinnedInboxes,
  useHideOrUnhideInbox,
  usePinOrUnpinInbox,
} from '../../../../../../features/inbox/inboxesService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Menu({ inboxId, isHidden }) {
  const navigate = useNavigate();

  const { data: pinnedInboxesData } = useGetPinnedInboxes();

  const { showHidden } = useSelector((state) => state.inboxes);
  const { data: inbox } = showHidden
    ? useGetHiddenInbox(inboxId)
    : useGetInbox(inboxId);
  const { mutate: pinOrUnpinInbox } = usePinOrUnpinInbox();
  const { mutate: hideOrShowInbox } = useHideOrUnhideInbox();

  const onViewInbox = () => {
    navigate(`/inbox/${inboxId}`);
  };

  const onPinInbox = () => {
    const isPinned = pinnedInboxesData.data.pinned_inboxes
      .map((i) => i.id)
      .includes(inboxId);
    pinOrUnpinInbox({
      inboxId,
      isPinned,
    });
  };

  const onHideInbox = () => {
    hideOrShowInbox({ id: inboxId, hide: !isHidden });
  };

  // ! change this to real value
  const inArchive = false;
  const onArchiveInbox = () => {};

  const menuItems = [
    {
      id: 1,
      onClick: onViewInbox,
      title: 'View',
    },
    {
      id: 2,
      onClick: onPinInbox,
      title: pinnedInboxesData?.data.pinned_inboxes
        .map((i) => i.id)
        .includes(inboxId)
        ? 'Unpin'
        : 'Pin',
    },
    {
      id: 3,
      onClick: onHideInbox,
      title: isHidden ? 'Unhide' : 'Hide',
    },
    {
      id: 4,
      onClick: onArchiveInbox,
      title: inArchive ? 'Unarchive' : 'Archive',
    },
  ];

  return inbox ? (
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
          {menuItems.map((i) => (
            <div className="py-1" key={i.id}>
              <HeadlessUIMenu.Item>
                {({ active }) => (
                  <button
                    onClick={i.onClick}
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm text-left',
                    )}
                  >
                    {i.title}
                  </button>
                )}
              </HeadlessUIMenu.Item>
            </div>
          ))}
        </HeadlessUIMenu.Items>
      </Transition>
    </HeadlessUIMenu>
  ) : null;
}

Menu.propTypes = {
  inboxId: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
};
