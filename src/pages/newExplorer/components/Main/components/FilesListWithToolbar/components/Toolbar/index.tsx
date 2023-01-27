import React, { useState } from 'react';
import {
  TrashIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassMinusIcon,
  ClipboardIcon,
  ArrowDownIcon,
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
import Search from '../../../../../Search';
import Sorting from '../FilesList/components/Sorting';
import { useCopyItems } from '../../../../../../../../features/explorer/explorerActionsService';
import { BsClipboardCheck } from 'react-icons/bs';

interface ToolbarProps {
  data: IStringifiedFile[];
  query: string;
  setQuery: (i: string) => void;
}

const stringifyNumber = (number: number) => {
  return String(number).length === 1 ? `0${number}` : number;
};

export default function Toolbar({ data, query, setQuery }: ToolbarProps) {
  const { folderId } = useParams();
  const dispatch = useAppDispatch();
  const { selectedFileId, selectedFileIds } = useAppSelector(
    (state) => state.explorer
  );

  const [showSearch, setShowSearch] = useState(false);

  const selectedIds = [...selectedFileIds, selectedFileId || ''].filter(
    (i) => i
  );

  const currentFileIndex = data.findIndex((i) => i.id === selectedFileId) + 1;

  const { mutate: onDelete } = useMultipleDeleteFiles(folderId);

  const { mutate: onCopy } = useCopyItems(folderId);

  const handleDelete = () => {
    onDelete(selectedIds);
    dispatch(resetSelectedFiles());
  };

  const handleDownload = async () => {
    DownloadFile('file', selectedFileId || '', selectedFileId || '');
  };

  const handleCopy = () => {
    onCopy({
      copyToFolderId: folderId,
      fileIds: selectedIds,
    });

    dispatch(resetSelectedFiles());
  };

  const leftItems = [
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
      onClick: handleCopy,
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
      icon: <AdjustmentsVerticalIcon className="w-5 h-5" aria-hidden="true" />,
      disabled: !selectedFileId,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-2 py-1">
        {/* file actions */}
        <div className="flex items-center gap-4 pt-1">
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

        {/* right items */}
        <div className="flex items-center gap-3">
          {/* search */}
          <Tooltip tooltip={showSearch ? 'Hide search' : 'Show search'}>
            {showSearch ? (
              <MagnifyingGlassMinusIcon
                onClick={() => setShowSearch(false)}
                className="w-5 h-5 text-gray-500"
              />
            ) : (
              <MagnifyingGlassIcon
                onClick={() => setShowSearch(true)}
                className="w-5 h-5 text-gray-500"
              />
            )}
          </Tooltip>

          {/* sort */}
          <Tooltip tooltip="Sorting">
            <Sorting />
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

          {/* trash icon */}
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
              <TrashIcon
                className="w-5 h-5 stroke-current"
                aria-hidden="true"
              />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* search input */}
      {showSearch ? (
        <Search query={query} setQuery={setQuery} type="file" />
      ) : null}
    </>
  );
}
