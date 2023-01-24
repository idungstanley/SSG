import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import React from 'react';

interface TaskQuickActionProps {
  listDetailsData: any;
}

export default function TaskQuickAction({
  listDetailsData,
}: TaskQuickActionProps) {
  return (
    <>
      <div id="listTitle" className="flex justify-between items-center">
        <div className="flex items-center justify-center space-x-2 text-gray-400 group">
          <ChevronDownIcon
            className="flex-shrink-0 h-4 w-5"
            aria-hidden="true"
          />
          <p className="font-bold text-gray-700 dark:text-gray-400">
            {listDetailsData?.data?.list?.name}
          </p>
          <InformationCircleIcon
            className="flex-shrink-0 h-4 w-5 text-gray-400"
            aria-hidden="true"
          />
          <p className="text-xs hover:bg-gray-200 hover:text-gray-500 cursor-pointer transition-all ease-in-out		">
            {' '}
            + New Task
            {/* <span onClick={() => handleNewTask()}></span> */}
          </p>
          <p className="opacity-0 group-hover:opacity-100 hover:bg-gray-300 hover:text-gray-500 border-gray-700 p-1 cursor-pointer text-xs transition-all	ease-in-out	">
            Add Description
          </p>
          <p className="opacity-0 group-hover:opacity-100 hover:bg-gray-300 hover:text-gray-500 border-gray-700 p-1 cursor-pointer text-xs transition-all	ease-in-out	">
            Add Comment
          </p>
        </div>
        <div className="flex items-center justify-center space-x-1 text-gray-400">
          <CheckIcon
            className="flex-shrink-0 h-4 w-5 text-gray-400"
            aria-hidden="true"
          />
          <p>Show Closed</p>
        </div>
      </div>
      <section id="border">
        <div className="inline-flex justify-center items-center w-full p-3 opacity-0 hover:opacity-100">
          <hr className="my-8 w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
          <span
            className="absolute px-3 font-sm text-gray-400 -translate-x-1/2 dark:text-white dark:bg-gray-900 hover:text-blue-700 cursor-pointer text-xs"
            style={{ backgroundColor: '#eee' }}
          >
            Add New Status
          </span>
        </div>
      </section>
    </>
  );
}
