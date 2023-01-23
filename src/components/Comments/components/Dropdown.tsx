import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { selectedUserType } from './componentType';

interface DropDownPropTypes {
  show: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUsers: React.Dispatch<React.SetStateAction<selectedUserType[]>>;
  selectedUsers: selectedUserType[];
}

export default function Dropdown({
  show,
  setShowDropdown,
  setSelectedUsers,
  selectedUsers,
}: DropDownPropTypes) {
  const { data } = useGetTeamMembers({
    page: 0,
    query: '',
  });
  const selectedUserIds = selectedUsers.map((i) => i.id);
  const usersWithoutSelected = data?.data.team_members.filter(
    (i) => !selectedUserIds.includes(i.user.id)
  );

  return show ? (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 opacity-0"
        tabIndex={0}
        role="button"
        onClick={() => setShowDropdown(false)}
      >
        {' '}
      </div>

      <div className="absolute z-10 mt-0 w-48 overflow-x-scroll top-20 right-0 border bg-white rounded-xl">
        <XIcon
          onClick={() => setShowDropdown(false)}
          className="absolute w-6 h-6 text-black transition-all duration-300 rounded-full cursor-pointer top-1 right-1"
        />
        <div className="w-full mt-7">
          {selectedUsers?.length ? (
            <div className="flex w-48 gap-2 p-2 overflow-x-scroll">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="relative px-3 py-2 text-sm bg-indigo-100 border border-primary-400 rounded-xl"
                >
                  <XIcon
                    onClick={() =>
                      setSelectedUsers((prev) => [
                        ...prev.filter((i) => i.id !== user.id),
                      ])
                    }
                    className="absolute w-6 h-6 p-1 text-black transition-all duration-300 bg-white border rounded-full cursor-pointer -top-2 -right-3"
                  />
                  <p>{user.name}</p>
                </div>
              ))}
            </div>
          ) : null}
          {usersWithoutSelected?.length ? (
            <div className="w-full py-2 rounded-md max-h-60 focus:outline-none">
              {usersWithoutSelected?.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() =>
                    setSelectedUsers((prev) => [...prev, user.user])
                  }
                  className="w-full px-4 py-2 text-sm text-left text-gray-900 hover:bg-gray-100 hover:text-gray-700"
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
