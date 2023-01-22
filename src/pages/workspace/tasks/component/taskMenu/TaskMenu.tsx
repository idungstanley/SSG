import React from "react";
import { MdFileCopy } from "react-icons/md";
import TaskIcons from "./taskIcons";
console.log(TaskIcons);

export default function TaskMenu() {
  return (
    <div className="overflow-hidden">
      <div
        className="abolute flex justify-between items-center w-full h-11 bg-gray-800"
        style={{ transition: "linear", transitionDelay: "100s" }}
      >
        <div className="pl-5">
          <input type="checkbox" value="checked" />
          <span className="text-white text-xs">1 Selected</span>
        </div>

        <div className="flex">
          {TaskIcons.map((menu) => (
            <>
              <p
                className="flex items-center px-2 cursor-pointer mt-0 text-white text-lg"
                onClick={() => menu.handleClick}
                key={menu.id}
              >
                {menu.icons}
              </p>
            </>
          ))}
        </div>
        <div className="flex items-center pr-5 gap-2 ">
          <MdFileCopy className="text-white text-lg" />
          <input
            type="text"
            placeholder="type '/' for commands"
            className="h-8 rounded bg-transparent text-xs  "
          />
        </div>
      </div>
    </div>
  );
}
