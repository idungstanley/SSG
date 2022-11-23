import React, { Fragment, useState, useEffect } from 'react';
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
  usePinInbox,
  useUnpinInbox,
} from '../../../../../../features/inbox/inboxesService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Menu({ inboxId, isHidden }) {
  const navigate = useNavigate();

  const [pinnedInboxesIds, setPinnedInboxesIds] = useState([]);

  const { status: pinnedInboxesStatus, data: pinnedInboxesData } = useGetPinnedInboxes();

  const { showHidden } = useSelector((state) => state.inboxes);
  const { data: inbox } = showHidden
    ? useGetHiddenInbox(inboxId)
    : useGetInbox(inboxId);
  const { mutate: pinInbox } = usePinInbox(inboxId);
  const { mutate: unpinInbox } = useUnpinInbox(inboxId);
  const { mutate: hideOrShowInbox } = useHideOrUnhideInbox();

  const onViewInbox = () => {
    navigate(`/inbox/${inboxId}`);
  };

  const onPinInbox = () => {
    pinInbox();
  };

  const onUnpinInbox = () => {
    unpinInbox();
  };

  const onHideInbox = () => {
    hideOrShowInbox({ id: inboxId, hide: !isHidden });
  };

  // ! change this to real value
  const inArchive = false;
  const onArchiveInbox = () => {};

  useEffect(() => {
    var ids = [];

    if (pinnedInboxesStatus === 'success') {
      pinnedInboxesData.data.pinned_inboxes.map((pinnedInbox) => ids.push(pinnedInbox.id));
    }

    setPinnedInboxesIds(ids);
  }, [pinnedInboxesStatus, pinnedInboxesData]);

  const menuItems = [
    {
      id: 1,
      onClick: onViewInbox,
      title: 'View',
    },
    {
      id: 2,
      onClick: onHideInbox,
      title: isHidden ? 'Unhide' : 'Hide',
    },
    {
      id: 3,
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
          {!pinnedInboxesIds.some(
            (curentInboxId) => curentInboxId === inboxId,
          ) ? (
            <div className="py-1">
              <HeadlessUIMenu.Item>
                {({ active }) => (
                  <button
                    onClick={onPinInbox}
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-sm text-left',
                    )}
                  >
                    Pin
                  </button>
                )}
              </HeadlessUIMenu.Item>
            </div>
            ) : (
              <div className="py-1">
                <HeadlessUIMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={onUnpinInbox}
                      type="button"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-sm text-left',
                      )}
                    >
                      Unpin
                    </button>
                  )}
                </HeadlessUIMenu.Item>
              </div>
            )}
        </HeadlessUIMenu.Items>
      </Transition>
    </HeadlessUIMenu>
  ) : null;
}

Menu.propTypes = {
  inboxId: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
};
