import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import AssigneeIcon from '../../../../assets/icons/Assignee';
import { FilterListIcon } from '../../../../assets/icons/FilterListIcon';
import Me from '../../../../assets/icons/Me';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import ShowIcon from '../../../../assets/icons/ShowIcon';
import CollapseIcon from '../../../Views/ui/collapseIcon/CollapseIcon';
import { User } from './ClockLog';
import { TimeLogAssigneeDropDown } from './ClockLogAssigneeDropDown';

interface Props {
  handleShowLogs: () => void;
  showLogs: boolean;
  handleFilters: (filterBy: string, searchStr: string) => void;
  meMode: boolean;
  assigneeId: string | undefined;
  teamMembers: User[];
}

export function ClockLogHeader({ handleShowLogs, showLogs, handleFilters, meMode, assigneeId, teamMembers }: Props) {
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { currentUserId } = useAppSelector((state) => state.auth);

  const [assigneedropdown, setAssigneeDropDown] = useState<boolean>(false);
  const [teamMembersArr, setTeamMemberArr] = useState<User[]>([...new Set(teamMembers)]);

  useEffect(() => {
    teamMembers && setTeamMemberArr([...new Set(teamMembers)]);
  }, [teamMembers]);

  return (
    <div className="flex justify-between items-center absolute -top-0 left-0 w-full">
      <div className="flex space-x-1 items-center">
        <label
          htmlFor="time_logs"
          className="bg-alsoit-gray-100 text-alsoit-gray-50 p-1.5 rounded-l-sm flex gap-2 items-center uppercase text-alsoit-text-md font-semibold h-8 w-32"
        >
          <div className="cursor-pointer">
            <CollapseIcon color="#A854F7" active={showLogs} onToggle={() => handleShowLogs()} hoverBg="white" />
          </div>
          Time Inventory
        </label>
        <span className="text-alsoit-text-md">{activeItemName}</span>
      </div>
      <div className="flex justify-end space-x-1 px-1.5">
        <div className="p-1 rounded-sm bg-alsoit-gray-50">
          <ShowIcon color="gray" />
        </div>
        <div className="p-1 rounded-sm bg-alsoit-gray-50">
          <FilterListIcon active={false} />
        </div>
        <div
          className={`p-1 rounded-sm bg-alsoit-gray-50 cursor-pointer ${meMode && 'bg-alsoit-purple-50'}`}
          onClick={() => handleFilters('me', currentUserId as string)}
        >
          <Me active={meMode} />
        </div>
        <div
          className={`relative p-1 rounded-sm bg-alsoit-gray-50 cursor-pointer ${assigneeId && 'bg-alsoit-purple-50'}`}
          onClick={() => setAssigneeDropDown(!assigneedropdown)}
        >
          <AssigneeIcon active={false} />
          {assigneedropdown && <TimeLogAssigneeDropDown teamMembers={teamMembersArr} />}
        </div>
        <div className="p-1 rounded-sm bg-alsoit-gray-50">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}
