import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';
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
import { useAppSelector } from '../../../../app/hooks';
import ToolTip from '../../../../components/Tooltip';

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
  const [filteredMembers, setFilteredMembers] = useState<ITeamMembersAndGroup[] | undefined>([]);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Get Team Members
  const { data } = useGetTeamMembers({
    page: 0,
    query: ''
  });
  // const { toggleAssignCurrentTaskId } = useAppSelector((state) => state.task);
  const { mutate: onTaskAssign } = UseTaskAssignService();
  const { mutate: onTaskUnassign } = UseUnassignTask();
  const { mutate: onCheklistItemAssign } = UseChecklistItemAssignee();
  const { mutate: onCheklistItemUnassign } = UseChecklistItemUnassignee();

  // const dispatch = useAppDispatch();
  // const { toggleAssignCurrentTaskId } = useAppSelector((state) => state.task);

  const teamMembers = data?.data.team_members;

  const assignees = task?.assignees;

  const assignedUser = assignees?.map(({ id }: { id: string }) => id);

  const checklistAssignedUserId = assigneeChecklistItem?.assignees.map(({ id }: { id: string }) => id);

  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);

  const handleAssignTask = (id: string) => {
    onTaskAssign({
      taskId: itemId,
      team_member_id: id
    });
  };

  const handleUnAssignTask = (id: string) => {
    onTaskUnassign({
      taskId: itemId,
      team_member_id: id
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
    // setSearchInput(value);
    setSearchInput(value);
    if (searchInput !== '') {
      const filtered = teamMembers?.filter((item) => {
        return item.user.name.includes(searchInput);
      });
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(teamMembers);
    }
  };

  return (
    <>
      {option === 'task' && (
        <Button id="basic-button" style={{ marginLeft: '-25px' }}>
          {assignees?.length ? (
            <div className="flex">
              <GroupAssignee data={assignees} itemId={itemId as string} handleClick={handleClick} />
            </div>
          ) : (
            <ToolTip tooltip="Assign">
              <span onClick={handleClick}>
                <UserPlusIcon
                  className="text-xl text-gray-400 items-center justify-center cursor-pointer"
                  style={{
                    width: ` ${CompactView || CompactViewWrap ? '20px' : '26px'}`
                  }}
                  aria-hidden="true"
                />
              </span>
            </ToolTip>
          )}
        </Button>
      )}
      {option === 'checklist' && (
        <Button id="basic-button" onClick={handleClick}>
          {checklistAssignedUserId?.length ? (
            <GroupAssignee data={assigneeChecklistItem?.assignees} />
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
        <section className="relative flex">
          <AiOutlineSearch className="absolute w-5 h-5 right-3 top-3" />
          <input
            type="text"
            placeholder="Search..."
            className="w-11/12 m-auto p-2 border-0 focus:outline-none rounded-md"
            onChange={(e) => searchItem(e.target.value)}
          />
        </section>

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
                          initials={item.user.initials as string}
                          backgroundColour={item.colour}
                          height="h-8"
                          width="w-8"
                        />
                      </div>

                      <p className="text-sm text-black">{item.user.name.toLocaleUpperCase()}</p>
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
                  <div className="flex items-center justify-between cursor-pointer w-full  ">
                    <div
                      className="relative flex items-center space-x-2 cursor-pointer "
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
                        <AvatarWithInitials
                          initials={item.user.initials as string}
                          backgroundColour={item.colour}
                          height="h-8"
                          width="w-8"
                        />
                      </span>
                      <p className="text-sm text-black ">{item.user.name.toLocaleUpperCase()}</p>
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
