import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react';
import { AvatarWithInitials } from '../../../../../components';

export default function Dropdown() {
  return (
    <div className="">
      <section className="absolute -left-56 top-10 z-10 -mt-3 w-60 rounded-md shadow-lg bg-gray-100">
        <div className="text-xs">
          <section className="flex relative w-full ">
            <AiOutlineSearch className="h-5 w-5 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full border-0 focus:outline-none"
            />
          </section>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <section className="p-3">
            <p>People</p>
          </section>
          <section className="flex justify-start items-center space-x-2 hover:bg-gray-300 p-3">
            <AvatarWithInitials initials="ND" />
            <p>Nicholas</p>
          </section>
        </div>
      </section>
    </div>
  );
}
