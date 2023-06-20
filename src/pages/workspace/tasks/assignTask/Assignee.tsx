import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TrashIcon } from '@heroicons/react/24/solid';
import { UseTaskAssignService, UseUnassignTask } from '../../../../features/task/taskService';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { AvatarWithInitials } from '../../../../components';
import GroupAssignee from './GroupAssignee';
import {
  UseChecklistItemAssignee,
  UseChecklistItemUnassignee
} from '../../../../features/task/checklist/checklistService';
import { ICheckListItems } from '../../../../features/task/interface.tasks';
import { CgProfile } from 'react-icons/cg';
import { ImyTaskData } from '../../../../features/task/taskSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import { useGetTeamMemberGroups } from '../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { cl } from '../../../../utils';
// import AvatarForOwner from '../../../../components/avatar/AvatarForOwner';
import unassignedIcon from '../../../../assets/icons/unassignedIcon.png';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';

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
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Get Team Members
  const { data } = teams ? useGetTeamMemberGroups(0) : useGetTeamMembers({ page: 0, query: '' });

  const { mutate: onTaskAssign } = UseTaskAssignService();
  const { mutate: onTaskUnassign } = UseUnassignTask();
  const { mutate: onCheklistItemAssign } = UseChecklistItemAssignee();
  const { mutate: onCheklistItemUnassign } = UseChecklistItemUnassignee();

  const teamMembers = teams ? data?.data.team_member_groups : data?.data.team_members;
  // const assignees = task?.assignees;
  const assignees = [...(task?.assignees ?? []), ...(task?.group_assignees ?? [])];

  const assignedUser = assignees?.map(({ id }: { id: string }) => id);

  const checklistAssignedUserId = assigneeChecklistItem?.assignees.map(({ id }: { id: string }) => id);

  const handleAssignTask = (id: string) => {
    onTaskAssign({
      taskId: itemId,
      team_member_id: id,
      teams: teams
    });
  };

  const handleUnAssignTask = (id: string) => {
    onTaskUnassign({
      taskId: itemId,
      team_member_id: id,
      teams: teams
    });
  };

  const handleAssignChecklist = (id: string) => {
    onCheklistItemAssign({
      itemId: itemId,
      team_member_id: id
    });
  };

  const handleUnAssignChecklistItem = (id: string) => {
    onCheklistItemUnassign({
      itemId: itemId,
      team_member_id: id
    });
  };

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
      {option === 'task' && (
        <Button id="basic-button">
          {assignees?.length ? (
            <div className="flex">
              <GroupAssignee data={assignees} itemId={itemId as string} handleClick={handleClick} teams={teams} />
            </div>
          ) : (
            <span onClick={handleClick}>
              <img src={unassignedIcon} alt="" />
            </span>
          )}
        </Button>
      )}
      {option === 'checklist' && (
        <Button id="basic-button" onClick={handleClick}>
          {checklistAssignedUserId?.length ? (
            <GroupAssignee data={assigneeChecklistItem?.assignees} teams={teams} />
          ) : (
            <span>
              <CgProfile />
            </span>
          )}
        </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        autoFocus={false}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        className="ml-10"
        PaperProps={{
          style: {
            height: 300,
            overflowY: 'auto',
            width: '300px'
          }
        }}
      >
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
                <MenuItem key={item.id} onClick={handleClose} className="w-full ">
                  <div className="flex items-center justify-between cursor-pointer w-full">
                    <div
                      className="relative flex items-center space-x-2 cursor-pointer"
                      onClick={() =>
                        option === 'checklist'
                          ? handleAssignChecklist(item.id)
                          : option === 'task'
                          ? handleAssignTask(item.id)
                          : null
                      }
                    >
                      <div>
                        <AvatarWithInitials
                          initials={teams ? item.initials : (item.user.initials as string)}
                          backgroundColour={teams ? item.color : item.user.color}
                          height="h-8"
                          width="w-8"
                        />
                      </div>

                      <p className="text-sm text-black">{teams ? item.name : item.user.name.toLocaleUpperCase()}</p>
                    </div>
                    {assignedUser?.includes(item.id) || checklistAssignedUserId?.includes(item.id) ? (
                      <button
                        type="button"
                        className="mx-2"
                        onClick={() =>
                          option == 'task' ? handleUnAssignTask(item.id) : handleUnAssignChecklistItem(item.id)
                        }
                      >
                        <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                      </button>
                    ) : null}
                  </div>
                </MenuItem>
              );
            })
          : teamMembers?.map((item) => {
              return (
                <MenuItem key={item.id} onClick={handleClose} className="w-full">
                  <div className="flex items-center justify-between cursor-pointer w-full">
                    <div
                      className="relative flex items-center space-x-2 cursor-pointer"
                      onClick={() =>
                        option === 'checklist'
                          ? handleAssignChecklist(item.id)
                          : option === 'task'
                          ? handleAssignTask(item.id)
                          : null
                      }
                    >
                      <span
                        className={`${
                          assignedUser?.includes(item.id) ? 'ring ring-green-500 ring-offset-2 rounded-full ' : null
                        }`}
                      >
                        {!teams ? (
                          <div>
                            {item.user.avatar_path == null && (
                              <AvatarWithInitials
                                initials={item.user.initials}
                                backgroundColour={item.user.color}
                                height="h-8"
                                width="w-8"
                              />
                            )}
                            {item.user.avatar_path && (
                              <AvatarWithImage image_path={item.user.avatar_path} height="h-8" width="w-8" />
                            )}
                          </div>
                        ) : (
                          <AvatarWithInitials
                            initials={item.initials}
                            backgroundColour={item.color}
                            height="h-8"
                            width="w-8"
                          />
                        )}
                      </span>
                      <p className="text-sm text-black ">{teams ? item.name : item.user.name.toLocaleUpperCase()}</p>
                    </div>

                    {assignedUser?.includes(item.id) || checklistAssignedUserId?.includes(item.id) ? (
                      <button
                        type="button"
                        className="mx-2"
                        onClick={() =>
                          option == 'task' ? handleUnAssignTask(item.id) : handleUnAssignChecklistItem(item.id)
                        }
                      >
                        <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                      </button>
                    ) : null}
                  </div>
                </MenuItem>
              );
            })}

        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </>
  );
}
