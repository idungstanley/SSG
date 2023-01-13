import React from 'react';
import {
  TrashIcon,
  ShareIcon,
  ClipboardCopyIcon,
  PrinterIcon,
  DownloadIcon,
  ChatIcon,
  EyeIcon,
  ChatAlt2Icon,
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
import { setSelectedItem } from '../../../../../../../../features/chat/chatSlice';
import { DownloadFile } from '../../../../../../../../app/helpers';
import {
  setShowCommentsSideOver,
  setShowWatchersSideOver,
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

  const handleShowWatchers = () =>
    dispatch(
      setShowWatchersSideOver({
        show: true,
        type: 'file',
        id: selectedFileId || '',
      })
    );

  const handleShowComments = () =>
    dispatch(
      setShowCommentsSideOver({
        show: true,
        type: 'file',
        id: selectedFileId || '',
      })
    );

  const menuItems = [
    {
      icon: (
        <DownloadIcon className="h-5 w-5 stroke-current" aria-hidden="true" />
      ),
      onClick: handleDownload,
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
    {
      label: 'Watchers',
      onClick: handleShowWatchers,
      icon: <EyeIcon className="h-5 w-5" aria-hidden="true" />,
      disabled: !selectedFileId,
    },
    {
      label: 'Comments',
      onClick: handleShowComments,
      icon: <ChatIcon className="h-5 w-5" aria-hidden="true" />,
      disabled: !selectedFileId,
    },
    {
      label: 'Chat',
      onClick: () =>
        dispatch(setSelectedItem({ id: selectedFileId || '', type: 'file' })),
      icon: (
        <ChatAlt2Icon
          className="mr-2.5 h-5 w-5 stroke-current"
          aria-hidden="true"
        />
      ),
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
