import { IoPeopleOutline } from 'react-icons/io5';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowFilterByAssigneeSlideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { setAssigneeIds } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';

export function Assignee() {
  const dispatch = useAppDispatch();
  const { currentUserId } = useAppSelector((state) => state.auth);
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const { showFilterByAssigneeSlideOver } = useAppSelector((state) => state.slideOver);
  const { assigneeIds } = useAppSelector((state) => state.task);

  const members = data?.data.team_members ?? [];

  const currentMemberId = members.find((i) => i.user.id === currentUserId)?.id;

  if (!currentMemberId) {
    return null;
  }

  const isMe = assigneeIds[0] === currentMemberId;

  const onToggleMe = () => dispatch(setAssigneeIds(assigneeIds.length ? [] : [currentMemberId]));

  return (
    <div className="flex rounded-2xl h-8 text-sm bg-gray-100">
      <button
        onClick={onToggleMe}
        className={cl(
          isMe ? 'bg-primary-200 hover:bg-primary-300' : '',
          'flex items-center gap-1 cursor-pointer hover:bg-gray-300 p-1 rounded-2xl'
        )}
      >
        <MdOutlinePersonOutline className="w-4 h-4" />
        <span>Me</span>
      </button>

      <button
        className={cl(
          'flex items-center gap-1 cursor-pointer hover:bg-gray-300 p-1 rounded-2xl',
          showFilterByAssigneeSlideOver ? 'bg-primary-100 text-white' : ''
        )}
        onClick={() => dispatch(setShowFilterByAssigneeSlideOver(true))}
      >
        <IoPeopleOutline className="w-4 h-4" />
        <span>Assignee</span>
      </button>
    </div>
  );
}
