import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowFilterByAssigneeSlideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { setFilters } from '../../../../features/task/taskSlice';
import { generateFilter } from '../Filter/lib/filterUtils';
import Button from '../../../Buttons/Button';
import Me from '../../../../assets/icons/me(1).svg';
import AssigneeIcon from '../../../../assets/icons/Assignee.svg';
import Icons from '../../../Icons/Icons';

export function Assignee() {
  const dispatch = useAppDispatch();
  const { currentUserId } = useAppSelector((state) => state.auth);
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  // const { showFilterByAssigneeSlideOver } = useAppSelector((state) => state.slideOver);
  const { filters } = useAppSelector((state) => state.task);

  const members = data?.data.team_members ?? [];

  const currentMemberId = members.find((i) => i.user.id === currentUserId)?.id;
  const currentMemberName = members.find((i) => i.user.id === currentUserId)?.user.name;

  if (!currentMemberId || !currentMemberName) {
    return null;
  }

  const isMe = filters.length ? filters?.find((i) => i.key === 'assignees')?.values[0] === currentMemberId : false;

  const onToggleMe = () => {
    const me = { id: currentMemberId, value: currentMemberName };

    const isAssigneesInFilters = filters.find((i) => i.key === 'assignees');
    if (isAssigneesInFilters) {
      const assignees = filters.length
        ? (filters.find((i) => i.key === 'assignees')?.values as { id: string; value: string }[])
        : [];

      const isMeInAssignees = assignees.map((i) => i.id).includes(currentMemberId);

      if (isMeInAssignees) {
        // remove assignees filter
        dispatch(setFilters([...filters.filter((i) => i.key !== 'assignees')]));
      } else {
        // add me to assignees
        dispatch(
          setFilters([
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
      dispatch(setFilters([...filters, generateFilter('assignees', { initialValue: me })]));
    }
  };

  return (
    <div className="flex items-center rounded-2xl h-8 text-sm">
      {/* <button
        onClick={onToggleMe}
        className={cl(
          isMe ? 'bg-primary-200 hover:bg-primary-300' : '',
          'flex items-center gap-1 cursor-pointer hover:bg-gray-300 p-1 rounded-2xl'
        )}
      >
        <MdOutlinePersonOutline className="w-4 h-4" />
        <span>Me</span>
      </button> */}
      <Button active={isMe} onClick={onToggleMe}>
        <Icons src={Me} />
        <span>Me</span>
      </Button>

      {/* <button
        className={cl(
          'flex items-center gap-1 cursor-pointer hover:bg-gray-300 p-1 rounded-2xl',
          showFilterByAssigneeSlideOver ? 'bg-primary-100 text-white' : ''
        )}
        onClick={() => dispatch(setShowFilterByAssigneeSlideOver(true))}
      >
        <IoPeopleOutline className="w-4 h-4" />
        <span>Assignee</span>
      </button> */}
      <Button active={isMe} onClick={() => dispatch(setShowFilterByAssigneeSlideOver(true))}>
        <Icons src={AssigneeIcon} />
        <span>Assignee</span>
      </Button>
    </div>
  );
}
