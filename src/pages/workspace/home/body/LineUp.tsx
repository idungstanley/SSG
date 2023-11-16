import React, { useEffect, useMemo, useState } from 'react';
import { UseGetFullTaskList } from '../../../../features/task/taskService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { generateLists } from '../../../../utils';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { IHubDetails } from '../../../../features/hubs/hubs.interfaces';
import { setTasks } from '../../../../features/task/taskSlice';
import { Task } from '../../../../features/task/interface.tasks';
import LineUpModal from './lineUp/lineUpModal';
import LineUpTasks from './lineUp/LineUpTasks';
import AddLineUpTask from './lineUp/AddLineUpTask';

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
      {!lineUp.length && <AddLineUpTask setAnchorEl={setAnchorEl} />}

      <div className="flex items-center overflow-x-scroll space-x-2" style={{ maxWidth: '900px' }}>
        <LineUpTasks lineUp={lineUp} handleRemoveLineUpTask={handleRemoveLineUpTask} />
      </div>

      <LineUpModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleLineUpTasks={handleLineUpTasks} />
    </div>
  );
}
