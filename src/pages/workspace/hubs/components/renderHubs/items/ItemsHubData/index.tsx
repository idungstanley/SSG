import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import { useGetHubChildren } from "../../../../../../../features/hubs/hubService";
import "../ItemsHubData/wallet.css";
import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import TaskListViews from "../../../../../tasks/component/views/TaskListViews";
import ListTemplate from "./ListTemplate";
import AddNewItem from "../../../../../tasks/component/taskColumn/AddNewItem";
import { setAddNewTaskItem } from "../../../../../../../features/task/taskSlice";
import {
  setCreateTaskFromTop,
  setCurrentListId,
} from "../../../../../../../features/list/listSlice";

interface ItemsHubDataProps {
  hubId: string | null;
  hubName: string | null;
}
export default function ItemsHubData({ hubId, hubName }: ItemsHubDataProps) {
  const { data } = useGetHubChildren({ query: hubId });

  const dispatch = useAppDispatch();

  const { addNewTaskItem } = useAppSelector((state) => state.task);
  const { currentListId, createTaskFromTop } = useAppSelector(
    (state) => state.list
  );

  return (
    <section>
      {/* lists */}
      <div className="">
        {data?.data.lists.map((item) => {
          return (
            <div key={item.id}>
              <div className="border p-5 rounded">
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
                    <div
                      className=""
                      id="newItem"
                      onClick={() => {
                        dispatch(setCurrentListId(item.id));
                        dispatch(setCreateTaskFromTop(!createTaskFromTop));
                      }}
                    >
                      <p className="capitalize px-1 py-1 text-xs cursor-pointer ">
                        + New Task
                      </p>
                    </div>

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
                {createTaskFromTop && currentListId === item.id && (
                  <AddNewItem listId={data.id} />
                )}
                <div>
                  <div className="mt-5 ">
                    <TaskListViews />
                    <span>
                      <ListTemplate listId={item.id} />
                    </span>
                  </div>
                </div>
                {addNewTaskItem && currentListId === item.id && (
                  <AddNewItem listId={item.id} />
                )}
                <div
                  className=""
                  id="newItem"
                  onClick={() => {
                    dispatch(setAddNewTaskItem(!addNewTaskItem));
                    dispatch(setCurrentListId(item.id));
                  }}
                >
                  <p className="pl-2 text-xs   mt-1 cursor-pointer ml-10 font-semibold text-gray-400">
                    + New Task
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
