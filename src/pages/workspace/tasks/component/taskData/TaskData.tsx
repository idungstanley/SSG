import React from 'react';
import { ImyTaskData } from '../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../app/hooks';
import './task.css';
import DataRenderFunc from './DataRenderFunc';

interface TaskDataProps {
  task: ImyTaskData;
}

export default function TaskData({ task }: TaskDataProps) {
  const { taskColumns, hideTask, CompactViewSettings, SingleLineViewSettings } =
    useAppSelector((state) => state.task);

  return (
    <div className="relative">
      <div
        className={`${
          SingleLineViewSettings
            ? 'singleLineView flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative'
            : CompactViewSettings
            ? 'CompactView flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-2'
            : ' flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative border-1.5'
        }`}
      >
        <div className="flex items-center justify-between w-6/12 pr-24 ">
          <div className="w-5/6">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.field}
                        className="flex items-center ml-2 text-xs font-medium capitalize group"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
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
                        className="flex items-center ml-2 text-xs font-medium capitalize cursor-pointer group"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
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
                        className="flex items-center ml-2 text-xs font-medium capitalize group"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
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
                        className="flex items-center ml-2 text-xs font-medium capitalize group"
                      >
                        <DataRenderFunc
                          taskColField={task[col.field]}
                          colfield={col.field}
                          task={task}
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
                      key={col.field}
                      className="items-center py-px font-medium text-gray-400 uppercase group"
                      style={{ width: '50px' }}
                    >
                      <DataRenderFunc
                        taskColField={task[col.field]}
                        colfield={col.field}
                        task={task}
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
                      className="items-center py-px font-medium text-gray-400 uppercase group"
                      style={{ width: '50px' }}
                    >
                      <DataRenderFunc
                        taskColField={task[col.field]}
                        colfield={col.field}
                        task={task}
                      />
                    </div>
                  )
              )}
        </div>
      </div>
    </div>
  );
}
