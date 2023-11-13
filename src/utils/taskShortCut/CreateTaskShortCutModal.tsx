import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCreateTaskShortCut, setNewTaskPriority } from '../../features/task/taskSlice';
import { TabsDropDown } from '../../components/Pilot/components/TimeClock/TabsDropDown';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import { PriorityIcon } from '../../assets/icons/PriorityIcon';
import StatusIconComp from '../../assets/icons/StatusIconComp';
import AssigneeIcon from '../../assets/icons/Assignee';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetTeamMemberGroups } from '../../features/settings/teamMemberGroups/teamMemberGroupService';
import { useGetTeamMembers } from '../../features/settings/teamMembers/teamMemberService';
import AvatarWithImage from '../../components/avatar/AvatarWithImage';
import { AvatarWithInitials } from '../../components';
import { priorities } from '../../app/constants/priorities';
import { priorityType } from '../../components/priority/PriorityDropdown';
import { AiFillFlag } from 'react-icons/ai';
import { useAddTask } from '../../features/task/taskService';
import { UseGetListDetails } from '../../features/list/listService';
import { ITask_statuses } from '../../features/list/list.interfaces';
import { IParent } from '../../features/task/interface.tasks';
import { DependenciesIcon } from '../../assets/icons/DepenciesIcon';

type ListArrType = {
  color: string;
  id?: string | undefined;
  name?: string | undefined;
  parents?: IParent | undefined;
};

