import React, { useMemo, useRef, useEffect } from 'react';
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
import TaskCalenderTemplate from '../tasks/component/views/hubLevel/TaskCalenderTemplate';
import FilterByAssigneesSliderOver from './components/renderlist/filters/FilterByAssigneesSliderOver';
import { ITaskFullList } from '../../../features/task/interface.tasks';
import TaskMapTemplate from '../tasks/component/views/hubLevel/TaskMapTemplate';

function RenderList() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const {
    // myTaskData,
    tableView,
    listView,
    boardView,
    calenderView,
    mapView,
    addNewTaskItem,
    closeTaskListView,
    currentParentTaskId,
    getSubTaskId,
    filterTaskByAssigneeIds
  } = useAppSelector((state) => state.task);
  const { activeEntityName } = useAppSelector((state) => state.workspace);

  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const containerRef = useRef<HTMLDivElement>(null);

  const { show } = pilotSideOver;

  const {
    data: listDetailsData, // isFetching,
    hasNextPage,
    fetchNextPage
  } = getTaskListService({ listId, assigneeUserId: filterTaskByAssigneeIds });

  const paginatedTaskData = useMemo(
    () => listDetailsData?.pages.flatMap((page) => page?.data.tasks),
    [listDetailsData]
  );

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [containerRef, fetchNextPage, hasNextPage]);

  function handleScroll(event: UIEvent | Event) {
    const container = event.target as HTMLElement;
    const scrollDifference = container?.scrollHeight - container.scrollTop - container.clientHeight;
    const range = 1;

    if (scrollDifference <= range && scrollDifference >= -range && hasNextPage) {
      fetchNextPage();
    }
  }

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
          <section id="nav" className="capitalize" style={{ height: '50px' }}>
            <ListNav
              navName={activeEntityName}
              viewsList="List"
              viewsList1="Table"
              viewsList2="Board"
              viewsList3="Calender"
              viewsList4="Map"
              changeViews="View"
            />
          </section>
        }
        additional={<FilterByAssigneesSliderOver data={paginatedTaskData as ITaskFullList[]} />}
      >
        <div className="w-full">
          {listView && (
            <div className="w-full">
              <ListFilter />
            </div>
          )}
          <div
            className="block relative p-2 mx-2 border-l-4 border-gray-500 rounded-md"
            style={{ backgroundColor: `${listView ? '#e1e4e5' : ''}` }}
          >
            {listView && <TaskQuickAction listDetailsData={activeEntityName} />}

            {/* task list logic */}
            {tableView && closeTaskListView && <TaskTableView tasks={paginatedTaskData} />}

            {/* BoardView */}
            {boardView && <ListFilter />}
            {boardView && (
              <div className={`" ml-10" ${show === false ? 'fgoverflow2' : 'fgoverflow'}`}>
                {<Board tasks={paginatedTaskData} />}
              </div>
            )}

            {/* card */}
            {listView && <TaskListViews taskLength={paginatedTaskData?.length} />}
            {listView && (
              <div className="pr-1 pt-0.5 w-full h-full">
                <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }} ref={containerRef}>
                  {paginatedTaskData?.map((task) => (
                    <div key={task?.id}>
                      {closeTaskListView && <TaskData task={task} />}
                      {currentParentTaskId === task?.id ? (
                        <div>
                          <SubTask parentTaskId={currentParentTaskId} />
                        </div>
                      ) : null}
                      {getSubTaskId === task?.id ? <RenderSubTasks /> : null}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {calenderView && (
              <div className="pr-1 pt-0.5 w-full h-full">
                <div className="w-full" style={{ minHeight: '0', maxHeight: '90vh' }}>
                  <TaskCalenderTemplate />
                </div>
              </div>
            )}

            {mapView && (
              <div className="pr-1 pt-0.5 w-full h-full">
                <div className="w-full" style={{ minHeight: '0', maxHeight: '90vh' }}>
                  <TaskMapTemplate />
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
