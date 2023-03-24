import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserPlusIcon } from '@heroicons/react/24/solid';
// import { getOneTaskService } from '../../../../features/task/taskService';
// import { useAppSelector } from '../../../../app/hooks';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';

export default function Assignee() {
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
  // const { data: getTaskAssignees } = getOneTaskService({
  //   task_id: toggleAssignCurrentTaskId
  // });
  // const assignedUser = getTaskAssignees?.data?.task?.assignees?.map(({ id }: { id: string }) => id);

  return (
    <div>
      <Button
        id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <UserPlusIcon
          className="ml-2 text-xl text-gray-400 cursor-pointer "
          style={{ width: '30px' }}
          aria-hidden="true"
        />
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
              {item.user.name}
            </MenuItem>
          );
        })}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
