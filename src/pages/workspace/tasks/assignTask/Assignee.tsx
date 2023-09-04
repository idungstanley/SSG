import React, { useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { AvatarWithInitials } from '../../../../components';
import GroupAssignee from './GroupAssignee';
import { ICheckListItems } from '../../../../features/task/interface.tasks';
import { ImyTaskData, setSelectedTaskParentId, setSelectedTaskType } from '../../../../features/task/taskSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import { useGetTeamMemberGroups } from '../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { cl } from '../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import AssigneeItem from './AssigneeItem';
import AlsoitMenuDropdown from '../../../../components/DropDowns';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

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
  const dispatch = useAppDispatch();

  const { currTeamMemberId } = useAppSelector((state) => state.task);

  const [searchInput, setSearchInput] = useState<string>('');
  const [teams, setTeams] = useState<boolean>(false);
  const [filteredMembers, setFilteredMembers] = useState<ITeamMembersAndGroup[] | undefined>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedTaskParentId((task?.list_id || task?.parent_id) as string));
    dispatch(setSelectedTaskType(task?.list_id ? EntityType.task : EntityType.subtask));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Get Team Members
  const { data } = teams ? useGetTeamMemberGroups(0) : useGetTeamMembers({ page: 0, query: '' });

  const userObj = data?.data.team_members?.find((userObj) => userObj?.id === currTeamMemberId);

  const teamMembers = teams ? data?.data.team_member_groups : data?.data.team_members;
  // const assignees = task?.assignees;
  const assignees = task?.assignees;

  const assignedUser = assignees?.map(({ id }: { id: string }) => id);

  const checklistAssignedUserId = assigneeChecklistItem?.assignees.map(({ id }: { id: string }) => id);

  const searchItem = (value: string) => {
    setSearchInput(value);
    if (searchInput) {
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
      {option === 'getTeamId' ? (
        <div id="basic-button">
          {userObj ? (
            <div>
              <button className="border-2 border-red-400 rounded-full" onClick={handleClick}>
                <AvatarWithInitials initials={userObj.user.initials} backgroundColour={userObj.color} badge={true} />
              </button>
            </div>
          ) : (
            <span onClick={handleClick}>
              <UserPlusIcon
                className="items-center justify-center text-xl text-gray-400 cursor-pointer"
                style={{
                  width: '26px'
                }}
                aria-hidden="true"
              />
            </span>
          )}
        </div>
      ) : (
        <>
          {assignees?.length ? (
            <div className="flex">
              <GroupAssignee
                data={assignees as ITeamMembersAndGroup[]}
                itemId={itemId as string}
                teams={teams}
                handleClick={handleClick}
              />
            </div>
          ) : (
            <span onClick={handleClick}>
              <UserPlusIcon
                className="items-center justify-center text-xl text-gray-400 cursor-pointer"
                style={{
                  width: '26px'
                }}
                aria-hidden="true"
              />
            </span>
          )}
        </>
      )}
      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl as HTMLDivElement | null}>
        <div className="overflow-scroll" style={{ maxHeight: '400px' }}>
          <section className="relative sticky z-10 flex items-center bg-white top-2">
            <AiOutlineSearch className="absolute w-5 h-5 right-3" />
            <input
              type="text"
              placeholder="Search..."
              className="w-11/12 p-2 m-auto border-0 rounded-md focus:outline-none"
              onKeyDown={handleKeyDown}
              onChange={(e) => searchItem(e.target.value)}
            />
          </section>
          <div className="sticky z-10 flex items-center justify-between w-full px-4 my-2 bg-white top-12">
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
