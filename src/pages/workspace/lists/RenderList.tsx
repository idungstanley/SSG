import React, { useMemo, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskListService } from '../../../features/task/taskService';
import ListNav from './components/renderlist/ListNav';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setAddNewTaskItem, setUpdateCords } from '../../../features/task/taskSlice';
import TaskListViews from '../tasks/component/views/listLevel/TaskListViews';
import AddNewItem from '../tasks/component/taskColumn/AddNewItem';
import TaskData from '../tasks/component/taskData/TaskData';
import TaskQuickAction from '../tasks/component/taskQuickActions/TaskQuickAction';
import hubIcon from '../../../assets/branding/hub.png';
import ListFilter from './components/renderlist/listDetails/ListFilter';
import PageWrapper from '../../../components/Page';
import PilotSection, { pilotConfig } from './components/PilotSection';
import TaskCalenderTemplate from '../tasks/component/views/hubLevel/TaskCalenderTemplate';
import FilterByAssigneesSliderOver from './components/renderlist/filters/FilterByAssigneesSliderOver';
import { UseGetListDetails } from '../../../features/list/listService';
import { setActiveItem } from '../../../features/workspace/workspaceSlice';
import TaskMapTemplate from '../tasks/component/views/hubLevel/TaskMapTemplate';
import ActiveHub from '../../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import AdditionalHeader from '../../../layout/components/MainLayout/Header/AdditionHeader';
import { useScroll } from '../../../hooks/useScroll';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
function RenderList() {
  const dispatch = useDispatch();
  const { listId } = useParams();
  const { listView, calenderView, mapView, addNewTaskItem, closeTaskListView, filterTaskByAssigneeIds } =
    useAppSelector((state) => state.task);
  const { activeItemName } = useAppSelector((state) => state.workspace);

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: listDetailsData, // isFetching,
    hasNextPage,
    fetchNextPage
  } = getTaskListService({ listId, assigneeUserId: filterTaskByAssigneeIds });

  const { data: listData } = UseGetListDetails(listId);
  const listName = listData?.data.list.name;
  useEffect(() => {
    if (listId) {
      dispatch(setActiveItem({ activeItemId: listId, activeItemType: EntityType.list, activeItemName: listName }));
    }
  }, [listId, listData]);

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

  const handleScrollList = useScroll(() => dispatch(setUpdateCords()));

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        header={
          <section id="nav" className="capitalize" style={{ height: '50px' }}>
            <ListNav
              navName={activeItemName}
              viewsList="List"
              viewsList1="Table"
              viewsList2="Board"
              viewsList3="Calender"
              viewsList4="Map"
              changeViews="View"
            />
          </section>
        }
        extendedBar={{
          name: 'TASKS',
          children: <ActiveHub />,
          source: hubIcon
        }}
        additional={<FilterByAssigneesSliderOver />}
      >
        <>
          {listView && (
            <div className="w-full">
              <ListFilter />
            </div>
          )}
          <div
            style={{ minHeight: '0', maxHeight: '90vh' }}
            ref={containerRef}
            className="relative overflow-auto block mx-2 border-l-4 border-gray-500 rounded-xl"
            // style={{ backgroundColor: `${listView ? '#e1e4e5' : ''}` }}
            onScroll={handleScrollList}
          >
            {listView && <TaskQuickAction listDetailsData={activeItemName} />}

            {/* task list logic */}
            {/* {tableView && closeTaskListView && <TaskTableView tasks={paginatedTaskData} />} */}

            {/* BoardView */}
            {/* {boardView && <ListFilter />}
            {boardView && (
              <div className={`" ml-10" ${show === false ? 'fgoverflow2' : 'fgoverflow'}`}>
                {<Board tasks={paginatedTaskData} />}
              </div>
            )} */}

            {/* card */}
            <ul className="relative pl-6">
              <li onScroll={handleScrollList} className="overflow-x-scroll relative">
                {listView && listId ? (
                  <TaskListViews listId={listId} taskLength={paginatedTaskData?.length} />
                ) : (
                  <span>listId required</span>
                )}
                {listView && (
                  <div>
                    {paginatedTaskData?.map((task) => (
                      <div className="group" key={task?.id}>
                        {closeTaskListView && <TaskData listId={task?.list_id} task={task} />}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            </ul>

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
        </>
      </PageWrapper>
    </>
  );
}

export default RenderList;
