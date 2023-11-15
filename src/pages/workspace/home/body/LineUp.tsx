import React, { useEffect, useMemo, useState } from 'react';
import { UseGetFullTaskList } from '../../../../features/task/taskService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { generateLists } from '../../../../utils';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { IHubDetails } from '../../../../features/hubs/hubs.interfaces';
import { ImyTaskData, setTasks } from '../../../../features/task/taskSlice';
import AlsoitMenuDropdown from '../../../../components/DropDowns';
import StatusDropdown from '../../../../components/status/StatusDropdown';
import Assignee from '../../tasks/assignTask/Assignee';
import { Task } from '../../../../features/task/interface.tasks';
import SearchIcon from '../../../../assets/icons/SearchIcon';

export default function LineUp() {
  // const [allHubsId, setAllHubsId] = useState<string[]>([]);
  const [currentHubIdInOrder, setCurrentHubIdInOrder] = useState<string>('');
  const { hub } = useAppSelector((state) => state.hub);
  const { tasks: tasksStore } = useAppSelector((state) => state.task);

  const [lineUp, setLineUp] = useState<Task[]>([]);

  const dispatch = useAppDispatch();

  const { data } = UseGetFullTaskList({
    itemId: currentHubIdInOrder,
    itemType: EntityType.hub
  });
  const { data: hubsData } = UseGetHubDetails({ activeItemId: currentHubIdInOrder, activeItemType: EntityType.hub });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLineUpTasks = (task: Task) => {
    if (!lineUp.length) setAnchorEl(null);

    const updateLineUpTask = [...lineUp, task];
    setLineUp(updateLineUpTask);
  };

  const handleRemoveLineUpTask = (task: Task) => {
    const updateLineUpTask = lineUp.filter((lineUpTask) => lineUpTask.id !== task.id);

    setLineUp(updateLineUpTask);
  };

  useEffect(() => {
    if (hub.length) {
      // setAllHubsId(hub.map((item) => item.id));
      setCurrentHubIdInOrder(hub[0].id);
    }
  }, [hub]);

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks, hubsData?.data.hub as IHubDetails), [tasks, hubsData]);

  useEffect(() => {
    if (Object.keys(lists).length) {
      dispatch(setTasks({ ...tasksStore, ...lists }));
    }
  }, [lists]);

  return (
    <div className="w-full">
      <div className="group flex items-center">
        <h1 className="text-lg text-black font-bold p-2">LineUp ({lineUp.length})</h1>
        {lineUp.length > 0 && (
          <div
            className="opacity-0 cursor-pointer group-hover:opacity-100 hover:bg-alsoit-gray-50 p-1 rounded-md"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <p>+ Add to lineUp</p>
          </div>
        )}
      </div>
      {!lineUp.length && (
        <div
          className="group p-1.5 rounded-md bg-alsoit-gray-50 cursor-pointer"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <p className="flex rounded-sm justify-center p-2 border-2 w-full h-full border-alsoit-gray-75 border-dotted text-alsoit-gray-100 group-hover:border-alsoit-purple-300 group-hover:text-alsoit-purple-300">
            + Add your most Important tasks here.
          </p>
        </div>
      )}

      <div className="flex items-center overflow-x-scroll space-x-2" style={{ maxWidth: '900px' }}>
        {lineUp.map((task) => (
          <div key={task.id} className="bg-alsoit-gray-50 rounded-sm p-1 pt-2 px-2" style={{ width: '320px' }}>
            <div className="group flex justify-between space-x-4 shadow-md bg-white p-1 pl-4 rounded-sm ">
              <div className="flex items-center space-x-4">
                <div className="pointer-events-none">
                  <StatusDropdown task={task} taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
                </div>
                <h1 className="mb-1">{task.name}</h1>
              </div>
              <p
                className="opacity-0 group-hover:opacity-100 pr-2 cursor-pointer"
                onClick={() => handleRemoveLineUpTask(task)}
              >
                x
              </p>
            </div>
          </div>
        ))}
      </div>

      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        <div className="sticky top-0 z-50 bg-white">
          <div className="flex items-center p-2 w-full border-b border-b-gray-300">
            <SearchIcon width={13} height={13} />

            <input type="text" placeholder="Search tasks" className="w-full p-2 outline-none border-0" />
          </div>

          <p className="flex justify-between p-3">
            <span>Recents</span>
            <span className="text-alsoit-purple-300">Browse tasks</span>
          </p>
        </div>
        <div className="h-80">
          {Object.keys(tasksStore).map((listId) => (
            <div key={listId} className="group p-2">
              {tasksStore[listId].map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between p-2 space-x-2 cursor-pointer  hover:bg-alsoit-gray-50 rounded-md"
                  onClick={() => handleLineUpTasks(task)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="pointer-events-none">
                      <StatusDropdown task={task} taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
                    </div>
                    <h1 className="mb-1">{task.name} </h1>
                  </div>
                  <div className="pointer-events-none">
                    <Assignee task={task as ImyTaskData} itemId={task.id} option={`${EntityType.task}`} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
