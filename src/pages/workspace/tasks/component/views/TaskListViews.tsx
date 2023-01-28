import React, { useState } from "react";
import { FiPlusCircle, FiArrowDownCircle } from "react-icons/fi";
import { useAppSelector } from "../../../../../app/hooks";
import { MdOutlineDragIndicator } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import AddColumnDropdown from "../../dropdown/AddColumnDropdown";
import addColumns from "../../../lists/components/renderlist/listDetails/listDetails";
import { useDispatch } from "react-redux";
import { setCloseTaskListView } from "../../../../../features/task/taskSlice";

import "../taskData/task.css";

export default function TaskListViews() {
  const dispatch = useDispatch();
  const [dropDown, setdropDown] = useState(false);
  const { closeTaskListView } = useAppSelector((state) => state.task);
  const { myTaskData } = useAppSelector((state) => state.task);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div className=" flex items-center  ">
      <div className=" flex w-6/12 items-center gap-2 shrink-0">
        <span className="bg-gray-200 hover:bg-gray-400 rounded-full p-px mt-1">
          <FiArrowDownCircle
            className={` text-gray-400 text-sm hover:text-gray-200  ${
              closeTaskListView === false ? "rotateimg90" : null
            }`}
            aria-hidden="true"
            onClick={() => dispatch(setCloseTaskListView(!closeTaskListView))}
          />
        </span>
        <div className="flex items-center justify-center cursor-pointer relative">
          <div className="group flex items-center">
            <span className="text-xs text-black p-1 bg-gray-300 pr-2">
              OPEN
            </span>
          </div>
          <span className="text-xs text-gray-400 mt-1	ml-1">
            {myTaskData?.length}
          </span>

          <span className="text-xs text-gray-400 mt-1	">TASK</span>
        </div>
      </div>
      <div className="flex items-center w-9/12">
        <p className=" flex justify-start items-center h-5  text-gray-400 text-xs  rounded-full font-semibold hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100">
            <MdOutlineDragIndicator />
          </span>
          <span>USER</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p>
        <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100">
            <MdOutlineDragIndicator />
          </span>
          <span>DUE DATE</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p>
        <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100">
            <MdOutlineDragIndicator />
          </span>
          <span>PRIORITY</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p>
        <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100">
            <MdOutlineDragIndicator />
          </span>
          <span>CREATED AT</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p>
        <span
          className=" flex relative items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold group"
          onClick={() => handleDropDown()}
        >
          <FiPlusCircle className="font-black	" />
          <span className="text-sm">
            {dropDown && <AddColumnDropdown title="" listItems={addColumns} />}
          </span>
        </span>
      </div>
    </div>
  );
}
