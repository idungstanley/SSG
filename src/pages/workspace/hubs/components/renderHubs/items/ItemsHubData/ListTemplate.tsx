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
  console.log(data);

  return (
    <div className="group relative bg-white mb-px bordar flex items-center ml-6 pl-3">
      {data?.data.tasks.map((task) => (
        <TaskData key={task.id} task={task} />
      ))}
    </div>
  );
}
