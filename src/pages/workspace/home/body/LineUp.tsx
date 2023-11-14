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

export default function LineUp() {
  // const [allHubsId, setAllHubsId] = useState<string[]>([]);
  const [currentHubIdInOrder, setCurrentHubIdInOrder] = useState<string>('');
  const { hub } = useAppSelector((state) => state.hub);
  const { tasks: tasksStore } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const { data } = UseGetFullTaskList({
    itemId: currentHubIdInOrder,
    itemType: EntityType.hub
  });
  const { data: hubsData } = UseGetHubDetails({ activeItemId: currentHubIdInOrder, activeItemType: EntityType.hub });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
    <div>
      <h1 className="text-lg text-black font-bold p-2">LineUp (0)</h1>
      <div
        className="group p-1.5 rounded-md bg-alsoit-gray-50 cursor-pointer"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <p className="flex rounded-sm justify-center p-2 border-2 w-full h-full border-alsoit-gray-75 border-dotted text-alsoit-gray-100 group-hover:border-alsoit-purple-300 group-hover:text-alsoit-purple-300">
          + Add your most Important tasks here.
        </p>
      </div>

      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        <div className="h-80">
          {Object.keys(tasksStore).map((listId) => (
            <div key={listId} className=" p-2">
              {tasksStore[listId].map((task) => (
                <div key={task.id} className="flex p-2 space-x-2 justify-between">
                  <div className="flex items-center space-x-2">
                    <StatusDropdown task={task} taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
                    <h1>{task.name} </h1>
                  </div>
                  <Assignee task={task as ImyTaskData} itemId={task.id} option={`${EntityType.task}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
