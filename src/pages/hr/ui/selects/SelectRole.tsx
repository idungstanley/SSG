import React from 'react';

interface RoleProps {
  selectMemberRole: (id: string) => void;
}

export function SelectRole({ selectMemberRole }: RoleProps) {
  return (
    <select
      id="current-tab"
      name="current-tab"
      className="flex items-center h-12 mx-2 border-t opacity-90 w-11/12"
      onChange={(e) => selectMemberRole(e.target.value)}
    >
      <option key="0" value="">
        Select role
      </option>
      <option value="Administrator">Administrator</option>
      <option value="Bookkeeping">Bookkeeping</option>
      <option value="Director">Director</option>
      <option value="Accountant">Accountant</option>
      <option value="Graphic Designer">Graphic Designer</option>
      <option value="Marketing">Marketing</option>
    </select>
  );
}
