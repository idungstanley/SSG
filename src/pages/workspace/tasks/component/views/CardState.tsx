import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RiFootballFill } from "react-icons/ri";
import { TbCheck, TbFlag3 } from "react-icons/tb";
import { TfiCalendar } from "react-icons/tfi";
import { VscEllipsis } from "react-icons/vsc";

export default function CardState() {
  return (
    <div className="flex h-full border-t  items-center justify-between">
      <div className="flex items-center gap-2">
        <span className=" text-gray-400 ">
          <TfiCalendar />
        </span>
        <span className="  text-gray-400">
          <TbFlag3 />
        </span>
        <span className="  text-gray-400">
          <IoPeopleOutline />
        </span>
        <span className="  text-gray-400">
          <IoPeopleOutline />
        </span>
        <span className="  text-gray-400">
          <RiFootballFill />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="  text-gray-400">
          <TbCheck />
        </span>
        <span className="  text-gray-400">
          <MdOutlineRadioButtonUnchecked />
        </span>
        <span className="  text-gray-400">
          <VscEllipsis />
        </span>
      </div>
    </div>
  );
}
