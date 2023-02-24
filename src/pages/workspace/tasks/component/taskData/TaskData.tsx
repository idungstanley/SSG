import React from 'react';
import {
  ImyTaskData,
  setGetSubTaskId,
} from '../../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import './task.css';
import DataRenderFunc from './DataRenderFunc';

interface TaskDataProps {
  task: ImyTaskData;
}

export default function TaskData({ task }: TaskDataProps) {
  const {
    taskColumns,
    hideTask,
    getSubTaskId,
    CompactView,
    CompactViewWrap,
    comfortableView,
    comfortableViewWrap,
  } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const handleGetSubTask = (id: string) => {
    if (id == getSubTaskId) {
      dispatch(setGetSubTaskId(null));
    } else {
      dispatch(setGetSubTaskId(id));
    }
  };

  return (
    <div className="relative">
      <div
        className={`${
          comfortableView
            ? '  flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
            : comfortableViewWrap
            ? 'flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
            : CompactView
            ? ' compactView flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
            : CompactViewWrap
            ? 'compactViewWrap flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
            : null
        }`}
      >
        <div className=" flex justify-between w-6/12 pr-24 items-center ">
          <div className="w-5/6">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.field}
                        className="flex items-center capitalize ml-2 text-xs font-medium group w-12/12"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task.id)}
                        />
                      </div>
                    )
                )
              : taskColumns.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.field}
                        className="flex items-center capitalize ml-2 text-xs font-medium group
                        cursor-pointer w-12/12"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task.id)}
                        />
                      </div>
                    )
                )}
          </div>
          <div id="tags" className="w-1/6">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Tags' &&
                    !col.hidden && (
                      <div
                        key={col.field}
                        className="flex items-center capitalize ml-2 text-xs font-medium group"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task.id)}
                        />
                      </div>
                    )
                )
              : taskColumns.map(
                  (col) =>
                    col.value == 'Tags' &&
                    !col.hidden && (
                      <div
                        key={col.field}
                        className="flex items-center capitalize ml-2 text-xs font-medium group"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task.id)}
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
                        getSubTaskId={getSubTaskId}
                        handleGetSubTask={() => handleGetSubTask(task.id)}
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
                        getSubTaskId={getSubTaskId}
                        handleGetSubTask={() => handleGetSubTask(task.id)}
                      />
                    </div>
                  )
              )}
        </div>
      </div>
    </div>
  );
}
