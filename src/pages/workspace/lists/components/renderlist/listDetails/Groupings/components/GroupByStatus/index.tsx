import React, { useEffect, useMemo, useState } from 'react';
import { ITaskTemplateData } from '../../../../../../../tasks/component/views/hubLevel/TaskTableTemplateData';
import { CheckIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  ICustomField,
  ImyTaskData,
  setAddNewTaskItem,
  setUpdateCords
} from '../../../../../../../../../features/task/taskSlice';
import { TaskDataGroupingsProps } from '../../../../../../../../../features/task/interface.tasks';
import TaskListViews from '../../../../../../../tasks/component/views/listLevel/TaskListViews';
import { useAppSelector } from '../../../../../../../../../app/hooks';
import AddNewItem from '../../../../../../../tasks/component/taskColumn/AddNewItem';
import { setCreateTaskFromTop, setCurrentListId } from '../../../../../../../../../features/list/listSlice';
import { useDispatch } from 'react-redux';
import { useScroll } from '../../../../../../../../../hooks/useScroll';

export default function GroupByStatusTemplate({ filteredTaskData }: ITaskTemplateData) {
  const [taskDataGroupingsByStatus, setTaskDataGroupingsByStatus] = useState<TaskDataGroupingsProps>({});
  const { addNewTaskItem } = useAppSelector((state) => state.task);
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

  // const taskIds = Object.keys(taskDataGroupingsByStatus).map((key) => ({
  //   id: key
  // }));
  // console.log(taskIds);

  useEffect(() => {
    const taskDataGroupedByStatusAndListID = getTaskDataGrouping?.reduce(
      (
        GroupedTaskByListID: {
          [key: string]: {
            groupListName:
              | string
              | number
              | ICustomField[]
              | [{ id: string; initials: string; color: string; name: string }]
              | null
              | undefined;
            key?: string;
            list?: string[];
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
          // if (!GroupedTaskByListID[listId]) {
          //   GroupedTaskByListID[listId] = {
          //     groupListName: currentTask?.list,
          //     key: listId,
          //     tasksByStatus: {}
          //   };
          // }

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

  const handleScroll = useScroll(() => dispatch(setUpdateCords()));

  return (
    <main
      onScroll={handleScroll}
      className="block m-1 rounded overflow-x-scroll"
      style={{ backgroundColor: '#e1e4e5', maxHeight: '85vh' }}
    >
      {/* lists */}

      {Object.keys(taskDataGroupingsByStatus).map((value) => (
        <div key={taskDataGroupingsByStatus[value].key} className="relative p-5 border rounded-xl">
          {/* Breadcrumb goes here */}

          {/* <p className="text-xs font-semibold text-gray-400 capitalize">
                {item.name}
              </p> */}
          <div className="absolute top-0 left-0 w-1 h-full rounded-l-md" style={{ backgroundColor: '#78828d' }}></div>
          <div id="listTitle" className="flex items-center justify-between">
            <div className="flex items-center justify-center group " style={{ color: '#78828d', fontSize: '11px' }}>
              <ChevronDownIcon className="flex-shrink-0 w-5 h-4" aria-hidden="true" />

              <p className="text-base font-semibold text-black" style={{ backgroundColor: '#e1e4e5' }}>
                {filteredTaskData[value]?.groupListName}
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
                  className="px-1 py-1 text-xs font-medium uppercase cursor-pointer hover:bg-gray-200"
                  style={{ color: '#78828d', fontSize: '11px' }}
                >
                  + New Task
                </p>
              </div>

              <p
                className="px-1 py-1 text-xs font-medium uppercase transition duration-200 opacity-0 cursor-pointer group-hover:opacity-100 hover:bg-gray-200 "
                style={{ color: '#78828d', fontSize: '11px' }}
              >
                Add Description
              </p>
              <p
                className="px-1 py-1 text-xs font-medium uppercase transition duration-200 opacity-0 cursor-pointer rou group-hover:opacity-100 hover:bg-gray-200 "
                style={{ color: '#78828d', fontSize: '11px' }}
              >
                Add Comment
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
              <CheckIcon
                className="flex-shrink-0 w-5 h-4 font-medium uppercase "
                aria-hidden="true"
                style={{ color: '#78828d', fontSize: '11px' }}
              />
              <p className="font-medium uppercase" style={{ color: '#78828d', fontSize: '11px' }}>
                Show Closed
              </p>
            </div>
          </div>
          <section id="border">
            <div className="inline-flex items-center justify-center w-full p-3 opacity-0 hover:opacity-100">
              <hr className="w-full h-px my-2 bg-gray-300 border-0 dark:bg-gray-700" />
              <span
                className="absolute px-3 text-xs text-gray-400 -translate-x-1/2 cursor-pointer font-sm dark:text-white dark:bg-gray-900 hover:text-blue-700"
                style={{ backgroundColor: '#eee' }}
              >
                Add New Status dot com
              </span>
            </div>
          </section>
          {createTaskFromTop && currentListId === taskDataGroupingsByStatus[value].key && (
            <AddNewItem listId={taskDataGroupingsByStatus[value].key} />
          )}

          <ul className="relative ml-6">
            {Object.keys(taskDataGroupingsByStatus[value].tasksByStatus).map((status) => (
              <li onScroll={handleScroll} className="overflow-x-scroll" key={status}>
                <TaskListViews
                  listId={taskDataGroupingsByStatus[value].key}
                  taskLength={taskDataGroupingsByStatus[value].tasksByStatus[status].length}
                  status={status}
                />

                {taskDataGroupingsByStatus[value].tasksByStatus[status].map((task) => (
                  <div className="group" key={task.id}></div>
                ))}
              </li>
            ))}
          </ul>

          {addNewTaskItem && currentListId === taskDataGroupingsByStatus[value].key && (
            <AddNewItem listId={taskDataGroupingsByStatus[value].key} />
          )}
          <div
            className=""
            id="newItem"
            onClick={() => handleNewItem(taskDataGroupingsByStatus[value].key, addNewTaskItem)}
          >
            <p
              className="px-1 mt-1 ml-5 text-xs font-semibold rounded-md cursor-pointer hover:bg-gray-300 border-1"
              style={{ color: '#78828d', fontSize: '11px', width: '70px' }}
            >
              + New Task
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}
