import { useState } from 'react';
import { User } from './ClockLog';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';

interface AssigneeProps {
  teamMembers: User[];
}

export function TimeLogAssigneeDropDown({ teamMembers }: AssigneeProps) {
  const assigneeData = [
    { id: 1, title: 'Teams', data: teamMembers },
    { id: 2, title: 'Users', data: [] }
  ];

  const [activeFiltertab, setActiveFilter] = useState<string>('Teams');

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white z-30 px-2 rounded-md h-96 w-56 shadow-xl absolute top-8 -right-8"
    >
      <div className="flex flex-col space-y-2.5 w-full">
        {/* search input header */}
        <div className="w-full p-1 border-b-2">
          <input
            type="text"
            className="relative border-none rounded-md px-6 py-0.5 text-alsoit-text-md"
            placeholder="search..."
          />
          <div className="absolute top-3 left-5">
            <SearchIcon />
          </div>
        </div>
        {/* filter section with user data */}
        <div className="flex flex-col justify-evenly">
          <div className="flex justify-evenly w-full py-1.5 border-b-2">
            {assigneeData.map((data) => {
              return (
                <div
                  key={data.id}
                  className={
                    data.title === activeFiltertab
                      ? 'bg-alsoit-purple-400 text-alsoit-gray-50 w-12 px-1 rounded-md border-none'
                      : 'bg-alsoit-gray-50 text-alsoit-gray-200 w-12 px-1 rounded-md border-none'
                  }
                  onClick={() => setActiveFilter(data.title)}
                >
                  {data.title}
                </div>
              );
            })}
          </div>
          {activeFiltertab === 'Teams' ? (
            <div className="flex flex-col space-y-2 w-full">
              {teamMembers.length > 0 &&
                teamMembers.map((user) => (
                  <div key={user?.id} className="flex items-center space-x-2 py-1 border-b-2 w-full">
                    <AvatarWithInitials initials={user?.initials ?? 'UN'} />
                    <span>{user?.name}</span>
                  </div>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
