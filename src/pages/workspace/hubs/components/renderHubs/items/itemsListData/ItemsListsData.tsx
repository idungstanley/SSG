import React from "react";
import { getTaskListService } from "../../../../../../../features/task/taskService";

interface ItemsListsDataProps {
  listId: string | null;
}
export default function ItemsListsData({ listId }: ItemsListsDataProps) {
  const { data } = getTaskListService({ listId });
  console.log(data);
  return (
    <section>
      {/* lists */}
      <div>{data?.data.tasks.map((item) => item.name)}</div>
    </section>
  );
}
