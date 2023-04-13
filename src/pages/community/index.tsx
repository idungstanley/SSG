import { EllipsisHorizontalIcon, InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronRightIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';
import { cl } from '../../utils';

interface User {
  id: number;
  initials: string;
  name: string;
  isActive: boolean;
}

const onlineUsers: User[] = [
  {
    id: 1,
    initials: 'A',
    name: 'Petro',
    isActive: true
  }
];

const offlineUsers: User[] = [
  {
    id: 1,
    initials: 'SS',
    name: 'Stanley Sunday',
    isActive: false
  },
  {
    id: 2,
    initials: 'OJ',
    name: 'Omachi John',
    isActive: false
  },
  {
    id: 3,
    initials: 'SK',
    name: 'Stanislau K',
    isActive: false
  },
  {
    id: 4,
    initials: 'NS',
    name: 'Nurudeen Salifu',
    isActive: false
  }
];

const diagram = [
  { time: '12am', usersCount: 0 },
  { time: '1am', usersCount: 0 },
  { time: '2am', usersCount: 0 },
  { time: '3am', usersCount: 0 },
  { time: '4am', usersCount: 0 },
  { time: '5am', usersCount: 0 },
  { time: '6am', usersCount: 0 },
  { time: '7am', usersCount: 0 },
  { time: '8am', usersCount: 0 },
  { time: '9am', usersCount: 1 },
  { time: '10am', usersCount: 1 },
  { time: '11am', usersCount: 0 },
  { time: '12pm', usersCount: 0 },
  { time: '1pm', usersCount: 0 },
  { time: '2pm', usersCount: 0 },
  { time: '3pm', usersCount: 0 },
  { time: '4pm', usersCount: 0 },
  { time: '5pm', usersCount: 0 },
  { time: '6pm', usersCount: 0 },
  { time: '7pm', usersCount: 0 },
  { time: '8pm', usersCount: 0 },
  { time: '9pm', usersCount: 0 },
  { time: '10pm', usersCount: 0 },
  { time: '11pm', usersCount: 0 }
];

export default function CommunityPage() {
  const [showGuests, setShowGuests] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOnline = useMemo(
    () => onlineUsers.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );
  const filteredOffline = useMemo(
    () => offlineUsers.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="flex justify-center w-full h-full space-y-5 py-10">
      <div className="max-w-4xl h-full space-y-5">
        {/* diagram */}
        <section className="relative w-full border rounded-md shadow-md flex flex-col gap-2 px-3 pt-8">
          <div className="absolute top-2 left-2 flex gap-1 items-center">
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <p className="uppercase text-ultraXs font-light text-gray-400">people online</p>
          </div>

          <div className="flex gap-4 items-center overflow-x-scroll w-full">
            {diagram.map((item) => (
              <div key={item.time} className="flex flex-col gap-4 items-center">
                <div
                  title={`${item.usersCount} users`}
                  className={cl(
                    item.usersCount ? 'from-orange-600 to-orange-200' : 'bg-white',
                    'rounded-sm h-20 w-3 bg-gradient-to-t '
                  )}
                />
                <p className="text-xs text-gray-800">{item.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* header */}
        <section className="flex items-center justify-between">
          <p className="text-gray-700">Now</p>

          <div className="flex items-center justify-between gap-5">
            <div className="border rounded-3xl flex px-2 py-1 gap-2 items-center group text-gray-500">
              <MagnifyingGlassIcon className="w-4 h-4 group-hover:text-orange-500" aria-hidden="true" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search..."
                className="border-none p-0 outline-none focus:outline-none focus:border-none ring-0 focus:ring-0 text-sm"
              />
            </div>

            <button
              onClick={() => setShowGuests((prev) => !prev)}
              className="uppercase text-gray-400 text-xs flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"
            >
              <UserIcon className="w-4 h-4" aria-hidden="true" />
              <span>{showGuests ? 'Hide guests' : 'show guests'}</span>
            </button>

            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="uppercase text-gray-400 text-xs flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"
            >
              <InformationCircleIcon className="w-4 h-4" aria-hidden="true" />
              <span>{showDetails ? 'Hide details' : 'show details'}</span>
            </button>

            <EllipsisHorizontalIcon className="w-4 h-4 text-gray-500" aria-hidden="true" />
          </div>
        </section>

        {/* active */}
        <UsersList users={filteredOnline} isColored title="Online" showDetails={showDetails} />

        {/* offline */}
        <UsersList users={filteredOffline} isColored={false} title="Offline" showDetails={showDetails} />
      </div>
    </div>
  );
}

interface UsersListProps {
  users: User[];
  title: string;
  isColored: boolean;
  showDetails: boolean;
}

function UsersList({ users, title, isColored, showDetails }: UsersListProps) {
  const [showUsers, setShowUsers] = useState(isColored);

  return (
    <section className="pb-10 space-y-4">
      {/* header */}
      <div className={cl(!isColored ? 'text-gray-300' : 'text-gray-500', 'flex items-center gap-2')}>
        <button
          onClick={() => setShowUsers((prev) => !prev)}
          className={cl('hover:text-orange-500 flex items-center gap-2 outline-none')}
        >
          {showUsers ? (
            <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
          )}
          <p className="mt-0.5">{title}</p>
        </button>
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-4 h-4" aria-hidden="true" />
          <p>{users.length}</p>
        </div>
      </div>

      {/* users list */}
      {showUsers ? (
        <div className="flex items-center gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={cl(
                showDetails && 'p-2 border rounded-md bg-white justify-start items-start shadow-md"',
                'flex flex-col gap-2 cursor-pointer'
              )}
            >
              <div className={cl(showDetails ? '' : 'flex-col', 'flex gap-2 items-center justify-start')}>
                <div
                  title={user.name}
                  className={cl(
                    isColored ? 'bg-orange-500' : 'bg-gray-200',
                    'relative w-10 h-10 rounded-full p-2 flex items-center justify-center transform hover:scale-125'
                  )}
                >
                  {isColored ? (
                    <span className="absolute top-0 right-0 border-2 border-white w-3 h-3 rounded-full bg-green-500" />
                  ) : null}

                  <span>{user.initials}</span>
                </div>

                <p
                  className={cl(
                    isColored ? 'text-gray-500' : 'text-gray-200',
                    'truncate text-xs hover:text-orange-500'
                  )}
                >
                  {user.isActive ? 'You' : user.name}
                </p>
              </div>

              {showDetails ? (
                <div className="flex items-center justify-center p-6">
                  <p className="text-gray-400">Nothing to see here.</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
