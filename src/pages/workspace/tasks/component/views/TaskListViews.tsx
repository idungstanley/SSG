import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useAppSelector } from "../../../../../app/hooks";
import AddColumnDropdown from "../../dropdown/AddColumnDropdown";
import addColumns from "../../../lists/components/renderlist/listDetails/listDetails";
import { useDispatch } from "react-redux";
import { setCloseTaskListView } from "../../../../../features/task/taskSlice";
import "./view.css";

import "../taskData/task.css";
import { IoIosArrowDropdown } from "react-icons/io";
import { columnsHead } from "./ListColumns";

export default function TaskListViews() {
  const dispatch = useDispatch();
  const [dropDown, setdropDown] = useState(false);
  const { closeTaskListView } = useAppSelector((state) => state.task);
  const { myTaskData } = useAppSelector((state) => state.task);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div
      className="flex items-center justify-between sticky top-0 pt-5 bg-gray-100 z-20 w-12/12 "
      style={{ backgroundColor: "#e1e4e5" }}
    >
      <div className="flex">
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
        <div className="relative w-6/12 flex     items-center ">
          {columnsHead.map(
            (col) =>
              col.value == "Task" && (
                <div
                  key={col.field}
                  className="flex mt-1 items-center uppercase    text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group"
                  style={{ color: "#78828d", fontSize: "11px" }}
                >
                  {col.value}
                </div>
              )
          )}
        </div>
      </div>

      <div className="grid dynamic  justify-between">
        {columnsHead.map(
          (col) =>
            col.value !== "Task" && (
              <div
                key={col.field}
                className="flex px-3 items-center uppercase  text-xs mt-1 font-medium hover:bg-gray-400 hover:text-gray-50 group"
                style={{ color: "#78828d", fontSize: "11px" }}
              >
                {col.value}
              </div>
            )
        )}
      </div>
      <span
        className=" flex absolute  right-0 items-center h-5  text-xs  rounded-full p-1 font-semibold group"
        style={{ color: "#78828d" }}
      >
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
