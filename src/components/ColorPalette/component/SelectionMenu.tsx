import React from 'react';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';
import { TiExportOutline } from 'react-icons/ti';
import ToolTip from '../../Tooltip/Tooltip';
import { MdFileCopy, MdOutlineDeveloperBoard } from 'react-icons/md';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { BsTags } from 'react-icons/bs';
import { TbSubtask } from 'react-icons/tb';

interface SelectionProps {
  isVisible: true;
}

const TaskIcons = [
  {
    id: 1,
    label: 'Export colour',
    icons: <TiExportOutline />,
    handleClick: () => ({}),
    isVisible: true
  },
  {
    id: 2,
    label: 'Set assignees',
    icons: <UserPlusIcon />,
    handleClick: () => ({}),
    isVisible: true
  },
  {
    id: 3,
    label: 'Set Status',
    icons: <MdOutlineDeveloperBoard />,
    handleClick: () => ({}),
    isVisible: true
  },
  {
    id: 4,
    label: 'Set Status',
    icons: <BsTags />,
    handleClick: () => ({}),
    isVisible: true
  },
  {
    id: 5,
    label: 'Set Tags',
    icons: <TbSubtask />,
    handleClick: () => ({}),
    isVisible: true
  }
];

export default function SelectionMenu({ isVisible }: SelectionProps) {
  return (
    <div className={`overflow-hidden ${isVisible ? 'slide-in' : 'slide-out'} z-100 `}>
      <div
        className="flex items-center justify-between bg-gray-800 abolute w-12/12 h-11"
        style={{ transition: 'linear', transitionDelay: '100s' }}
      >
        <div className="pl-5 space-x-2">
          <RoundedCheckbox styles="rounded-full text-alsoit-purple-300" isChecked={true} onChange={() => ({})} />
          <span className="text-xs text-white">Selected</span>
        </div>

        <div className="flex">
          {TaskIcons.map((menu) => (
            <>
              <ToolTip className="pt-2" title={menu.label} placement="bottom">
                <p
                  className="flex items-center px-2 mt-0 text-lg text-white cursor-pointer"
                  onClick={() => menu.handleClick()}
                  key={menu.id}
                >
                  {menu.icons}
                </p>
              </ToolTip>
            </>
          ))}
        </div>
        <div className="flex items-center gap-2 pr-5 ">
          <MdFileCopy className="text-lg text-white" />
          <input type="text" placeholder="type '/' for commands" className="h-8 text-xs bg-transparent rounded " />
        </div>
      </div>
      <div className="flex justify-center">
        <p
          className="p-2 -mt-1 text-white bg-gray-800 border border-white cursor-pointer rounded-3xl"
          onClick={() => ({})}
        >
          <span className="mr-2 text-gray-300">X</span>
          Dismiss
        </p>
      </div>
    </div>
  );
}
