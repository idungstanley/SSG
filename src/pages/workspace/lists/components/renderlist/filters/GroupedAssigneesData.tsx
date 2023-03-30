import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AvatarWithInitials } from '../../../../../../components';
import { ITaskFullList, TaskDataGroupingsProps } from '../../../../../../features/task/interface.tasks';

export default function GroupedAssigneesData(unFilteredTaskData: ITaskFullList[] | undefined) {
  const [TaskDataGroupingsAssignees, setTaskDataGroupingsAssignees] = useState<TaskDataGroupingsProps | unknown>({});
  useEffect(() => {
    const taskDataGroupedByAssignee = unFilteredTaskData?.reduce((GroupedTaskByAssignee, currentTask) => {
      const assignees = currentTask.assignees;

      if (assignees !== null && assignees !== undefined && assignees.length > 0) {
        assignees.forEach((assignee) => {
          const assigneeId = assignee.id;
          if (!GroupedTaskByAssignee[assigneeId]) {
            GroupedTaskByAssignee[assigneeId] = {
              assigneeName: assignee.name,
              assigneeId: assignee.id,
              tasks: [] // create an empty tasks array for each assignee
            };
          }

          GroupedTaskByAssignee[assigneeId].tasks.push(currentTask);
        });
      } else {
        // handle tasks with no assignee
        if (!GroupedTaskByAssignee['unassigned']) {
          GroupedTaskByAssignee['unassigned'] = {
            assigneeName: 'Unassigned',
            assigneeId: 'unassigned',
            tasks: [] // create an empty tasks array for unassigned tasks
          };
        }

        GroupedTaskByAssignee['unassigned'].tasks.push(currentTask);
      }

      return GroupedTaskByAssignee;
    }, {});

    setTaskDataGroupingsAssignees(taskDataGroupedByAssignee as TaskDataGroupingsProps);

    return () => {
      true;
    };
  }, [unFilteredTaskData, setTaskDataGroupingsAssignees]);
  return (
    <section>
      <div id="header" className="flex justify-between items-center mt-5">
        <p>Assignees</p>
        <p>Select all</p>
      </div>

      <div className="flex justify-between">
        <AvatarWithInitials
          initials={'ND'}
          textColor={'white'}
          height="h-8"
          width="w-8"
          backgroundColour={'blue'}
          textSize={'8px'}
        />
        <div>
          <p>Nicholas Diamond</p>
          <p>3 tasks</p>
        </div>
        <button>
          <AiOutlineCheckCircle />
        </button>
      </div>
    </section>
  );
}
