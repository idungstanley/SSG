import React, { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import ListNav from '../../../lists/components/renderlist/ListNav';
import ListFilter from '../../../lists/components/renderlist/listDetails/ListFilter';
import PageWrapper from '../../../../../components/PageWrapper';
import { UseGetFullTaskList } from '../../../../../features/task/taskService';
import TaskTemplateData from '../../../tasks/component/taskData/TaskTemplateData';
import NoTaskFound from '../../../tasks/component/taskData/NoTaskFound';
import TaskTableTemplateData from '../../../tasks/component/taskData/TaskTableTemplateData';
import { ImyTaskData, ImyTaskData2 } from '../../../../../features/task/taskSlice';
import { ITaskFullList, TaskDataGroupingsProps } from '../../../../../features/task/interface.tasks';
import PilotSection, { pilotConfig } from '../../../../explorer/components/PilotSection';

interface HubDetailTypes {
  activeItemId: string;
  activeItemType: string;
}

function RenderHubs() {
  const [TaskDataGroupings, setTaskDataGroupings] = useState<TaskDataGroupingsProps | unknown>({});
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { listView, tableView } = useAppSelector((state) => state.task);

  const retrievedObject = localStorage.getItem('hubDetailsStorage');
  const hubdetail: HubDetailTypes = JSON.parse(retrievedObject as string) as HubDetailTypes;

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
    setTaskDataGroupings(taskDataGroupedByListID as TaskDataGroupingsProps | unknown);

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
        {tableView && (
          <div className="pr-1 pt-0.5 w-full h-full">
            <div className="w-full" style={{ minHeight: '0', maxHeight: '90vh' }}>
              {/* <div className="w-full">
                <ListFilter />
              </div> */}
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
      </PageWrapper>
    </>
  );
}

export default RenderHubs;
