// import React, { ReactNode, useRef, useState } from 'react';
// import { Task } from '../../../../features/task/interface.tasks';
// import RoundedCheckbox from '../../../Checkbox/RoundedCheckbox';
// import ToolTip from '../../../Tooltip/Tooltip';
// import { ImCancelCircle } from 'react-icons/im';
// import StatusDropdown from '../../../status/StatusDropdown';
// import { setSelectedTasksArray, setShowTaskNavigation } from '../../../../features/task/taskSlice';
// import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
// import { DEFAULT_COL_BG } from '../../config';
// import { useParams } from 'react-router-dom';
// import { cl } from '../../../../utils';

// export default function AddTaskFromStatus({
//   task,
//   onClose,
//   dragElement,
//   handleOnSave
// }: {
//   task: Task;
//   onClose?: VoidFunction;
//   dragElement?: ReactNode;
//   handleOnSave: (
//     e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     id: string
//   ) => Promise<void>;
// }) {
//   const dispatch = useAppDispatch();
//   const { verticalGrid, selectedTasksArray } = useAppSelector((state) => state.task);
//   const [isChecked, setIsChecked] = useState(false);
//   const { taskId } = useParams();
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const ACTIVE_TASK = taskId === task.id ? 'tdListV' : DEFAULT_COL_BG;

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const isChecked = e.target.checked;
//     dispatch(setShowTaskNavigation(isChecked));
//     if (isChecked) {
//       // Add the task ID to the selectedTasksArray array if it's not already present
//       if (!selectedTasksArray.includes(task.id)) {
//         const updatedTaskIds = [...selectedTasksArray, task.id];
//         dispatch(setSelectedTasksArray(updatedTaskIds));
//       }
//     } else {
//       // Remove the task ID from the selectedTasksArray array
//       const updatedTaskIds = selectedTasksArray.filter((id: string) => id !== task.id);
//       dispatch(setSelectedTasksArray(updatedTaskIds));
//     }
//     setIsChecked(isChecked);
//   };

//   return (
//     <td className="sticky left-0 flex items-start justify-start text-sm font-medium text-gray-900 cursor-pointer text-start">
//       <div className="flex items-center h-full space-x-1 opacity-0">
//         <RoundedCheckbox
//           onChange={onChange}
//           isChecked={isChecked}
//           styles={`w-4 h-4 rounded-full ${
//             selectedTasksArray.length > 0 ? 'opacity-100' : 'opacity-0'
//           } cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100`}
//         />
//         <div className="pr-2">{dragElement}</div>
//       </div>

//       <div
//         style={{ paddingLeft: '0' }}
//         className={cl(
//           ACTIVE_TASK,
//           `relative border-t ${verticalGrid && 'border-r'} w-full h-10 py-4 p-4 flex items-center `
//         )}
//       >
//         <div className="absolute flex ml-1 space-x-1 -mt-7">
//           <ToolTip tooltip="Cancel">
//             <ImCancelCircle onClick={onClose} className="w-3 h-3" />
//           </ToolTip>
//           <button
//             onClick={(e) => handleOnSave(e as React.MouseEvent<HTMLButtonElement, MouseEvent>, task.id)}
//             className="p-0.5 text-white text-sm w-10 h-3 rounded-sm bg-lime-600 flex items-center"
//           >
//             Save
//           </button>
//         </div>
//         <div className="ml-4">
//           <StatusDropdown TaskCurrentStatus={task.status} />
//         </div>
//         <div className="flex flex-col items-start justify-start pl-2 space-y-1">
//           <p
//             className="flex text-left"
//             contentEditable={true}
//             ref={inputRef}
//             onKeyDown={(e) => (e.key === 'Enter' ? handleOnSave(e, task.id) : null)}
//           >
//             {task.name}
//           </p>
//         </div>
//       </div>
//     </td>
//   );
// }
