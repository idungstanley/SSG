import { CheckIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import TaskListViews from '../../../../../tasks/component/views/TaskListViews';
import ItemsListsData from './ItemsListsData';
import '../ItemsHubData/wallet.css';
import AddNewItem from '../../../../../tasks/component/taskColumn/AddNewItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setAddNewTaskItem } from '../../../../../../../features/task/taskSlice';
import { setCreateTaskFromTop, setCurrentListId } from '../../../../../../../features/list/listSlice';
import { dataProps } from '../../../../../../../components/Index/walletIndex/WalletIndex';

export default function ListSection({ data }: { data: dataProps }) {
  const { addNewTaskItem } = useAppSelector((state) => state.task);
  const { currentListId, createTaskFromTop } = useAppSelector((state) => state.list);

  const dispatch = useAppDispatch();

  return (
    <section id="listcard" className=" m-1 bg-white last " key={data.id}>
      <div className="border p-5 rounded relative" style={{ backgroundColor: '#e1e4e5' }}>
        <div className=" absolute  left-0 top-0 h-full w-1 rounded-l-md" style={{ backgroundColor: '#78828d' }}>
          <p className="opacity-0">t</p>
        </div>
        <div id="listTitle" className="flex items-center justify-between">
          <div className="group flex items-center justify-center text-gray-400">
            <ChevronDownIcon className="flex-shrink-0 w-5 h-4" aria-hidden="true" />
            <p className="text-base font-semibold text-black	" style={{ backgroundColor: '#e1e4e5' }}>
              {data.name}
            </p>

            <InformationCircleIcon className="flex-shrink-0 w-5 h-4 ml-1 text-gray-400" aria-hidden="true" />
            <div
              className=""
              id="newItem"
              onClick={() => {
                dispatch(setCurrentListId(data.id));
                dispatch(setCreateTaskFromTop(!createTaskFromTop));
              }}
            >
              <p className="capitalize px-1 py-1 text-xs cursor-pointer ">+ New Task</p>
            </div>
            <p className="px-1 py-1 text-xs  cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200  ">
              Add Description
            </p>
            <p className="px-1 py-1 text-xs rou cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200  ">
              Add Comment
            </p>
          </div>

          <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
            <CheckIcon className="flex-shrink-0 w-5 h-4 text-gray-400" aria-hidden="true" />
            <p>Show Closed</p>
          </div>
        </div>
        {createTaskFromTop && currentListId === data.id && <AddNewItem listId={data.id} />}
        {/* card */}
        <div className="">
          {/* data and input */}
          <TaskListViews />
          <div>{<ItemsListsData listId={data.id} />}</div>
          {/* icons */}
        </div>

        {addNewTaskItem && currentListId === data.id && <AddNewItem listId={data.id} />}
        <div
          className=""
          id="newItem"
          onClick={() => {
            dispatch(setAddNewTaskItem(!addNewTaskItem));
            dispatch(setCurrentListId(data.id));
          }}
        >
          <p
            className=" text-xs   mt-1 cursor-pointer ml-7 font-semibold text-gray-400
          hover:bg-gray-300 px-1 rounded-md border-1"
            style={{ color: '#78828d', fontSize: '11px', width: '70px' }}
          >
            + New Task
          </p>
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
