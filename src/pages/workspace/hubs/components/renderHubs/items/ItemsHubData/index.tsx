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
            <div key={item.id} className="border p-5 rounded-xl relative">
              {/* <p className="text-xs font-semibold text-gray-400 capitalize">
                {item.name}
              </p> */}
              <div
                className=" absolute  left-0 top-0 h-full w-1 rounded-l-md"
                style={{ backgroundColor: "#78828d" }}
              >
                <p className="opacity-0">t</p>
              </div>
              <div id="listTitle" className="flex items-center justify-between">
                <div
                  className="group flex items-center justify-center "
                  style={{ color: "#78828d", fontSize: "11px" }}
                >
                  <ChevronDownIcon
                    className="flex-shrink-0 w-5 h-4"
                    aria-hidden="true"
                  />

                  <p
                    className="text-base font-semibold text-black	"
                    style={{ backgroundColor: "#e1e4e5" }}
                  >
                    {hubName}
                  </p>

                  <InformationCircleIcon
                    className="flex-shrink-0 w-5 h-4 ml-1 "
                    style={{ color: "#78828d", fontSize: "11px" }}
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
                    <p
                      className="uppercase px-1 py-1 text-xs font-medium cursor-pointer hover:bg-gray-200"
                      style={{ color: "#78828d", fontSize: "11px" }}
                    >
                      + New Task
                    </p>
                  </div>

                  <p
                    className="px-1 py-1 text-xs  cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200 uppercase font-medium  "
                    style={{ color: "#78828d", fontSize: "11px" }}
                  >
                    Add Description
                  </p>
                  <p
                    className="px-1 py-1 text-xs rou cursor-pointer opacity-0 transition duration-200 group-hover:opacity-100 hover:bg-gray-200 uppercase font-medium  "
                    style={{ color: "#78828d", fontSize: "11px" }}
                  >
                    Add Comment
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs">
                  <CheckIcon
                    className="flex-shrink-0 w-5 h-4 uppercase font-medium "
                    aria-hidden="true"
                    style={{ color: "#78828d", fontSize: "11px" }}
                  />
                  <p
                    className="uppercase font-medium"
                    style={{ color: "#78828d", fontSize: "11px" }}
                  >
                    Show Closed
                  </p>
                </div>
              </div>
              {createTaskFromTop && currentListId === item.id && (
                <AddNewItem listId={data.id} />
              )}
              <div>
                <div className=" ">
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
                <p
                  className=" text-xs   mt-1 cursor-pointer ml-9 font-semibold "
                  style={{ color: "#78828d", fontSize: "11px" }}
                >
                  + New Task
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
