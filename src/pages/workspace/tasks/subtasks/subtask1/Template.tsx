import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImyTaskData, setCurrentParentSubTaskId } from '../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../app/hooks';
import DataRenderFunc from '../../component/taskData/DataRenderFunc';

interface TemplateProps {
  task: ImyTaskData;
}

export interface groupAssigneeProps {
  id: string;
  initials: string;
  colour: string;
}
[];

export default function Template({ task }: TemplateProps) {
  const dispatch = useDispatch();

  const [showSubTask, setShowSubTask] = useState<string | null>(null);

  const { taskColumns, hideTask } = useAppSelector((state) => state.task);

  const handleShowSubTask = (id: string) => {
    if (id == showSubTask) {
      setShowSubTask(null);
      dispatch(setCurrentParentSubTaskId(null));
    } else {
      setShowSubTask(id);
      dispatch(setCurrentParentSubTaskId(id));
    }
  };

  return (
    <div className="relative ">
      <div className="flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative">
        <div className="flex w-6/12 ml-5 items-center">
          <div className="w-5/6">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div key={col.field} className="flex items-center capitalize ml-2 text-xs font-medium  group">
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={showSubTask}
                          handleGetSubTask={() => handleShowSubTask(task.id)}
                        />
                      </div>
                    )
                )
              : taskColumns.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div key={col.field} className="flex items-center capitalize ml-2 text-xs font-medium  group">
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={showSubTask}
                          handleGetSubTask={() => handleShowSubTask(task.id)}
                        />
                      </div>
                    )
                )}
          </div>
          <div id="tags" className="w-1/6" style={{ marginLeft: '-100px' }}>
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Tags' &&
                    !col.hidden && (
                      <div key={col.field} className="flex items-center capitalize text-xs font-medium  group">
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={showSubTask}
                          handleGetSubTask={() => handleShowSubTask(task.id)}
                        />
                      </div>
                    )
                )
              : taskColumns.map(
                  (col) =>
                    col.value == 'Tags' &&
                    !col.hidden && (
                      <div key={col.field} className="flex items-center capitalize ml-2 text-xs font-medium  group">
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={showSubTask}
                          handleGetSubTask={() => handleShowSubTask(task.id)}
                        />
                      </div>
                    )
                )}
          </div>
        </div>
        <div className=" dynamic ">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value !== 'Task' &&
                  col.value !== 'Tags' &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" items-center uppercase    text-gray-400 py-px   font-medium  group"
                      style={{ width: '50px' }}
                    >
                      <DataRenderFunc
                        taskColField={task[col.field]}
                        colfield={col.field}
                        task={task}
                        getSubTaskId={showSubTask}
                        handleGetSubTask={() => handleShowSubTask(task.id)}
                      />
                    </div>
                  )
              )
            : taskColumns.map(
                (col) =>
                  col.value !== 'Task' &&
                  col.value !== 'Tags' &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" items-center uppercase    text-gray-400 py-px   font-medium  group"
                      style={{ width: '50px' }}
                    >
                      <DataRenderFunc
                        taskColField={task[col.field]}
                        colfield={col.field}
                        task={task}
                        getSubTaskId={showSubTask}
                        handleGetSubTask={() => handleShowSubTask(task.id)}
                      />
                    </div>
                  )
              )}
        </div>
      </div>
    </div>
  );
}
