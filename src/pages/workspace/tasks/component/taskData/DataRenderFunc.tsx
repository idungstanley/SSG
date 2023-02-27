import moment, { MomentInput } from "moment";
import React, { ReactNode } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { AvatarWithInitials } from "../../../../../components";
import ColorsModal from "../../../../../components/tags/ColorsModal";
import EditTagModal from "../../../../../components/tags/EditTagModal";
import ToolTip from "../../../../../components/Tooltip";
import {
  ImyTaskData,
  setCurrentParentTaskId,
  setCurrentTaskId,
  setCurrentTaskIdForTag,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setTaskIdForPilot,
  setToggleAssignCurrentTaskId,
  triggerUnassignTag,
} from "../../../../../features/task/taskSlice";
import { tagItem } from "../../../pilot/components/details/properties/subDetailsIndex/PropertyDetails";
import AssignTask from "../../assignTask/AssignTask";
import ArrowRigt from "../../../../../../src/assets/branding/ArrowRigt.svg";
import ArrowDown from "../../../../../../src/assets/branding/ArrowDown.svg";
import StatusDropdown from "../../../../../components/status/StatusDropdown";
import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";
import { FiEdit2 } from "react-icons/fi";
import TagModal from "../../../../../components/tags/TagModal";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/solid";

interface renderDataProps {
  taskColField:
    | string
    | number
    | undefined
    | tagItem[]
    | null
    | Array<{ id: string; initials: string; colour: string }>;
  colfield: string;
  task: ImyTaskData;
  getSubTaskId: string | null;
  handleGetSubTask?: (id: string) => void;
  ShowPlusIcon?: null | boolean;
}

