import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  OutputDateTime,
  OutputFileSize,
} from '../../../../../../../../../app/helpers';
import { FileIcon } from '../../../../../../../../../common';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../app/hooks';
import {
  setFastPreview,
  setSelectedFileId,
  setSelectedFiles,
} from '../../../../../../../../../features/explorer/explorerSlice';
import { useGetExplorerFile } from '../../../../../../../../../features/explorer/explorerService';
import {
  EyeIcon,
  ArrowsUpDownIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import ToolTip from '../../../../../../../../../components/Tooltip';
import { classNames } from '../../../../../../../../../utils';

interface RowProps {
  fileId: string;
}

export default function Row({ fileId }: RowProps) {
  const dispatch = useAppDispatch();

  const { data: file } = useGetExplorerFile(fileId);
  const { selectedFileIds, selectedFileId, fastPreview } = useAppSelector(
    (state) => state.explorer
  );
  const { settings } = useAppSelector((state) => state.account);
  const { showPreview } = settings;

  const selectedIds = [...selectedFileIds, selectedFileId || ''].filter(
    (i) => i
  );

  const onClickRow = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    fileId: string
  ) => {
    const isCheckboxTarget = (e.target as HTMLButtonElement).value;

    //  clear fast preview id when user clicked on another row
    if (fastPreview.fileId && fastPreview.fileId !== fileId) {
      dispatch(setFastPreview({ show: false }));
    }

    // clear multiple selected files and choose one
    if (!isCheckboxTarget) {
      if (selectedFileIds.length) {
        dispatch(setSelectedFiles([]));
      }

      dispatch(setSelectedFileId(fileId));
    }
  };

  const onClickCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileId: string
  ) => {
    if (!e.target.checked) {
      dispatch(
        setSelectedFiles([...selectedFileIds.filter((i) => i !== fileId)])
      );
      if (selectedFileId === fileId) {
        dispatch(setSelectedFileId(null));
      }
    } else {
      // if selected one, clear and paste into selectedFileIds, otherwise paste only fileId
      if (selectedFileId) {
        dispatch(
          setSelectedFiles([...selectedFileIds, fileId, selectedFileId])
        );
        dispatch(setSelectedFileId(null));
      } else {
        dispatch(setSelectedFiles([...selectedFileIds, fileId]));
      }
    }
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: file?.id || '',
    data: {
      fileFolderId: file?.folder_id || 'root',
    },
  });

  // hide element if is currently grabbing
  const style = {
    opacity: transform ? 0 : 100,
  };

  return file ? (
    <tr
      style={style}
      key={file.id}
      className={classNames(
        selectedIds.includes(file.id) ? 'bg-green-100 hover:bg-green-200' : '',
        selectedFileId === file.id ? 'bg-green-100 hover:bg-green-100' : '',
        'cursor-pointer hover:bg-gray-50 group'
      )}
      onClick={(e) => onClickRow(e, file.id)}
    >
      <td className="relative w-8 px-2">
        {selectedIds.includes(file.id) && (
          <div className="absolute inset-y-0 left-0 w-0.5 bg-green-500" />
        )}
        <input
          type="checkbox"
          className="absolute left-3 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-green-500 ring-0 focus:ring-0"
          value={file.id}
          checked={selectedIds.includes(file.id)}
          onChange={(e) => onClickCheckbox(e, file.id)}
        />
      </td>

      {/* show eye icon if preview toggle enabled */}
      {!showPreview ? (
        <td>
          <ToolTip
            tooltip={fastPreview.fileId ? 'Hide preview' : 'Show preview'}
          >
            <span
              onClick={() =>
                dispatch(
                  setFastPreview(
                    fastPreview.fileId === file.id
                      ? { show: false }
                      : { show: true, fileId: file.id }
                  )
                )
              }
              className="transition text-gray-500 flex justify-center w-full"
            >
              {fastPreview.fileId === file.id ? (
                <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
              ) : !fastPreview.fileId ? (
                <EyeIcon
                  className="h-5 w-5 group-hover:opacity-100 opacity-0"
                  aria-hidden="true"
                />
              ) : null}
            </span>
          </ToolTip>
        </td>
      ) : null}

      <td className="py-2 text-sm font-medium flex justify-between gap-4 items-center px-2 text-gray-700">
        <div className="flex items-center gap-2 truncate">
          <FileIcon extensionKey={file.file_format.extension} size={4} />
          <span className="truncate text-sm pt-0.5 flex justify-between">
            {file.display_name}
          </span>
        </div>

        {/* move row by grabbing this icon */}
        <span
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="whitespace-nowrap py-2 px-2 text-sm text-gray-500"
        >
          <ArrowsUpDownIcon
            className={classNames(
              selectedFileId === file.id ? 'text-gray-500' : 'text-gray-300',
              'h-5 w-5'
            )}
            aria-hidden="true"
          />
        </span>
      </td>

      <td className="whitespace-nowrap py-2 px-2 text-sm text-gray-500">
        {OutputDateTime(file.created_at)}
      </td>
      <td className="whitespace-nowrap py-2 px-2 text-sm text-gray-500">
        {OutputFileSize(file.size)}
      </td>
    </tr>
  ) : null;
}
