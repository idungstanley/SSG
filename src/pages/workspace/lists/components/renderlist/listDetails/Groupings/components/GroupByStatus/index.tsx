import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { ITaskTemplateData } from '../../../../../../../tasks/component/views/hubLevel/TaskTableTemplateData';
import { CheckIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { ImyTaskData, setAddNewTaskItem } from '../../../../../../../../../features/task/taskSlice';
import { TaskDataGroupingsProps } from '../../../../../../../../../features/task/interface.tasks';
import TaskListViews from '../../../../../../../tasks/component/views/listLevel/TaskListViews';
import TaskData from '../../../../../../../tasks/component/taskData/TaskData';
import SubTask from '../../../../../../../subtasks/subtask1/SubTask';
import RenderSubTasks from '../../../../../../../tasks/subtasks/subtask1/RenderSubTasks';
import { useAppSelector } from '../../../../../../../../../app/hooks';
import AddNewItem from '../../../../../../../tasks/component/taskColumn/AddNewItem';
import { setCreateTaskFromTop, setCurrentListId } from '../../../../../../../../../features/list/listSlice';
import { useDispatch } from 'react-redux';

export default function GroupByStatusTemplate({ filteredTaskData }: ITaskTemplateData) {
  const [taskDataGroupingsByStatus, setTaskDataGroupingsByStatus] = useState<TaskDataGroupingsProps>({});
  const { addNewTaskItem, currentParentTaskId, getSubTaskId } = useAppSelector((state) => state.task);
  const { createTaskFromTop, currentListId } = useAppSelector((state) => state.list);
  const getTaskDataGrouping = useMemo(
    () => Object.keys(filteredTaskData)?.flatMap((data) => filteredTaskData[data].tasks),
    [filteredTaskData]
  );
  const dispatch = useDispatch();

  const handleNewItem = (taskDataGroupingsByStatus: string | undefined | null, addNewTaskItem: boolean) => {
    if (taskDataGroupingsByStatus || addNewTaskItem) {
      dispatch(setAddNewTaskItem(!addNewTaskItem));
      dispatch(setCurrentListId(taskDataGroupingsByStatus));
    }
  };

  useEffect(() => {
    const taskDataGroupedByStatusAndListID = getTaskDataGrouping?.reduce(
      (
        GroupedTaskByListID: {
          [key: string]: {
            groupListName:
              | string
              | number
              | [{ id: string; initials: string; colour: string; name: string }]
              | null
              | undefined;
            key?: string;
            tasksByStatus: {
              [key: string]: ImyTaskData[];
            };
          };
        },
        currentTask
      ) => {
        const listId = currentTask.list_id;
        const status = currentTask.status;

        if (status !== null && status !== undefined) {
          if (!GroupedTaskByListID[listId]) {
            GroupedTaskByListID[listId] = {
              groupListName: currentTask?.list,
              key: listId,
              tasksByStatus: {}
            };
          }

          if (!GroupedTaskByListID[listId].tasksByStatus[status]) {
            GroupedTaskByListID[listId].tasksByStatus[status] = [];
          }

          GroupedTaskByListID[listId].tasksByStatus[status].push(currentTask);
        }

        return GroupedTaskByListID;
      },
      {}
    );
    setTaskDataGroupingsByStatus(taskDataGroupedByStatusAndListID as TaskDataGroupingsProps);

    return () => {
      true;
    };
  }, [getTaskDataGrouping, setTaskDataGroupingsByStatus]);

  return (
    <main className="block m-1 rounded" style={{ backgroundColor: '#e1e4e5' }}>
      <section>
        {/* lists */}
        <div className="">
          {Object.keys(taskDataGroupingsByStatus).map((value) => (
            <div key={taskDataGroupingsByStatus[value].key} className="border p-5 rounded-xl relative">
              {/* Breadcrumb goes here */}

              {/* <p className="text-xs font-semibold text-gray-400 capitalize">
                {item.name}
              </p> */}
              <div
                className=" absolute  left-0 top-0 h-full w-1 rounded-l-md"
                style={{ backgroundColor: '#78828d' }}
              ></div>
              <div id="listTitle" className="flex items-center justify-between">
                <div className="group flex items-center justify-center " style={{ color: '#78828d', fontSize: '11px' }}>
                  <ChevronDownIcon className="flex-shrink-0 w-5 h-4" aria-hidden="true" />

                  <p className="text-base font-semibold text-black" style={{ backgroundColor: '#e1e4e5' }}>
                    {filteredTaskData[value].groupListName}
                  </p>

                  <InformationCircleIcon
                    className="flex-shrink-0 w-5 h-4 ml-1 "
                    style={{ color: '#78828d', fontSize: '11px' }}
                    aria-hidden="true"
                  />
                  <div
                    className=""
                    id="newItem"
                    onClick={() => {
                      dispatch(setCurrentListId(taskDataGroupingsByStatus[value].key));
                      dispatch(setCreateTaskFromTop(!createTaskFromTop));
                    }}
                  >
                    <p
                      className="uppercase px-1 py-1 text-xs font-medium cursor-pointer hover:bg-gray-200"
                      style={{ color: '#78828d', fontSize: '11px' }}
                    >
                      + New Task
                    </p>
                  </div>

                  <p
                    className="px-1 py-1 text-xs  cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200 uppercase font-medium  "
                    style={{ color: '#78828d', fontSize: '11px' }}
                  >
                    Add Description
                  </p>
                  <p
                    className="px-1 py-1 text-xs rou cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200 uppercase font-medium  "
                    style={{ color: '#78828d', fontSize: '11px' }}
                  >
                    Add Comment
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
                  <CheckIcon
                    className="flex-shrink-0 w-5 h-4 uppercase font-medium "
                    aria-hidden="true"
                    style={{ color: '#78828d', fontSize: '11px' }}
                  />
                  <p className="uppercase font-medium" style={{ color: '#78828d', fontSize: '11px' }}>
                    Show Closed
                  </p>
                </div>
              </div>
              <section id="border">
                <div className="inline-flex justify-center items-center w-full p-3 opacity-0 hover:opacity-100">
                  <hr className="my-2 w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
                  <span
                    className="absolute px-3 font-sm text-gray-400 -translate-x-1/2 dark:text-white dark:bg-gray-900 hover:text-blue-700 cursor-pointer text-xs"
                    style={{ backgroundColor: '#eee' }}
                  >
                    Add New Status dot com
                  </span>
                </div>
              </section>
              {createTaskFromTop && currentListId === taskDataGroupingsByStatus[value].key && (
                <AddNewItem listId={taskDataGroupingsByStatus[value].key} />
              )}

              <div>
                <div>
                  <ul>
                    {Object.keys(taskDataGroupingsByStatus[value].tasksByStatus).map((status) => (
                      <li key={status}>
                        <TaskListViews
                          taskLength={taskDataGroupingsByStatus[value].tasksByStatus[status].length}
                          status={status}
                        />
                        {taskDataGroupingsByStatus[value].tasksByStatus[status].map((task) => (
                          <Fragment key={task.id}>
                            <TaskData task={task} />
                            {currentParentTaskId === task.id ? (
                              <div>
                                <SubTask parentTaskId={currentParentTaskId} />
                              </div>
                            ) : null}
                            {getSubTaskId === task.id ? <RenderSubTasks /> : null}
                          </Fragment>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {addNewTaskItem && currentListId === taskDataGroupingsByStatus[value].key && (
                <AddNewItem listId={taskDataGroupingsByStatus[value].key} />
              )}
              <div
                className=""
                id="newItem"
                onClick={() => handleNewItem(taskDataGroupingsByStatus[value].key, addNewTaskItem)}
              >
                <p
                  className=" text-xs  mt-1 cursor-pointer ml-5 font-semibold hover:bg-gray-300 px-1 rounded-md border-1"
                  style={{ color: '#78828d', fontSize: '11px', width: '70px' }}
                >
                  + New Task
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
