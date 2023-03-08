import React, { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import ListNav from '../../../lists/components/renderlist/ListNav';
import ListFilter from '../../../lists/components/renderlist/listDetails/ListFilter';
import PageWrapper from '../../../../../components/PageWrapper';
import PilotSection, { pilotConfig } from '../PilotSection';
import { UseGetFullTaskList } from '../../../../../features/task/taskService';
import TaskTemplateData from '../../../tasks/component/taskData/TaskTemplateData';
import NoTaskFound from '../../../tasks/component/taskData/NoTaskFound';
import TaskTableTemplateData from '../../../tasks/component/taskData/TaskTableTemplateData';
import { ImyTaskData } from '../../../../../features/task/taskSlice';
import { ITaskFullList } from '../../../../../features/task/interface.tasks';

function RenderHubs() {
  const [TaskDataGroupings, setTaskDataGroupings] = useState<{
    [key: string]: { groupListName: string; key: string; tasks: ImyTaskData[] };
  }>({});
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { listView, tableView } = useAppSelector((state) => state.task);

  const retrievedObject = localStorage.getItem('hubDetailsStorage');
  const hubdetail = JSON.parse(retrievedObject as string);

  // const { hubId } = useParams();
  const { data: TaskFullList, status } = UseGetFullTaskList({
    itemId: hubdetail.activeItemId,
    itemType: hubdetail.activeItemType
  });
  const unFilteredTaskData = useMemo(() => TaskFullList?.pages.flatMap((page) => page.data.tasks), [TaskFullList]);

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
    setTaskDataGroupings(taskDataGroupedByListID);

    return () => {
      true;
    };
  }, [unFilteredTaskData, status]);

  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={
          <ListNav navName={activeItemName} viewsList="List" viewsList1="Table" viewsList2="Board" changeViews="View" />
        }
      >
        {listView && (
          <div className="pr-1 pt-0.5 w-full h-full">
            <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }}>
              <div className="w-full">
                <ListFilter />
              </div>

              {Object.keys(TaskDataGroupings).length === 0 ? (
                <NoTaskFound />
              ) : (
                <TaskTemplateData filteredTaskData={TaskDataGroupings} />
              )}
              {tableView && <TaskTableTemplateData filteredTaskData={TaskDataGroupings} />}
            </div>
          </div>
        )}
        {tableView && (
          <div className="pr-1 pt-0.5 w-full h-full">
            <div className="w-full" style={{ minHeight: '0', maxHeight: '90vh' }}>
              {/* <div className="w-full">
                <ListFilter />
              </div> */}
              {tableView && <TaskTableTemplateData filteredTaskData={TaskDataGroupings} />}
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}

export default RenderHubs;
