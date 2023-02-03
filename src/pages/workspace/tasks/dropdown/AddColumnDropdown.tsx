import React from "react";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

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
  const [column, setColumn] = useState(true);
  return (
    <div className="relative">
      <div
        className=" absolute  border-2 right-0 mt-9 w-56 rounded-lg shadow-xl drop-shadow-md py-1 bg-white overflow-y-auto z-30 h-auto"
        style={{ height: "300px" }}
      >
        <div className="flex py-2 px-2 justify-around">
          <p onClick={() => setColumn(!column)}>Show/Hide</p>
          <p onClick={() => setColumn(!column)}>New Column</p>
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
        {listItems.map((listItem) => (
          <div key={listItem.name}>
            {column && (
              <p
                className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full"
                onClick={listItem.onclick}
              >
                {listItem.icons}
                {listItem.name}
              </p>
            )}
            {!column && (
              <p
                className="capitalize gap-3 flex items-center cursor-pointer mt-0 pl-4 py-2 text-slate-600 hover:bg-gray-300 w-full"
                onClick={() => listItem.onclick}
                key={listItem.name}
              >
                {listItem.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// CustomDropdown.defaultProps = {
//   title: "",
// };
