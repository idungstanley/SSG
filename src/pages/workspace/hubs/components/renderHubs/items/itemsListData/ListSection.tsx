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
import TaskListViews from "../../../../../tasks/component/views/TaskListViews";
import ItemsListsData from "./ItemsListsData";

export default function ListSection({ data }: any) {
  return (
    <section id="listcard" className="p-3 mt-3 " key={data.id}>
      <div className="block p-2 bg-gray-200 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div id="listTitle" className="flex items-center justify-between">
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
        </div>
        {/* card */}
        <div className="pt-10 bg-gray-200">
          {/* data and input */}
          <TaskListViews />
          <div>{<ItemsListsData listId={data.id} />}</div>
          {/* icons */}
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
