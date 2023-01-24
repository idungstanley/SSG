import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { BiExport } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { AvatarWithInitials } from "../../../../../components";

function TaskTableView() {
  const defaultMaterialTheme = createTheme();
  const { myTaskData } = useAppSelector((state) => state.task);

  const editable = myTaskData.map((o) => ({ ...o }));

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
  };

  const columnHead: any = [];
  const singleObj: any = editable[0];
  columnHead.push(Object.keys(singleObj));

  const dynamicColum: any = [];

  const groupAssignee = (data) => {
    return data?.map((newData) => (
      <>
        <span key={newData.id} className="flex-1">
          <AvatarWithInitials
            initials={newData.initials}
            backgroundColour={newData.colour}
            height="h-5"
            width="w-5"
          />
        </span>
      </>
    ));
  };

  const hidden = (col) => {
    if (col == "id") {
      return true;
    }
    if (col == "list_id") {
      return true;
    }
    if (col == "parent_id") {
      return true;
    }
    if (col == "archived_at") {
      return true;
    }
    if (col == "deleted_at") {
      return true;
    }
    if (col == "updated_at") {
      return true;
    }
    if (col == "group_assignees") {
      return true;
    }
    if (col == "description") {
      return true;
    }
    if (col == "end_date") {
      return true;
    }
    if (col == "start_date") {
      return true;
    }
  };

  columnHead[0].map((column) => {
    const singleColumn = {
      title:
        column.split("_").join(" ").toUpperCase() == "NAME"
          ? "TASKS"
          : column.split("_").join(" ").toUpperCase(),
      field: column,
      emptyValue: () => <p>-</p>,
      hidden: hidden(column),

      render:
        column == "assignees"
          ? (newData) => groupAssignee(newData.assignees)
          : null,
    };
    dynamicColum.push(singleColumn);
  });

  return (
    <>
      <div>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            // tableRef={tableRef}
            title="{SSG}"
            columns={dynamicColum}
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
              // doubleHorizontalScroll: false,
            }}
            icons={icons}
          />
        </ThemeProvider>
      </div>
    </>
  );
}

export default TaskTableView;
