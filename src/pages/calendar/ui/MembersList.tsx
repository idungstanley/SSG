import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { AvatarWithInitials } from '../../../components';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { cl } from '../../../utils';
import { useDaysOff } from '../lib/daysOffContext';

export default function MembersList() {
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const { setActiveMemberId, activeMemberId } = useDaysOff();

  const members = data?.data.team_members ?? [];

  return (
    <div className="grid grid-cols-1 gap-4">
      {members.map((person) => (
        <div
          onClick={() => setActiveMemberId(person.user.id)}
          key={person.id}
          className={cl(
            activeMemberId === person.user.id
              ? 'border-primary-300 bg-primary-50 hover:border-primary-400'
              : 'border-gray-300 bg-white hover:border-gray-400',
            'relative cursor-pointer flex items-center space-x-3 rounded-lg border px-6 py-5 shadow-sm '
          )}
        >
          <div className="flex-shrink-0">
            <AvatarWithInitials initials={person.user.initials ?? ''} />
          </div>
          <div className="min-w-0 flex-1 focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{person.user.name}</p>
            <p className="truncate text-sm text-gray-500">{person.user.email}</p>
          </div>

          <Menu as="div" className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cl(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cl(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Cancel
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ))}
    </div>
  );
}
