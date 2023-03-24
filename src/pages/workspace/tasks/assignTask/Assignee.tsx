import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { getOneTaskService } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { AvatarWithInitials } from '../../../../components';
import GroupAssignee from './GroupAssignee';

export default function Assignee({ itemId }: { itemId?: string }) {
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

  const { toggleAssignCurrentTaskId } = useAppSelector((state) => state.task);
  const { data: getTaskAssignees } = getOneTaskService({
    task_id: itemId
  });
  const assignedUser = getTaskAssignees?.data?.task?.assignees?.map(({ id }: { id: string }) => id);

  const assignees = getTaskAssignees?.data?.task?.assignees;

  console.log(toggleAssignCurrentTaskId);

  return (
    <div>
      <Button
        id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <div>
          <UserPlusIcon
            className="ml-2 text-xl text-gray-400 cursor-pointer "
            style={{ width: '30px' }}
            aria-hidden="true"
          />
          {assignees ? <GroupAssignee data={assignees} /> : null}
          {/* <GroupAssignee data={taskAssignees} /> */}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {data?.data.team_members.map((item) => {
          return (
            <MenuItem key={item.id} onClick={handleClose}>
              <div className="flex items-center justify-between cursor-pointer">
                <div className="relative flex items-center space-x-2 cursor-pointer">
                  <AvatarWithInitials
                    initials={item.initials}
                    backgroundColour={item.colour}
                    height="h-5"
                    width="w-5"
                  />
                  <p className="text-xs text-black">{item.user.name.toLocaleUpperCase()}</p>
                </div>
                {assignedUser?.includes(item.id) ? (
                  <button type="button" className="mx-2">
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
