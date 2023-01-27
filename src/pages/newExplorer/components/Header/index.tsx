import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowUploadModal } from '../../../../features/general/uploadFile/uploadFileSlice';
import PreviewSwitch from './components/PreviewSwitch';
import { TbArrowRotaryFirstLeft } from 'react-icons/tb';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';

const SquareStackIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 stroke-current text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
    />
  </svg>
);

export default function Header() {
  const dispatch = useAppDispatch();

  const navigationButtons = [
    {
      id: 1,
      onClick: () => ({}),
      icon: (
        <ArrowLeftCircleIcon
          className="h-8 w-8 stroke-current text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 2,
      onClick: () => ({}),
      icon: (
        <ArrowRightCircleIcon
          className="h-8 w-8 stroke-current text-gray-400"
          aria-hidden="true"
        />
      ),
    },
  ];

  const rightItems = [
    {
      label: 'New',
      icon: (
        <PlusIcon
          className="h-4 w-4 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
    },
    {
      label: 'Upload',
      icon: (
        <TbArrowRotaryFirstLeft
          className="h-6 w-6 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => dispatch(setShowUploadModal(true)),
    },
    {
      label: 'Layout',
      icon: SquareStackIcon,
      onClick: () => ({}),
    },
    {
      label: 'Preview',
      icon: <PreviewSwitch />,
      onClick: () => ({}),
    },
  ];

  return (
    <header className="flex items-center justify-end p-2 border-b h-8">
      {/* right items */}
      <div className="flex items-center gap-4">
        {rightItems.map((button) => (
          <div
            onClick={button.onClick}
            className="flex flex-col justify-center items-center cursor-pointer"
            key={button.label}
          >
            {button.icon}
            {/* <p className="text-gray-600 text-xs">{button.label}</p> */}
          </div>
        ))}
      </div>
    </header>
  );
}
