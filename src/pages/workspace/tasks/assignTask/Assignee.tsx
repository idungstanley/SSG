import React, { useEffect, useRef, useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
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
import UserAvatar from './UserAvatar';
import { VerticalScroll } from '../../../../components/ScrollableContainer/VerticalScroll';

export default function Assignee({
  itemId,
  option,
  assigneeChecklistItem,
  task,
  icon,
  isAdditionalHeader,
  isWatchers,
  activeColumn
}: {
  itemId?: string;
  option: string;
  assigneeChecklistItem?: ICheckListItems;
  task?: ImyTaskData | undefined;
  icon?: React.ReactNode;
  isAdditionalHeader?: boolean;
  isWatchers?: boolean;
  activeColumn?: boolean[];
}) {
  const dispatch = useAppDispatch();

  const { currTeamMemberId, KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);

  const [searchInput, setSearchInput] = useState<string>('');
  const [teams, setTeams] = useState<boolean>(false);
  const [filteredMembers, setFilteredMembers] = useState<ITeamMembersAndGroup[] | undefined>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedTaskParentId((task?.parent_id || task?.list_id) as string));
    dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Get Team Members
  const { data } = teams ? useGetTeamMemberGroups(0) : useGetTeamMembers({ page: 0, query: '' });

  const userObj = data?.data.team_members?.find((userObj) => userObj?.id === currTeamMemberId);

  const teamMembers = teams ? data?.data.team_member_groups : data?.data.team_members;

  const assignees = option === 'checklist' ? assigneeChecklistItem?.assignees : task?.assignees;

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

  const { saveSettingOnline } = useAppSelector((state) => state.task);

  const renderIcon = () => {
    if (isAdditionalHeader) {
      return (
        <span onClick={handleClick}>
          {icon ? (
            icon
          ) : (
            <UserPlusIcon
              className="items-center justify-center text-xl text-gray-400 cursor-pointer"
              style={{
                width: '26px'
              }}
              aria-hidden="true"
            />
          )}
        </span>
      );
    } else {
      if (userObj) {
        return (
          <div>
            <UserAvatar user={userObj} handleClick={handleClick} />
          </div>
        );
      }
      return (
        <span onClick={handleClick}>
          <UserPlusIcon
            className="items-center justify-center text-xl text-gray-400 cursor-pointer"
            style={{
              width: saveSettingOnline?.CompactView ? '20px' : '26px'
            }}
            aria-hidden="true"
          />
        </span>
      );
    }
  };

  const handleKeyBoardDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setAnchorEl(containerRef.current);
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }
      containerRef.current.addEventListener('keydown', handleKeyBoardDown);
    }

    return () => containerRef.current?.removeEventListener('keydown', handleKeyBoardDown);
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div ref={containerRef} tabIndex={0} className="w-full h-full flex items-center justify-center focus:ring-0">
      {option === 'getTeamId' ? (
        <div id="basic-button">{renderIcon()}</div>
      ) : (
        <>
          {assignees?.length ? (
            <div className="flex">
              <GroupAssignee
                data={assignees as ITeamMembersAndGroup[]}
                itemId={itemId as string}
                teams={teams}
                handleClick={handleClick}
                option={option}
              />
            </div>
          ) : (
            renderIcon()
          )}
        </>
      )}
      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl as HTMLDivElement | null}>
        <VerticalScroll>
          <div style={{ maxHeight: '400px' }}>
            <section className="relative sticky z-10 flex items-center bg-white top-1">
              <AiOutlineSearch className="absolute w-5 h-5 right-3" />
              <input
                type="text"
                placeholder="Search..."
                className="w-11/12 p-2 m-auto border-0 rounded-md focus:outline-none focus:ring-0"
                onKeyDown={handleKeyDown}
                onChange={(e) => searchItem(e.target.value)}
              />
            </section>
            <div className="sticky z-10 flex items-center justify-between w-full px-4 my-2 bg-white top-12">
              <p
                className={cl(
                  'flex justify-center w-1/2 cursor-pointer',
                  !teams ? 'border-b-2 border-fuchsia-600' : ''
                )}
                onClick={() => setTeams(false)}
              >
                Users
              </p>
              <p
                className={cl('flex justify-center w-1/2 cursor-pointer', teams ? 'border-b-2 border-fuchsia-600' : '')}
                onClick={() => setTeams(true)}
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
                      isWatchers={isWatchers}
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
                      isWatchers={isWatchers}
                    />
                  );
                })}
          </div>
        </VerticalScroll>
      </AlsoitMenuDropdown>
    </div>
  );
}
