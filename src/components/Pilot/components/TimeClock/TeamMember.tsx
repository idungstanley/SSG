import { useEffect, useState } from 'react';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import { IEntries } from '../../../../features/task/interface.tasks';
import { SlideButton } from '../../../SlideButton';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { useAppDispatch } from '../../../../app/hooks';
import { setTimeAssigneeFilter } from '../../../../features/task/taskSlice';

interface Props {
  timeData?: IEntries[];
}

export function TeamMemberFilter({ timeData }: Props) {
  const dispatch = useAppDispatch();

  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const [teamMemberId, setTeamMemberId] = useState<string[]>([]);

  const handleChange = (index: number) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    const memberId = (timeData && timeData[index].team_member.id) ?? '';
    const arr = Array.from(new Set([...teamMemberId, memberId]));
    setTeamMemberId(arr);
    setCheckedState(newCheckedState);
  };

  const uniqueUsersMap = new Map<string, IEntries>();

  timeData?.forEach((entry) => {
    const userId = entry.team_member.user.id;
    if (!uniqueUsersMap.has(userId)) {
      uniqueUsersMap.set(userId, entry);
    }
  });

  const uniqueTimeData = Array.from(uniqueUsersMap.values());

  useEffect(() => {
    const filteredArr = timeData?.filter((entry) => teamMemberId.includes(entry.team_member.id));
    teamMemberId.length > 0 && dispatch(setTimeAssigneeFilter(filteredArr));
  }, [teamMemberId]);

  return (
    <div
      className="absolute right-0 top-5 z-40 flex flex-col space-y-1.5 py-1.5 w-56 rounded shadow-xl bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-full border-b">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md ring-0 focus:ring-0 border-none bg-white px-5 text-alsoit-text-md"
        />
        <SearchIcon className="absolute w-3 h-3 top-3.5 left-1.5" />
      </div>
      <div className="flex flex-col space-y-1">
        {uniqueTimeData.map((entry, index) => {
          return (
            <div key={index} className="flex w-full justify-between p-2.5 cursor-pointer hover:bg-alsoit-purple-50">
              <div className="flex items-center space-x-1.5">
                {entry.team_member.user.avatar_path ? (
                  <AvatarWithImage image_path={entry.team_member.user.avatar_path} height="h-6" width="w-6" />
                ) : (
                  <AvatarWithInitials
                    initials={entry.team_member.user.initials}
                    height="h-6"
                    width="w-6"
                    roundedStyle="circular"
                    backgroundColour={entry.team_member.user.color}
                  />
                )}
                <span className="text-alsoit-text-md font-semibold">{entry.team_member.user.name}</span>
              </div>
              <SlideButton index={index} state={checkedState} changeFn={handleChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
