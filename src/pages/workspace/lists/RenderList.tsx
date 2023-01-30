import React from "react";
import { useParams } from "react-router-dom";
import { getTaskListService } from "../../../features/task/taskService";
import ListNav from "./components/renderlist/ListNav";
import { useAppSelector } from "../../../app/hooks";
import { useDispatch } from "react-redux";
import { setAddNewTaskItem } from "../../../features/task/taskSlice";
import TaskMenu from "../tasks/component/taskMenu/TaskMenu";
import TaskTableView from "../tasks/component/views/TaskTableView";
import TaskListViews from "../tasks/component/views/TaskListViews";
import AddNewItem from "../tasks/component/taskColumn/AddNewItem";
import TaskData from "../tasks/component/taskData/TaskData";
import TaskQuickAction from "../tasks/component/taskQuickActions/TaskQuickAction";
import SubTask from "../tasks/subtasks/create/SubTask";
import RenderSubTasks from "../tasks/subtasks/subtask1/RenderSubTasks";
import Pilot from "../pilot";

function RenderList() {
  const dispatch = useDispatch();
  const { listId } = useParams();
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

  const { data: listDetailsData } = getTaskListService({ listId });

  // console.log("listDetailsData", listDetailsData);

  return (
    <div className="h-screen overflow-hidden relative">
      {/* {showTaskNavigation && (
        <span className="transition	duration-300 ease-in-out absolute w-full">
          <TaskMenu />
        </span>
      )} */}
      <section id="nav">
        <ListNav
          navName={listDetailsData?.data?.list?.name}
          viewsList="List"
          viewsList1="Table"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="flex h-full w-full">
        <div className="mt-3 p-3 w-full overflow-y-scroll">
          <div
            className=" block p-2 border-2 border-gray-200"
            style={{ backgroundColor: "#eee" }}
          >
            <TaskQuickAction listDetailsData={listDetailsData} />
            {/* card */}

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
        <div className="ml-auto">
          <Pilot />
        </div>
      </section>
    </div>
  );
}

export default RenderList;
