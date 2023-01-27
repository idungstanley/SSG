import React from 'react';
import { MdArrowRight } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

export default function Status() {
  return (
    <section className="flex items-center space-x-1">
      <div className="flex space-x-0.5">
        <button className="p-2 bg-gray-300 text-black text-xs border-white rounded-l-md">
          status
        </button>
        <button className="p-2 bg-gray-300 text-black text-xs rounded-r-md border-white">
          <MdArrowRight />
        </button>
      </div>
      <div>
        <button className=" p-2 text-xs text-black rounded-md border border-gray-300">
          <AiOutlineCheck />
        </button>
      </div>
    </section>
  );
}
