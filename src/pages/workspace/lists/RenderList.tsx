import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskListService } from "../../../features/task/taskService";
import ListNav from "./components/renderlist/ListNav";
import { useAppSelector } from "../../../app/hooks";
import { useDispatch } from "react-redux";
import {
  getTaskColumns,
  setAddNewTaskItem,
} from "../../../features/task/taskSlice";
import TaskTableView from "../tasks/component/views/TaskTableView";
import TaskListViews from "../tasks/component/views/TaskListViews";
import AddNewItem from "../tasks/component/taskColumn/AddNewItem";
import TaskData from "../tasks/component/taskData/TaskData";
import TaskQuickAction from "../tasks/component/taskQuickActions/TaskQuickAction";
import SubTask from "../tasks/subtasks/create/SubTask";
import RenderSubTasks from "../tasks/subtasks/subtask1/RenderSubTasks";
import Pilot from "../pilot";
import ListFilter from "./components/renderlist/listDetails/ListFilter";

function RenderList() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const {
    myTaskData,
    taskColumns,

    listView,
    tableView,
    addNewTaskItem,
    closeTaskListView,
    currentParentTaskId,
    getSubTaskId,
  } = useAppSelector((state) => state.task);

  const { data: listDetailsData } = getTaskListService({ listId });

  const editable = myTaskData.map((o) => ({ ...o }));

  console.log(taskColumns);

  useEffect(() => {
    const hidden = (col) => {
      if (col == "id") {
        return true;
      }
      if (col == "list_id") {
        return true;
      }
      if (col == "priority") {
        return true;
      }
      if (col == "status") {
        return true;
      }
      if (col == "custom_fields") {
        return true;
      }
      if (col == "directory_items") {
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
    const columnHead: string[][] = [];
    const singleObj = editable[0];
    singleObj && columnHead.push(Object.keys(singleObj));
    const columnsHead: any = [];
    columnHead[0]?.map((column) => {
      if (column !== "id") {
        const singleColumn = {
          value:
            column.split("_").join(" ").toUpperCase() == "NAME"
              ? "TASKS"
              : column.split("_").join(" ").toUpperCase(),
          field: column,
          hidden: hidden(column),
        };
        dispatch(getTaskColumns(singleColumn));
      }
    });
  }, [myTaskData]);

  return (
    <div className=" overflow-hidden relative">
      <section id="nav" className="capitalize ">
        <ListNav
          navName={listDetailsData?.data?.list?.name}
          viewsList="List"
          viewsList1="Table"
          viewsList2="Board"
          changeViews="View"
        />
        <ListFilter />
      </section>
      <section className="flex h-full w-full">
        <div className="  w-full overflow-y-scroll">
          <div
            className=" block p-2 border-2 border-gray-200"
            style={{ backgroundColor: "#e1e4e5" }}
          >
            <TaskQuickAction listDetailsData={listDetailsData} />
            {/* card */}

            {/* task list logic */}

            {tableView && (
              <div>
                <TaskTableView />
              </div>
            )}

            {listView && <TaskListViews />}

            {listView &&
              myTaskData?.map((task) => (
                <div key={task.id}>
                  {closeTaskListView && <TaskData task={task} />}

                  {currentParentTaskId === task.id ? (
                    <div>
                      <SubTask parentTaskId={currentParentTaskId} />
                    </div>
                  ) : null}
                  {getSubTaskId === task.id ? <RenderSubTasks /> : null}
                </div>
              ))}

            {/* toggle */}
            {addNewTaskItem && <AddNewItem listId={listId} />}
            <div
              className=""
              id="newItem"
              onClick={() => dispatch(setAddNewTaskItem(!addNewTaskItem))}
            >
              <p className="pl-2 text-xs  w-20 mt-1 cursor-pointer ml-10 font-semibold text-gray-400">
                + New Task
              </p>
            </div>
          </div>
        </div>
        <div>
          <Pilot />
        </div>
      </section>
    </div>
  );
}

export default RenderList;
