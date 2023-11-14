import { AiFillFlag } from 'react-icons/ai';
import AssigneeIcon from '../../../../../../assets/icons/Assignee';
import { DependenciesIcon } from '../../../../../../assets/icons/DepenciesIcon';
import StatusIconComp from '../../../../../../assets/icons/StatusIconComp';
import { ChangeEvent, useState } from 'react';
import { AssigneeDropDown } from './TaskAssigneeDropDown';
import { priorityType } from '../../../../../../components/priority/PriorityDropdown';
import { priorities } from '../../../../../../app/constants/priorities';
import { setNewTaskPriority } from '../../../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { ITask_statuses } from '../../../../../../features/list/list.interfaces';
import { TaskStatus } from './TaskStatusDropDown';
import { useAddTask } from '../../../../../../features/task/taskService';
import { UseGetListDetails } from '../../../../../../features/list/listService';

export function CreateTask() {
  const dispatch = useAppDispatch();
  const { currentTeamMemberId, tasks: taskData, newTaskPriority } = useAppSelector((state) => state.task);

  const listIndex = Object.keys(taskData)[0];
  const task = taskData[listIndex][0];

  const [dropDown, setDropdown] = useState<{ assignee: boolean; priority: boolean; status: boolean }>({
    assignee: false,
    priority: false,
    status: false
  });
  const [priority, setPriority] = useState<string | undefined>();
  const [currentTaskStatus, setCurrentTaskStatus] = useState<ITask_statuses | undefined>();
  const [value, setValue] = useState<{ [key: string]: string }>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const { mutate: onAdd } = useAddTask(task);
  const { data: list } = UseGetListDetails(listIndex);

  const handleClick = () => {
    const minPosition = Math.min(...(list?.data.list.task_statuses.map((status) => status.position) || []));
    const statusObj: ITask_statuses | undefined = list?.data.list.task_statuses.find(
      (statusObj: ITask_statuses) => statusObj.position === minPosition
    );

    onAdd({
      id: task.list?.id as string,
      isListParent: true,
      name: value?.task_name as string,
      task_status_id: currentTaskStatus?.id ?? (statusObj?.id as string),
      assignees: currentTeamMemberId as string[],
      newTaskPriority: newTaskPriority
    });
  };

  const priorityList: priorityType[] = [
    {
      id: priorities.LOW,
      title: 'Low',
      color: '#d3d3d3',
      bg: 'gray',
      handleClick: () => {
        dispatch(setNewTaskPriority(priorities.LOW));
        setPriority(priorities.LOW);
      }
    },
    {
      id: priorities.NORMAL,
      title: 'Normal',
      color: '#6fddff',
      bg: 'blue',
      handleClick: () => {
        dispatch(setNewTaskPriority(priorities.NORMAL));
        setPriority(priorities.NORMAL);
      }
    },
    {
      id: priorities.HIGH,
      title: 'High',
      color: '#f7cb04',
      bg: 'yellow',
      handleClick: () => {
        dispatch(setNewTaskPriority(priorities.HIGH));
        setPriority(priorities.HIGH);
      }
    },
    {
      id: priorities.URGENT,
      title: 'Urgent',
      color: '#f32100',
      bg: 'red',
      handleClick: () => {
        dispatch(setNewTaskPriority(priorities.URGENT));
        setPriority(priorities.URGENT);
      }
    }
  ];
  return (
    <div
      className="h-auto p-2 overflow-y-visible bg-white border-b rounded-xl shadow-md"
      style={{ maxHeight: '620px' }}
    >
      <div className="flex flex-col space-y-2 py-2 px-0.5 border-b">
        <span className="text-alsoit-text-lg font-semibold">Create Task</span>
        <span className="text-alsoit-text-md font-medium">Create task and assign all properties on the workspace</span>
      </div>
      <div className="flex flex-col space-y-2 px-1.5 py-2 border-b overflow-y-visible">
        {/* active tree */}
        <div className="flex space-x-2 items-center">
          <div className="flex items-center space-x-1.5 border rounded-md w-max p-1.5 cursor-pointer">
            <div className="w-4 h-4">
              <DependenciesIcon className="w-4 h-4" color="gray" />
            </div>
            <span>Entity</span>
          </div>
        </div>
        {/* Task Properties */}
        <div className="w-full flex flex-col space-y-2 px-0.5 py-2">
          <input
            type="text"
            name="task_name"
            onChange={handleChange}
            className="w-full border-0 text-alsoit-gray-75 text-alsoit-text-xi p-2 focus:ring-0"
            placeholder="Enter task Name"
          />
          <input
            type="text"
            name="description"
            onChange={handleChange}
            className="w-full border-0 text-alsoit-gray-75 text-alsoit-text-md p-2 focus:ring-0"
            placeholder="Task Description"
          />
        </div>
        <div className="w-full flex space-x-2 px-2 items-center">
          <div
            onClick={() => setDropdown((prev) => ({ ...prev, status: !prev.status }))}
            className="flex items-center space-x-1.5 border rounded-md w-max p-1.5 cursor-pointer capitalize relative"
          >
            <StatusIconComp color={currentTaskStatus?.color ?? 'gray'} />
            {dropDown.status && <TaskStatus setCurrentTaskStatus={setCurrentTaskStatus} />}
            <span>{currentTaskStatus?.name ?? 'status'}</span>
          </div>
          <div
            onClick={() => setDropdown((prev) => ({ ...prev, assignee: !prev.assignee }))}
            className={`${
              currentTeamMemberId.length > 0 && 'bg-alsoit-purple-50'
            } flex space-x-1.5 border-2 rounded-lg text-center capitalize w-min p-1.5 cursor-pointer relative`}
          >
            <AssigneeIcon className="w-4 h-4" />
            {dropDown.assignee && <AssigneeDropDown />}
            <span className={`${currentTeamMemberId.length > 0 && 'text-alsoit-purple-300'}`}>Assignee</span>
          </div>
          <div
            onClick={() => setDropdown((prev) => ({ ...prev, priority: !prev.priority }))}
            className="flex items-center space-x-1.5 border rounded-md w-max p-1.5 cursor-pointer capitalize relative"
          >
            <AiFillFlag className="w-4 h-4" style={{ color: 'skyblue' }} />
            {dropDown.priority && (
              <div className="absolute bg-white shadow-lg top-9 w-24 p-2 rounded-lg">
                {priorityList.map((priority) => (
                  <div
                    key={priority.id}
                    className="flex space-x-2 py-1.5 cursor-pointer hover:bg-alsoit-gray-50 rounded-md px-0.5"
                    onClick={priority.handleClick}
                  >
                    <AiFillFlag className="w-4 h-4" style={{ color: priority.color }} />
                    <span>{priority.title}</span>
                  </div>
                ))}
              </div>
            )}
            <span>{priority ?? 'priority'}</span>
          </div>
        </div>
      </div>
      {/* Entity Actions */}
      <div className="w-full flex justify-end items-center space-x-2 py-2">
        <button className="border border-alsoit-gray-100 text-alsoit-gray-100 text-alsoit-text-xi px-2 py-1 capitalize rounded-md">
          cancel
        </button>
        <button
          onClick={handleClick}
          className="border bg-alsoit-purple-300 text-white text-alsoit-text-xi px-2 py-1 capitalize rounded-md"
        >
          Create
        </button>
      </div>
    </div>
  );
}
