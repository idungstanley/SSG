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
import AddNewItem from "../../../../../tasks/component/taskColumn/AddNewItem";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import { setAddNewTaskItem } from "../../../../../../../features/task/taskSlice";

export default function ListSection({ data }: any) {
  const { addNewTaskItem } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  return (
    <section id="listcard" className=" m-1 bg-white last " key={data.id}>
      <div className="border p-5 rounded bg-gray-100">
        <div id="listTitle" className="flex items-center justify-between">
          <div className="group flex items-center justify-center text-gray-400">
            <ChevronDownIcon
              className="flex-shrink-0 w-5 h-4"
              aria-hidden="true"
            />
            <p className="text-xs font-medium text-black font-sans">
              {data.name}
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

        {/* card */}
        <div className="mt-5">
          {/* data and input */}
          <TaskListViews />
          <div>{<ItemsListsData listId={data.id} />}</div>
          {/* icons */}
        </div>

        {addNewTaskItem && <AddNewItem listId={data.id} />}
        <div
          className=""
          id="newItem"
          onClick={() => dispatch(setAddNewTaskItem(!addNewTaskItem))}
        >
          <p className="pl-2 text-xs   mt-1 cursor-pointer ml-10 font-semibold text-gray-400">
            + New Task
          </p>
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
