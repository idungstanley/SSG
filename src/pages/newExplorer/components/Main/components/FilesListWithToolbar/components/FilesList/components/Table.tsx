import React, { LegacyRef } from 'react';
import {
  OutputDateTime,
  OutputFileSize,
} from '../../../../../../../../../app/helpers';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../app/hooks';
import { FileIcon } from '../../../../../../../../../common';
import {
  setSelectedFileId,
  setSelectedFiles,
} from '../../../../../../../../../features/explorer/explorerSlice';
import { classNames } from '../../../../../../../../../utils';
import { IStringifiedFile } from '../index';

interface TableProps {
  checkbox: React.RefObject<{
    indeterminate: boolean;
  }>;
  checked: boolean;
  toggleAll: () => void;
  items: IStringifiedFile[];
}

export default function Table({
  checkbox,
  checked,
  toggleAll,
  items,
}: TableProps) {
  const dispatch = useAppDispatch();
  const { selectedFileIds, selectedFileId } = useAppSelector(
    (state) => state.explorer
  );

  const selectedIds = [...selectedFileIds, selectedFileId || ''].filter(
    (i) => i
  );

  const checkboxRef = checkbox as LegacyRef<HTMLInputElement>;

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

  return (
    <table className="min-w-full table-fixed divide-y divide-gray-300 overflow-x-scroll bg-white">
      <thead>
        <tr>
          <th scope="col" className="relative border px-2 pr-6">
            <input
              type="checkbox"
              className="absolute cursor-pointer left-3 -mt-2 top-1/2 rounded border-gray-300 text-green-500 ring-0 focus:ring-0"
              ref={checkboxRef}
              checked={checked}
              onChange={toggleAll}
            />
          </th>
          <th
            scope="col"
            className="min-w-[12rem] py-3 border pr-3.5 pl-3 uppercase text-left text-xs font-normal text-gray-400"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 uppercase border text-left text-xs font-normal text-gray-400"
          >
            Created at
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 border uppercase text-left text-xs font-normal text-gray-400"
          >
            Size
          </th>
        </tr>
      </thead>
      <tbody className="overflow-y-auto">
        {items.map((file) => (
          <tr
            key={file.id}
            className={`${selectedIds.includes(file.id) ? 'bg-green-50' : null}
                ${
                  selectedFileId === file.id
                    ? 'bg-green-100 hover:bg-indigo-100'
                    : null
                } cursor-pointer hover:bg-gray-50 h-6 py-2`}
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

            <td
              className={classNames(
                'py-2 text-sm font-medium flex gap-4 items-center px-2',
                selectedIds.includes(file.id)
                  ? 'text-indigo-600'
                  : 'text-gray-900'
              )}
            >
              <FileIcon extensionKey={file.fileType} size={4} />
              <span className="truncate w-48 text-xs">{file.name}</span>
            </td>
            <td className="whitespace-nowrap py-2 px-2 text-xs text-gray-500">
              {OutputDateTime(file.created_at)}
            </td>
            <td className="whitespace-nowrap py-2 px-2 text-xs text-gray-500">
              {OutputFileSize(file.size)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
