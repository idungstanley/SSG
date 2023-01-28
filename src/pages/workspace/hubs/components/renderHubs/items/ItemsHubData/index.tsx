import React from "react";
import { useGetHubChildren } from "../../../../../../../features/hubs/hubService";
import TaskData from "../../../../../tasks/component/taskData/TaskData";
import "../ItemsHubData/wallet.css";
import { MdDragIndicator } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";
import {
  CalendarOutlined,
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import TaskListViews from "../../../../../tasks/component/views/TaskListViews";
import ListTemplate from "./ListTemplate";

interface ItemsHubDataProps {
  hubId: string | null;
}
export default function ItemsHubData({ hubId }: ItemsHubDataProps) {
  const { data } = useGetHubChildren({ query: hubId });
  console.log(data);

  return (
    <section>
      {/* wallets */}
      {/* <div className="stac">{data?.data.wallets.map((item) => item.name)}</div> */}

      {/* lists */}
      <div className="">
        {data?.data.lists.map((item) => {
          return (
            <>
              <p>nich</p>
              <div
                key={item.name}
                className="group relative mb-px bordar hover:bg-gray-100  items-center  border-gray-100 pb-10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <ChevronDownIcon
                        className="flex-shrink-0 w-5 h-4"
                        aria-hidden="true"
                      />
                      <p className="font-bold text-gray-700 dark:text-gray-400">
                        {item.name}
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
                  <div className="mt-5 ">
                    <TaskListViews />
                    <span>
                      <ListTemplate listId={item.id} />
                    </span>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}
