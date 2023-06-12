import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { CheckIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { setCreateTaskFromTop, setCurrentListId } from '../../../../../../features/list/listSlice';
import { useAppSelector } from '../../../../../../app/hooks';
import TaskListViews from '../listLevel/TaskListViews';
// import {
//   ITaskFullListObj,
//   KeyItemTypes,
// } from '../../../../../features/task/interface.tasks';
import TaskData from '../../taskData/TaskData';
import { setAddNewTaskItem } from '../../../../../../features/task/taskSlice';
import AddNewItem from '../../taskColumn/AddNewItem';
import SubTask from '../../../subtasks/create/SubTask';
import RenderSubTasks from '../../../subtasks/subtask1/RenderSubTasks';
import { ITaskTemplateData } from './TaskTableTemplateData';

export default function TaskTemplateData({ filteredTaskData }: ITaskTemplateData) {
  const dispatch = useDispatch();
  const { createTaskFromTop, currentListId } = useAppSelector((state) => state.list);
  const { addNewTaskItem, currentParentTaskId, getSubTaskId } = useAppSelector((state) => state.task);

  return (
    <main className="block m-1 rounded" style={{ backgroundColor: '#e1e4e5' }}>
      <section>
        {/* lists */}
        <div className="">
          {Object.keys(filteredTaskData).map((value) => (
            <div key={filteredTaskData[value].key} className="border p-5 rounded-xl relative">
              {/* Breadcrumb goes here */}

              {/* <p className="text-xs font-semibold text-gray-400 capitalize">
                {item.name}
              </p> */}
              <div
                className="absolute left-0 top-0 h-full w-1 rounded-l-md"
                style={{ backgroundColor: '#78828d' }}
              ></div>
              {/* <div id="listTitle" className="flex items-center justify-between">
                <div className="group flex items-center justify-center " style={{ color: '#78828d', fontSize: '11px' }}>
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
                      dispatch(setCurrentListId(filteredTaskData[value].key));
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
              </div> */}
              <section id="border">
                {/* <div className="inline-flex justify-center items-center w-full p-3 opacity-0 hover:opacity-100">
                  <hr className="my-2 w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
                  <span
                    className="absolute px-3 font-sm text-gray-400 -translate-x-1/2 dark:text-white dark:bg-gray-900 hover:text-blue-700 cursor-pointer text-xs"
                    style={{ backgroundColor: '#eee' }}
                  >
                    Add New Status dot com
                  </span>
                </div> */}
              </section>
              {createTaskFromTop && currentListId === filteredTaskData[value].key && (
                <AddNewItem listId={filteredTaskData[value].key} />
              )}

              <div>
                <div>
                  {currentListId ? (
                    <TaskListViews listId={currentListId} taskLength={filteredTaskData[value].tasks.length} />
                  ) : (
                    <span>listId required</span>
                  )}
                  {filteredTaskData[value].tasks?.map((task) => (
                    <Fragment key={task.id}>
                      <TaskData task={task} listId={task.list_id} />
                      {currentParentTaskId === task.id ? (
                        <div>
                          <SubTask parentTaskId={currentParentTaskId} />
                        </div>
                      ) : null}
                      {getSubTaskId === task.id ? <RenderSubTasks /> : null}
                    </Fragment>
                  ))}
                </div>
              </div>
              {addNewTaskItem && currentListId === filteredTaskData[value].key && (
                <AddNewItem listId={filteredTaskData[value].key} />
              )}
              <div
                className=""
                id="newItem"
                onClick={() => {
                  dispatch(setAddNewTaskItem(!addNewTaskItem));
                  dispatch(setCurrentListId(filteredTaskData[value].key));
                }}
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
