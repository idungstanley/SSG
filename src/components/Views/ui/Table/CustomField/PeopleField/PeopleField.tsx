import React, { useEffect, useRef, useState } from 'react';
import { IField } from '../../../../../../features/list/list.interfaces';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import AssigneeDropdown from '../../../../../Assigness';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { ITeamMembersAndGroup } from '../../../../../../features/settings/teamMembersAndGroups.interfaces';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';
import GroupAssignee from '../../../../../../pages/workspace/tasks/assignTask/GroupAssignee';
import { useAppSelector } from '../../../../../../app/hooks';
import { Task } from '../../../../../../features/task/interface.tasks';

interface PeopleField {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  entityCustomProperty?: IField;
  activeColumn?: boolean[];
  task?: Task;
}

interface array2 {
  id: string;
  value: string;
}

const getActiveOptions = (teamMembers: ITeamMembersAndGroup[] | undefined, taskValues: array2[] | undefined) => {
  return teamMembers?.filter((obj1) => taskValues?.find((obj2) => obj2.value === obj1.id));
};

function PeopleField({ taskCustomFields, taskId, fieldId, entityCustomProperty, activeColumn, task }: PeopleField) {
  const { KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const taskActiveValues = taskCustomFields?.values;
  const { data: teamMembers } = useGetTeamMembers({ page: 0, query: '' });
  const assignedMembers = getActiveOptions(teamMembers?.data.team_members, taskActiveValues);
  const singleUser: boolean = entityCustomProperty?.properties?.single_user as boolean;
  const allowGroups: boolean = entityCustomProperty?.properties?.include_groups as boolean;

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setAnchorEl(containerRef.current);
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }
      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => containerRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div ref={containerRef} tabIndex={0} className="w-full h-full flex items-center">
      <button className="w-full flex justify-center items-center" onClick={(e) => setAnchorEl(e.currentTarget)}>
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

      <AssigneeDropdown anchor={anchorEl} setAnchor={setAnchorEl} handleClick={handleClick} allowGroups={allowGroups} />
    </div>
  );
}

export default PeopleField;
