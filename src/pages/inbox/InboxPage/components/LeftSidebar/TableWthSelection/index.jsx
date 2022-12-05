import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useGetInboxFiles,
  useMultipleArchiveOrUnArchive,
} from '../../../../../../features/inbox/inboxService';
import { FileIcon } from '../../../../../../common';
import FullScreenMessage from '../../../../../shared/components/FullScreenMessage';
import {
  setCurrentInboxFile, setShowUploadModal,
} from '../../../../../../features/inbox/inboxSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TableWithSelection() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { mutate: multipleArchive } = useMultipleArchiveOrUnArchive();

  const { selectedInboxTabKey, selectedInboxFileId } = useSelector(
    (state) => state.inbox,
  );
  const { data, status } = useGetInboxFiles({
    inboxId,
    isArchived: selectedInboxTabKey === 'archived' ? 1 : 0,
  });

  const inboxFiles = [];

  data?.pages.flatMap((page) => page.data.inbox_files.map((i) => inboxFiles.push({
    id: i.id,
    name: (
      <FileIcon
        extensionKey={i.inbox_file_source.file_format.key}
        size={10}
      />
    ),
    title: i.inbox_file_source.display_name,
  })));

  useLayoutEffect(() => {
    const isIndeterminate = selectedFiles.length > 0 && selectedFiles.length < inboxFiles?.length;

    if (
      selectedFiles.length === inboxFiles.length
      && +selectedFiles.length + +inboxFiles.length > 0
    ) {
      setChecked(selectedFiles.length === inboxFiles.length);
    }
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedFiles]);

  function toggleAll() {
    setSelectedFiles(
      checked || indeterminate ? [] : inboxFiles.map((i) => i.id),
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleClick = (e, fileId, index) => {
    if (selectedFiles.length) {
      setSelectedFiles([]);
    }

    if (!e.target.value) {
      dispatch(
        setCurrentInboxFile({
          inboxFileId: fileId,
          inboxFileIndex: index,
        }),
      );
    }
  };

  const handleChangeInbox = (e, fileId) => {
    setSelectedFiles(
      e.target.checked
        ? [...selectedFiles, fileId]
        : selectedFiles.filter((p) => p !== fileId),
    );
  };

  const onArchive = () => {
    const type = selectedInboxTabKey === 'inbox' ? 'archive' : 'unarchive';
    multipleArchive({
      inboxId,
      type,
      fileIdsArr: selectedFiles,
    });
    setSelectedFiles([]);
    setChecked(false);
    setIndeterminate(false);
  };

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
      />
    );
  }

  return status === 'success' && !inboxFiles.length ? (
    <FullScreenMessage
      title={
        selectedInboxTabKey === 'inbox'
          ? 'No files in your inbox'
          : 'No archived files'
      }
      description={
        selectedInboxTabKey === 'inbox'
          ? 'Upload files to start filing'
          : 'Archived files will appear here'
      }
      ctaText="Upload"
      ctaOnClick={() => dispatch(setShowUploadModal(true))}
      showCta={selectedInboxTabKey === 'inbox'}
    />
  ) : (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            {selectedFiles.length > 0 && (
              <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-12">
                <button
                  type="button"
                  onClick={onArchive}
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {`${
                    selectedInboxTabKey === 'inbox' ? 'Archive' : 'Unarchive'
                  } selected`}
                </button>
              </div>
            )}
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="relative w-12 px-6 sm:w-16 sm:px-8"
                  >
                    <input
                      type="checkbox"
                      className="absolute cursor-pointer left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {' '}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-400"
                  >
                    File name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {inboxFiles.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      selectedFiles.includes(item.id) ? 'bg-gray-50' : null
                    } ${
                      selectedInboxFileId === item.id ? 'bg-indigo-100' : null
                    } cursor-pointer`}
                    onClick={(e) => handleClick(e, item.id, index)}
                  >
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      {selectedFiles.includes(item.id) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
                        value={item.id}
                        checked={selectedFiles.includes(item.id)}
                        onChange={(e) => handleChangeInbox(e, item.id)}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedFiles.includes(item.id)
                          ? 'text-indigo-600'
                          : 'text-gray-900',
                      )}
                    >
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
