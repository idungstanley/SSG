import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AtSymbolIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';

interface DropdownForMentionProps {
  selectedUsers: { id: string; name: string }[];
  setSelectedUsers: (i: { id: string; name: string }[]) => void;
}

export default function DropdownForMention({ setSelectedUsers, selectedUsers }: DropdownForMentionProps) {
  const { data } = useGetTeamMembers({
    page: 0,
    query: ''
  });
  const selectedUserIds = selectedUsers.map((i) => i.id);
  const usersWithoutSelected = data?.data.team_members.filter((i) => !selectedUserIds.includes(i.user.id));

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none ring-0 focus:ring-0">
          <span className="sr-only">Open options</span>
          <AtSymbolIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 pt-2 w-56 bottom-8 rounded-md bg-white shadow-lg focus:outline-none">
          {selectedUsers?.length ? (
            <div className="flex w-48 gap-2 p-2 overflow-x-scroll">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="relative px-3 py-2 text-sm bg-indigo-100 border border-primary-400 rounded-xl"
                >
                  <XMarkIcon
                    onClick={() => setSelectedUsers([...selectedUsers.filter((i) => i.id !== user.id)])}
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
                  type="button"
                  key={user.id}
                  onClick={() => setSelectedUsers([...selectedUsers, user.user])}
                  className="w-full px-4 py-2 text-sm text-left text-gray-900 hover:bg-gray-100 hover:text-gray-700"
                >
                  <p>{user.user.name}</p>
                  <p className="text-gray-500">{user.user.email}</p>
                </button>
              ))}
            </div>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
