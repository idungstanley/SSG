import React from 'react';
import {
  TrashIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowDownTrayIcon,
  ClipboardIcon,
  AdjustmentsVerticalIcon,
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

  const leftItems = [
    {
      icon: (
        <ArrowDownTrayIcon
          className="h-5 w-5 stroke-current"
          aria-hidden="true"
        />
      ),
      onClick: handleDownload,
      label: 'Download',
      disabled: selectedIds.length === 0,
    },
    {
      icon: <ShareIcon className="h-5 w-5 stroke-current" aria-hidden="true" />,
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
        <ClipboardIcon className="h-5 w-5 stroke-current" aria-hidden="true" />
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
      icon: <AdjustmentsVerticalIcon className="h-5 w-5" aria-hidden="true" />,
      disabled: !selectedFileId,
    },
  ];

  return (
    <div className="flex items-center justify-between px-2 py-1">
      {/* file actions */}
      <div className="flex gap-4 items-center pt-1">
        {leftItems.map((button) => (
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

      <div className="flex items-center gap-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
        <Tooltip tooltip="Delete">
          <button
            disabled={selectedIds.length === 0}
            className={
              selectedIds.length === 0
                ? 'text-gray-300 pt-1'
                : 'text-gray-500 pt-1'
            }
            onClick={handleDelete}
            type="button"
          >
            <TrashIcon className="h-5 w-5 stroke-current" aria-hidden="true" />
          </button>
        </Tooltip>

        {/* badge (items length and current index) */}
        <div className="flex gap-1.5 items-center text-sm border border-gray-300 rounded bg-green-100 px-2.5 font-semibold text-gray-800">
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
      </div>
    </div>
  );
}
