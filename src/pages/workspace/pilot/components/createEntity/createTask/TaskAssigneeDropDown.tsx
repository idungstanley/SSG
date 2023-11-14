import { useState } from 'react';
import { setCurrentTeamMemberId } from '../../../../../../features/task/taskSlice';
import AvatarWithImage from '../../../../../../components/avatar/AvatarWithImage';
import { AvatarWithInitials } from '../../../../../../components';
import { useAppDispatch } from '../../../../../../app/hooks';
import { useGetTeamMemberGroups } from '../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';

export function AssigneeDropDown() {
  const dispatch = useAppDispatch();

  const [teams, setTeam] = useState(false);

  const { data } = teams ? useGetTeamMemberGroups(0) : useGetTeamMembers({ query: '', page: 0 });

  const users = teams ? data?.data.team_member_groups : data?.data.team_members;
  return (
    <div
      className="absolute top-7 z-50 left-0 w-44 shadow-lg rounded-lg bg-white p-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between w-full">
        <span
          onClick={() => setTeam(false)}
          className={`${!teams && 'border-b-alsoit-border-sm border-alsoit-purple-400'} w-1/2 cursor-pointer pb-1.5`}
        >
          Users
        </span>
        <span
          onClick={() => setTeam(true)}
          className={`${teams && 'border-b-alsoit-border-sm border-alsoit-purple-400'} w-1/2 cursor-pointer pb-1.5`}
        >
          Teams
        </span>
      </div>
      {teams ? (
        <div className="flex flex-col space-y-2 p-1.5">teams</div>
      ) : (
        <div className="flex flex-col space-y-2 p-1.5">
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex w-full space-x-2.5 text-start py-2.5 px-1 rounded-md cursor-pointer hover:bg-alsoit-gray-50"
              onClick={() => dispatch(setCurrentTeamMemberId([user.id]))}
            >
              {user.user.avatar_path ? (
                <AvatarWithImage image_path={user.user.avatar_path} height="h-5" width="w-5" />
              ) : (
                <AvatarWithInitials
                  initials={user.user.initials}
                  backgroundColour={user.user.color}
                  height="h-5"
                  width="w-5"
                />
              )}
              <span>{user.user.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
