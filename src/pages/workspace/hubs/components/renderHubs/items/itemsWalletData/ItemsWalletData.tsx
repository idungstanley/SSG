import {
  CheckIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { getWalletServices } from "../../../../../../../features/wallet/walletService";
import TaskListViews from "../../../../../tasks/component/views/TaskListViews";
import ListTemplate from "../ItemsHubData/ListTemplate";
import WalletSection from "./WalletSection";

interface ItemsWalletDataProps {
  walletId: string | null;
  walletName: string | null;
}
export default function ItemsWalletData({
  walletId,
  walletName,
}: ItemsWalletDataProps) {
  const { data } = getWalletServices({ parentId: walletId });
  return (
    <section>
      {/* wallets */}
      <div>{data?.data.wallets.map((item) => item.name)}</div>

      {/* lists */}
      <div>
        {data?.data.lists.map((item) => {
          return (
            <div key={item.id} className="">
              <p className="text-xs">{walletName}</p>

              <div id="listTitle" className="flex items-center justify-between">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <ChevronDownIcon
                    className="flex-shrink-0 w-5 h-4"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-bold text-black	">{item.name}</p>

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
              <div>
                <div className="mt-5 ">
                  <TaskListViews />
                  <span>
                    <ListTemplate listId={item.id} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
