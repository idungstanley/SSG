import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { useGetInbox, useUnpinInbox } from '../../../../../../features/inbox/inboxesService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function PinnedInboxItem({ pinnedInboxId }) {
  const navigate = useNavigate();

  const { data: inbox } = useGetInbox(pinnedInboxId);
  const { mutate: unpinInbox } = useUnpinInbox(pinnedInboxId);

  const onViewInbox = () => {
    navigate(`/inbox/${inbox.id}`);
  };

  const onUnpinInbox = () => {
    unpinInbox();
  };

  return inbox ? (
    <li key={inbox.id} className="relative col-span-1 flex shadow-sm rounded-md">
      <div
        className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
        style={{ backgroundColor: inbox.colour }}
      >
        {inbox.initials}
      </div>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">

          <div className="space-x-2">
            <Link
              key={inbox.id}
              to={`/inbox/${inbox.id}`}
              className="text-gray-900 font-medium hover:text-gray-600"
            >
              {inbox.name}
            </Link>

            {inbox.unfiled_count > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                {inbox.unfiled_count}
              </span>
            )}
          </div>

          <p className="text-gray-500">
            {inbox.email_key}
            @inbox.alsofile.com
          </p>
        </div>
        <Menu as="div" className="flex-shrink-0 pr-2">
          <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
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
            <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onViewInbox}
                      type="button"
                      className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-sm text-left')}
                    >
                      View
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onUnpinInbox}
                      type="button"
                      className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-sm text-left')}
                    >
                      Unpin
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  ) : null;
}

PinnedInboxItem.propTypes = {
  pinnedInboxId: PropTypes.string.isRequired,
};

export default PinnedInboxItem;
