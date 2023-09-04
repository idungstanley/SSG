import { ASSIGNEES, IAssigneesItem } from '../components/TasksHeader/ui/Assignee/AssigneeSplitSubtasks';
import { FilterFieldsWithOption } from '../components/TasksHeader/ui/Filter/types/filters';
import { ITaskFullList } from '../features/task/interface.tasks';

export function filterSubtasks(subtasks: ITaskFullList[], filters: Record<string, FilterFieldsWithOption>) {
  if (subtasks?.length) {
    const currentParentId = subtasks[0].parent_id as string;
    let assigneesFilter: IAssigneesItem[] = [];
    let assigneesFilterIds: string[] = [];
    let filteredSubtasks: ITaskFullList[] = [];

    if (filters[currentParentId] && filters[currentParentId]?.fields?.length) {
      filters[currentParentId].fields.forEach((field) => {
        if (field.key === ASSIGNEES) {
          assigneesFilter = field.values as IAssigneesItem[];
          assigneesFilterIds = assigneesFilter.map((item) => item.id);
        }
      });

      // filter by assigness
      subtasks.forEach((subtask) => {
        subtask.assignees.forEach((assignee) => {
          if (assigneesFilterIds.includes(assignee.id)) {
            filteredSubtasks.push(subtask);
          }
        });
        if (!subtask.assignees.length && assigneesFilterIds.includes('ns')) {
          filteredSubtasks.push(subtask);
        }
      });
    } else {
      filteredSubtasks = subtasks;
    }

    return filteredSubtasks;
  }
  return subtasks;
}
