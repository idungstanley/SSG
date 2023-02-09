import React, { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";
import { BiCaretDownSquare } from "react-icons/bi";
import { BiText } from "react-icons/bi";
import { BsTextareaT } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { TbBatteryEco } from "react-icons/tb";
import { AiOutlineNumber } from "react-icons/ai";
import { IoMdCheckboxOutline } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineAttachFile } from "react-icons/md";
import { ImClearFormatting } from "react-icons/im";
import { BsTag } from "react-icons/bs";
import { TfiLocationPin } from "react-icons/tfi";
import { TfiMoney } from "react-icons/tfi";
import { MdPersonOutline } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { BsBatteryHalf } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { TbArrowsDoubleSwNe } from "react-icons/tb";
import { BsArrowUpRight } from "react-icons/bs";
import { DiDropbox } from "react-icons/di";
import { TbWorld } from "react-icons/tb";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getTaskColumns,
  hideTaskColumns,
} from "../../../../features/task/taskSlice";

interface Icolumn {
  name: string;
  icons: JSX.Element;
  onclick: () => void;
}

interface CustomDropdownProps {
  title: string;
  listItems: any[];
}

export default function AddColumnDropdown({
  title,
  listItems,
}: CustomDropdownProps) {
  const [column, setColumn] = useState(false);
  const { taskColumns, hideTask } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  // const hidden = (colField) => {
  //   const taskCollArr: any = [];
  //   taskColumns.map((colHidden) => {
  //     if (colField == colHidden.field) {
  //       const newObj = {
  //         ...colHidden,
  //         hidden: !colHidden.hidden,
  //       };
  //       taskCollArr.push(newObj);
  //     } else taskCollArr.push(colHidden);
  //   });
  //   console.log(taskCollArr);
  //   setColH(taskCollArr);
  //   dispatch(getTaskColumns(taskCollArr));
  // };

  return (
    <div className="relative">
      <div
        className=" absolute  border-2  right-0 mt-9 w-56  rounded-lg shadow-xl drop-shadow-md py-1 bg-white overflow-y-auto "
        style={{ height: "300px" }}
      >
        <div className="flex  py-2 px-2 justify-around">
          <p
            onClick={() => setColumn(!column)}
            className={`${!column && "text-purple-600"}`}
          >
            Show/Hide
          </p>
          <p
            onClick={() => setColumn(!column)}
            className={`${column && "text-purple-600"}`}
          >
            New Column
          </p>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex items-center justify-around px-4">
          <BiSearch className="text-lg" />.
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-transparent focus:border-transparent focus:ring-0"
          />
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <h2 className="text-center pt-5 ">CREATE NEW FIELDS</h2>
        <button type="button">{title}</button>
        {title && <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />}

        {column && (
          <div>
            <div>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <BiCaretDownSquare />
                </span>
                <span>Dropdown</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <BiText />
                </span>
                <span>Text</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <BsTextareaT />
                </span>
                <span>Text area (Long Text)</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <MdDateRange />
                </span>
                Date
              </p>

              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <TbBatteryEco />
                </span>
                <span>Progress (Auto)</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <AiOutlineNumber />
                </span>
                <span>Number</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <IoMdCheckboxOutline />
                </span>
                <span>Checkbox</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <HiOutlineMail />
                </span>
                <span>Email</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <MdOutlineAttachFile />
                </span>
                <span>File</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <ImClearFormatting />
                </span>
                <span>Formula</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <BsTag />
                </span>
                <span>Labels</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <TfiLocationPin />
                </span>
                <span>Location</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <TfiMoney />
                </span>
                <span>Money</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <MdPersonOutline />
                </span>
                <span>People</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <AiOutlinePhone />
                </span>
                <span>Phone</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <BsBatteryHalf />
                </span>
                <span>Progress (Manual)</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <AiOutlineStar />
                </span>
                <span>Rating</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <TbArrowsDoubleSwNe />
                </span>
                <span>Relationship</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <BsArrowUpRight />
                </span>
                <span>Rollup</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <DiDropbox />
                </span>
                <span>Tasks</span>
              </p>
              <p className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full z-30">
                <span>
                  <TbWorld />
                </span>
                <span>Website</span>
              </p>
            </div>
          </div>
        )}

        {listItems.map((listItem) => (
          <div key={listItem.field}>
            {!column && (
              <div
                className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 z-30 w-full"
                onClick={() => dispatch(hideTaskColumns(listItem.field))}
                key={listItem.field}
              >
                {!listItem.hidden ? (
                  <p className="flex w-11/12 justify-between items-center">
                    <span>{listItem.value}</span>
                    <span>
                      <BsCheck2 />
                    </span>
                  </p>
                ) : (
                  <p>{listItem.value}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
