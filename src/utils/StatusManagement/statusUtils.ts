import { Status, StatusType } from './Types';

export const getTasksByStatus = (tasks: StatusType[], status: Status) => {
  return tasks.filter((task) => task.type === status);
};

export const getTaskById = (tasks: StatusType[], id: number) => {
  return tasks.find((task) => task.position === id);
};
