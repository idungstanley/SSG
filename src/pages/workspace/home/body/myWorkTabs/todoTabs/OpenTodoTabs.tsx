import React from 'react';
import OpenSubtask from '../../../../../../assets/icons/OpenSubtask';
import CloseSubtask from '../../../../../../assets/icons/CloseSubtask';
import { HiArrowLongUp } from 'react-icons/hi2';

export default function OpenTodoTabs({
  openTab,
  setOpenTab,
  title,
  NoDueDate
}: {
  openTab: boolean;
  setOpenTab: React.Dispatch<React.SetStateAction<boolean>>;
  NoDueDate?: boolean;
  title: string;
}) {
  return (
    <div className="flex items-center group">
      <div className="flex pb-5 items-center cursor-pointer space-x-3" onClick={() => setOpenTab(!openTab)}>
        <p>{!openTab ? <OpenSubtask /> : <CloseSubtask />}</p> <h1>{title}</h1>
      </div>
      <div className="flex space-x-3 pb-5 justify-between w-full text-alsoit-gray-100 pl-7 opacity-0 group-hover:opacity-100">
        <div className="flex items-center">
          <p className="cursor-pointer hover:bg-alsoit-gray-50 p-1 pr-3 rounded-md">+ Task</p>
          <p className="cursor-pointer hover:bg-alsoit-gray-50 p-1 pr-3 rounded-md">+ Reminder</p>
        </div>
        {!NoDueDate && (
          <div className="flex items-center cursor-pointer hover:bg-alsoit-gray-50 p-1 pr-3 rounded-md">
            <HiArrowLongUp /> <p>Due date</p>
          </div>
        )}
      </div>
    </div>
  );
}
