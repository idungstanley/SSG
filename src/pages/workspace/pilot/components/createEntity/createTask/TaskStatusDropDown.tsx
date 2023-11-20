import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ITask_statuses } from '../../../../../../features/list/list.interfaces';
import { useAppSelector } from '../../../../../../app/hooks';
import StatusIconComp from '../../../../../../assets/icons/StatusIconComp';

type Props = {
  setCurrentTaskStatus: Dispatch<SetStateAction<ITask_statuses | undefined>>;
};
export function TaskStatus({ setCurrentTaskStatus }: Props) {
  const { tasks: taskData } = useAppSelector((state) => state.task);

  const [taskStatus, setTaskStatus] = useState<ITask_statuses[]>([]);

  useEffect(() => {
    const uniqueStatusArray = Array.from([
      ...new Set(Object.values(taskData).flatMap((list) => list.flatMap((status) => status.task_statuses)))
    ]);

    setTaskStatus(uniqueStatusArray);
  }, []);
  return (
    <div className="flex flex-col space-y-2 shadow-lg rounded-md absolute top-9 left-0 bg-white px-2 py-1 w-32">
      {taskStatus.map((status) => (
        <div
          key={status.id}
          className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-alsoit-gray-50 rounded-md px-1"
          onClick={() => setCurrentTaskStatus(status)}
        >
          <StatusIconComp color={status.color} />
          <span>{status.name}</span>
        </div>
      ))}
    </div>
  );
}
