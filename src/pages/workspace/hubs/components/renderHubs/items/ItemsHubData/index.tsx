import React from "react";
import { useAppSelector } from "../../../../../../../app/hooks";
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
import { getTaskListService } from "../../../../../../../features/task/taskService";
import ListTemplate from "./ListTemplate";
import { useParams } from "react-router-dom";

interface ItemsHubDataProps {
  hubId: string | null;
  hubName: string | null;
}
export default function ItemsHubData({ hubId, hubName }: ItemsHubDataProps) {
  const { data } = useGetHubChildren({ query: hubId });

  return (
    <section>
      {/* lists */}
      <div className="">
        {data?.data.lists.map((item) => {
          console.log(item);

          return (
            <>
              <div key={item.name} className="border p-5 rounded">
                <p className="text-xs font-semibold text-gray-400	">{hubName}</p>
                <div
                  id="listTitle"
                  className="flex items-center justify-between"
                >
                  <div className="group flex items-center justify-center text-gray-400">
                    <ChevronDownIcon
                      className="flex-shrink-0 w-5 h-4"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-medium text-black font-sans">
                      {item.name}
                    </p>

                    <InformationCircleIcon
                      className="flex-shrink-0 w-5 h-4 ml-1 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="capitalize px-1 py-1 text-xs cursor-pointer ">
                      + New Task
                    </p>
                    <p className="px-1 py-1 text-xs  cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200  ">
                      Add Description
                    </p>
                    <p className="px-1 py-1 text-xs rou cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200  ">
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
                <div>
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
