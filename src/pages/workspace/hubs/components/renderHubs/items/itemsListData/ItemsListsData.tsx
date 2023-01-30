import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import { getTaskListService } from "../../../../../../../features/task/taskService";
import { setAddNewTaskItem } from "../../../../../../../features/task/taskSlice";
import AddNewItem from "../../../../../tasks/component/taskColumn/AddNewItem";
import TaskData from "../../../../../tasks/component/taskData/TaskData";

interface ItemsListsDataProps {
  listId: string | null;
}
export default function ItemsListsData({ listId }: ItemsListsDataProps) {
  const { data } = getTaskListService({ listId });

  const { addNewTaskItem } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

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

        {/* {addNewTaskItem && <AddNewItem listId={listId} />}
        <div
          className=""
          id="newItem"
          onClick={() => dispatch(setAddNewTaskItem(!addNewTaskItem))}
        >
          <p className="pl-2 text-xs  w-20 mt-1 cursor-pointer ml-10 font-semibold text-gray-400">
            + New Task
          </p>
        </div> */}
      </div>
    </section>
  );
}
