import React from "react";
import { BiSearch } from "react-icons/bi";

interface Icolumn {
  name: string;
  icons: JSX.Element;
  onclick: () => void;
}

interface CustomDropdownProps {
  title: string;
  listItems: Icolumn[];
}

export default function AddColumnDropdown({
  title,
  listItems,
}: CustomDropdownProps) {
  return (
    <div className="">
      <div className=" absolute top-0 mt-5 w-56 rounded-lg shadow-xl drop-shadow-md py-1 bg-white ">
        <div className="flex py-2 px-2 justify-around">
          <p>Show/Hide</p>
          <p>New Column</p>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex items-center justify-around px-4">
          <BiSearch className="text-lg" />
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
        {listItems.map((listItem) => (
          <>
            <button
              type="button"
              className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full"
              onClick={() => listItem.onclick}
              key={listItem.name}
            >
              {listItem.icons}
              {listItem.name}
            </button>
          </>
        ))}
      </div>
    </div>
  );
}

// CustomDropdown.defaultProps = {
//   title: "",
// };
