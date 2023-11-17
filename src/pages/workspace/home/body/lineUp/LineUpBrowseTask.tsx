import React, { useEffect, useState } from 'react';
import { UseAddLineUpTask, getTaskListService } from '../../../../../features/task/taskService';
import { Task } from '../../../../../features/task/interface.tasks';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import { useAppSelector } from '../../../../../app/hooks';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';

export default function LineUpBrowseTask({ listId }: { listId: string }) {
  const { currentUserId } = useAppSelector((state) => state.auth);

  const { data, hasNextPage, fetchNextPage } = getTaskListService(listId);
  const { data: teamMember } = useGetTeamMembers({ page: 1, query: '' });

  const { mutate: onAddLineUp } = UseAddLineUpTask();

  const [tasks, setTasks] = useState<Task[]>([]);

  const members = teamMember?.data.team_members ?? [];
  const currentMemberId = members.find((i) => i.user.id === currentUserId)?.id as string;

  const handleAddLineUpTask = (id: string) => {
    onAddLineUp({
      taskId: id,
      team_member_id: currentMemberId
    });
  };

  useEffect(() => {
    if (data?.pages[0].data.tasks) {
      setTasks(data?.pages[0].data.tasks);
    }
  }, [data]);

  return (
    <div>
      <div className="group">
        {tasks.length > 0 &&
          tasks?.map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-3 py-1 cursor-pointer hover:bg-alsoit-gray-50 px-2 rounded-md"
              style={{ marginLeft: '70px' }}
              onClick={() => handleAddLineUpTask(task.id)}
            >
              <div className="pointer-events-none">
                <StatusDropdown task={task} taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
              </div>
              <div className="mb-1 truncate " style={{ maxWidth: '220px' }}>
                {task?.name}
              </div>
            </div>
          ))}
      </div>
      {hasNextPage && (
        <p className="flex justify-center text-alsoit-purple-300 p-3 cursor-pointer" onClick={() => fetchNextPage()}>
          Show more tasks
        </p>
      )}
    </div>
  );
}
