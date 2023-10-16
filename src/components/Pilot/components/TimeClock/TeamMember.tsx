import { useEffect, useState } from 'react';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import { teamMember } from '../../../../features/task/interface.tasks';
import { SlideButton } from '../../../SlideButton';
import AvatarWithImage from '../../../avatar/AvatarWithImage';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { useGetTimeEntriesMutation } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

export function TeamMemberFilter() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { timeAssignees } = useAppSelector((state) => state.task);

  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const [teamMemberId, setTeamMemberId] = useState<string[]>([]);

  const { mutateAsync } = useGetTimeEntriesMutation();

  const handleChange = (index: number) => {
    const newCheckedState = [...checkedState];
    newCheckedState[index] = !newCheckedState[index];
    const memberId = (timeAssignees && timeAssignees[index].id) ?? '';
    const arr = !teamMemberId.includes(memberId)
      ? Array.from(new Set([...teamMemberId, memberId]))
      : teamMemberId.filter((items) => !items);
    setTeamMemberId(arr);
    setCheckedState(newCheckedState);
  };

  const uniqueUsersMap = new Map<string, teamMember>();

  timeAssignees?.forEach((entry) => {
    const userId = entry.user.id;
    if (!uniqueUsersMap.has(userId)) {
      uniqueUsersMap.set(userId, entry);
    }
  });

  const uniqueTimeData = Array.from(uniqueUsersMap.values());

  useEffect(() => {
    if (teamMemberId.length > 0)
      mutateAsync({
        itemId: activeItemId,
        trigger:
          activeItemType === EntityType.hub || activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
        team_member_ids: teamMemberId,
        include_filters: true
      });
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
          className="w-full px-5 bg-white border-none rounded-md ring-0 focus:ring-0 text-alsoit-text-md"
        />
        <SearchIcon className="absolute w-3 h-3 top-3.5 left-1.5" />
      </div>
      <div className="flex flex-col space-y-1">
        {uniqueTimeData.map((entry, index) => {
          return (
            <div key={index} className="flex w-full justify-between p-2.5 cursor-pointer hover:bg-alsoit-purple-50">
              <div className="flex items-center space-x-1.5">
                {entry.user.avatar_path ? (
                  <AvatarWithImage image_path={entry.user.avatar_path} height="h-6" width="w-6" />
                ) : (
                  <AvatarWithInitials
                    initials={entry.user.initials}
                    height="h-6"
                    width="w-6"
                    roundedStyle="circular"
                    backgroundColour={entry.user.color}
                  />
                )}
                <span className="font-semibold text-alsoit-text-md">{entry.user.name}</span>
              </div>
              <SlideButton index={index} state={checkedState} changeFn={handleChange} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
