import React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import {
  setCreateTaskFromTop,
  setCurrentListId,
} from "../../../../../../../features/list/listSlice";
import { setAddNewTaskItem } from "../../../../../../../features/task/taskSlice";
import { getWalletServices } from "../../../../../../../features/wallet/walletService";
import AddNewItem from "../../../../../tasks/component/taskColumn/AddNewItem";
import TaskListViews from "../../../../../tasks/component/views/TaskListViews";
import ListTemplate from "../ItemsHubData/ListTemplate";

interface ItemsWalletDataProps {
  walletId: string | null;
  walletName: string | null;
}
export default function ItemsWalletData({
  walletId,
  walletName,
}: ItemsWalletDataProps) {
  const { data } = getWalletServices({ parentId: walletId });

  const { currentListId, createTaskFromTop } = useAppSelector(
    (state) => state.list
  );
  const { addNewTaskItem } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();
  return (
    <section>
      {/* wallets */}
      {/* <div>{data?.data.wallets.map((item) => item.name)}</div> */}

      {/* lists */}
      <div>
        {data?.data.lists?.map((item) => {
          return (
            <div key={item.id} className="border rounded">
              <p className="text-xs font-semibold text-gray-400 capitalize">
                {walletName}
              </p>
              <div id="listTitle" className="flex items-center justify-between">
                <div className="group flex items-center justify-center text-gray-400">
                  <ChevronDownIcon
                    className="flex-shrink-0 w-5 h-4"
                    aria-hidden="true"
                  />
                  <p
                    className="text-base font-semibold text-black	"
                    style={{ backgroundColor: "#e1e4e5" }}
                  >
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
                <AddNewItem listId={item.id} />
              )}
              <div>
                <div className="">
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
                <p className="text-xs   mt-1 cursor-pointer ml-7 font-semibold text-gray-400 hover:bg-gray-300 px-1 rounded-md border-1"
                style={{ color: "#78828d", fontSize: "11px", width: "70px" }}>
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
