import { CheckIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { setCreateTaskFromTop } from '../../../../../features/list/listSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import AddNewItem from '../taskColumn/AddNewItem';
import { useParams } from 'react-router-dom';

interface TaskQuickActionProps {
  listDetailsData: string | null | undefined;
}

export default function TaskQuickAction({ listDetailsData }: TaskQuickActionProps) {
  const dispatch = useAppDispatch();
  const { createTaskFromTop } = useAppSelector((state) => state.list);

  const { listId } = useParams();

  return (
    <>
      <div id="listTitle" className="flex justify-between items-center">
        <div className="flex items-center justify-center text-gray-400 group">
          <ChevronDownIcon className="flex-shrink-0 h-4 w-5" aria-hidden="true" />
          <p className="font-bold text-gray-700 dark:text-gray-400">{listDetailsData}</p>
          <InformationCircleIcon className="flex-shrink-0 h-4 w-5 text-gray-400" aria-hidden="true" />
          <p
            className="uppercase px-1 py-1 text-xs font-medium cursor-pointer hover:bg-gray-200"
            style={{ color: '#78828d', fontSize: '11px' }}
            onClick={() => {
              dispatch(setCreateTaskFromTop(!createTaskFromTop));
            }}
          >
            + New Task
          </p>
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
      {createTaskFromTop && <AddNewItem listId={listId} />}
    </>
  );
}
