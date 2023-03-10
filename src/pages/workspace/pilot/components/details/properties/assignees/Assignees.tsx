import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
export default function Assignees() {
  return (
    <div>
      <button className="text-gray-500 border-dotted border-gray-300 border-2 rounded-full p-1 ml-1 text-xl cursor-pointer">
        <AiOutlineUsergroupAdd />
      </button>
    </div>
  );
}
