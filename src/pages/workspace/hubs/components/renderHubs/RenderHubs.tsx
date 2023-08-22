import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import ListNav from '../../../lists/components/renderlist/ListNav';
import ListFilter from '../../../lists/components/renderlist/listDetails/ListFilter';
import Page from '../../../../../components/Page';
import { UseGetFullTaskList } from '../../../../../features/task/taskService';
import TaskTemplateData from '../../../tasks/component/views/hubLevel/TaskTemplateData';
import hubIcon from '../../../../../assets/branding/hub.png';
import NoTaskFound from '../../../tasks/component/taskData/NoTaskFound';
import TaskTableTemplateData from '../../../tasks/component/views/hubLevel/TaskTableTemplateData';
import { ImyTaskData, ImyTaskData2 } from '../../../../../features/task/taskSlice';
import { ITaskFullList, TaskDataGroupingsProps } from '../../../../../features/task/interface.tasks';
import PilotSection, { pilotConfig } from '../PilotSection';
import TaskBoardTemplate from '../../../tasks/component/views/hubLevel/TaskBoardTemplate';
import GroupByStatusTemplate from '../../../lists/components/renderlist/listDetails/Groupings/components/GroupByStatus';
import { Spinner } from '../../../../../common';
import TaskCalenderTemplate from '../../../tasks/component/views/hubLevel/TaskCalenderTemplate';
import FilterByAssigneesSliderOver from '../../../lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { useParams } from 'react-router-dom';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { UseGetHubDetails } from '../../../../../features/hubs/hubService';
import TaskMapTemplate from '../../../tasks/component/views/hubLevel/TaskMapTemplate';
import ActiveHub from '../../../../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import AdditionalHeader from '../../../../../layout/components/MainLayout/Header/AdditionHeader';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

function RenderHubs() {
  const dispatch = useAppDispatch();
  const { hubId, subhubId } = useParams();

  const { activeItemType } = useAppSelector((state) => state.workspace);
  const { groupByStatus, filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { listView, tableView, boardView, calenderView, mapView } = useAppSelector((state) => state.task);

  const [TaskDataGroupings, setTaskDataGroupings] = useState<TaskDataGroupingsProps | unknown>({});

  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = UseGetHubDetails({ activeItemId: hubId, activeItemType: EntityType.hub });
  const hubName = data?.data.hub.name;
  useEffect(() => {
    if (hubId || subhubId) {
      dispatch(
        setActiveItem({
          activeItemId: hubId ? (hubId as string) : (subhubId as string),
          activeItemType: activeItemType || EntityType.hub,
          activeItemName: hubName
        })
      );
    }
  }, [hubId, subhubId, data]);

  const {
    data: TaskFullList,
    status,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = UseGetFullTaskList({
    itemId: hubId || subhubId,
    itemType: EntityType.hub,
    assigneeUserId: filterTaskByAssigneeIds
  });
  const unFilteredTaskData = useMemo(() => TaskFullList?.pages.flatMap((page) => page.data.tasks), [TaskFullList]);

  const unFilteredTaskData2 = useMemo(() => TaskFullList?.pages.flatMap((page) => page.data.tasks), [TaskFullList]);

  if (isFetching) {
    <Spinner size={8} color="blue" />;
  }
  if (status == 'loading') {
    <Spinner size={8} color="blue" />;
  }
  useEffect(() => {
    if (status !== 'success') {
      return setTaskDataGroupings({});
    }

    const taskDataGroupedByListID = unFilteredTaskData?.reduce(
      (
        GroupedTaskByListID: { [key: string]: { groupListName?: string; key?: string; tasks: ITaskFullList[] } },
        currentTask
      ) => {
        if (!GroupedTaskByListID[currentTask.list_id]) {
          GroupedTaskByListID[currentTask.list_id] = {
            groupListName: currentTask.list?.name,
            key: currentTask.list_id,
            tasks: []
          };
        }
        GroupedTaskByListID[currentTask.list_id].tasks.push(currentTask);
        return GroupedTaskByListID;
      },
      {}
    );
    setTaskDataGroupings(taskDataGroupedByListID as TaskDataGroupingsProps | unknown);

    return () => {
      true;
    };
  }, [unFilteredTaskData, status, filterTaskByAssigneeIds]);

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
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        header={
          <section id="nav" className="capitalize" style={{ height: '50px' }}>
            <ListNav
              viewsList="List"
              viewsList1="Table"
              viewsList2="Board"
              viewsList3="Calender"
              viewsList4="Map"
              changeViews="Show"
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
        <section>
          <div className="w-full ">
            <ListFilter />
          </div>
          {listView && groupByStatus == 'none' && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full mb-10" style={{ minHeight: '0', maxHeight: '90vh' }} ref={containerRef}>
                {Object.keys(
                  TaskDataGroupings as {
                    [key: string]: { groupListName: string; key: string; tasks: ImyTaskData2[] };
                  }
                ).length === 0 ? (
                  <NoTaskFound />
                ) : (
                  <TaskTemplateData
                    filteredTaskData={
                      TaskDataGroupings as {
                        [key: string]: {
                          [key: string]: string | ImyTaskData[];
                          tasks: ImyTaskData[];
                          key: string;
                          groupListName: string;
                        };
                      }
                    }
                  />
                )}
              </div>
            </div>
          )}
          {listView && groupByStatus == 'status' && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div
                className="w-full mb-12 overflow-auto"
                style={{ minHeight: '0', maxHeight: '90vh' }}
                ref={containerRef}
              >
                {Object.keys(
                  TaskDataGroupings as {
                    [key: string]: { groupListName: string; key: string; tasks: ImyTaskData2[] };
                  }
                ).length === 0 ? (
                  <NoTaskFound />
                ) : (
                  <GroupByStatusTemplate
                    filteredTaskData={
                      TaskDataGroupings as {
                        [key: string]: {
                          [key: string]: string | ImyTaskData[];
                          tasks: ImyTaskData[];
                          key: string;
                          groupListName: string;
                        };
                      }
                    }
                  />
                )}
              </div>
            </div>
          )}
          {tableView && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }}>
                {tableView && (
                  <TaskTableTemplateData
                    filteredTaskData={
                      TaskDataGroupings as {
                        [key: string]: {
                          [key: string]: string | ImyTaskData[];
                          tasks: ImyTaskData[];
                          key: string;
                          groupListName: string;
                        };
                      }
                    }
                  />
                )}
              </div>
            </div>
          )}
          {boardView && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }}>
                {boardView && <TaskBoardTemplate unFilteredTaskData={unFilteredTaskData2 as ITaskFullList[]} />}
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
        </section>
      </Page>
    </>
  );
}

export default RenderHubs;
