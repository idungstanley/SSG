import React from "react";
import { BiShow } from "react-icons/bi";
import { BsLayers } from "react-icons/bs";
import { GrFormSearch } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import { MdFilterList, MdOutlinePersonOutline } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { VscEllipsis } from "react-icons/vsc";

export default function ListFilter() {
  return (
    <nav className="flex items-center justify-between bg-white h-7 pr-5   ">
      <div className="flex items-center justify-between pl-5 ">
        <GrFormSearch className="w-5 h-5 " />
        <input
          type="text"
          placeholder="Search tasks..."
          className="border-transparent focus:border-transparent focus:ring-0 font-bold"
          style={{ fontSize: "11px" }}
        />{" "}
        <span className=" p-1 border-gray-400	hover:bg-gray-200  rounded ">
          <VscEllipsis className=" border-r" />
        </span>
      </div>
      <div className="flex items-center gap-5 text-xs font-bold">
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <MdFilterList />
          </span>
          filter
        </p>
        <p className="flex items-center gap-1 bg-blue-100	p-1 rounded text-blue-600 cursor-pointer hover:text-blue-800 rounded">
          <span>
            <BsLayers />
          </span>
          Group by: Status
        </p>
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <TbSubtask />
          </span>
          Subtask
        </p>
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <MdOutlinePersonOutline />
          </span>
          Me
        </p>
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <IoPeopleOutline />
          </span>
          Assignee
        </p>
        <p className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1 rounded">
          <span>
            <BiShow />
          </span>
          show
        </p>
        <span className="hover:bg-gray-200 p-1 rounded ">
          <VscEllipsis />
        </span>
      </div>
    </nav>
  );
}
