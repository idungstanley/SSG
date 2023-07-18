import React from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

interface LabelProps {
  listName?: string;
}

function ListViewOverlay({ listName }: LabelProps) {
  return (
    <div className="flex">
      <div className="flex justify-between space-x-10 items-center bg-purple-500 rounded-br-md -mt-1 p-1 rounded-l-md -ml-1">
        <div className="flex space-x-2 items-center pl-2 text-sm text-white  w-fit">
          <IoChevronDownCircleOutline className="w-4 h-4 rounded-full" />
          <h1 className="">{listName ?? 'Loading...'}</h1>
        </div>
        <button className="p-1 rounded-sm bg-gray-200  flex justify-center items-center space-x-1">
          <span>Add</span> <AiOutlineCaretDown className="text-gray-500 w-3 h-3 " />
        </button>
      </div>
    </div>
  );
}

export default ListViewOverlay;
