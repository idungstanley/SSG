import React from 'react';
import { PropTypes } from 'prop-types';
import { XIcon } from '@heroicons/react/outline';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ show, setSelectedUsers, selectedUsers }) {
  const { data } = useGetTeamMembers({ page: 0, query: '' });

  const selectedUserIds = selectedUsers.map((i) => i.id);

  const usersWithoutSelected = data?.data.team_members.filter(
    (i) => !selectedUserIds.includes(i.user.id),
  );

  return show ? (
    <div className="absolute z-10 mt-0 w-48 overflow-x-scroll top-20 right-0 border bg-white rounded-xl">
      {selectedUsers?.length ? (
        <div className="border w-48 overflow-x-scroll flex gap-2 p-2">
          {selectedUsers.map((user) => (
            <div
              key={user.id}
              className="relative bg-indigo-100 border text-sm px-3 py-2 border-primary-400 rounded-xl"
            >
              <XIcon
                onClick={() => setSelectedUsers((prev) => [
                  ...prev.filter((i) => i.id !== user.id),
                ])}
                className="absolute -top-2 p-1 bg-white border -right-3 rounded-full w-6 h-6 text-black  cursor-pointer transition-all duration-300"
              />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="rounded-md max-h-60 overflow-y-scroll shadow-lg py-2 focus:outline-none">
        {usersWithoutSelected?.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => setSelectedUsers((prev) => [...prev, user.user])}
            className={classNames(
              'hover:bg-gray-100 text-gray-900 hover:text-gray-700 block px-4 py-2 text-sm w-full text-left',
            )}
          >
            <p>{user.user.name}</p>
            <p className="text-gray-500">{user.user.email}</p>
          </button>
        ))}
      </div>
      {/* <div className="border w-full flex gap-2">
        {selectedUsers?.map((user) => (
          <div
            key={user.id}
            className="bg-primary-400 border border-primary-400 rounded-xl"
          >
            {user.name}
          </div>
        ))}
      </div>
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
          <Menu.Items className="absolute left-0 top-10 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {users?.map((user) => (
              <Menu.Item key={user.user.id}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => setSelectedUsers(user.user)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm w-full text-left',
                    )}
                  >
                    <p>{user.user.name}</p>
                    <p className="text-gray-500">{user.user.email}</p>
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </> */}
    </div>
  ) : null;
}

Dropdown.propTypes = {
  show: PropTypes.bool.isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
  selectedUsers: PropTypes.array.isRequired,
};
