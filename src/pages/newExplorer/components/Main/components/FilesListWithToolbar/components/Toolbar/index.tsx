import React from 'react';
import {
  TrashIcon,
  ShareIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../app/hooks';
import { IStringifiedFile } from '../FilesList';
import Tooltip from '../../../../../../../../components/Tooltip';
import { useMultipleDeleteFiles } from '../../../../../../../../features/explorer/explorerService';
import { useParams } from 'react-router-dom';
import { resetSelectedFiles } from '../../../../../../../../features/explorer/explorerSlice';
import { DownloadFile } from '../../../../../../../../app/helpers';
import {
  setShowPilotSideOver,
  setShowShareSideOver,
} from '../../../../../../../../features/general/slideOver/slideOverSlice';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsClipboardCheck } from 'react-icons/bs';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { TbArrowsUpDown } from 'react-icons/tb';

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

  const handleDownload = async () => {
    DownloadFile('file', selectedFileId || '', selectedFileId || '');
  };

  const menuItems = [
    {
      icon: (
        <ArrowDownIcon className="w-4 h-4 stroke-current" aria-hidden="true" />
      ),
      onClick: handleDownload,
      label: 'Download',
      disabled: selectedIds.length === 0,
    },
    {
      icon: <ShareIcon className="w-4 h-4 stroke-current" aria-hidden="true" />,
      onClick: () =>
        dispatch(
          setShowShareSideOver({
            show: true,
            id: selectedFileId || '',
            type: 'file',
          })
        ),
      label: 'Share',
      disabled: !selectedFileId,
    },
    {
      icon: (
        <BsClipboardCheck
          className="w-4 h-4 stroke-current"
          aria-hidden="true"
        />
      ),
      onClick: () => ({}),
      label: 'Copy',
      disabled: selectedIds.length === 0,
    },
    {
      label: 'Pilot',
      onClick: () =>
        dispatch(
          setShowPilotSideOver({
            id: selectedFileId || '',
            type: 'file',
            show: true,
          })
        ),
      icon: <TbArrowsUpDown className="w-4 h-4" aria-hidden="true" />,
      disabled: !selectedFileId,
    },
    {
      icon: <TrashIcon className="w-4 h-4 stroke-current" aria-hidden="true" />,
      onClick: handleDelete,
      label: 'Delete',
      disabled: selectedIds.length === 0,
    },
  ];

  return (
    <div className="flex items-center justify-between px-2 py-1">
      {/* file actions */}
      <div className="flex items-center gap-4 pt-1">
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
      <div className="flex items-center">
        <div className="flex items-center w-6 cursor-pointer">
          <MagnifyingGlassIcon className="w-4 h-4" />
          <BiDotsVerticalRounded className="w-4 h-4" />
        </div>
        <div className="flex gap-1.5 ml-2 items-center text-xs border border-gray-300 rounded bg-green-100 px-2.5 font-semibold text-gray-800">
          {currentFileIndex ? (
            <>
              <span className="text-primary-500">
                {stringifyNumber(currentFileIndex)}
              </span>
              <span>/</span>
            </>
          ) : null}
          <span>{stringifyNumber(data.length)}</span>
        </div>
        <button
          disabled={selectedIds.length === 0}
          className={
            selectedIds.length === 0 ? 'text-gray-300' : 'text-gray-500'
          }
          onClick={handleDelete}
          type="button"
        >
          <TrashIcon className="w-4 h-4 stroke-current" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
