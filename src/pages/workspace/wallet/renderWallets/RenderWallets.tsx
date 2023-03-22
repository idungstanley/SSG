import React, { useEffect, useMemo, useState, useRef } from 'react';
import ListNav from '../../lists/components/renderlist/ListNav';
import { useAppSelector } from '../../../../app/hooks';
import PageWrapper from '../../../../components/PageWrapper';
import PilotSection, { pilotConfig } from '../components/PilotSection';
import { UseGetFullTaskListWallet } from '../../../../features/task/taskService';
import ListFilter from '../../lists/components/renderlist/listDetails/ListFilter';
import TaskTemplateData from '../../tasks/component/views/hubLevel/TaskTemplateData';
import NoTaskFound from '../../tasks/component/taskData/NoTaskFound';
import { ImyTaskData2, ImyTaskData } from '../../../../features/task/taskSlice';
import { ITaskFullList, TaskDataGroupingsProps } from '../../../../features/task/interface.tasks';

function RenderWallets() {
  const [TaskDataGroupings, setTaskDataGroupings] = useState<TaskDataGroupingsProps | unknown>({});

  const { currentWalletName, activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: TaskFullList,
    status, // isFetching,
    hasNextPage,
    fetchNextPage
  } = UseGetFullTaskListWallet({
    itemId: activeItemId,
    itemType: activeItemType
  });

  const unFilteredTaskData = useMemo(() => TaskFullList?.pages.flatMap((page) => page.data.tasks), [TaskFullList]);

  useEffect(() => {
    if (status !== 'success') {
      setTaskDataGroupings({});
      return;
    }

    const taskDataGroupedByListID = unFilteredTaskData?.reduce(
      (
        GroupedTaskByListID: { [key: string]: { groupListName?: string; key?: string; tasks: ITaskFullList[] } },
        currentTask
      ) => {
        if (!GroupedTaskByListID[currentTask.list_id as keyof ImyTaskData2]) {
          GroupedTaskByListID[currentTask.list_id as keyof ImyTaskData2] = {
            groupListName: currentTask.list?.name,
            key: currentTask.list_id,
            tasks: []
          };
        }
        (GroupedTaskByListID[currentTask.list_id].tasks as ITaskFullList[]).push(currentTask);
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
        header={<ListNav navName={currentWalletName} viewsList="List" viewsList2="Board" changeViews="View" />}
      >
        <div className="pr-1 pt-0.5 w-full h-full">
          <div
            className="w-full scrollbarDynCol overflow-auto"
            style={{ minHeight: '0', maxHeight: '100vh' }}
            ref={containerRef}
          >
            <div className="w-full">
              <ListFilter />
            </div>

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
      </PageWrapper>
    </>
  );
}

export default RenderWallets;
