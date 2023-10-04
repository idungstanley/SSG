import React, { useState } from 'react';
import { IField } from '../../../../../../features/list/list.interfaces';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import AssigneeDropdown from '../../../../../Assigness';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { ITeamMembersAndGroup } from '../../../../../../features/settings/teamMembersAndGroups.interfaces';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';
import GroupAssignee from '../../../../../../pages/workspace/tasks/assignTask/GroupAssignee';

interface PeopleField {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  entityCustomProperty?: IField;
}

interface array2 {
  id: string;
  value: string;
}

const getActiveOptions = (teamMembers: ITeamMembersAndGroup[] | undefined, taskValues: array2[] | undefined) => {
  return teamMembers?.filter((obj1) => taskValues?.find((obj2) => obj2.value === obj1.id));
};

function PeopleField({ taskCustomFields, taskId, fieldId, entityCustomProperty }: PeopleField) {
  const [anchorEl, setAncholEl] = useState<null | HTMLElement>(null);

  const taskActiveValues = taskCustomFields?.values;
  const { data: teamMembers } = useGetTeamMembers({ page: 0, query: '' });
  const assignedMembers = getActiveOptions(teamMembers?.data.team_members, taskActiveValues);
  const singleUser: boolean = entityCustomProperty?.properties?.single_user as boolean;
  const allowGroups: boolean = entityCustomProperty?.properties?.include_groups as boolean;

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleClick = (member: ITeamMembersAndGroup, type: string) => {
    const existValues = taskActiveValues
      ? taskActiveValues.map((i) => ({
          value: i.value,
          type: i.model
        }))
      : [];
    onUpdate({
      taskId,
      value: singleUser ? [{ value: member.id, type: type }] : [...existValues, { value: member.id, type }],
      fieldId
    });
  };

  return (
    <div className="w-full">
      <button className="w-full flex justify-center" onClick={(e) => setAncholEl(e.currentTarget)}>
        {assignedMembers?.length ? (
          <GroupAssignee data={assignedMembers as ITeamMembersAndGroup[]} teams={false} />
        ) : (
          <UserPlusIcon
            className="items-center justify-center text-xl text-gray-400 cursor-pointer"
            style={{
              width: '26px'
            }}
            aria-hidden="true"
          />
        )}
      </button>

      <AssigneeDropdown anchor={anchorEl} setAnchor={setAncholEl} handleClick={handleClick} allowGroups={allowGroups} />
    </div>
  );
}

export default PeopleField;
