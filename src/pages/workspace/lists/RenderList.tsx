import React from "react";
import { useParams } from "react-router-dom";
import { getTaskListService } from "../../../features/task/taskService";
import ListNav from "./components/renderlist/ListNav";
import { useAppSelector } from "../../../app/hooks";
import { useDispatch } from "react-redux";
import { setAddNewTaskItem } from "../../../features/task/taskSlice";
import TaskListViews from "../tasks/component/views/TaskListViews";
import AddNewItem from "../tasks/component/taskColumn/AddNewItem";
import TaskData from "../tasks/component/taskData/TaskData";
import TaskQuickAction from "../tasks/component/taskQuickActions/TaskQuickAction";
import SubTask from "../tasks/subtasks/create/SubTask";
import RenderSubTasks from "../tasks/subtasks/subtask1/RenderSubTasks";
import ListFilter from "./components/renderlist/listDetails/ListFilter";
import Board from "../tasks/component/views/Board";
import TaskTableView from "../tasks/component/views/TaskTableView";
import PageWrapper from "../../../components/PageWrapper";
import PilotSection, { pilotConfig } from "./components/PilotSection";

function RenderList() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const {
    myTaskData,
    tableView,
    listView,
    boardView,
    addNewTaskItem,
    closeTaskListView,
    currentParentTaskId,
    getSubTaskId,
  } = useAppSelector((state) => state.task);

  const { data: listDetailsData } = getTaskListService({ listId });

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
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
        }
      >
        <div className="w-full overflow-y-scroll ">
          <div
            className="block p-2 border-2 border-gray-200 "
            style={{ backgroundColor: "#e1e4e5" }}
          >
            {listView && <TaskQuickAction listDetailsData={listDetailsData} />}

            {/* task list logic */}
            {tableView && closeTaskListView && <TaskTableView />}

            {boardView && <Board />}

            {/* card */}
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
              <p className="w-20 pl-2 mt-1 ml-10 text-xs font-semibold text-gray-400 cursor-pointer">
                + New Task
              </p>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default RenderList;
