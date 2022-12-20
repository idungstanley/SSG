import React from 'react';
import { PropTypes } from 'prop-types';
import { XIcon } from '@heroicons/react/outline';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';

export default function Dropdown({
  show,
  setShowDropdown,
  setSelectedUsers,
  selectedUsers,
  isInbox,
}) {
  const { data } = useGetTeamMembers({ page: 0, query: '' });

  const selectedUserIds = selectedUsers.map((i) => i.id);

  const usersWithoutSelected = data?.data.team_members.filter(
    (i) => !selectedUserIds.includes(i.user.id),
  );

  return show ? (
    <>
      <div
        className="fixed left-0 right-0 bottom-0 top-0 opacity-0"
        tabIndex={0}
        role="button"
        onClick={() => setShowDropdown(false)}
        onKeyDown={() => {}}
      >
        {' '}
      </div>

      <div className={`absolute z-10 mt-0 w-48 overflow-x-scroll top-${isInbox ? '10' : '20'} right-0 border bg-white rounded-xl`}>
        <XIcon
          onClick={() => setShowDropdown(false)}
          className="absolute top-1 right-1 rounded-full w-6 h-6 text-black cursor-pointer transition-all duration-300"
        />
        <div className="mt-7 w-full">
          {selectedUsers?.length ? (
            <div className="w-48 overflow-x-scroll flex gap-2 p-2">
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
          {usersWithoutSelected.length ? (
            <div className="rounded-md max-h-60 w-full py-2 focus:outline-none">
              {usersWithoutSelected?.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => setSelectedUsers((prev) => [...prev, user.user])}
                  className="hover:bg-gray-100 px-4 py-2 text-gray-900 w-full hover:text-gray-700 text-sm text-left"
                >
                  <p>{user.user.name}</p>
                  <p className="text-gray-500">{user.user.email}</p>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  ) : null;
}

Dropdown.propTypes = {
  isInbox: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  setShowDropdown: PropTypes.func.isRequired,
};
