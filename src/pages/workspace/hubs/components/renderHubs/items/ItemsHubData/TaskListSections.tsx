import {
  CalendarOutlined,
  FlagOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import ItemsHubData from ".";

export default function TaskListSections({ data }: any) {
  return (
    <section
      id="listcard"
      className="text-xs h-full bg-gray-100 "
      key={data.id}
    >
      <div className="block p-5 bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className=" capitalize ">
          <ItemsHubData hubId={data.id} />
        </div>
        {/* <div id="listTitle" className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <ChevronDownIcon
              className="flex-shrink-0 w-5 h-4"
              aria-hidden="true"
            />
            <p className="font-bold text-gray-700 dark:text-gray-400">
              {data.name.toUpperCase()}
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
          <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
            <CheckIcon
              className="flex-shrink-0 w-5 h-4 text-gray-400"
              aria-hidden="true"
            />
            <p>Show Closed</p>
          </div>
        </div> */}
        {/* card */}
        <div className="flex items-center mt-10 px-2 bg-white border py-1 border-gray-100 rounded">
          {/* data and input */}
          {/* <div className="w-6/12 capitalize ">
            <ItemsHubData hubId={data.id} />
          </div> */}
          {/* icons */}
          {/* <div className="flex items-center space-x-10">
            <span className="p-1 ml-1 border-2 border-gray-300 border-dotted rounded-full">
              <UserAddOutlined
                className=" text-gray-400 text-xs h-5 w-5"
                aria-hidden="true"
              />
            </span>
            <span className="p-1 ml-1 border-2 border-gray-300 border-dotted rounded-full">
              <CalendarOutlined
                className="h-5 w-5 text-xs text-gray-400 "
                aria-hidden="true"
              />
            </span>
            <span className="p-1 ml-1 border-2 border-gray-300 border-dotted rounded-full">
              <FlagOutlined
                className="h-5 w-5 text-xs text-gray-400"
                aria-hidden="true"
              />
            </span>
          </div> */}
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
