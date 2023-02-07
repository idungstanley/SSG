import { useAppDispatch } from "../../../../../app/hooks";
import React, { useState } from "react";
import { getTaskColumns } from "../../../../../features/task/taskSlice";

export const columnsHead:
  | {
      field: string;
      value: string;
      hidden: boolean;
    }[]
  | any = [
  {
    field: "name",
    value: "Task",
    hidden: false,
    // onclick: (e, listItemHidden) => {
    //   e == "Task" ? listItemHidden == !listItemHidden : null;
    // },
  },
  {
    field: "assignees",
    value: "Assignees",
    hidden: false,
    onclick: () => {
      alert("great");
    },
  },
  {
    field: "priority",
    value: "Priority",
    hidden: false,
    onclick: () => {
      alert("great");
    },
  },
  {
    field: "created_at",
    value: "Created at",
    hidden: false,
  },
  {
    field: "description",
    value: "Description",
    hidden: true,
    onclick: () => {
      alert("great");
    },
  },
  {
    field: "status",
    value: "Status",
    hidden: false,
    onclick: () => {
      alert("great");
    },
  },
  {
    field: "start_date",
    value: " Start Date",
    hidden: true,
    onclick: () => {
      alert("great");
    },
  },
  {
    field: "end_date",
    value: "End Date",
    hidden: true,
    onclick: () => {
      alert("great");
    },
  },
  {
    field: "updated_at",
    value: "Updated at",
    hidden: false,
    onclick: () => {
      alert("great");
    },
  },
  {
    field: "archived_at",
    value: "Archived at",
    hidden: true,
    onclick: () => {
      alert("great");
    },
  },
];
