import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  setCreateTaskFromTop,
  setCurrentListId,
} from '../../../../../features/list/listSlice';
import { useAppSelector } from '../../../../../app/hooks';
// import AddNewItem from '../taskColumn/AddNewItem';
import TaskListViews from '../views/TaskListViews';
// import { setAddNewTaskItem } from '../../../../../features/task/taskSlice';
// import {
//   ITaskFullListObj,
//   KeyItemTypes,
// } from '../../../../../features/task/interface.tasks';
import TaskData from './TaskData';

export default function TaskTemplateData({ filteredTaskData }) {
  const dispatch = useDispatch();
  const { createTaskFromTop } = useAppSelector((state) => state.list);
  // const { addNewTaskItem } = useAppSelector((state) => state.task);

  return (
    <main className="block m-1 rounded" style={{ backgroundColor: '#e1e4e5' }}>
      <section>
        {/* lists */}
        <div className="">
          {Object.keys(filteredTaskData).map((value) => (
            <div
              key={filteredTaskData[value].key}
              className="border p-5 rounded-xl relative"
            >
              {/* Breadcrumb goes here */}

              {/* <p className="text-xs font-semibold text-gray-400 capitalize">
                {item.name}
              </p> */}
              <div
                className=" absolute  left-0 top-0 h-full w-1 rounded-l-md"
                style={{ backgroundColor: '#78828d' }}
              ></div>
              <div id="listTitle" className="flex items-center justify-between">
                <div
                  className="group flex items-center justify-center "
                  style={{ color: '#78828d', fontSize: '11px' }}
                >
                  <ChevronDownIcon
                    className="flex-shrink-0 w-5 h-4"
                    aria-hidden="true"
                  />

                  <p
                    className="text-base font-semibold text-black	"
                    style={{ backgroundColor: '#e1e4e5' }}
                  >
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
                  <p
                    className="uppercase font-medium"
                    style={{ color: '#78828d', fontSize: '11px' }}
                  >
                    Show Closed
                  </p>
                </div>
              </div>
              {/* {createTaskFromTop && currentListId === item.id && (
              <AddNewItem listId={data.id} />
            )} */}
              <div>
                <div>
                  <TaskListViews
                    taskLength={filteredTaskData[value].tasks.length}
                  />
                  {filteredTaskData[value].tasks?.map((task) => (
                    <Fragment key={task.id}>
                      <TaskData task={task} />
                    </Fragment>
                  ))}
                </div>
              </div>
              {/* {addNewTaskItem && currentListId === item.id && (
              <AddNewItem listId={item.id} />
            )}
            <div
              className=""
              id="newItem"
              onClick={() => {
                dispatch(setAddNewTaskItem(!addNewTaskItem));
                dispatch(setCurrentListId(item.id));
              }}
            >
              <p
                className=" text-xs  mt-1 cursor-pointer ml-5 font-semibold hover:bg-gray-300 px-1 rounded-md border-1"
                style={{ color: '#78828d', fontSize: '11px', width: '70px' }}
              >
                + New Task
              </p>
            </div> */}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

TaskTemplateData.propTypes = {
  filteredTaskData: {
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    list_id: PropTypes.string,
    parent_id: null,
    priority: null,
    status: PropTypes.string,
    start_date: null,
    end_date: null,
    assignees: PropTypes.array,
    group_assignees: PropTypes.array,
    custom_fields: PropTypes.array,
    tags: PropTypes.array,
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
    archived_at: null,
    deleted_at: null,
    directory_items: PropTypes.array,
    list: {
      id: PropTypes.string,
      name: PropTypes.string,
      parents: {
        hubs: [
          {
            id: PropTypes.string,
            name: PropTypes.string,
            parent_id: null,
          },
        ],
        wallets: PropTypes.array,
        lists: PropTypes.array,
      },
    },
  },
};
