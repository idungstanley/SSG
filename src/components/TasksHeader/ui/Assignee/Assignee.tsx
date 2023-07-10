import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowFilterByAssigneeSlideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { generateFilter } from '../Filter/lib/filterUtils';
import Button from '../../../Buttons/Button';
import AssigneeIcon from '../../../../assets/icons/Assignee.svg';
import Icons from '../../../Icons/Icons';
import { setAssigneeIds, setFilterFields } from '../../../../features/task/taskSlice';
import Me from '../../../../assets/icons/Me';

export function Assignee() {
  const dispatch = useAppDispatch();
  const { currentUserId } = useAppSelector((state) => state.auth);
  const { assigneeIds } = useAppSelector((state) => state.task);
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const {
    filters: { fields: filters }
  } = useAppSelector((state) => state.task);

  const members = data?.data.team_members ?? [];

  const currentMemberId = members.find((i) => i.user.id === currentUserId)?.id;
  const currentMemberName = members.find((i) => i.user.id === currentUserId)?.user.name;

  if (!currentMemberId || !currentMemberName) {
    return null;
  }

  // const isMe = filters.length ? filters?.find((i) => i.key === 'assignees')?.values[0] === currentMemberId : false;

  const forMe = assigneeIds[0] === currentMemberId;

  const onToggleMe = () => {
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
    <div className="flex items-center rounded-2xl h-8">
      <Button active={forMe} onClick={onToggleMe}>
        <Me active={forMe} />
        <span>Me</span>
      </Button>
      <Button active={true} onClick={() => dispatch(setShowFilterByAssigneeSlideOver(true))}>
        <Icons src={AssigneeIcon} />
        <span>Assignee</span>
      </Button>
    </div>
  );
}
