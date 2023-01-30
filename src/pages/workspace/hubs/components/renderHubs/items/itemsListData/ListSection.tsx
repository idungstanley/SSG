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
import "../ItemsHubData/wallet.css";

export default function ListSection({ data }: any) {
  return (
    <section
      id="listcard"
      className="pb-5 bg-gray-100 w-full last "
      key={data.id}
    >
      <div className=" p-2 bg-gray-100">
        <div id="listTitle" className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <ChevronDownIcon
              className="flex-shrink-0 w-5 h-4"
              aria-hidden="true"
            />
            <p className="font-bold text-xs text-gray-700 dark:text-gray-400 capitalize">
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
          <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
            <CheckIcon
              className="flex-shrink-0 w-5 h-4 text-gray-400"
              aria-hidden="true"
            />
            <p>Show Closed</p>
          </div>
        </div>
        {/* card */}
        <div className=" bg-gray-100 ">
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
