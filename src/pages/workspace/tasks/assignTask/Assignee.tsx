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

  const assignees = task?.assignees;

  const assignedUser = assignees?.map(({ id }: { id: string }) => id);

  const checklistAssignedUserId = assigneeChecklistItem?.assignees.map(({ id }: { id: string }) => id);
  // const { clickedChecklistItemId } = useAppSelector((state) => state.checklist);

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

  return (
    <div>
      {option === 'task' && (
        <Button id="basic-button" onClick={handleClick}>
          {assignees?.length ? (
            <GroupAssignee data={assignees} />
          ) : (
            <UserPlusIcon
              className="ml-2 text-xl text-gray-400 cursor-pointer "
              style={{ width: '30px' }}
              aria-hidden="true"
            />
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
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        className="ml-10"
      >
        <section className="relative flex">
          <AiOutlineSearch className="absolute w-5 h-5 right-3 top-3" />
          <input
            type="text"
            placeholder="Search..."
            className="w-11/12 m-auto p-2 border-0 focus:outline-none rounded-md"
          />
        </section>
        {data?.data.team_members.map((item) => {
          return (
            <MenuItem key={item.id} onClick={handleClose} className="w-60">
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
                  <AvatarWithInitials
                    initials={item.initials}
                    backgroundColour={item.colour}
                    height="h-5"
                    width="w-5"
                  />
                  <p className="text-xs text-black">{item.user.name.toLocaleUpperCase()}</p>
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
    </div>
  );
}
