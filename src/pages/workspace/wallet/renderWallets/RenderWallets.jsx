import React, { useEffect, useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';
import ListNav from '../../lists/components/renderlist/ListNav';
import { useAppSelector } from '../../../../app/hooks';
// import { getWalletServices } from '../../../../features/wallet/walletService';
// import WalletSection from '../../hubs/components/renderHubs/items/itemsWalletData/WalletSection';
// import ListSection from '../../hubs/components/renderHubs/items/itemsListData/ListSection';
// import { dataProps } from '../../../../components/Index/walletIndex/WalletIndex';
import PageWrapper from '../../../../components/PageWrapper';
import PilotSection, { pilotConfig } from '../components/PilotSection';
import { UseGetFullTaskList } from '../../../../features/task/taskService';
import ListFilter from '../../lists/components/renderlist/listDetails/ListFilter';
import TaskTemplateData from '../../tasks/component/taskData/TaskTemplateData';
import NoTaskFound from '../../tasks/component/taskData/NoTaskFound';

function RenderWallets() {
  // const { walletId } = useParams();
  const [TaskDataGroupings, setTaskDataGroupings] = useState([]);
  const { currentWalletName, activeItemId, activeItemType } = useAppSelector(
    (state) => state.workspace
  );

  // const { data } = getWalletServices({ parentId: walletId });

  const { data: TaskFullList, status } = UseGetFullTaskList({
    itemId: activeItemId,
    itemType: activeItemType,
  });

  const unFilteredTaskData = useMemo(
    () => TaskFullList?.pages.flatMap((page) => page.data.tasks),
    [TaskFullList]
  );

  useEffect(() => {
    if (status !== 'success') {
      return setTaskDataGroupings([]);
    }

    const taskDataGroupedByListID = unFilteredTaskData.reduce(
      (GroupedTaskByListID, currentTask) => {
        if (!GroupedTaskByListID[currentTask.list_id]) {
          GroupedTaskByListID[currentTask.list_id] = {
            groupListName: currentTask.list.name,
            key: currentTask.list_id,

            tasks: [],
          };
        }
        GroupedTaskByListID[currentTask.list_id].tasks.push(currentTask);
        return GroupedTaskByListID;
      },
      {}
    );
    setTaskDataGroupings(taskDataGroupedByListID);

    return true;
  }, [unFilteredTaskData, status]);

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
          <ListNav
            navName={currentWalletName}
            viewsList="List"
            viewsList2="Board"
            changeViews="View"
          />
        }
      >
        <div className="pr-1 pt-0.5 w-full h-full">
          <div
            className="w-full scrollbarDynCol ok"
            style={{ minHeight: '0', maxHeight: '100vh' }}
          >
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
