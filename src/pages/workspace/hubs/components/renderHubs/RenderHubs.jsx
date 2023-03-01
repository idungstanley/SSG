import React, { useMemo, useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../../../../app/hooks";
import ListNav from "../../../lists/components/renderlist/ListNav";
import ListFilter from "../../../lists/components/renderlist/listDetails/ListFilter";
import PageWrapper from "../../../../../components/PageWrapper";
import PilotSection, { pilotConfig } from "../PilotSection";
import { UseGetFullTaskList } from "../../../../../features/task/taskService";
import TaskTemplateData from "../../../tasks/component/taskData/TaskTemplateData";
import NoTaskFound from "../../../tasks/component/taskData/NoTaskFound";

function RenderHubs() {
  const [TaskDataGroupings, setTaskDataGroupings] = useState([]);
  const { activeItemName, activeItemId, activeItemType } = useAppSelector(
    (state) => state.workspace
  );
  // const { hubId } = useParams();
  const { data: TaskFullList, status } = UseGetFullTaskList({
    itemId: activeItemId,
    itemType: activeItemType,
  });
  const unFilteredTaskData = useMemo(
    () => TaskFullList?.pages.flatMap((page) => page.data.tasks),
    [TaskFullList]
  );

  useEffect(() => {
    if (status !== "success") {
      return setTaskDataGroupings([]);
    }

    const taskDataGroupedByListID = unFilteredTaskData.reduce(
      (GroupedTaskByListID, currentTask) => {
        if (!GroupedTaskByListID[currentTask.list_id]) {
          GroupedTaskByListID[currentTask.list_id] = {
            groupListName: currentTask.list?.name,
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
            navName={activeItemName}
            viewsList="List"
            viewsList2="Board"
            changeViews="View"
          />
        }
      >
        <div className="pr-1 pt-0.5 w-full h-full">
          <div
            className="w-full scrollbarDynCol"
            style={{ minHeight: "0", maxHeight: "100vh" }}
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

export default RenderHubs;
