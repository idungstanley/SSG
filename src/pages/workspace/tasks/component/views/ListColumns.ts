export interface listColumnProps {
  field: string;
  value: string;
  hidden: boolean;
}

export const columnsHead: listColumnProps[] = [
  {
    field: "name",
    value: "Task",
    hidden: false,
  },
  {
    field: "assignees",
    value: "Assignees",
    hidden: true,
  },
  {
    field: "tags",
    value: "Tags",
    hidden: true,
  },
  {
    field: "priority",
    value: "Priority",
    hidden: false,
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
  },
  {
    field: "status",
    value: "Status",
    hidden: false,
  },
  {
    field: "start_date",
    value: " Start Date",
    hidden: true,
  },
  {
    field: "end_date",
    value: "End Date",
    hidden: true,
  },
  {
    field: "updated_at",
    value: "Updated at",
    hidden: false,
  },
  {
    field: "archived_at",
    value: "Archived at",
    hidden: true,
  },
];
