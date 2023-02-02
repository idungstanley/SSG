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
import { columnsHead } from "./ListColumns";

export default function TaskListViews() {
  const dispatch = useDispatch();
  const [dropDown, setdropDown] = useState(false);
  const { closeTaskListView } = useAppSelector((state) => state.task);
  const { myTaskData } = useAppSelector((state) => state.task);

  console.log(myTaskData);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div className="flex justify-beteen items-center relative">
      <div className=" flex items-center items-center ">
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
        </div>
      </div>
      <div className="relative flex w-4/12    items-center first:text-blue-500  ">
        {columnsHead.map(
          (col) =>
            col.value == "Task" && (
              <div
                key={col.field}
                className="flex items-center uppercase   text-gray-400 text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group"
              >
                {col.value}
              </div>
            )
        )}
      </div>
      <div className="flex justify-between">
        {columnsHead.map(
          (col) =>
            col.value !== "Task" && (
              <div
                key={col.field}
                className="flex px-3 items-center uppercase   text-gray-400 text-xs mt-1 font-medium hover:bg-gray-400 hover:text-gray-50 group"
              >
                {col.value}
              </div>
            )
        )}
      </div>
      <span className=" flex absolute right-0 items-center h-5  text-gray-400 text-xs  rounded-full p-1 font-semibold group">
        <FiPlusCircle
          className=" font-black hover:bg-white	"
          onClick={() => handleDropDown()}
        />
        <span className="text-sm">
          {dropDown && <AddColumnDropdown title="" listItems={addColumns} />}
        </span>
      </span>
    </div>
  );
}
