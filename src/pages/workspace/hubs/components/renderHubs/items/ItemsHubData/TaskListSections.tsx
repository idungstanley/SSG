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
import ItemsHubData from ".";
import { useAppSelector } from "../../../../../../../app/hooks";

export default function TaskListSections({ data }: any) {
  return (
    <section
      id="listcard"
      className=" pb-5 w-full bg-gray-100 bg-gray-100 "
      key={data.id}
    >
      <div className="block p-2 bg-gray-100 ">
        <div className=" capitalize ">
          <ItemsHubData hubId={data.id} hubName={data.name} />
        </div>

        {/* card */}

        {/* endshere */}
      </div>
    </section>
  );
}
