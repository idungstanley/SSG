// import React from 'react';
// import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
// import MaterialTable from 'material-table';
// import { ThemeProvider, createTheme } from '@mui/material';
// import { BiExport } from 'react-icons/bi';
// import { BiHide } from 'react-icons/bi';
// import { MdOutlineCancelScheduleSend } from 'react-icons/md';
// import { FcParallelTasks } from 'react-icons/fc';
// import { AiOutlineFilter } from 'react-icons/ai';
// import { FaSort } from 'react-icons/fa';
// import '../taskData/task.css';
// import { AvatarWithInitials } from '../../../../../components';
// // import {
// //   ImyTaskData,
// //   setCurrentTaskId,
// //   setShowTaskNavigation,
// // } from '../../../../../features/task/taskSlice';
// import { groupAssigneeProps } from '../../subtasks/subtask1/Template';

function TaskTableView() {
//   const defaultMaterialTheme = createTheme();
//   const { myTaskData } = useAppSelector((state) => state.task);
//   // const { showTaskNavigation } = useAppSelector((state) => state.task);

//   // const dispatch = useAppDispatch();

//   const editable = myTaskData.map((o) => ({ ...o }));

//   interface tableIcons {
//     Export: () => JSX.Element;
//     Search: () => null;
//     Filter: () => JSX.Element;
//     ViewColumn: () => JSX.Element;
//     Clear: () => JSX.Element;
//     SortArrow: () => JSX.Element;
//     DetailPanel: () => JSX.Element;
//     FirstPage: () => null;
//     LastPage: () => null;
//     NextPage: () => null;
//     PreviousPage: () => null;
//     ResetSearch: () => JSX.Element;
//   }

//   interface ListItem {
//     id?: string;
//     name?: string;
//     description?: string | null;
//     list_id?: string;
//     parent_id?: string | null;
//     priority?: string | null;
//     start_date?: string | null;
//     end_date?: string | null;
//     assignees?: string[];
//     group_assignees?: string[];
//     updated_at?: string;
//     created_at?: string;
//     archived_at?: string | null;
//     deleted_at?: string | null;
//     directory_items?: string[];

//     title?: string;
//     field?: string;
//     emptyValue?: () => JSX.Element;
//     hidden?: boolean | undefined;
//     render?: ((newData: groupAssigneeProps) => void) | null;
//   }

//   interface singleColumnProps {
//     title: string;
//     field: string;
//     emptyValue: () => JSX.Element;
//     hidden: boolean | undefined;
//     render: ((newData: groupAssigneeProps) => void) | null;
//   }

//   // interface ColumnsHead {
//   //   id: string;
//   //   name: string;
//   //   description: string;
//   //   list_id: string;
//   //   parent_id: string;
//   //   priority: string;
//   //   start_date: string;
//   //   end_date: string;
//   //   assignees: string;
//   //   group_assignees: string;
//   //   custom_fields: string;
//   //   updated_at: string;
//   //   created_at: string;
//   //   archived_at: string;
//   //   deleted_at: string;
//   //   directory_items: string;
//   // }
//   // [];

//   const icons: tableIcons = {
//     Export: () => <BiExport />,
//     Search: () => null,
//     Filter: () => <AiOutlineFilter />,
//     ViewColumn: () => <BiHide />,
//     Clear: () => <AiOutlineFilter />,
//     SortArrow: () => <FaSort />,
//     DetailPanel: () => <FcParallelTasks />,
//     FirstPage: () => null,
//     LastPage: () => null,
//     NextPage: () => null,
//     PreviousPage: () => null,
//     ResetSearch: () => <MdOutlineCancelScheduleSend />,
//   };

//   const columnHead: string[][] = [];
//   const singleObj: ListItem = editable[0];
//   singleObj && columnHead.push(Object.keys(singleObj));

//   const dynamicColum: ListItem[] = [];

//   const groupAssignee = (data: groupAssigneeProps[]) => {
//     return data?.map((newData) => (
//       <>
//         <span key={newData.id} className="flex-1 stack2">
//           <AvatarWithInitials
//             initials={newData.initials}
//             backgroundColour={newData.colour}
//             height="h-5"
//             width="w-5"
//           />
//         </span>
//       </>
//     ));
//   };

//   const hidden = (col: string) => {
//     if (col == 'id') {
//       return true;
//     }
//     if (col == 'list_id') {
//       return true;
//     }
//     if (col == 'directory_items') {
//       return true;
//     }
//     if (col == 'parent_id') {
//       return true;
//     }
//     if (col == 'archived_at') {
//       return true;
//     }
//     if (col == 'deleted_at') {
//       return true;
//     }
//     if (col == 'updated_at') {
//       return true;
//     }
//     if (col == 'group_assignees') {
//       return true;
//     }
//     if (col == 'description') {
//       return true;
//     }
//     if (col == 'end_date') {
//       return true;
//     }
//     if (col == 'start_date') {
//       return true;
//     }
//   };

//   interface dataProps {
//     assignees: groupAssigneeProps[];
//   }

//   const renderData = (column: string, newData: dataProps) => {
//     if (column == 'assignees') {
//       return groupAssignee(newData.assignees);
//     } else return;
//   };

//   // const displayNav = (id: string) => {
//   //   dispatch(setShowTaskNavigation(!showTaskNavigation));
//   //   dispatch(setCurrentTaskId(id));
//   // };

//   columnHead[0]?.map((column) => {
//     const singleColumn: singleColumnProps = {
//       title:
//         column.split('_').join(' ').toUpperCase() == 'NAME'
//           ? 'TASKS'
//           : column.split('_').join(' ').toUpperCase(),
//       field: column,
//       emptyValue: () => <p>-</p>,
//       hidden: hidden(column),
//       render:
//         column == 'assignees' ? (newData) => renderData(column, newData) : null,
//     };
//     dynamicColum.push(singleColumn);
//   });

//   return (
//     <>
//       <div>
//         <ThemeProvider theme={defaultMaterialTheme}>
//           <MaterialTable
//             // tableRef={tableRef}
//             title="{SSG}"
//             columns={dynamicColum as any}
//             data={editable ?? []}
//             //   onSelectionChange={(selectedRow) => {
//             //     setTimeout(() => {
//             //       displayNav(selectedRow[0]?.id);
//             //     }, 1000);
//             //   }}
//             //   actions={[
//             detailPanel={[
//               {
//                 tooltip: 'Add Subtask',
//                 render: () => {
//                   return (
//                     <form className="flex justify-between items-center w-10/12 mx-auto">
//                       <input
//                         type="text"
//                         className=" text-black pl-10 border-0"
//                         placeholder="Enter a subtask name"
//                       />
//                       <button
//                         type="button"
//                         className="bg-blue-700 px-3 py-1 text-white"
//                       >
//                         Save
//                       </button>
//                     </form>
//                   );
//                 },
//               },
//             ]}
//             options={{
//               //     tableLayout: "fixed",
//               searchFieldAlignment: 'right',
//               // filtering: true,
//               exportButton: true,
//               selection: true,
//               showSelectAllCheckbox: false,
//               grouping: true,
//               columnResizable: false,
//               columnsButton: true,
//               headerStyle: {
//                 fontSize: '10px',
//               },
//               rowStyle: { fontSize: '10px' },
//               maxBodyHeight: '300px',
//             }}
//             icons={icons}
//           />
//         </ThemeProvider>
//       </div>
//     </>
//   );
}

export default TaskTableView;