export function CreateTaskShortCutModal() {
  const { tasks: taskData, assigneeIds, newTaskPriority } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const listIndex = Object.keys(taskData)[0];
  const task = taskData[listIndex][0];

  const [listObj, setListObj] = useState<ListArrType | undefined>();
  const [listArr, setListArr] = useState<ListArrType[] | undefined>();
  const [listId, setListId] = useState<string>('');
  const [priority, setPriority] = useState<string | undefined>();
  const [value, setValue] = useState<{ [key: string]: string }>();
  const [teams, setTeam] = useState(false);
  const [dropDown, setDropDown] = useState<{ assignee: boolean; priority: boolean; list: boolean }>({
    assignee: false,
    priority: false,
    list: false
  });

  const { mutate: onAdd } = useAddTask(listId ? taskData[listId][0] : task);
  const { data: list } = UseGetListDetails(listObj?.id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const minPosition = Math.min(...(list?.data.list.task_statuses.map((status) => status.position) || []));
    const statusObj: ITask_statuses | undefined = list?.data.list.task_statuses.find(
      (statusObj: ITask_statuses) => statusObj.position === minPosition
    );

    onAdd({
      id: listObj?.id as string,
      isListParent: true,
      name: value?.task_name as string,
      task_status_id: statusObj?.id as string,
      assignees: assigneeIds,
      newTaskPriority: newTaskPriority
    });
    dispatch(setCreateTaskShortCut(false));
  };

  const { data } = teams ? useGetTeamMemberGroups(0) : useGetTeamMembers({ query: '', page: 0 });

  const users = teams ? data?.data.team_member_groups : data?.data.team_members;

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

  useEffect(() => {
    const extractedListArr = Object.values(taskData)
      .flatMap((list) => [...list])
      .map((list) => list.list);
    const uniqueArray = Object.values(
      extractedListArr.reduce((acc: { [key: string]: ListArrType }, obj) => {
        if (obj && obj.id) {
          acc[obj.id] = obj;
        }
        return acc;
      }, {})
    );
    setListArr(uniqueArray);
  }, []);

  useEffect(() => {
    setListId(listObj?.id as string);
  }, [listObj]);

  return (
    <div className="w-full fixed backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-50 inset-0 z-50 overflow-y-auto">
      <div className="absolute left-[640px]">
        <TabsDropDown
          styles="top-1/3 w-134"
          header="create task"
          subHeader="create new task"
          subStyles="left-40"
          closeModal={() => dispatch(setCreateTaskShortCut(false))}
        >
          <div className="w-full flex flex-col space-y-2 overflow-visible">
            <div
              onClick={() => setDropDown((prev) => ({ ...prev, list: !prev.list }))}
              className="flex items-center space-x-1.5 relative"
            >
              <div className="border border-alsoit-gray-75 flex space-x-2 items-center p-2 rounded-md cursor-pointer">
                <div className="w-5 h-5">
                  <DependenciesIcon className="w-5 h-5" color="gray" />
                </div>
                <span>{listObj?.name?.slice(0, 8) ?? 'list'}</span>
              </div>
              {dropDown.list && (
                <div className="flex flex-col space-y-2 absolute top-9 left-0 shadow-lg w-24 rounded-lg bg-white px-0.5 py-2">
                  {listArr?.map((list) => (
                    <div
                      key={list.id}
                      className="flex py-2 space-x-1.5 px-0.5 hover:bg-alsoit-gray-50 rounded-md cursor-pointer"
                      onClick={() => setListObj(list)}
                    >
                      <span>{list.name?.slice(0, 8)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              type="text"
              name="task_name"
              className="ring-0 w-full border-none active:ring-0 focus:ring-0"
              placeholder="Enter task name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="task_description"
              className="text-alsoit-text-md ring-0 w-full border-none active:ring-0 focus:ring-0"
              placeholder="Enter task description"
              onChange={handleChange}
            />
            <div className="flex w-full space-x-1.5 items-center">
              <div className="flex space-x-1.5 border-2 rounded-lg items-center capitalize w-20 p-1.5">
                <StatusIconComp color="gray" />
                <span>status</span>
              </div>
              <div
                className="flex space-x-1.5 border-2 rounded-lg text-center capitalize w-min p-1.5 cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <div
                  className="w-4 h-4 relative overflow-y-visible"
                  onClick={() => setDropDown((prev) => ({ ...prev, assignee: !prev.assignee }))}
                >
                  <AssigneeIcon className="w-4 h-4" />
                  {dropDown.assignee && (
                    <div
                      className="absolute top-7 z-50 left-0 w-44 shadow-lg rounded-lg bg-white p-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between w-full">
                        <span
                          onClick={() => setTeam(false)}
                          className={`${
                            !teams && 'border-b-alsoit-border-sm border-alsoit-purple-400'
                          } w-1/2 cursor-pointer pb-1.5`}
                        >
                          Users
                        </span>
                        <span
                          onClick={() => setTeam(true)}
                          className={`${
                            teams && 'border-b-alsoit-border-sm border-alsoit-purple-400'
                          } w-1/2 cursor-pointer pb-1.5`}
                        >
                          Teams
                        </span>
                      </div>
                      {teams ? (
                        <div className="flex flex-col space-y-2 p-1.5">teams</div>
                      ) : (
                        <div className="flex flex-col space-y-2 p-1.5">
                          {users?.map((user) => (
                            <div
                              key={user.id}
                              className="flex w-full space-x-2.5 text-start py-2.5 px-1 rounded-md cursor-pointer hover:bg-alsoit-gray-50"
                            >
                              {user.user.avatar_path ? (
                                <AvatarWithImage image_path={user.user.avatar_path} height="h-5" width="w-5" />
                              ) : (
                                <AvatarWithInitials
                                  initials={user.user.initials}
                                  backgroundColour={user.user.color}
                                  height="h-5"
                                  width="w-5"
                                />
                              )}
                              <span>{user.user.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span>assignee</span>
              </div>
              <div className="flex space-x-1.5 items-center border-2 rounded-lg text-center capitalize w-20 p-1.5">
                <div className="w-4 h-4">
                  <CalendarIcon active={false} dimensions={{ width: 15, height: 15 }} />
                </div>
                <span>date</span>
              </div>
              <div
                className="flex space-x-1.5 border-2 rounded-lg items-center capitalize w-20 p-1.5 relative"
                onClick={() => setDropDown((prev) => ({ ...prev, priority: !prev.priority }))}
              >
                <PriorityIcon color="skyBlue" className="w-4 h-4" />
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

          <div className="border-t-2 w-full py-2 flex justify-end space-x-2">
            <button
              className="p-2 border border-alsoit-gray-75 text-alsoit-gray-75 rounded-lg"
              onClick={() => dispatch(setCreateTaskShortCut(false))}
            >
              Cancel
            </button>
            <button className="p-2 border border-alsoit-success text-alsoit-success rounded-lg" onClick={handleClick}>
              Create
            </button>
          </div>
        </TabsDropDown>
      </div>
    </div>
  );
}
