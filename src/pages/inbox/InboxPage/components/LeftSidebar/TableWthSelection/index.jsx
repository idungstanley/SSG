// /* eslint-disable implicit-arrow-linebreak */
// // import 'antd/dist/antd.css';
// import React, { useLayoutEffect, useRef, useState } from 'react';
// // import { Table } from 'antd';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   useGetInboxFiles,
//   // useMultipleArchiveOrUnArchive,
// } from '../../../../../../features/inbox/inboxService';
// import { FileIcon, Spinner } from '../../../../../../common';
// import {
//   // setCurrentInboxFile,
//   setShowUploadModal,
// } from '../../../../../../features/inbox/inboxSlice';
// import FullScreenMessage from '../../../../../shared/components/FullScreenMessage';

// // const columns = [
// //   {
// //     dataIndex: 'logo',
// //   },
// //   {
// //     title: 'File name',
// //     dataIndex: 'title',
// //   },
// // ];

//   const dispatch = useDispatch();
//   // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   // const { mutate: multipleArchive } = useMultipleArchiveOrUnArchive();
//   const { inboxId } = useParams();
//   const selectedInboxTabKey = useSelector(
//     (state) => state.inbox.selectedInboxTabKey,
//   );
//   const { data, status } = useGetInboxFiles({
//     inboxId,
//     isArchived: selectedInboxTabKey === 'archived' ? 1 : 0,
//   });

//   const inboxFiles = [];

//   data?.pages.flatMap((page) =>
//     page.data.inbox_files.map((i) =>
//       inboxFiles.push({
//         key: i.id,
//         logo: (
//           <FileIcon
//             extensionKey={i.inbox_file_source.file_format.key}
//             size={10}
//           />
//         ),
//         title: i.inbox_file_source.display_name,
//       })));

//   // const handleClick = (fileId, index) => {
//   //   dispatch(
//   //     setCurrentInboxFile({
//   //       inboxFileId: fileId,
//   //       inboxFileIndex: index,
//   //     })
//   //   );
//   // };

//   // const onSelectChange = (newSelectedRowKeys) => {
//   //   setSelectedRowKeys(newSelectedRowKeys);
//   // };

//   // const rowSelection = {
//   //   selectedRowKeys,
//   //   onChange: onSelectChange,
//   //   selections: selectedRowKeys.length
//   //     ? [
//   //         {
//   //           key: 'archive',
//   //           text: `${
//   //             selectedInboxTabKey === 'inbox' ? 'Archive' : 'Unarchive'
//   //           } selected`,
//   //           onSelect: () => {
//   //             const type =
//   //               selectedInboxTabKey === 'inbox' ? 'archive' : 'unarchive';
//   //             multipleArchive({
//   //               inboxId,
//   //               type,
//   //               fileIdsArr: selectedRowKeys,
//   //             });
//   //             setSelectedRowKeys([]);
//   //           },
//   //         },
//   //       ]
//   //     : null,
//   // };

//   if (status === 'loading') {
//     return (
//       <div className="mx-auto w-6 mt-10 justify-center">
//         <Spinner size={22} color="#0F70B7" />
//       </div>
//     );
//   }

//   if (status === 'error') {
//     return (
//       <FullScreenMessage
//         title="Oops, an error occurred :("
//         description="Please try again later."
//       />
//     );
//   }

//   return !inboxFiles.length ? (
//     <FullScreenMessage
//       title={
//         selectedInboxTabKey === 'inbox'
//           ? 'No files in your inbox'
//           : 'No archived files'
//       }
//       description={
//         selectedInboxTabKey === 'inbox'
//           ? 'Upload files to start filing'
//           : 'Archived files will appear here'
//       }
//       ctaText="Upload"
//       ctaOnClick={() => dispatch(setShowUploadModal(true))}
//       showCta={selectedInboxTabKey === 'inbox'}
//     />
import React, { useLayoutEffect, useRef, useState } from 'react';

const people = [
  {
    name: 'Lindsay',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Lindsay 2',
    title: 'Front-end Developer 2',
    email: 'lindsay.walton@example.com 2',
    role: 'Member 2',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TableWithSelection() {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  console.log(selectedPeople);

  return (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden md:rounded-lg">
            {selectedPeople.length > 0 && (
              <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                <button
                  type="button"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Bulk edit
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
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
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
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => (
                  <tr
                    key={person.email}
                    className={
                      selectedPeople.includes(person) ? 'bg-gray-50' : undefined
                    }
                  >
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      {selectedPeople.includes(person) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
                        value={person.email}
                        checked={selectedPeople.includes(person)}
                        onChange={(e) => setSelectedPeople(
                          e.target.checked
                            ? [...selectedPeople, person]
                            : selectedPeople.filter((p) => p !== person),
                        )}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedPeople.includes(person)
                          ? 'text-indigo-600'
                          : 'text-gray-900',
                      )}
                    >
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.title}
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
