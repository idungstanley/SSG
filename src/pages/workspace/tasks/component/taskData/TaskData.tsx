/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ImyTaskData, setGetSubTaskId, setTaskIdForPilot } from '../../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import './task.css';
import DataRenderFunc from './DataRenderFunc';
import { setShowPilotSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';

export interface TaskDataProps {
  task?: ImyTaskData | undefined;
  tasks?: (ImyTaskData | undefined)[] | undefined;
}

export default function TaskData({ task }: TaskDataProps) {
  const { taskColumns, hideTask, getSubTaskId, CompactView, CompactViewWrap, comfortableView, comfortableViewWrap } =
    useAppSelector((state) => state.task);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const dispatch = useAppDispatch();

  const handleGetSubTask = (id: string | undefined) => {
    if (id == getSubTaskId) {
      dispatch(setGetSubTaskId(null));
    } else {
      dispatch(setGetSubTaskId(id));
    }
  };

  const handleTaskPilot = (id: string, name: string) => {
    dispatch(
      setShowPilotSideOver({
        id: id,
        type: 'task',
        show: true,
        title: name
      })
    );
    dispatch(setTaskIdForPilot(id));

    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'task',
        activeItemName: name
      })
    );
  };

  return (
    <div className="relative ">
      <div
        // onClick={() => handleTaskPilot(task?.id as string, task?.name as string)}
        className={`${
          comfortableView && activeItemId == task?.id
            ? '  flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5 bg-primary-200'
            : comfortableView
            ? 'flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
            : comfortableViewWrap && activeItemId == task?.id
            ? 'flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5 bg-primary-200'
            : comfortableViewWrap
            ? 'flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
            : CompactView && activeItemId == task?.id
            ? ' compactView flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5 h-10 bg-primary-200'
            : CompactView
            ? 'compactView flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5 h-10'
            : CompactViewWrap && activeItemId == task?.id
            ? 'compactViewWrap flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5 bg-primary-200'
            : CompactViewWrap
            ? 'compactViewWrap flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
            : null
        }`}
      >
        <div className="flex items-center justify-between w-6/12 pr-24 ">
          <div
            className={`${
              comfortableView
                ? 'text-sm whitespace-nowrap w-5/6'
                : comfortableViewWrap
                ? 'text-sm w-5/6'
                : CompactView
                ? 'text-xs whitespace-nowrap w-5/6'
                : CompactViewWrap
                ? 'text-xs text-justify w-5/6'
                : null
            }`}
          >
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div key={col.id} className="flex items-center ml-2 text-xs font-medium capitalize group w-12/12">
                        <DataRenderFunc
                          taskColField={task?.[col.field]}
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task?.id)}
                        />
                      </div>
                    )
                )
              : taskColumns.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.id}
                        className="flex items-center ml-2 text-xs font-medium capitalize cursor-pointer group w-12/12"
                      >
                        <DataRenderFunc
                          taskColField={task?.[col.field]}
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task?.id)}
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
                      <div key={col.id} className="flex items-center ml-2 text-xs font-medium capitalize group">
                        <DataRenderFunc
                          taskColField={task?.[col.field]}
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task?.id)}
                        />
                      </div>
                    )
                )
              : taskColumns.map(
                  (col) =>
                    col.value == 'Tags' &&
                    !col.hidden && (
                      <div key={col.id} className="flex items-center ml-2 text-xs font-medium capitalize group">
                        <DataRenderFunc
                          taskColField={task?.[col.field]}
                          col={{ field: col.field, id: col.id }}
                          task={task}
                          getSubTaskId={getSubTaskId}
                          handleGetSubTask={() => handleGetSubTask(task?.id)}
                        />
                      </div>
                    )
                )}
          </div>
        </div>
        <div className=" dynamic">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value !== 'Task' &&
                  col.value !== 'Tags' &&
                  !col.hidden && (
                    <div
                      key={col.id}
                      className="items-center py-px font-medium text-gray-400 uppercase group"
                      style={{ width: '50px' }}
                    >
                      <DataRenderFunc
                        taskColField={task?.[col.field]}
                        col={{ field: col.field, id: col.id }}
                        task={task}
                        getSubTaskId={getSubTaskId}
                        handleGetSubTask={() => handleGetSubTask(task?.id)}
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
                      key={col.id}
                      className="items-center py-px font-medium text-gray-400 uppercase group"
                      style={{ width: '50px' }}
                    >
                      <DataRenderFunc
                        taskColField={task?.[col.field]}
                        col={{ field: col.field, id: col.id }}
                        task={task}
                        getSubTaskId={getSubTaskId}
                        handleGetSubTask={() => handleGetSubTask(task?.id)}
                      />
                    </div>
                  )
              )}
        </div>
      </div>
    </div>
  );
}
