import React, { useEffect, useMemo, useState } from 'react';
import ListNav from '../../lists/components/renderlist/ListNav';
import { useAppSelector } from '../../../../app/hooks';
import PageWrapper from '../../../../components/PageWrapper';
import PilotSection, { pilotConfig } from '../components/PilotSection';
import { UseGetFullTaskListWallet } from '../../../../features/task/taskService';
import ListFilter from '../../lists/components/renderlist/listDetails/ListFilter';
import TaskTemplateData from '../../tasks/component/taskData/TaskTemplateData';
import NoTaskFound from '../../tasks/component/taskData/NoTaskFound';
import { ImyTaskData } from '../../../../features/task/taskSlice';

function RenderWallets() {
  const [TaskDataGroupings, setTaskDataGroupings] = useState<{
    [key: string]: { groupListName: string; key: string; tasks: ImyTaskData[] };
  }>({});

  const { currentWalletName, activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { data: TaskFullList, status } = UseGetFullTaskListWallet({
    itemId: activeItemId,
    itemType: activeItemType
  });

  const unFilteredTaskData = useMemo(() => TaskFullList?.pages.flatMap((page) => page.data.tasks), [TaskFullList]);

  useEffect(() => {
    if (status !== 'success') {
      setTaskDataGroupings({});
      return;
    }

    const taskDataGroupedByListID = unFilteredTaskData?.reduce((GroupedTaskByListID, currentTask) => {
      if (!GroupedTaskByListID[currentTask.list_id]) {
        GroupedTaskByListID[currentTask.list_id] = {
          groupListName: currentTask.list.name,
          key: currentTask.list_id,
          tasks: []
        };
      }
      GroupedTaskByListID[currentTask.list_id].tasks.push(currentTask);
      return GroupedTaskByListID;
    }, {});
    setTaskDataGroupings(
      taskDataGroupedByListID as { [key: string]: { groupListName: string; key: string; tasks: ImyTaskData[] } }
    );

    return () => {
      true;
    };
  }, [unFilteredTaskData, status]);

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={<ListNav navName={currentWalletName} viewsList="List" viewsList2="Board" changeViews="View" />}
      >
        <div className="pr-1 pt-0.5 w-full h-full">
          <div className="w-full scrollbarDynCol ok" style={{ minHeight: '0', maxHeight: '100vh' }}>
            <div className="w-full">
              <ListFilter />
            </div>

            {Object.keys(TaskDataGroupings).length === 0 ? (
              <NoTaskFound />
            ) : (
              <TaskTemplateData filteredTaskData={TaskDataGroupings} />
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default RenderWallets;
