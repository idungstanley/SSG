import React from 'react';
import { AiOutlineCalendar, AiOutlineUnorderedList } from 'react-icons/ai';
import { GoMention } from 'react-icons/go';

export default function HomeNav() {
  return (
    <nav className="flex justify-between border-b w-full px-6 mt-5">
      <h1 className="border-b-4 border-alsoit-purple-300 rounded-sm">Home</h1>

      <section className="flex space-x-3 pb-2">
        <div className="flex space-x-1 items-center hover:bg-alsoit-gray-50 p-1 rounded-md">
          <AiOutlineCalendar />
          <p>Calendar</p>
        </div>
        <div className="flex space-x-1 items-center hover:bg-alsoit-gray-50 p-1 rounded-md">
          <AiOutlineUnorderedList />
          <p>Agenda</p>
        </div>
        <div className="flex space-x-1 items-center hover:bg-alsoit-gray-50 p-1 rounded-md">
          <GoMention />
          <p>Mentions (0)</p>
        </div>
      </section>
    </nav>
  );
}
