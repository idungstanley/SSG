import * as React from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { AvatarWithInitials } from '../../../../components';
import GroupAssignee from './GroupAssignee';
import { ICheckListItems } from '../../../../features/task/interface.tasks';
import { ImyTaskData } from '../../../../features/task/taskSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import { useGetTeamMemberGroups } from '../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { cl } from '../../../../utils';
import { useAppSelector } from '../../../../app/hooks';
import AssigneeItem from './AssigneeItem';
import AlsoitMenuDropdown from '../../../../components/DropDowns';

export default function Assignee({
  itemId,
  option,
  assigneeChecklistItem,
  task
}: {
  itemId?: string;
  option: string;
  assigneeChecklistItem?: ICheckListItems;
  task?: ImyTaskData | undefined;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [teams, setTeams] = React.useState<boolean>(false);
  const [filteredMembers, setFilteredMembers] = useState<ITeamMembersAndGroup[] | undefined>([]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Get Team Members
  const { data } = teams ? useGetTeamMemberGroups(0) : useGetTeamMembers({ page: 0, query: '' });
  const { currTeamMemberId } = useAppSelector((state) => state.task);

  const userObj = data?.data.team_members?.find((userObj) => userObj?.id === currTeamMemberId);

  const teamMembers = teams ? data?.data.team_member_groups : data?.data.team_members;
  // const assignees = task?.assignees;
  const assignees = [...(task?.assignees ?? []), ...(task?.group_assignees ?? [])];

  const assignedUser = assignees?.map(({ id }: { id: string }) => id);

  const checklistAssignedUserId = assigneeChecklistItem?.assignees.map(({ id }: { id: string }) => id);

  const searchItem = (value: string) => {
    setSearchInput(value);
    if (searchInput !== '') {
      const filtered = teamMembers?.filter((el) => el.user.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(teamMembers);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };
  return (
    <>
      {option !== 'getTeamId' && (
        <>
          {assignees?.length ? (
            <div className="flex">
              <GroupAssignee data={assignees} itemId={itemId as string} handleClick={handleClick} teams={teams} />
            </div>
          ) : (
            <span onClick={handleClick}>
              <UserPlusIcon
                className="text-xl text-gray-400 items-center justify-center cursor-pointer"
                style={{
                  width: '26px'
                }}
                aria-hidden="true"
              />
            </span>
          )}
        </>
      )}
      {option === 'getTeamId' && (
        <div id="basic-button">
          {userObj ? (
            <div className="">
              <button className="border-2 border-red-400  rounded-full" onClick={handleClick}>
                <AvatarWithInitials initials={userObj.user.initials} backgroundColour={userObj.color} badge={true} />
              </button>
            </div>
          ) : (
            <span onClick={handleClick}>
              <UserPlusIcon
                className="text-xl text-gray-400 items-center justify-center cursor-pointer"
                style={{
                  width: '26px'
                }}
                aria-hidden="true"
              />
            </span>
          )}
        </div>
      )}
      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl as HTMLDivElement | null}>
        <div className="overflow-scroll" style={{ maxHeight: '400px' }}>
          <section className="relative flex items-center sticky top-2 bg-white z-10">
            <AiOutlineSearch className="absolute w-5 h-5 right-3" />
            <input
              type="text"
              placeholder="Search..."
              className="w-11/12 m-auto p-2 border-0 focus:outline-none rounded-md"
              onKeyDown={handleKeyDown}
              onChange={(e) => searchItem(e.target.value)}
            />
          </section>
          <div className="w-full flex justify-between items-center px-4 my-2 sticky top-12 bg-white z-10">
            <p
              className={cl('flex justify-center w-1/2 cursor-pointer', !teams ? 'border-b-2 border-fuchsia-600' : '')}
              onClick={() => setTeams(!teams)}
            >
              Users
            </p>
            <p
              className={cl('flex justify-center w-1/2 cursor-pointer', teams ? 'border-b-2 border-fuchsia-600' : '')}
              onClick={() => setTeams(!teams)}
            >
              Teams
            </p>
          </div>
          {searchInput.length > 1
            ? filteredMembers?.map((item) => {
                return (
                  <AssigneeItem
                    key={item.id}
                    item={item}
                    option={option}
                    entity_id={itemId}
                    teams={teams}
                    handleClose={handleClose}
                    isAssigned={assignedUser?.includes(item.id) || checklistAssignedUserId?.includes(item.id)}
                  />
                );
              })
            : teamMembers?.map((item) => {
                return (
                  <AssigneeItem
                    key={item.id}
                    item={item}
                    option={option}
                    entity_id={itemId}
                    teams={teams}
                    handleClose={handleClose}
                    isAssigned={assignedUser?.includes(item.id) || checklistAssignedUserId?.includes(item.id)}
                  />
                );
              })}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
