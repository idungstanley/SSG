import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useGetInboxFiles,
  useMultipleArchiveOrUnArchive,
} from '../../../../../../features/inbox/inboxService';
import { FileIcon, Spinner } from '../../../../../../common';
import { setCurrentInboxFile } from '../../../../../../features/inbox/inboxSlice';
import FullScreenMessage from '../../../../../../components/CenterMessage/FullScreenMessage';
import { setShowUploadModal } from '../../../../../../features/general/uploadFile/uploadFileSlice';
import { classNames } from '../../../../../../utils';
import { useAppSelector } from '../../../../../../app/hooks';

interface IInboxFiles {
  id: string;
  name: JSX.Element;
  title: string;
}

export default function TableWithSelection() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const checkbox = useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const { mutate: multipleArchive } = useMultipleArchiveOrUnArchive();

  const { selectedInboxTabKey, selectedInboxFileId, selectedInboxFileIndex } =
    useAppSelector((state) => state.inbox);

  const { data, status } = useGetInboxFiles({
    inboxId,
    isArchived: selectedInboxTabKey === 'archived',
  });

  const inboxFiles: IInboxFiles[] = useMemo(() => [], [data]);

  useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page.data.inbox_files.map((i) =>
          inboxFiles.push({
            id: i.id,
            name: (
              <FileIcon
                extensionKey={i.inbox_file_source.file_format.key}
                size={10}
              />
            ),
            title: i.inbox_file_source.display_name,
          })
        )
      ),
    [data]
  );

  useEffect(() => {
    if (selectedInboxFileId) {
      setSelectedFiles([selectedInboxFileId]);
    }
  }, [selectedInboxFileIndex]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedFiles.length > 0 && selectedFiles.length < inboxFiles?.length;

    if (
      selectedFiles.length === inboxFiles.length &&
      +selectedFiles.length + +inboxFiles.length > 0
    ) {
      setChecked(selectedFiles.length === inboxFiles.length);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedFiles]);

  function toggleAll() {
    setSelectedFiles(
      checked || indeterminate ? [] : inboxFiles.map((i) => i.id)
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleClick = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    fileId: string,
    index: number
  ) => {
    const target = e.target as HTMLButtonElement;

    if (selectedFiles.length) {
      setSelectedFiles([]);
    }

    if (!target.value) {
      dispatch(
        setCurrentInboxFile({
          inboxFileId: fileId,
          inboxFileIndex: index,
        })
      );
      setSelectedFiles([fileId]);
    }
  };

  const handleChangeInbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileId: string
  ) => {
    setSelectedFiles(
      e.target.checked
        ? [...selectedFiles, fileId]
        : selectedFiles.filter((p) => p !== fileId)
    );
  };

  const onArchive = () => {
    const type = selectedInboxTabKey === 'inbox' ? 'archive' : 'unarchive';
    multipleArchive({
      type,
      fileIdsArr: selectedFiles,
      inboxId,
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

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={22} color="#0F70B7" />
      </div>
    );
  }

  return !inboxFiles.length ? (
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
                          : 'text-gray-900'
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
