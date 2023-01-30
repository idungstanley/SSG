import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import { getTaskListService } from "../../../../../../../features/task/taskService";
import { setAddNewTaskItem } from "../../../../../../../features/task/taskSlice";
import AddNewItem from "../../../../../tasks/component/taskColumn/AddNewItem";
import TaskData from "../../../../../tasks/component/taskData/TaskData";
import SubTask from "../../../../../tasks/subtasks/create/SubTask";
import RenderSubTasks from "../../../../../tasks/subtasks/subtask1/RenderSubTasks";

interface ItemsListsDataProps {
  listId: string | null;
}
export default function ItemsListsData({ listId }: ItemsListsDataProps) {
  const { data } = getTaskListService({ listId });

  const {
    myTaskData,
    listView,
    tableView,
    addNewTaskItem,
    showTaskNavigation,
    closeTaskListView,
    currentParentTaskId,
    getSubTaskId,
  } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  return (
    <section>
      {/* lists */}
      <div>
        {data?.data.tasks.map((task) => {
          return (
            <div key={task.id}>
              <TaskData task={task} />

              {currentParentTaskId === task.id ? (
                <div>
                  <SubTask parentTaskId={currentParentTaskId} />
                </div>
              ) : null}
              {getSubTaskId === task.id ? <RenderSubTasks /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
