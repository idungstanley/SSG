import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { generateFilter } from '../Filter/lib/filterUtils';
import Button from '../../../Buttons/Button';
import { setAssignOnHoverState, setAssigneeIds, setFilterFields, setMeMode } from '../../../../features/task/taskSlice';
import Me from '../../../../assets/icons/Me';
import FilterByAssigneeModal from './FilterByAssigneeModal';
import { UseTaskAssignService, UseTaskUnassignService } from '../../../../features/task/taskService';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import { useEffect } from 'react';
import { Task } from '../../../../features/task/interface.tasks';

export function Assignee() {
  const dispatch = useAppDispatch();

  const { currentUserId } = useAppSelector((state) => state.auth);
  const { assigneeIds, meMode, assignOnHoverTask, assignOnHoverState, assignOnHoverListId } = useAppSelector(
    (state) => state.task
  );

  const { data } = useGetTeamMembers({ page: 1, query: '' });

  const {
    filters: { fields: filters }
  } = useAppSelector((state) => state.task);

  const currentAssignees =
    (filters.find((i) => i.key === 'assignees')?.values as { id: string; value: string }[]) ?? [];

  const members = data?.data.team_members ?? [];

  const currentMemberId = members.find((i) => i.user.id === currentUserId)?.id;
  const currentMemberName = members.find((i) => i.user.id === currentUserId)?.user.name;
  const currUser = members.find((i) => i.user.id === currentUserId);

  const { mutate: onTaskAssign } = UseTaskAssignService(
    [(assignOnHoverTask as Task).id],
    currUser as ITeamMembersAndGroup,
    [assignOnHoverListId]
  );

  const { mutate: onTaskUnassign } = UseTaskUnassignService(
    [(assignOnHoverTask as Task).id],
    currUser as ITeamMembersAndGroup,
    [assignOnHoverListId]
  );

  const handleAssignTask = () => {
    onTaskAssign({
      ids: [(assignOnHoverTask as Task).id],
      team_member_id: currentMemberId as string,
      teams: false
    });
  };

  const assignedUser = (assignOnHoverTask as Task).assignees
    ?.map(({ id }: { id: string }) => id)
    .includes(currentMemberId as string);

  const handleUnAssignTask = () => {
    onTaskUnassign({
      taskId: (assignOnHoverTask as Task).id,
      team_member_id: currentMemberId as string,
      teams: false
    });
  };

  useEffect(() => {
    if (assignOnHoverTask && assignOnHoverState) {
      assignedUser ? handleUnAssignTask() : handleAssignTask();
    }

    if (assignOnHoverTask) {
      dispatch(setAssignOnHoverState(false));
    }
  }, [assignOnHoverState, assignOnHoverTask]);

  if (!currentMemberId || !currentMemberName) {
    return null;
  }
  const isAssignee = currentAssignees.length ? true : false;
  const forMe = meMode ? assigneeIds.includes(currentMemberId) : false;

  const onToggleMe = () => {
    dispatch(setMeMode(!meMode));
    const me = { id: currentMemberId, value: currentMemberName };

    const isAssigneesInFilters = filters.find((i) => i.key === 'assignees');
    dispatch(setAssigneeIds(assigneeIds.length ? [] : [currentMemberId]));

    if (isAssigneesInFilters) {
      const assignees = filters.length
        ? (filters.find((i) => i.key === 'assignees')?.values as { id: string; value: string }[])
        : [];

      const isMeInAssignees = assignees.map((i) => i.id).includes(currentMemberId);

      if (isMeInAssignees) {
        // remove assignees filter
        dispatch(setFilterFields([...filters.filter((i) => i.key !== 'assignees')]));
      } else {
        // add me to assignees
        dispatch(
          setFilterFields([
            ...filters.map((i) => {
              if (i.key === 'assignees') {
                return { ...i, values: [...i.values, me] };
              }
              return i;
            })
          ])
        );
      }
    } else {
      // create assignee filters and set me
      dispatch(setFilterFields([...filters, generateFilter('assignees', { initialValue: me })]));
    }
  };

  return (
    <div className="flex items-center h-8 cursor-pointer rounded-2xl">
      <Button active={forMe && meMode} onClick={onToggleMe}>
        <Me active={forMe && meMode} className="w-5 h-5" />
        <span>Me</span>
      </Button>

      <Button active={isAssignee && !meMode}>
        <FilterByAssigneeModal />
      </Button>
    </div>
  );
}
