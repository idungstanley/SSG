import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImyTaskData, setCurrentParentSubTaskId4 } from '../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../app/hooks';
import DataRenderFunc from '../../component/taskData/DataRenderFunc';

interface TemplateProps {
  task: ImyTaskData;
}

export default function Template4({ task }: TemplateProps) {
  const dispatch = useDispatch();

  const [showSubTask2, setShowSubTask2] = useState<string | null>(null);

  const { taskColumns, hideTask } = useAppSelector((state) => state.task);

  const handleShowSubTask = (id: string) => {
    if (id == showSubTask2) {
      setShowSubTask2(null);
      dispatch(setCurrentParentSubTaskId4(null));
    } else {
      setShowSubTask2(id);
      dispatch(setCurrentParentSubTaskId4(id));
    }
  };

  return (
    <div className="relative ">
      <div className="flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative">
        <div className="flex w-6/12 ml-20 items-center">
          <div className="w-5/6">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div key={col.field} className="flex items-center capitalize ml-2 text-xs font-medium  group">
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={showSubTask2}
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
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={showSubTask2}
                          handleGetSubTask={() => handleShowSubTask(task.id)}
                        />
                      </div>
                    )
                )}
          </div>
          <div id="tags" style={{ marginLeft: '-150px' }}>
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Tags' &&
                    !col.hidden && (
                      <div key={col.field} className="flex items-center capitalize text-xs font-medium  group">
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={showSubTask2}
                          handleGetSubTask={() => handleShowSubTask(task.id)}
                        />
                      </div>
                    )
                )
              : taskColumns.map(
                  (col) =>
                    col.value == 'Tags' &&
                    !col.hidden && (
                      <div key={col.field} className="flex items-center capitalize text-xs font-medium group">
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={showSubTask2}
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
                        col={{ field: col.field, id: col.id }}
                        task={task}
                        getSubTaskId={showSubTask2}
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
                        col={{ field: col.field, id: col.id }}
                        task={task}
                        getSubTaskId={showSubTask2}
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
