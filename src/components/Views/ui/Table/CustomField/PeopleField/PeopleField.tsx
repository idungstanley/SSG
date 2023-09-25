import React, { useState } from 'react';
import { IField } from '../../../../../../features/list/list.interfaces';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import AssigneeDropdown from '../../../../../Assigness';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { ITeamMembersAndGroup } from '../../../../../../features/settings/teamMembersAndGroups.interfaces';

interface PeopleField {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  entityCustomProperty?: IField;
}

function PeopleField({ taskCustomFields, taskId, fieldId, entityCustomProperty }: PeopleField) {
  const [anchorEl, setAncholEl] = useState<null | HTMLElement>(null);
  console.log(entityCustomProperty);

  const handleClick = (member: ITeamMembersAndGroup) => {
    console.log(member);
  };
  return (
    <div>
      <button onClick={(e) => setAncholEl(e.currentTarget)}>
        <UserPlusIcon
          className="items-center justify-center text-xl text-gray-400 cursor-pointer"
          style={{
            width: '26px'
          }}
          aria-hidden="true"
        />
      </button>
      <AssigneeDropdown anchor={anchorEl} setAnchor={setAncholEl} handleClick={handleClick} />
    </div>
  );
}

export default PeopleField;