export default function DataRenderFunc({
  taskColField,
  colfield,
  task,
  getSubTaskId,
  handleGetSubTask,
  ShowPlusIcon,
}: renderDataProps) {
  const {
    showTaskNavigation,
    toggleAssignCurrentTaskId,
    currentParentTaskId,
    showTagColorDialogueBox,
    renameTagId,
    comfortableView,
    comfortableViewWrap,
    CompactView,
    CompactViewWrap,
  } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const handleAssigneeModal = (id: string) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const groupAssignee = (
    data: [{ id: string; initials: string; colour: string }] | undefined
  ) => {
    return (data as [{ id: string; initials: string; colour: string }])
      ?.length >= 3 ? (
      <div className="flex items-center justify-center">
        {data?.slice(0, 2).map((newData) => (
          <div key={newData.id} className="">
            <span
              key={newData.id}
              className="flex items-center gap-1 justify center"
            >
              <AvatarWithInitials
                initials={newData.initials}
                backgroundColour={newData.colour}
                height={`${CompactView || CompactViewWrap ? "h-4" : "h-5"}`}
                width={`${CompactView || CompactViewWrap ? "w-4" : "w-5"}`}
              />
            </span>
          </div>
        ))}
        <span>
          {(data as [{ id: string; initials: string; colour: string }])
            ?.length -
            2 !==
          0 ? (
            <span>
              +
              {(data as [{ id: string; initials: string; colour: string }])
                ?.length - 2}
            </span>
          ) : null}
        </span>
      </div>
    ) : (
      data?.map((newData) => (
        <div key={newData.id} className="flex">
          <span key={newData.id}>
            <AvatarWithInitials
              initials={newData.initials}
              backgroundColour={newData.colour}
              height={`${CompactView || CompactViewWrap ? "h-4" : "h-5"}`}
              width={`${CompactView || CompactViewWrap ? "w-4" : "w-5"}`}
            />
          </span>
        </div>
      ))
    );
  };

  const groupTags = (arr: tagItem[]) => {
    return arr.map((item: tagItem) => {
      return Array.isArray(item) ? (
        <div>{groupTags(item)}</div>
      ) : (
        <>
          <div
            className={`flex items-center space-x-1 text-white p-0.5 text-center m-0.5 rounded-r-md ${
              item.name.length > 10 ? "object-contain" : "w-20"
            }`}
            style={{ backgroundColor: `${item.color}` }}
          >
            <div className="flex items-center">
              <p> {item.name}</p>
              {renameTagId == item.id && (
                <form>
                  <input
                    type="text"
                    placeholder="tagedit name"
                    className="object-contain text-gray-400 h-7"
                  />
                </form>
              )}
            </div>
            <ToolTip tooltip="edit tag">
              <button>
                <EditTagModal tagId={item.id} />
              </button>
            </ToolTip>

            <ToolTip tooltip="unassign tag">
              <button
                onClick={() =>
                  dispatch(
                    triggerUnassignTag({
                      unAssignTadId: item.id,
                      currentTaskIdForTag: task.id,
                    })
                  )
                }
              >
                <IoCloseSharp />
              </button>
            </ToolTip>
            {showTagColorDialogueBox && <ColorsModal />}
          </div>
          {/* <span>{arr.length}</span> */}
        </>
      );
    });
  };

  const displayNav = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
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
  };

  const handleCreateSubTask = (id: string) => {
    if (id == currentParentTaskId) {
      dispatch(setCurrentParentTaskId(null));
    } else {
      dispatch(setCurrentParentTaskId(id));
    }
  };

  const handleTaskPriority = (id: string) => {
    dispatch(setCurrentTaskPriorityId(id));
  };

  if (
    colfield === "assignees" &&
    (
      taskColField as Array<{
        id: string;
        initials: string;
        colour: string;
      }>
    ).length !== 0
  ) {
    return (
      <>
        <div className="">
          <div
            onClick={() => handleAssigneeModal(task.id)}
            className="flex cursor-pointer "
          >
            {groupAssignee(task.assignees)}
          </div>
        </div>
        <span className="absolute z-30 shadow-2xl ">
          {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
        </span>
      </>
    );
  } else if (
    colfield === "assignees" &&
    (
      taskColField as Array<{
        id: string;
        initials: string;
        colour: string;
      }>
    ).length === 0
  ) {
    return (
      <>
        <UserPlusIcon
          className="ml-2 text-xl text-gray-400 cursor-pointer "
          aria-hidden="true"
          onClick={() => handleAssigneeModal(task.id)}
        />
        <span className="absolute z-30 shadow-2xl ">
          {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
        </span>
      </>
    );
  } else if (colfield === "tags") {
    return (
      <>
        <div> {groupTags(taskColField as tagItem[])}</div>
      </>
    );
  } else if (colfield == "created_at" || colfield == "updated_at") {
    return (
      <>
        <span className="text-sm font-medium text-gray-400">
          {moment(taskColField as MomentInput).format("MM/DD")}
        </span>
      </>
    );
  } else if (colfield == "status") {
    if (taskColField == "completed") {
      return (
        <>
          <div
            className="capitalize text-xs font-medium bg-green-500 text-white py-2.5 px-1 w-20 absolute text-center h-full top-0 flex flex-col justify-center"
            style={{ marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        </>
      );
    } else if (taskColField == "in progress") {
      return (
        <>
          <div
            className="absolute top-0 flex flex-col justify-center w-20 h-full px-1 text-xs font-medium text-center text-white capitalize bg-purple-500"
            style={{ marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        </>
      );
    } else if (taskColField == "archived") {
      return (
        <>
          <div
            className="absolute top-0 flex flex-col justify-center w-20 h-full px-1 text-xs font-medium text-center text-white capitalize bg-yellow-500"
            style={{ marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        </>
      );
    } else if (taskColField == "todo") {
      return (
        <>
          <div
            className="capitalize text-center text-xs font-medium bg-gray-400 w-20 text-white py-2.5 px-1 absolute h-full top-0 flex flex-col justify-center"
            style={{ marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="capitalize text-center text-xs font-medium bg-gray-400 w-20 text-white py-2.5 px-1 absolute h-full top-0 flex flex-col justify-center"
            style={{ marginLeft: "-30px" }}
          >
            Todo
          </div>
        </>
      );
    }
  } else if (colfield === "name") {
    return (
      <>
        <div className="relative flex items-center ">
          <div className="flex items-center ">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="absolute w-3 h-3 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100 -left-8"
              onClick={() => {
                displayNav(task.id as string);
              }}
            />
            <MdDragIndicator className="absolute text-sm text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100 -left-5 " />
          </div>
          <div
            onClick={() =>
              handleGetSubTask ? handleGetSubTask(task.id) : null
            }
            className="items-center"
          >
            {task.id == getSubTaskId ? (
              <span>
                <img
                  src={ArrowDown}
                  style={{ width: "6px", marginRight: "2px" }}
                  className="flex-shrink-0 h-2"
                  aria-hidden="true"
                  color="rgba(72, 67, 67, 0.64)"
                />
              </span>
            ) : (
              <span>
                <img
                  src={ArrowRigt}
                  style={{ width: "5px", marginRight: "2px" }}
                  className="flex-shrink-0 h-2"
                  color="rgba(72, 67, 67, 0.64)"
                />
              </span>
            )}
          </div>
          <div className="flex items-center">
            <p
              onClick={() => handleTaskStatus(task.id as string)}
              className="relative pt-1 pr-1"
            >
              <StatusDropdown TaskCurrentStatus={task?.status} />
            </p>
            <div
              onClick={() =>
                handleTaskPilot(task.id as string, task.name as string)
              }
              className={`${
                comfortableView
                  ? "text-lg whitespace-nowrap"
                  : comfortableViewWrap
                  ? "text-lg"
                  : CompactView
                  ? "text-xs whitespace-nowrap"
                  : CompactViewWrap
                  ? "text-xs text-justify	"
                  : null
              }`}
            >
              {(taskColField as string)?.length > 50 && comfortableView ? (
                <span>{(taskColField as string)?.substring(0, 40)}...</span>
              ) : (taskColField as string)?.length > 61 && CompactView ? (
                <span>{(taskColField as string)?.substring(0, 60)}...</span>
              ) : (
                (taskColField as ReactNode)
              )}
            </div>
            <p
              id="iconWrapper"
              className="flex items-center ml-1 space-x-1 opacity-0 group-hover:opacity-100"
            >
              <span className="cursor-pointer bg-white  border rounded flex justify-center align-center p-0.5">
                <FiEdit2 className="w-3 text-gray-500 " aria-hidden="true" />
              </span>
              <span className="cursor-pointer bg-white  border rounded flex justify-center align-center p-0.5">
                {!ShowPlusIcon && (
                  <PlusIcon
                    className="w-3 text-gray-500 "
                    aria-hidden="true"
                    onClick={() => handleCreateSubTask(task.id as string)}
                  />
                )}
              </span>
              {/* tag here */}
              <button onClick={() => dispatch(setCurrentTaskIdForTag(task.id))}>
                <TagModal />
              </button>
            </p>
            {/* tags goes here */}
            {/* <div> {groupTags(task.tags)}</div>; */}
          </div>
        </div>
      </>
    );
  } else if (colfield === "priority") {
    return (
      <>
        <span
          className="relative border-gray-300 border-dotted "
          onClick={() => handleTaskPriority(task.id as string)}
        >
          <PriorityDropdown TaskCurrentPriority={task?.priority} />
        </span>
      </>
    );
  } else return <>{taskColField}</>;
}
