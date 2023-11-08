import React, { useState } from 'react';
import UserAvatar from '../../../../../pages/workspace/tasks/assignTask/UserAvatar';
import Toggle from './Toggle';
import RoleDropdown from './RoleDropdown';
import ArrowDown from '../../../../../assets/icons/ArrowDown';

// To be removed
const user = {
  color: 'green',
  id: '12345',
  name: 'Stanley Nicholas',
  is_active: true,
  is_online: true,
  invited_at: 'string',
  created_at: 'string',
  updated_at: 'string',
  user: {
    color: 'blue',
    name: 'Stanley Nicholas',
    id: 'string',
    email: 'string',
    initials: 'SN',
    avatar_path: null,
    timezone: 'string'
  },
  initials: 'SN',
  colour: 'string',
  role: {
    key: 'string',
    name: 'string'
  }
};

function People({ showToggle }: { showToggle: boolean }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <UserAvatar user={user} width="w-4" height="h-4" />
          <h2>{user.name}</h2>
        </div>
        <div className="flex gap-2 items-center">
          <span
            className="border border-alsoit-gray-100 text-alsoit-text-md rounded w-12 flex justify-center items-center gap-1 cursor-pointer"
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            Full <ArrowDown className="w-2 h-2" />
          </span>
          {showToggle && <Toggle />}
        </div>
      </div>
      <RoleDropdown anchor={anchor} setAnchor={setAnchor} />
    </div>
  );
}

export default People;
