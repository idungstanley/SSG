import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { generateFilter } from '../Filter/lib/filterUtils';
import Button from '../../../Buttons/Button';
import { setSelectedTaskParentId, setSubtasksFilters } from '../../../../features/task/taskSlice';
import Me from '../../../../assets/icons/Me';
import FilterByAssigneeModalSplitSubtask from './FilterByAssigneeModalSplitSubtask';

interface IAssigneeSplitSubtasksProps {
  parentId: string;
}

export interface IAssigneesItem {
  value: string;
  id: string;
}

export const ASSIGNEES = 'assignees';

export function AssigneeSplitSubtasks({ parentId }: IAssigneeSplitSubtasksProps) {
  const dispatch = useAppDispatch();

  const { currentUserId } = useAppSelector((state) => state.auth);
  const { subtasksfilters } = useAppSelector((state) => state.task);

  const [isMeMode, setMeMode] = useState(false);

  const { data } = useGetTeamMembers({ page: 1, query: '' });

  const currentAssignees =
    (subtasksfilters[parentId]?.fields?.find((i) => i.key === ASSIGNEES)?.values as IAssigneesItem[]) ?? [];

  const members = data?.data.team_members ?? [];

  const currentMemberId = members.find((i) => i.user.id === currentUserId)?.id;
  const currentMemberName = members.find((i) => i.user.id === currentUserId)?.user.name;

  if (!currentMemberId || !currentMemberName) {
    return null;
  }

  const isAssignee = currentAssignees.length ? true : false;

  const clearAssignees = () => {
    return {
      ...subtasksfilters,
      [parentId]: {
        ...subtasksfilters[parentId],
        fields: subtasksfilters[parentId].fields.filter((field) => field.key !== ASSIGNEES)
      }
    };
  };

  const updateAssignees = (assigneesItems: IAssigneesItem[]) => {
    const updatedFields = subtasksfilters[parentId].fields.map((field) => {
      if (field.key === ASSIGNEES) {
        return {
          ...field,
          values: assigneesItems
        };
      }
      return field;
    });
    return {
      ...subtasksfilters,
      [parentId]: {
        ...subtasksfilters[parentId],
        fields: updatedFields
      }
    };
  };

  const createAssigneesFilter = (me: IAssigneesItem) => {
    const hasFields = subtasksfilters[parentId]?.fields;
    const newAssigneesField = generateFilter(ASSIGNEES, { initialValue: me });
    return {
      ...subtasksfilters,
      [parentId]: {
        ...subtasksfilters[parentId],
        fields: hasFields ? [...subtasksfilters[parentId].fields, newAssigneesField] : [newAssigneesField]
      }
    };
  };

  const onToggleMe = () => {
    const me = { id: currentMemberId, value: currentMemberName };

    const isAssigneesInFilters = subtasksfilters[parentId]?.fields?.find((i) => i.key === ASSIGNEES);

    if (isAssigneesInFilters) {
      const isMeInAssignees = (isAssigneesInFilters.values as IAssigneesItem[])
        .map((i) => i.id)
        .includes(currentMemberId);

      if (isMeInAssignees) {
        // remove assignees filter
        setMeMode(false);
        dispatch(setSubtasksFilters(clearAssignees()));
      } else {
        // add me to assignees
        setMeMode(true);
        dispatch(setSubtasksFilters(updateAssignees([...currentAssignees, me])));
      }
    } else {
      // create assignee filters and set me
      setMeMode(true);
      dispatch(setSubtasksFilters(createAssigneesFilter(me)));
    }
  };

  return (
    <div className="flex items-center rounded-2xl h-8 cursor-pointer">
      <Button active={isMeMode} withoutBg={true} onClick={onToggleMe}>
        <Me active={isMeMode} className="w-5 h-5" />
        <span>Me</span>
      </Button>

      <Button
        active={isAssignee && !isMeMode}
        withoutBg={true}
        onClick={() => dispatch(setSelectedTaskParentId(parentId as string))}
      >
        <FilterByAssigneeModalSplitSubtask isMeMode={isMeMode} parentId={parentId} />
      </Button>
    </div>
  );
}
