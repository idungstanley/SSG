import {
  CalendarOutlined,
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { getTaskListService } from "../../../../../../../features/task/taskService";
import TaskData from "../../../../../tasks/component/taskData/TaskData";

interface listIdprops {
  listId: string;
}

export default function ListTemplate({ listId }: listIdprops) {
  const { data } = getTaskListService({ listId });
  

  return (
    <div className="">
      {data?.data.tasks.map((task) => {
        

        return (
          <div key={task.id} className="">
            <TaskData task={task} />
          </div>
        );
      })}
    </div>
  );
}
