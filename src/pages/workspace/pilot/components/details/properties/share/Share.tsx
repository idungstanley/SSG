import React from 'react';
import { BsShare } from 'react-icons/bs';

export default function Share() {
  return (
    <div className="flex p-0.5 items-center space-x-0.5 border border-gray-400 rounded-md hover:bg-gray-400 hover:text-white">
      <BsShare className="text-xs h-2.5" />
      <button className=" text-xs text-gray-500  ">Share</button>
    </div>
  );
}
