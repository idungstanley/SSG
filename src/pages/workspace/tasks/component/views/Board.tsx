import React, { useState } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import { IoChevronBackOutline } from "react-icons/io5";
import { VscEllipsis } from "react-icons/vsc";
import { BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setToggleAssignCurrentTaskId } from "../../../../../features/task/taskSlice";
import { TbSubtask } from "react-icons/tb";
import CardState from "./CardState";
import AssignTask from "../../assignTask/AssignTask";
import { AvatarWithInitials } from "../../../../../components";
import { UserPlusIcon } from "@heroicons/react/24/outline";
// import Breadcrumb from "../../../../settings/components/Breadcrumb";
// import { HomeIcon } from "@heroicons/react/24/outline";
// import BreadcrumbSection from "../../../../explorer/components/Breadcrumb";

function Board() {
  const dispatch = useDispatch();
  const { myTaskData, toggleAssignCurrentTaskId } = useAppSelector(
    (state) => state.task
  );

  const handleAssigneeModal = (id: string) => {
    // console.log(id);
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
      // console.log(id);
    }
  };

  const groupAssignee = (
    data: [{ id: string; initials: string; colour: string }] | undefined
  ) => {
    return data?.map((newData) => (
      <div key={newData.id} className="">
        <span key={newData.id}>
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

  const [icons, setIcons] = useState<string | null>(null);

  // const addIcons = (id: string) => {
  //   setIcons(true);
  // };

  // const removeIcons = () => {
  //   setIcons(false);
  // };

  return (
    <div className=" m-auto fgoverflow  ">
      <div className="flex  gap-7  ">
        {myTaskData.map((task) => (
          <div key={task.id} className=" rounded   " style={{ width: "auto" }}>
            <div className="bg-gray-400 w-64 h-1 rounded-t-sm "></div>
            <div className=" flex items-center justify-between   shadow-md  bg-white h-10 w-64 p-2 rounded group boardGrab ">
              <div className="flex items-center gap-2  ">
                <h3 className="text-xs uppercase font-bold ">{task.status}</h3>
                <span className="border-2 rounded-full w-5 text-center">
                  <p className="text-xs font-bold "> 1</p>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 ">
                  <span className="opacity-0 group-hover:opacity-100 bg-gray-200 rounded cursor-pointer">
                    <IoChevronBackOutline />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 cursor-pointer">
                    <VscEllipsis />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 cursor-pointer">
                    <BsPlus />
                  </span>
                </div>
              </div>
            </div>
            <div
              className=" group p-3  bg-white w-64 shadow-md mt-10  rounded "
              onMouseEnter={() => setIcons(task.id)}
              onMouseLeave={() => setIcons(task.id)}
            >
              <p className="text-xs font-bold">
                {/* task {">"} lists {">"} stanlists */}
                lists / tasks
              </p>
              <div className="flex items-center justify-between mt-2">
                <h3 className="text-sm capitalize  font-bold">{task.name}</h3>
                <span>
                  {task.assignees &&
                  (
                    task?.assignees as Array<{
                      id: string;
                      initials: string;
                      colour: string;
                    }>
                  ).length == 0 ? (
                    <>
                      <div onClick={() => handleAssigneeModal(task.id)}>
                        <UserPlusIcon
                          className=" text-gray-400  cursor-pointer "
                          aria-hidden="true"
                        />
                        <span className="absolute shadow-2xl  z-30  ">
                          {toggleAssignCurrentTaskId == task?.id ? (
                            <AssignTask />
                          ) : null}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => handleAssigneeModal(task.id)}
                        className="cursor-pointer flex "
                      >
                        {groupAssignee(task.assignees)}
                        <span className="absolute shadow-2xl  z-30  ">
                          {toggleAssignCurrentTaskId == task?.id ? (
                            <AssignTask />
                          ) : null}
                        </span>
                      </div>
                    </>
                  )}
                </span>
              </div>
              <div>
                <div className=" text-gray-300  text-xl opacity-0 group-hover:opacity-100">
                  <TbSubtask />
                </div>
              </div>
              {icons == task.id && <CardState task={task} />}
              <span>
                <p className="uppercase mt-3 color-gray text-xs font-bold">
                  + add subtask
                </p>
              </span>
              {/* <Breadcrumb pages={} rootIcon={<HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />} rootIconHref="/explorer" /> */}
              {/* <BreadcrumbSection /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
