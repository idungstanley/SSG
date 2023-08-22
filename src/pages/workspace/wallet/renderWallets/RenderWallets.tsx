import React, { useEffect, useMemo, useState, useRef } from 'react';
import ListNav from '../../lists/components/renderlist/ListNav';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Page from '../../../../components/Page';
import PilotSection, { pilotConfig } from '../components/PilotSection';
import { UseGetFullTaskList } from '../../../../features/task/taskService';
import ListFilter from '../../lists/components/renderlist/listDetails/ListFilter';
import hubIcon from '../../../../assets/branding/hub.png';
import TaskTemplateData from '../../tasks/component/views/hubLevel/TaskTemplateData';
import NoTaskFound from '../../tasks/component/taskData/NoTaskFound';
import { ImyTaskData2, ImyTaskData } from '../../../../features/task/taskSlice';
import { ITaskFullList, TaskDataGroupingsProps } from '../../../../features/task/interface.tasks';
import FilterByAssigneesSliderOver from '../../lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { useParams } from 'react-router-dom';
import { UseGetWalletDetails } from '../../../../features/wallet/walletService';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import ActiveHub from '../../../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import AdditionalHeader from '../../../../layout/components/MainLayout/Header/AdditionHeader';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

function RenderWallets() {
  const dispatch = useAppDispatch();
  const { walletId } = useParams();

  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { activeItemName } = useAppSelector((state) => state.workspace);

  const [TaskDataGroupings, setTaskDataGroupings] = useState<TaskDataGroupingsProps | unknown>({});

  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = UseGetWalletDetails({ activeItemId: walletId, activeItemType: EntityType.wallet });
  const walletName = data?.data.wallet.name;

  useEffect(() => {
    if (walletId) {
      dispatch(
        setActiveItem({ activeItemId: walletId, activeItemType: EntityType.wallet, activeItemName: walletName })
      );
    }
  }, [walletId, data]);

  const {
    data: TaskFullList,
    status, // isFetching,
    hasNextPage,
    fetchNextPage
  } = UseGetFullTaskList({
    itemId: walletId,
    itemType: EntityType.wallet,
    assigneeUserId: filterTaskByAssigneeIds
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
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        header={<ListNav navName={activeItemName} viewsList="List" viewsList2="Board" changeViews="View" />}
        extendedBar={{
          name: 'TASKS',
          children: <ActiveHub />,
          source: hubIcon
        }}
        additional={<FilterByAssigneesSliderOver />}
      >
        <div className="pr-1 pt-0.5 w-full h-full">
          <div
            className="w-full overflow-auto scrollbarDynCol"
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
      </Page>
    </>
  );
}

export default RenderWallets;
