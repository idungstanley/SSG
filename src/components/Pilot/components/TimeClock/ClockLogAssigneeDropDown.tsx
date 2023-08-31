import { useState } from 'react';
import { User } from './ClockLog';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import AvatarWithImage from '../../../avatar/AvatarWithImage';

interface AssigneeProps {
  teamMembers: User[];
}

export function TimeLogAssigneeDropDown({ teamMembers }: AssigneeProps) {
  const assigneeData = [
    { id: 1, title: 'Teams', data: teamMembers },
    { id: 2, title: 'Users', data: [] }
  ];

  const [activeFiltertab, setActiveFilter] = useState<string>('Teams');
  const [team, setTeam] = useState<User[]>([...new Set(teamMembers)]);

  const handleSearch = (searchStr: string) => {
    const filteredUsers = [...new Set(teamMembers)].filter((teamMember) =>
      teamMember.name.toLowerCase().includes(searchStr.toLowerCase())
    );
    if (searchStr.length > 0) {
      setTeam(filteredUsers);
    } else {
      setTeam([...new Set(teamMembers)]);
    }
  };

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
            onChange={(e) => handleSearch(e.target.value)}
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
                      ? 'bg-alsoit-purple-400 text-alsoit-gray-50 px-2.5 rounded-xl border-none'
                      : 'bg-alsoit-gray-50 text-alsoit-gray-200 px-2.5 rounded-xl border-none'
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
              {teamMembers.length > 0 && team.map((user) => <LogAssigneeDropDown key={user.id} user={user} />)}
            </div>
          ) : (
            <div className="text-center">Under construction</div>
          )}
        </div>
      </div>
    </div>
  );
}

interface LogAssigneeDropDownProps {
  user: User;
}

function LogAssigneeDropDown({ user }: LogAssigneeDropDownProps) {
  return (
    <div key={user?.id} className="flex items-center space-x-2 py-1 border-b-2 w-full">
      {user.avatar_path ? (
        <AvatarWithImage image_path={user.avatar_path} roundedStyle="circular" />
      ) : (
        <AvatarWithInitials height="h-10" width="w-10" initials={user?.initials ?? 'UN'} />
      )}
      <span>{user?.name}</span>
    </div>
  );
}
