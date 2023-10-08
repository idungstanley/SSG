// import React from 'react';
// import { entriesProps } from './EntryList';
// import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { DeleteTimeEntriesService } from '../../../../../features/task/taskService';
// import { setUpdateEntries } from '../../../../../features/task/taskSlice';
// import EditIcon from '../../../../../assets/icons/Edit';
// import UpdateTimeEntryDropdown from './UpdateTimeEntryDropdown';
// import TrashIcon from '../../../../../assets/icons/delete';

// interface Props {
//   setIconToggle: (
//     value: React.SetStateAction<{
//       editIcon: boolean;
//       trashIcon: boolean;
//       threeDots: boolean;
//     }>
//   ) => void;
//   entries: entriesProps;
//   iconToggle: {
//     editIcon: boolean;
//     trashIcon: boolean;
//     threeDots: boolean;
//   };
// }

// export function EntryListActionBtns({ setIconToggle, entries, iconToggle }: Props) {
//   const dispatch = useAppDispatch();
//   const { openUpdateEntryId } = useAppSelector((state) => state.task);
//   const queryClient = useQueryClient();
//   const handledelete = useMutation(DeleteTimeEntriesService, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(['timeclock']);
//     }
//   });

//   const handleUpdateEntry = (id: string) => {
//     if (openUpdateEntryId === id) {
//       dispatch(
//         setUpdateEntries({
//           openUpdateEntryId: id
//         })
//       );
//     } else {
//       dispatch(
//         setUpdateEntries({
//           openUpdateEntryId: id,
//           initial_description: entries.description,
//           initial_start_date: entries.start_date,
//           initial_end_date: entries.end_date
//         })
//       );
//     }
//   };
//   return (
//     <td
//       id="right"
//       className="flex items-center justify-center rounded-md space-x-2 absolute top-5 right-0 w-20 bg-alsoit-gray-50 shadow-xl p-2"
//     >
//       <button type="button" onClick={() => handleUpdateEntry(entries.id)}>
//         <div
//           onMouseEnter={() =>
//             setIconToggle((prev) => ({
//               ...prev,
//               editIcon: true
//             }))
//           }
//           onMouseLeave={() =>
//             setIconToggle((prev) => ({
//               ...prev,
//               editIcon: false
//             }))
//           }
//         >
//           <EditIcon active={iconToggle.editIcon} dimensions={{ width: 20, height: 20 }} aria-hidden="true" />
//         </div>
//       </button>
//       {openUpdateEntryId === entries.id ? (
//         <UpdateTimeEntryDropdown time_entry_id={entries.id} billable={entries.is_billable} />
//       ) : null}
//       <button type="button" onClick={() => handledelete.mutateAsync({ timeEntryDeleteTriggerId: entries.id })}>
//         <div
//           onMouseEnter={() =>
//             setIconToggle((prev) => ({
//               ...prev,
//               trashIcon: true
//             }))
//           }
//           onMouseLeave={() =>
//             setIconToggle((prev) => ({
//               ...prev,
//               trashIcon: false
//             }))
//           }
//         >
//           <TrashIcon active={iconToggle.trashIcon} dimensions={{ width: 20, height: 20 }} aria-hidden="true" />
//         </div>
//       </button>
//     </td>
//   );
// }
