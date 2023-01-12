import React from 'react';
import {
  TrashIcon,
  UploadIcon,
  ShareIcon,
  ClipboardCopyIcon,
  PrinterIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';
import { useAppSelector } from '../../../../../../../../app/hooks';
import { IStringifiedFile } from '../FilesList';

interface ToolbarProps {
  data: IStringifiedFile[];
}

const stringifyNumber = (number: number) => {
  return String(number).length === 1 ? `0${number}` : number;
};

export default function Toolbar({ data }: ToolbarProps) {
  const { selectedFileId } = useAppSelector((state) => state.explorer);

  const currentFileIndex = data.findIndex((i) => i.id === selectedFileId) + 1;

  const menuItems = [
    {
      icon: (
        <UploadIcon
          className="h-5 w-5 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Upload',
    },
    {
      icon: (
        <TrashIcon
          className="h-5 w-5 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Delete',
    },
    {
      icon: (
        <ShareIcon
          className="h-5 w-5 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Share',
    },
    {
      icon: (
        <ClipboardCopyIcon
          className="h-5 w-5 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Copy',
    },
    {
      icon: (
        <PrinterIcon
          className="h-5 w-5 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Print',
    },
    {
      icon: (
        <ArchiveIcon
          className="h-5 w-5 stroke-current text-gray-500"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Archive',
    },
  ];

  return (
    <div className="flex items-center justify-between p-2 pt-4">
      {/* file actions */}
      <div className="flex gap-4">
        {menuItems.map((button) => (
          <button key={button.label} onClick={button.onClick} type="button">
            {button.icon}
          </button>
        ))}
      </div>

      {/* badge (items length and current index) */}
      <div className="flex gap-1.5 items-center rounded-full bg-indigo-100 px-2.5 py-0.5 font-semibold text-gray-800">
        {currentFileIndex ? (
          <>
            <span className="text-primary-700">
              {stringifyNumber(currentFileIndex)}
            </span>
            <span>/</span>
          </>
        ) : null}
        <span>{stringifyNumber(data.length)}</span>
      </div>
    </div>
  );
}
