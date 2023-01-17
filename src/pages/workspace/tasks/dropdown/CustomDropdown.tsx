import React from "react";
import PropTypes from "prop-types";

interface Icolumn {
  name: string;
  icons: JSX.Element;
  onclick: () => void;
}

interface CustomDropdownProps {
  title: string;
  listItems: Icolumn[];
}

export default function CustomDropdown({
  title,
  listItems,
}: CustomDropdownProps) {
  return (
    <div className="">
      <div className=" absolute bottom-20 h-screen top-5 mt-3 w-56 rounded-lg shadow-xl drop-shadow-md py-1 bg-white ">
        <button type="button">{title}</button>
        {title && <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />}
        {listItems.map((listItem) => (
          <>
            <button
              type="button"
              className="capitalize flex cursor-pointer p-2 hover:bg-gray-300"
              onClick={() => listItem.onclick}
              key={listItem.name}
            >
              {listItem.icons}
              {listItem.name}
            </button>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </>
        ))}
      </div>
    </div>
  );
}

CustomDropdown.defaultProps = {
  title: "",
};
