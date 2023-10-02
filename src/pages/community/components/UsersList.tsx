import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { TeamMemberWithStatus } from '../../../features/community/community';
import { cl } from '../../../utils';
import AvatarWithImage from '../../../components/avatar/AvatarWithImage';

interface UsersListProps {
  users: TeamMemberWithStatus[];
  title: string;
  isColored: boolean;
  showDetails: boolean;
}

export default function UsersList({ users, title, isColored, showDetails }: UsersListProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);

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
        <div className="flex items-top gap-4 flex-wrap">
          {users.map((user) => (
            <div
              key={user.id}
              className={cl(
                showDetails && 'p-2 border rounded-md bg-white justify-start items-start shadow-md',
                'flex group flex-col gap-2 cursor-pointer'
              )}
            >
              <div className={cl(showDetails ? '' : 'flex-col', 'group flex gap-2 items-center justify-start')}>
                <div
                  title={user.user.name}
                  className={cl(
                    'bg-gray-200 relative w-10 h-10 rounded-full p-2 flex items-center justify-center transform transition hover:scale-125'
                  )}
                  // Set bg color if user has saved color in profile
                  style={{
                    backgroundColor: isColored ? user.user.color : ''
                  }}
                >
                  {isColored ? (
                    <span className="absolute z-10 top-0 right-0 border-2 border-white w-3 h-3 rounded-full bg-green-500" />
                  ) : null}

                  {user.user.avatar_path ? (
                    <div
                      className={cl(
                        isColored
                          ? 'border-2 border-red-400 rounded-full'
                          : 'grayscale opacity-50 border-2 border-red-400 rounded-full'
                      )}
                    >
                      <AvatarWithImage image_path={user.user.avatar_path} height="h-10" width="w-10" />
                    </div>
                  ) : (
                    <span>{user.user.initials}</span>
                  )}
                </div>

                <p
                  className={cl(
                    isColored ? 'text-gray-500 group-hover:text-orange-500' : 'text-gray-200 group-hover:text-gray-500',
                    'text-center w-[95px] truncate text-xs'
                  )}
                >
                  {user.user.id === currentUserId ? 'You' : user.user.name}
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
