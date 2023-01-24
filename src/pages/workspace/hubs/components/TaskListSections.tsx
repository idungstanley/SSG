import { CalendarOutlined, FlagOutlined, UserAddOutlined } from '@ant-design/icons';
import { CheckIcon, ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function TaskListSections({data}:any) {
  return (
    <section id="listcard" className="p-3 mt-3" key={data.id}>
      <div className="block p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div id="listTitle" className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <ChevronDownIcon
              className="flex-shrink-0 w-5 h-4"
              aria-hidden="true"
            />
            <p className="font-bold text-gray-700 dark:text-gray-400">
              {data.name}
            </p>
            <InformationCircleIcon
              className="flex-shrink-0 w-5 h-4 text-gray-400"
              aria-hidden="true"
            />
            <p className="px-1 py-1 text-xs rounded cursor-pointer hover:bg-gray-200">
              + New Task
            </p>
            <p className="px-1 py-1 text-xs rounded cursor-pointer hover:bg-gray-200">
              Add Description
            </p>
            <p className="px-1 py-1 text-xs rounded cursor-pointer hover:bg-gray-200">
              Add Comment
            </p>
          </div>
          <div className="flex items-center justify-center space-x-1 text-gray-400">
            <CheckIcon
              className="flex-shrink-0 w-5 h-4 text-gray-400"
              aria-hidden="true"
            />
            <p>Show Closed</p>
          </div>
        </div>
        <section id="border">
          <div className="inline-flex items-center justify-center w-full p-3">
            <hr className="w-full h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />
            <span className="fixed px-3 text-gray-400 -translate-x-1/2 bg-white left-1/2 font-sm dark:text-white dark:bg-gray-900">
              Add New Status
            </span>
          </div>
        </section>
        {/* card */}
        <div className="flex items-center px-2 py-1 bg-white border border-gray-100 rounded-lg">
          {/* data and input */}
          <div className="w-6/12">
            <p>task name here</p>
          </div>
          {/* icons */}
          <div className="flex items-center space-x-10">
            <span className="p-1 ml-1 border-2 border-gray-300 border-dotted rounded-full">
              <UserAddOutlined
                className="h-5 text-gray-400 w-7"
                aria-hidden="true"
              />
            </span>
            <span className="p-1 ml-1 border-2 border-gray-300 border-dotted rounded-full">
              <CalendarOutlined
                className="h-5 text-gray-400 w-7"
                aria-hidden="true"
              />
            </span>
            <span className="p-1 ml-1 border-2 border-gray-300 border-dotted rounded-full">
              <FlagOutlined
                className="h-5 text-gray-400 w-7"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
