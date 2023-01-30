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
import ItemsWalletData from "./ItemsWalletData";
// import ItemsHubData from '.';

export default function WalletSection({ data }: any) {
  return (
    <section id="listcard" className="" key={data.id}>
      <div className="block p-2 bg-gray-100 ">
        <div id="listTitle" className="flex items-center justify-between"></div>
        {/* card */}
        <div className="flex items-center mt-10 px-2 py-1 bg-gray-100 border border-gray-100 rounded-lg">
          {/* data and input */}
          <div className="w-full flex flex-col">
            {<ItemsWalletData walletId={data.id} walletName={data.name} />}
          </div>
        </div>
        {/* endshere */}
      </div>
    </section>
  );
}
