import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskListService } from '../../../features/task/taskService';
// import SubTask from '../subtasks/subtask1/SubTask';
// import RenderTaskModal from '../../tasks/ccomponent/RenderTaskModal';
import ListNav from './components/renderlist/ListNav';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setAddNewTaskItem } from '../../../features/task/taskSlice';
import TaskMenu from '../tasks/component/taskMenu/TaskMenu';
import TaskTableView from '../tasks/component/views/TaskTableView';
import TaskListViews from '../tasks/component/views/TaskListViews';
import AddNewItem from '../tasks/component/taskColumn/AddNewItem';
import TaskData from '../tasks/component/taskData/TaskData';
import TaskQuickAction from '../tasks/component/taskQuickActions/TaskQuickAction';

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
  } = useAppSelector((state) => state.task);

  const { data: listDetailsData } = getTaskListService({ listId });

  const [dropDown, setdropDown] = useState(false);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div
      className="h-screen overflow-hidden relative"
      style={{ backgroundColor: '#eee' }}
    >
      {showTaskNavigation && (
        <span className="transition	duration-300 ease-in-out absolute w-full">
          <TaskMenu />
        </span>
      )}
      <section id="nav">
        <ListNav
          navName={listDetailsData?.data?.list?.name}
          viewsList="List"
          viewsList1="Table"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="mt-3 p-3">
        <div
          className=" block p-2 border-2 border-gray-200"
          style={{ backgroundColor: '#eee' }}
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
                {/* {subTaskOne === task.id ? (
                  <div>
                    <SubTask parentTaskId={parentTaskId} />
                  </div>
                ) : null} */}
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
      </section>
    </div>
  );
}

export default RenderList;
