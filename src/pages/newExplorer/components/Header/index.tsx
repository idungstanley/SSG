import React from 'react';
import {
  ArrowUpTrayIcon,
  PlusIcon,
  Square2StackIcon,
} from '@heroicons/react/24/outline';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowUploadModal } from '../../../../features/general/uploadFile/uploadFileSlice';
import PreviewSwitch from './components/PreviewSwitch';
import ToolTip from '../../../../components/Tooltip';
// import {
//   ArrowLeftCircleIcon,
//   ArrowRightCircleIcon,
// } from '@heroicons/react/24/solid';

export default function Header() {
  const dispatch = useAppDispatch();

  // const navigationButtons = [
  //   {
  //     id: 1,
  //     onClick: () => ({}),
  //     icon: (
  //       <ArrowLeftCircleIcon
  //         className="h-8 w-8 text-gray-400"
  //         aria-hidden="true"
  //       />
  //     ),
  //   },
  //   {
  //     id: 2,
  //     onClick: () => ({}),
  //     icon: (
  //       <ArrowRightCircleIcon
  //         className="h-8 w-8 text-gray-400"
  //         aria-hidden="true"
  //       />
  //     ),
  //   },
  // ];

  const rightItems = [
    {
      label: 'New',
      icon: <PlusIcon className="h-6 w-6" aria-hidden="true" />,
      onClick: () => ({}),
    },
    {
      label: 'Upload',
      icon: <ArrowUpTrayIcon className="h-6 w-6" aria-hidden="true" />,
      onClick: () => dispatch(setShowUploadModal(true)),
    },
    {
      label: 'Layout',
      icon: <Square2StackIcon className="h-6 w-6" aria-hidden="true" />,
      onClick: () => ({}),
    },
    {
      label: 'Preview',
      icon: <PreviewSwitch />,
      onClick: () => ({}),
    },
  ];

  return (
    <header className="flex items-center justify-end p-2 border-b">
      {/* right items */}
      <div className="flex items-center gap-4">
        {rightItems.map((button) => (
          <div
            title={button.label}
            key={button.label}
            onClick={button.onClick}
            className="flex flex-col justify-center items-center cursor-pointer text-gray-400"
          >
            {button.icon}
            {/* <p className="text-gray-600 text-xs">{button.label}</p> */}
          </div>
        ))}
      </div>
    </header>
  );
}
