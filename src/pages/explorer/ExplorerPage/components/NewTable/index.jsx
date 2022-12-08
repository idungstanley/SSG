import React, {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OutputDateTime, OutputFileSize } from '../../../../../app/helpers';
import { FileIcon, Spinner } from '../../../../../common';
import { useGetExplorerFilesAndFolders } from '../../../../../features/explorer/explorerService';
import {
  setSelectedFiles,
  setSelectedFolders,
  resetSelectedFilesAndFolders,
  setSelectedItem,
  setShowUploadModal,
} from '../../../../../features/explorer/explorerSlice';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';
import { sortItems } from '../Toolbar/SortingItems';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ExplorerTable() {
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const {
    selectedItemId, selectedFileIds, selectedFolderIds, selectedSorting,
  } = useSelector(
    (state) => state.explorer,
  );
  const selectedItems = [...selectedFileIds, ...selectedFolderIds];

  const { data, status } = useGetExplorerFilesAndFolders(folderId);

  const items = [];

  data?.data.folders.map((i) => items.push({
    icon: 'folder',
    name: i.name,
    created_at: i.created_at,
    size: '-',
    item_type: 'folder',
    id: i.id,
    updated_at: i.updated_at,
  }));

  data?.data.files.map((i) => items.push({
    icon: i.file_format.key,
    name: i.display_name,
    created_at: i.created_at,
    size: i.size,
    item_type: 'file',
    id: i.id,
    updated_at: i.updated_at,
  }));

  useLayoutEffect(() => {
    const isIndeterminate = selectedItems.length > 0 && selectedItems.length < items?.length;

    if (
      selectedItems.length === items.length
      && +selectedItems.length + +items.length > 0
    ) {
      setChecked(selectedItems.length === items.length);
    }
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedItems]);

  function toggleAll() {
    if (checked || indeterminate) {
      dispatch(resetSelectedFilesAndFolders());
    } else {
      dispatch(
        setSelectedFiles([
          ...items.filter((i) => i.item_type === 'file').map((i) => i.id),
        ]),
      );
      dispatch(
        setSelectedFolders([
          ...items.filter((i) => i.item_type === 'folder').map((i) => i.id),
        ]),
      );
    }

    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleClick = (e, itemId, type) => {
    if (selectedItems.length && !e.target.value) {
      dispatch(resetSelectedFilesAndFolders());
    }

    if (!e.target.value) {
      dispatch(
        setSelectedItem({
          selectedItemId: itemId,
          selectedItemType: type,
        }),
      );
      dispatch(
        type === 'file'
          ? setSelectedFiles([itemId])
          : setSelectedFolders([itemId]),
      );
    }
  };

  const handleChangeItem = (e, itemId, type) => {
    if (!e.target.checked) {
      dispatch(
        type === 'file'
          ? setSelectedFiles([...selectedFileIds.filter((i) => i !== itemId)])
          : setSelectedFolders([
            ...selectedFolderIds.filter((i) => i !== itemId),
          ]),
      );
    } else {
      dispatch(
        type === 'file'
          ? setSelectedFiles([...selectedFileIds, itemId])
          : setSelectedFolders([...selectedFolderIds, itemId]),
      );
    }
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

  const sortedItems = useMemo(() => [...sortItems(items?.filter((i) => i.item_type === 'folder'), selectedSorting.id), ...sortItems(items?.filter((i) => i.item_type === 'file'), selectedSorting.id)], [data, selectedSorting]);

  return !items.length ? (
    <FullScreenMessage
      title="No files or folders in your explorer"
      description="Upload one to start working"
      ctaText="Upload"
      ctaOnClick={() => dispatch(setShowUploadModal(true))}
      showCta
    />
  ) : (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden">
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
                    className="py-3 pr-3.5 pl-1 uppercase text-left text-sm font-normal text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 uppercase text-left text-sm font-normal text-gray-400"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 uppercase text-left text-sm font-normal text-gray-400"
                  >
                    Size
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`${
                      selectedItems.includes(item.id) ? 'bg-gray-50' : null
                    } 
                    ${selectedItemId === item.id ? 'bg-indigo-100' : null}
                     cursor-pointer`}
                    onClick={(e) => handleClick(e, item.id, item.item_type)}
                  >
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      {selectedItems.includes(item.id) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
                        value={item.id}
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleChangeItem(e, item.id, item.item_type)}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium flex gap-4 items-center',
                        selectedItems.includes(item.id)
                          ? 'text-indigo-600'
                          : 'text-gray-900',
                      )}
                    >
                      <FileIcon extensionKey={item.icon} size={10} />
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {OutputDateTime(item.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {OutputFileSize(item.size)}
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

// export default function ExplorerTable() {
//   // const dispatch = useDispatch();
//   // const { folderId } = useParams();
//   const checkbox = useRef();
//   const [checked, setChecked] = useState(false);
//   // const { data, status } = useGetExplorerFilesAndFolders(folderId);
//   const [indeterminate, setIndeterminate] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const status = 'success';

//   const items = [];

//   useMemo(
//     () => data?.data.files.map((i) => items.push({
//       icon: i.file_format.key,
//       name: i.display_name,
//       created_at: i.created_at,
//       size: i.size,
//       item_type: 'file',
//       id: i.id,
//     })),
//     [data],
//   );

//   useMemo(
//     () => data?.data.folders.map((i) => items.push({
//       icon: 'folder',
//       name: i.name,
//       created_at: i.created_at,
//       size: '-',
//       item_type: 'folder',
//       id: i.id,
//     })),
//     [data],
//   );

//   //   const {
//   //     selectedFileIds,
//   //     selectedSorting,
//   //    selectedFolderIds,
//   //    selectedItemId,
//   // } = useSelector((state) => state.explorer);
//   //  const selectedItemsPool = [...selectedFileIds, ...selectedFolderIds, selectedItemId];

//   useLayoutEffect(() => {
//     const isIndeterminate = selectedItems.length > 0 && selectedItems.length < items?.length;

//     if (
//       selectedItems.length === items.length
//       && +selectedItems.length + +items.length > 0
//     ) {
//       setChecked(selectedItems.length === items.length);
//     }
//     setIndeterminate(isIndeterminate);
//     checkbox.current.indeterminate = isIndeterminate;
//   }, [selectedItems]);

//   // useEffect(() => {
//   //   dispatch(resetSelectedItem());

//   //   if (status !== 'success') {
//   //     return false;
//   //   }

//   //  setProcessedData([
//   //    ...sortItems(folders, selectedSorting.id),
//   //     ...sortItems(files, selectedSorting.id),
//   // ]);
//   //   return true;
//   // }, [data, selectedSorting]);

//   function toggleAll() {
//     setSelectedItems(checked || indeterminate ? [] : items.map((i) => i.id));

//     setChecked(!checked && !indeterminate);
//     setIndeterminate(false);
//   }

//   const handleChangeItem = (e, itemId, type) => {
//     // setSelectedItems(
//     //   e.target.checked
//     //     ? [...selectedItems, itemId]
//     //     : selectedItems.filter((p) => p !== itemId),
//     // );
//     setSelectedItems([itemId]);
//     console.log(e, itemId, type);
//     // );

//     // dispatch(
//     //   type === 'file'
//     //    ? setSelectedFiles([...selectedFileIds, itemId])
//     //    : setSelectedFolders([...selectedFolderIds, itemId]),
//     // );
//   };

//   const handleClick = (e, itemId, type) => {
//     if (selectedItems.length) {
//       setSelectedItems([]);
//       // dispatch(resetSelectedFilesAndFolders());
//     }

//     // if (selectedItems.length) {
//     //   setSelectedItems([]);
//     // }

//     if (!e.target.value) {
//       console.log(itemId, type);
//       //  setSelectedItem({
//       //     selectedItemId: fileId,
//       //    selectedItemType: type,
//       //   }),
//       // );
//     }
//   };

//   if (status === 'error') {
//     return (
//       <FullScreenMessage
//         title="Oops, an error occurred :("
//         description="Please try again later."
//       />
//     );
//   }

//   return status === 'success' && !items.length ? (
//     <FullScreenMessage
//       title="text"
//       description="text"
//       ctaText="Upload"
//       // ctaOnClick={() => dispatch(setShowUploadModal(true))}
//       // showCta={selectedInboxTabKey === 'inbox'}
//     />
//   ) : (
//     <div className="flex flex-col">
//       <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//           <div className="relative overflow-hidden">
//             <table className="min-w-full table-fixed divide-y divide-gray-300">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col">
//                     <input
//                       type="checkbox"
//                       className="absolute cursor-pointer bg-gray-50 left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
//                       ref={checkbox}
//                       checked={checked}
//                       onChange={toggleAll}
//                     />
//                   </th>
//                   <th
//                     scope="col"
//                     className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Created at
//                   </th>
//                   <th
//                     scope="col"
//                     className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     size
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 bg-white">
//                 {items.map((item) => (
//                   <tr
//                     key={item.id}
//                     className={`${
//                       // selectedItemId === item.id ? 'bg-indigo-100' : null
//                       selectedItems.includes(item.id) ? 'bg-indigo-100' : null
//                     } cursor-pointer`}
//                     onClick={(e) => handleClick(e, item.id, item.item_type)}
//                   >
//                     <td className="relative w-12 px-6 sm:w-16 sm:px-8">
//                       {selectedItems.includes(item.id) && (
//                         <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
//                       )}
//                       <input
//                         type="checkbox"
//                         className="absolute left-4 top-1/2 -mt-2 h-4 cursor-pointer w-4 rounded border-gray-300 text-indigo-600 ring-0 focus:ring-0 sm:left-6"
//                         value={item.id}
//                         checked={selectedItems.includes(item.id)}
//                         onChange={(e) => handleChangeItem(e, item.id, item.item_type)}
//                       />
//                     </td>
//                     <td
//                       className={classNames(
//                         'whitespace-nowrap py-4 pr-3 text-sm font-medium',
//                         selectedItems.includes(item.id)
//                           ? 'text-indigo-600'
//                           : 'text-gray-900',
//                       )}
//                     >
//                       {item.name}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                       {item.created_at}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                       {item.size}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
