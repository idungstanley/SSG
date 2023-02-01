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
    <div className=" flex justify-between items-center  ">
      {columnsHead.map((col) => (
        <ul key={col.field}>
          <li className="ml-24">{col.value}</li>
        </ul>
      ))}
    </div>
  );
}
