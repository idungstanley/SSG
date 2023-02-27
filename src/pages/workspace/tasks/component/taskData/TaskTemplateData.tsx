import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
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
// import ListTemplate from '../../../hubs/components/renderHubs/items/ItemsHubData/ListTemplate';
// import { setAddNewTaskItem } from '../../../../../features/task/taskSlice';
import {
  ITaskFullListObj,
  KeyItemTypes,
} from '../../../../../features/task/interface.tasks';
import TaskData from './TaskData';

export default function TaskTemplateData({
  filteredTaskData,
}: ITaskFullListObj) {
  const dispatch = useDispatch();
  const { createTaskFromTop } = useAppSelector((state) => state.list);
  // const { addNewTaskItem } = useAppSelector((state) => state.task);
  console.log(filteredTaskData);

  return (
    <section>
      {/* lists */}
      <div className="">
        {Object.keys(filteredTaskData).map((value) => (
          <div
            key={filteredTaskData[value as keyof KeyItemTypes].key}
            className="border p-5 rounded-xl relative"
          >
            {/* <p className="text-xs font-semibold text-gray-400 capitalize">
                {item.name}
              </p> */}
            <div
              className=" absolute  left-0 top-0 h-full w-1 rounded-l-md"
              style={{ backgroundColor: '#78828d' }}
            >
              <p className="opacity-0">t</p>
            </div>
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
                  {filteredTaskData[value as keyof KeyItemTypes].groupListName}
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
                    dispatch(
                      setCurrentListId(
                        filteredTaskData[value as keyof KeyItemTypes].key
                      )
                    );
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
                <TaskListViews />
                {/* <span>
                  <ListTemplate listId={item.id} />
                </span> */}
                {filteredTaskData[value as keyof KeyItemTypes].tasks?.map(
                  (task) => (
                    <Fragment key={task.id}>
                      <TaskData task={task} />
                    </Fragment>
                  )
                )}
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
  );
}
