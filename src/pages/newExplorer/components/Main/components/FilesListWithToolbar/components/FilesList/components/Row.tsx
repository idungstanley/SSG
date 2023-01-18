import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  OutputDateTime,
  OutputFileSize,
} from '../../../../../../../../../app/helpers';
import { FileIcon } from '../../../../../../../../../common';
import { classNames } from '../../../../../../../../../utils';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../app/hooks';
import {
  setSelectedFileId,
  setSelectedFiles,
} from '../../../../../../../../../features/explorer/explorerSlice';
import { useGetExplorerFile } from '../../../../../../../../../features/explorer/explorerService';

interface RowProps {
  fileId: string;
}

export default function Row({ fileId }: RowProps) {
  const dispatch = useAppDispatch();

  const { data: file } = useGetExplorerFile(fileId);

  const { selectedFileIds, selectedFileId } = useAppSelector(
    (state) => state.explorer
  );

  const selectedIds = [...selectedFileIds, selectedFileId || ''].filter(
    (i) => i
  );

  const onClickRow = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    fileId: string
  ) => {
    const isCheckboxTarget = (e.target as HTMLButtonElement).value;

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
      isFile: true,
    },
  });

  const style = {
    opacity: transform ? 0 : 100,
  };

  return file ? (
    <tr
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
      key={file.id}
      className={`${selectedIds.includes(file.id) ? 'bg-gray-50' : null}
        ${
          selectedFileId === file.id
            ? 'bg-indigo-100 hover:bg-indigo-100'
            : null
        } 
         cursor-pointer hover:bg-gray-50`}
      onClick={(e) => onClickRow(e, file.id)}
    >
      <td className="relative w-8 px-2">
        {selectedIds.includes(file.id) && (
          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
        )}
        <input
          type="checkbox"
          className="absolute left-3 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0"
          value={file.id}
          checked={selectedIds.includes(file.id)}
          onChange={(e) => onClickCheckbox(e, file.id)}
        />
      </td>

      <td
        className={classNames(
          'py-4 text-sm font-medium flex gap-4 items-center px-2',
          selectedIds.includes(file.id) ? 'text-indigo-600' : 'text-gray-900'
        )}
      >
        <FileIcon extensionKey={file.file_format.extension} size={6} />
        <span className="truncate w-48">{file.display_name}</span>
      </td>
      <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
        {OutputDateTime(file.created_at)}
      </td>
      <td className="whitespace-nowrap py-4 px-2 text-sm text-gray-500">
        {OutputFileSize(file.size)}
      </td>
    </tr>
  ) : null;
}
