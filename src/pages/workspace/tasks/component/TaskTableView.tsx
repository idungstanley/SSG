import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { BiExport } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import TaskMenu from "./taskMenu/TaskMenu";

function TaskTableView() {
  const defaultMaterialTheme = createTheme();
  const { myTaskData } = useAppSelector((state) => state.task);
  const tableRef = React.createRef;

  const icons: any = {
    Export: () => <BiExport />,
    Search: () => null,
    Filter: () => <AiOutlineFilter />,
    ViewColumn: () => <BiHide />,
    Clear: () => <AiOutlineFilter />,
    SortArrow: () => <FaSort />,
    FirstPage: () => null,
    LastPage: () => null,
    NextPage: () => null,
    PreviousPage: () => null,
    // Clear: () => null,
  };

  const columns: any = [
    {
      title: "TASKS",
      field: "name",
    },
    { title: "DESCRIPTION", field: "description", emptyValue: () => <p>-</p> },
    {
      columnsButton: true,
      title: "ARCHIVED AT",
      field: "archived_at",
      hidden: true,
      emptyValue: () => <p>-</p>,
    },
    { title: "CREATED AT", field: " created_at", emptyValue: () => <p>-</p> },
    { title: "DELETED AT", field: " deleted_at", emptyValue: () => <p>-</p> },
    {
      title: "END DATE",
      field: "end_date",
      hidden: true,
      emptyValue: () => <p>-</p>,
    },
    {
      title: "GROUP ASSIGNEES",
      field: "group_assignees",
      hidden: true,
      emptyValue: () => <p>-</p>,
    },
    {
      title: "PRIORITY",
      field: "priority",
      hidden: true,
      emptyValue: () => <p>-</p>,
    },
    {
      title: "UPDATED AT",
      field: "updated_at",
      hidden: true,
      emptyValue: () => <p>-</p>,
    },
    {
      title: "STARTED DATE",
      field: "start_date",
      hidden: true,
      emptyValue: () => <p>-</p>,
    },
    { title: "ASSIGNEES", field: "assignees", emptyValue: () => <p>-</p> },
  ];

  const editable = myTaskData.map((o) => ({ ...o }));

  return (
    <>
      <div>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            tableRef={tableRef}
            title="{SSG}"
            columns={columns}
            data={editable ?? []}
            options={{
              searchFieldAlignment: "right",
              // filtering: true,
              exportButton: true,
              selection: true,
              showSelectAllCheckbox: false,
              grouping: true,
              columnResizable: false,
              columnsButton: true,
              headerStyle: {
                fontSize: "10px",
              },
              rowStyle: { fontSize: "10px" },
              maxBodyHeight: "300px",
              // fixedColumns: {
              //   left: 1,
              //   right: 0,
              // },

              // tableLayout: "fixed",
            }}
            icons={icons}
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default TaskTableView;

// import React, { FC, useMemo } from "react";
// import MaterialReactTable, {
//   MRT_ColumnDef,
//   MRT_Icons,
// } from "material-react-table";
// // import { data, Person } from './makeData';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowDownWideShort,
//   faBars,
//   faBarsStaggered,
//   faColumns,
//   faCompress,
//   faEllipsisH,
//   faEllipsisVertical,
//   faExpand,
//   faEyeSlash,
//   faFilter,
//   faFilterCircleXmark,
//   faGripLines,
//   faSearch,
//   faSearchMinus,
//   faSortDown,
//   faThumbTack,
// } from "@fortawesome/free-solid-svg-icons";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// import { useAppSelector } from "../../../../app/hooks";
// config.autoAddCss = false;

// /**
//  * These are just some of the icons visible in this table's feature set.
//  * If you skip customizing some icons, those particular icons will fallback the the default Material-UI icons.
//  */
// const fontAwesomeIcons: Partial<MRT_Icons> = {
//   ArrowDownwardIcon: (props: any) => (
//     <FontAwesomeIcon icon={faSortDown} {...props} />
//   ),
//   ClearAllIcon: () => <FontAwesomeIcon icon={faBarsStaggered} />,
//   DensityLargeIcon: () => <FontAwesomeIcon icon={faGripLines} />,
//   DensityMediumIcon: () => <FontAwesomeIcon icon={faBars} />,
//   DensitySmallIcon: () => <FontAwesomeIcon icon={faBars} />,
//   DragHandleIcon: () => <FontAwesomeIcon icon={faGripLines} />,
//   FilterListIcon: (props: any) => (
//     <FontAwesomeIcon icon={faFilter} {...props} />
//   ),
//   FilterListOffIcon: () => <FontAwesomeIcon icon={faFilterCircleXmark} />,
//   FullscreenExitIcon: () => <FontAwesomeIcon icon={faCompress} />,
//   FullscreenIcon: () => <FontAwesomeIcon icon={faExpand} />,
//   SearchIcon: (props: any) => <FontAwesomeIcon icon={faSearch} {...props} />,
//   SearchOffIcon: () => <FontAwesomeIcon icon={faSearchMinus} />,
//   ViewColumnIcon: () => <FontAwesomeIcon icon={faColumns} />,
//   MoreVertIcon: () => <FontAwesomeIcon icon={faEllipsisVertical} />,
//   MoreHorizIcon: () => <FontAwesomeIcon icon={faEllipsisH} />,
//   SortIcon: (props: any) => (
//     <FontAwesomeIcon icon={faArrowDownWideShort} {...props} /> //props so that style rotation transforms are applied
//   ),
//   PushPinIcon: (props: any) => (
//     <FontAwesomeIcon icon={faThumbTack} {...props} /> //props so that style rotation transforms are applied
//   ),
//   VisibilityOffIcon: () => <FontAwesomeIcon icon={faEyeSlash} />,
// };

// const Example: FC = () => {
//   const { myTaskData } = useAppSelector((state) => state.task);

//   const editable = myTaskData.map((o) => ({ ...o }));

//   const data = [
//     {
//       firstName: "John",
//       lastName: "Jay",
//     },
//     {
//       firstName: "John",
//       lastName: "Jay",
//     },
//     {
//       firstName: "John",
//       lastName: "Jay",
//     },
//   ];

//   const columns = useMemo(
//     //column definitions...
//     () =>
//       [
//    {
//      header: "CREATED AT",
//      accessorKey: " created_at",
//    },
//    {
//      header: "DELETED AT",
//      accessorKey: " deleted_at",
//    },
//    {
//      header: "DESCRIPTION",
//      accessorKey: "description",
//    },
//    {
//      header: "END DATE",
//      accessorKey: "end_date",
//    },
//    {
//      accessorKey: "firstName",
//      header: "First Name",
//    },
//    {
//      accessorKey: "lastName",
//      header: "Last Name",
//    },

//    {
//      accessorKey: "address",
//      header: "Address",
//    },
//    {
//      accessorKey: "city",
//      header: "City",
//    },

//    {
//      accessorKey: "state",
//      header: "State",
//    },
//       ] as any,
//     [] //end
//   );

//   return (
//     <MaterialReactTable
//       columns={columns}
//       data={data}
//       enableColumnOrdering
//       enablePinning
//       icons={fontAwesomeIcons}
//     />
//   );
// };

// export default Example;
