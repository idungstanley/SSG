import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { UseTaskAssignService, UseUnassignTask, getOneTaskService } from '../../../../features/task/taskService';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { AvatarWithInitials } from '../../../../components';
import GroupAssignee from './GroupAssignee';
import { UseChecklistItemAssignee } from '../../../../features/task/checklist/checklistService';
// import { useAppSelector } from '../../../../app/hooks';
// import { setToggleAssignCurrentTaskId } from '../../../../features/task/taskSlice';
// import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ICheckListItems } from '../../../../features/task/interface.tasks';

export default function Assignee({
  itemId,
  assigneeLength,
  option,
  assigneeChecklistItem
}: {
  itemId: string;
  assigneeLength: boolean;
  option: string;
  assigneeChecklistItem?: ICheckListItems;
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

  // const dispatch = useAppDispatch();
  // const { toggleAssignCurrentTaskId } = useAppSelector((state) => state.task);
  const { data: getTaskAssignees } = getOneTaskService({
    task_id: itemId
  });

  const assignedUser = getTaskAssignees?.data?.task?.assignees?.map(({ id }: { id: string }) => id);
  // const { clickedChecklistItemId } = useAppSelector((state) => state.checklist);

  const assignees = getTaskAssignees?.data?.task?.assignees;

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

  return (
    <div>
      <Button
        id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {assigneeLength && assignees?.length ? (
          <GroupAssignee data={assignees} />
        ) : (
          <UserPlusIcon
            className="ml-2 text-xl text-gray-400 cursor-pointer "
            style={{ width: '30px' }}
            aria-hidden="true"
          />
        )}
      </Button>
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
        {data?.data.team_members.map((item) => {
          return (
            <MenuItem key={item.id} onClick={handleClose}>
              <div className="flex items-center justify-between cursor-pointer">
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
                {assignedUser?.includes(item.id) ? (
                  <button
                    type="button"
                    className="mx-2"
                    onClick={() => (option == 'task' ? handleUnAssignTask(item.id) : null)}
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
