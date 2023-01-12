import React from 'react';
import {
  TrashIcon,
  ShareIcon,
  ClipboardCopyIcon,
  PrinterIcon,
  DownloadIcon,
} from '@heroicons/react/outline';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../app/hooks';
import { IStringifiedFile } from '../FilesList';
import Tooltip from '../../../../../../../../components/Tooltip';
import { useMultipleDeleteFiles } from '../../../../../../../../features/explorer/explorerService';
import { useParams } from 'react-router-dom';
import { resetSelectedFiles } from '../../../../../../../../features/explorer/explorerSlice';

interface ToolbarProps {
  data: IStringifiedFile[];
}

const stringifyNumber = (number: number) => {
  return String(number).length === 1 ? `0${number}` : number;
};

export default function Toolbar({ data }: ToolbarProps) {
  const { folderId } = useParams();
  const dispatch = useAppDispatch();
  const { selectedFileId, selectedFileIds } = useAppSelector(
    (state) => state.explorer
  );

  const selectedIds = [...selectedFileIds, selectedFileId || ''].filter(
    (i) => i
  );

  const currentFileIndex = data.findIndex((i) => i.id === selectedFileId) + 1;

  const { mutate: onDelete } = useMultipleDeleteFiles(folderId);

  const handleDelete = () => {
    onDelete(selectedIds);
    dispatch(resetSelectedFiles());
  };

  const menuItems = [
    {
      icon: (
        <DownloadIcon className="h-5 w-5 stroke-current" aria-hidden="true" />
      ),
      onClick: () => ({}),
      label: 'Download',
      disabled: selectedIds.length === 0,
    },
    {
      icon: <TrashIcon className="h-5 w-5 stroke-current" aria-hidden="true" />,
      onClick: handleDelete,
      label: 'Delete',
      disabled: selectedIds.length === 0,
    },
    {
      icon: <ShareIcon className="h-5 w-5 stroke-current" aria-hidden="true" />,
      onClick: () => ({}),
      label: 'Share',
      disabled: !selectedFileId,
    },
    {
      icon: (
        <ClipboardCopyIcon
          className="h-5 w-5 stroke-current"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Copy',
      disabled: selectedIds.length === 0,
    },
    {
      icon: (
        <PrinterIcon className="h-5 w-5 stroke-current" aria-hidden="true" />
      ),
      onClick: () => ({}),
      label: 'Print',
      disabled: !selectedFileId,
    },
  ];

  return (
    <div className="flex items-center justify-between p-2">
      {/* file actions */}
      <div className="flex gap-4">
        {menuItems.map((button) => (
          <Tooltip key={button.label} tooltip={button.label}>
            <button
              disabled={button.disabled}
              className={button.disabled ? 'text-gray-300' : 'text-gray-500'}
              onClick={button.onClick}
              type="button"
            >
              {button.icon}
            </button>
          </Tooltip>
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
