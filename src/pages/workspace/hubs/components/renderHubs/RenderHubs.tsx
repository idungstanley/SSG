import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import ListNav from '../../../lists/components/renderlist/ListNav';
import ListFilter from '../../../lists/components/renderlist/listDetails/ListFilter';
import PageWrapper from '../../../../../components/PageWrapper';
import { UseGetFullTaskList } from '../../../../../features/task/taskService';
import TaskTemplateData from '../../../tasks/component/views/hubLevel/TaskTemplateData';
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

interface HubDetailTypes {
  activeItemId: string;
  activeItemType: string;
}

function RenderHubs() {
  const [TaskDataGroupings, setTaskDataGroupings] = useState<TaskDataGroupingsProps | unknown>({});
  const { activeEntityName } = useAppSelector((state) => state.workspace);
  const { groupByStatus } = useAppSelector((state) => state.task);
  const containerRef = useRef<HTMLDivElement>(null);
  const { listView, tableView, boardView, calenderView, mapView } = useAppSelector((state) => state.task);

  const retrievedObject = localStorage.getItem('hubDetailsStorage');
  const hubdetail: HubDetailTypes = JSON.parse(retrievedObject as string) as HubDetailTypes;

  const {
    data: TaskFullList,
    status,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = UseGetFullTaskList({
    itemId: hubdetail.activeItemId,
    itemType: hubdetail.activeItemType
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
  }, [unFilteredTaskData, status]);

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
        additional={<FilterByAssigneesSliderOver />}
      >
        <section>
          <div className="w-full">
            <ListFilter />
          </div>
          {listView && groupByStatus == 'none' && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div
                className="w-full overflow-auto mb-10"
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
                className="w-full overflow-auto mb-10"
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

          {/* {boardView && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }}>
                {boardView && <TaskBoardTemplate unFilteredTaskData={unFilteredTaskData2 as ITaskFullList[]} />}
              </div>
            </div>
          )} */}

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
                <NoTaskFound />
              </div>
            </div>
          )}
        </section>
      </PageWrapper>
    </>
  );
}

export default RenderHubs;
