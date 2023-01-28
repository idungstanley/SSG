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
              <div key={item.name}>
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
