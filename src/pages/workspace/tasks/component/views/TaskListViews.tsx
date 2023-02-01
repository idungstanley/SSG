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
    <div className="relative ml-24 flex w-10/12 justify-between items-center first:text-blue-500  ">
      {columnsHead.map((col) => (
        <div key={col.field} className="flex group first:text-blue-500">
          <div className="flex  uppercase items-center cursor-pointer  text-gray-400 text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group">
            <span className="opacity-0 group-hover:opacity-100 cursor-move hover:bg-gray-400 hover:text-gray-50">
              <MdOutlineDragIndicator />
            </span>
            <div className="first:text-blue-500">
              <span className="first:text-blue-500">{col.value}</span>
            </div>

            <span className="opacity-0 group-hover:opacity-100 hover:bg-gray-400 hover:text-gray-50">
              <FaSort />
            </span>
          </div>
        </div>
      ))}
      <span className=" flex absolute -right-20 items-center h-5  text-gray-400 text-xs  rounded-full p-1 font-semibold group">
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
