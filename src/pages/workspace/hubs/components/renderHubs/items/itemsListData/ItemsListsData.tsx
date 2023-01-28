import React from "react";
import { getTaskListService } from "../../../../../../../features/task/taskService";
import TaskData from "../../../../../tasks/component/taskData/TaskData";

interface ItemsListsDataProps {
  listId: string | null;
}
export default function ItemsListsData({ listId }: ItemsListsDataProps) {
  const { data } = getTaskListService({ listId });

  return (
    <section>
      {/* lists */}
      <div>
        {data?.data.tasks.map((task) => {
          return (
            <div key={task.id}>
              <TaskData task={task} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
