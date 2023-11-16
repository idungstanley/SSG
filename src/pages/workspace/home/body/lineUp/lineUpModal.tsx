import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import SearchIcon from '../../../../../assets/icons/SearchIcon';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import Assignee from '../../../tasks/assignTask/Assignee';
import { ImyTaskData } from '../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { Task } from '../../../../../features/task/interface.tasks';
import ActiveTreeSearch from '../../../../../components/ActiveTree/ActiveTreeSearch';
import { BROWSE_TASKS_FROM_HOME } from '../../../tasks/component/taskMenu/TaskMenu';

interface ILineUpModal {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleLineUpTasks: (task: Task) => void;
}

export default function LineUpModal({ anchorEl, setAnchorEl, handleLineUpTasks }: ILineUpModal) {
  const [browseTasks, setBrowseTasks] = useState(false);
  const { tasks: tasksStore } = useAppSelector((state) => state.task);

  const handleBrowseTask = () => {
    setBrowseTasks(true);
  };

  return (
    <div>
      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        <div className="sticky top-0 z-50 bg-white">
          <div className="flex items-center p-2 w-full border-b border-b-gray-300">
            <SearchIcon width={13} height={13} />

            <input type="text" placeholder="Search tasks" className="w-full p-2 outline-none border-0" />
          </div>

          <div className="flex justify-between p-3">
            <div>
              {!browseTasks ? (
                <p>Recents</p>
              ) : (
                <p className="text-alsoit-purple-300 cursor-pointer" onClick={() => setBrowseTasks(false)}>
                  Recents/Search
                </p>
              )}
            </div>
            {!browseTasks && (
              <span className="text-alsoit-purple-300 cursor-pointer" onClick={() => handleBrowseTask()}>
                Browse tasks
              </span>
            )}
          </div>
        </div>

        <div className="max-h-96 w-134">
          {!browseTasks &&
            Object.keys(tasksStore).map((listId) => (
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
                      <h1 className="mb-1 truncate " style={{ maxWidth: '290PX' }}>
                        {task.name}{' '}
                      </h1>
                    </div>
                    <div className="pointer-events-none">
                      <Assignee task={task as ImyTaskData} itemId={task.id} option={`${EntityType.task}`} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          {browseTasks && <ActiveTreeSearch option={BROWSE_TASKS_FROM_HOME} />}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
