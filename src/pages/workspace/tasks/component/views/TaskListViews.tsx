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
import { IoIosArrowDropdown, IoIosArrowDropdownCircle } from "react-icons/io";

export default function TaskListViews() {
  const dispatch = useDispatch();
  const [dropDown, setdropDown] = useState(false);
  const { closeTaskListView } = useAppSelector((state) => state.task);
  const { myTaskData } = useAppSelector((state) => state.task);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div className=" flex justify-between items-center  ">
      <div className=" flex items-center ">
        <span className="bg-gray-200 hover:bg-gray-400 rounded-full p-px ">
          <IoIosArrowDropdown
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
      <div className="flex relative w-6/12 items-center ">
        <p className=" flex items-center   text-gray-400 text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100 cursor-move">
            <MdOutlineDragIndicator />
          </span>
          <span className="cursor-pointer">USER</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p>
        <p className=" flex items-center h-5  text-gray-400 text-xs  p-1 ml-1 font-medium hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100 cursor-move">
            <MdOutlineDragIndicator />
          </span>
          <span className="cursor-pointer">DUEDATE</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p>
        <p className="flex items-center h-5  text-gray-400 text-xs  p-1 ml-1 font-medium hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100 cursor-move">
            <MdOutlineDragIndicator />
          </span>
          <span className="cursor-pointer">PRIORITY</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p>
        {/* <p className=" flex items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold hover:bg-gray-400 hover:text-gray-50 group">
          <span className="opacity-0 group-hover:opacity-100">
            <MdOutlineDragIndicator />
          </span>
          <span>CREATED</span>
          <span className="opacity-0 group-hover:opacity-100">
            <FaSort />
          </span>
        </p> */}
        <span className=" flex absolute right-0 items-center h-5  text-gray-400 text-xs  rounded-full p-1 ml-1 font-semibold group">
          <FiPlusCircle
            className="relative font-black hover:bg-white	"
            onClick={() => handleDropDown()}
          />
          <span className="text-sm">
            {dropDown && <AddColumnDropdown title="" listItems={addColumns} />}
          </span>
        </span>
      </div>
    </div>
  );
}
