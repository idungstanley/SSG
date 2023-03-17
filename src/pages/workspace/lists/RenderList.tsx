import React from 'react';
import { useParams } from 'react-router-dom';
import { getTaskListService } from '../../../features/task/taskService';
import ListNav from './components/renderlist/ListNav';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setAddNewTaskItem } from '../../../features/task/taskSlice';
import TaskListViews from '../tasks/component/views/listLevel/TaskListViews';
import AddNewItem from '../tasks/component/taskColumn/AddNewItem';
import TaskData from '../tasks/component/taskData/TaskData';
import TaskQuickAction from '../tasks/component/taskQuickActions/TaskQuickAction';
import SubTask from '../tasks/subtasks/create/SubTask';
import RenderSubTasks from '../tasks/subtasks/subtask1/RenderSubTasks';
import ListFilter from './components/renderlist/listDetails/ListFilter';
import Board from '../tasks/component/views/listLevel/TaskBoardView';
import TaskTableView from '../tasks/component/views/listLevel/TaskTableView';
import PageWrapper from '../../../components/PageWrapper';
import PilotSection, { pilotConfig } from './components/PilotSection';

function RenderList() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const {
    // myTaskData,
    tableView,
    listView,
    boardView,
    addNewTaskItem,
    closeTaskListView,
    currentParentTaskId,
    getSubTaskId
  } = useAppSelector((state) => state.task);
  const { activeItemName } = useAppSelector((state) => state.workspace);

  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const { show } = pilotSideOver;

  const { data: listDetailsData } = getTaskListService({ listId });

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
          <section id="nav" className="capitalize ">
            <ListNav
              navName={activeItemName}
              viewsList="List"
              viewsList1="Table"
              viewsList2="Board"
              changeViews="View"
            />
          </section>
        }
      >
        <div className="w-full overflow-y-scroll">
          {listView && (
            <div className="w-full">
              <ListFilter />
            </div>
          )}
          <div className="block p-2 mx-2 rounded-md border-l-4 border-gray-500" style={{ backgroundColor: '#e1e4e5' }}>
            {listView && <TaskQuickAction listDetailsData={activeItemName} />}

            {/* task list logic */}
            {tableView && closeTaskListView && <TaskTableView />}

            {/* BoardView */}
            {boardView && <ListFilter />}
            {boardView && (
              <div className={`" ml-10" ${show === false ? 'fgoverflow2' : 'fgoverflow'}`}>{<Board />}</div>
            )}

            {/* card */}
            {listView && <TaskListViews />}
            {listView && (
              <div className="pr-1 pt-0.5 w-full h-full">
                <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }}>
                  {listDetailsData?.data.tasks.map((task) => (
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
                </div>
              </div>
            )}

            {/* toggle */}
            {addNewTaskItem && <AddNewItem listId={listId} />}
            {listView && (
              <div className="" id="newItem" onClick={() => dispatch(setAddNewTaskItem(!addNewTaskItem))}>
                <p className="w-20 pl-2 mt-1 ml-10 text-xs font-semibold text-gray-400 cursor-pointer">+ New Task</p>
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default RenderList;
