import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentParentTaskId,
  setCurrentTaskId,
  setGetSubTaskId,
  setShowTaskNavigation,
  setTaskIdForPilot,
  setToggleAssignCurrentTaskId,
} from "../../../../../features/task/taskSlice";
import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";
import { MdDragIndicator } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";
import {
  CalendarOutlined,
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/hooks";
import { useNavigate } from "react-router-dom";
import AssignTask from "../../assignTask/AssignTask";
import { AvatarWithInitials } from "../../../../../components";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";
import "./task.css";
interface TaskDataProps {
  task: any;
}
import { columnsHead } from "../views/ListColumns";
import moment from "moment";

export default function TaskData({ task }: TaskDataProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    showTaskNavigation,
    toggleAssignCurrentTaskId,
    currentParentTaskId,
    getSubTaskId,
  } = useAppSelector((state) => state.task);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const displayNav: any = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };

  const handleTaskPilot = (id: string, name: string) => {
    dispatch(setTaskIdForPilot(id));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: "task",
        activeItemName: name,
      })
    );
    // dispatch(ilotTrigger)
  };

  const handleAssigneeModal = (id: string) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const handleGetSubTask = (id: string) => {
    if (id == getSubTaskId) {
      dispatch(setGetSubTaskId(null));
    } else {
      dispatch(setGetSubTaskId(id));
    }
  };

  const handleCreateSubTask = (id: string) => {
    if (id == currentParentTaskId) {
      dispatch(setCurrentParentTaskId(null));
    } else {
      dispatch(setCurrentParentTaskId(id));
    }
  };

  const groupAssignee = (data) => {
    return data?.map((newData) => (
      <div key={newData.id} className="relative">
        <span key={newData.id} className="absolute ">
          <AvatarWithInitials
            initials={newData.initials}
            backgroundColour={newData.colour}
            height="h-5"
            width="w-5"
          />
        </span>
      </div>
    ));
  };
  const groupAssigneeEmpty = () => {
    return (
      <div className="relative">
        <UserAddOutlined />
      </div>
    );
  };

  const renderData = (taskColField, colfield) => {
    if (colfield === "assignees" && taskColField.length !== 0) {
      return groupAssignee(task.assignees);
    } else if (colfield === "assignees" && taskColField.length === 0) {
      return groupAssigneeEmpty();
    } else if (colfield == "created_at") {
      return moment(taskColField).format("HH:mm");
    } else if (colfield === "name") {
      return (
        <div className="flex items-center">
          <input type="checkbox" />
          <p>
            <VscTriangleRight />
          </p>
          <p>
            <RiCheckboxBlankFill />
          </p>
          <p>{taskColField}</p>
          <p>
            <PlusOutlined />
          </p>
          <p>
            <EditOutlined />
          </p>
        </div>
      );
    } else return taskColField;
  };

  return (
    <div className="group flex items-center justify-between ">
      {columnsHead.map((col) => (
        <div key={task.id}>{renderData(task[col.field], col.field)}</div>
      ))}
    </div>
  );
}
