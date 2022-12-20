import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { PropTypes } from 'prop-types';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ show, setUsers }) {
  const { data } = useGetTeamMembers({ page: 0, query: '' });

  const users = data?.data.team_members;

  return (
    <Menu as="div" className="relative">
      <Transition
        as={Fragment}
        show={show}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 -top-5 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {users?.map((user) => (
            <Menu.Item key={user.user.id}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => setUsers(user.user)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left',
                  )}
                >
                  <p>
                    {user.user.name}
                  </p>
                  <p className="text-gray-500">
                    {user.user.email}
                  </p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

Dropdown.propTypes = {
  show: PropTypes.bool.isRequired,
  setUsers: PropTypes.func.isRequired,
};
