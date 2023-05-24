import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetHubDetails } from '../../features/hubs/hubService';
import { UseGetFullTaskList } from '../../features/task/taskService';
import { setActiveEntityName, setActiveItem } from '../../features/workspace/workspaceSlice';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import PilotSection, { pilotConfig } from '../workspace/hubs/components/PilotSection';
import ListNav from '../workspace/lists/components/renderlist/ListNav';
import { generateLists } from './lib';
import hubIcon from '../../assets/branding/hub.png';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { List } from './ui/List/List';

export default function HubPage() {
  const dispatch = useAppDispatch();
  const { hubId } = useParams();
  const { activeEntityName } = useAppSelector((state) => state.workspace);
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);

  const { data: hub } = UseGetHubDetails({ activeItemId: hubId, activeItemType: 'hub' });

  // set entity name
  useEffect(() => {
    if (hub) {
      const hubName = hub.data.hub.name;
      dispatch(setActiveItem({ activeItemId: hubId, activeItemType: 'hub', activeItemName: hubName }));
      dispatch(setActiveEntityName(hubName));
    }
  }, [hub]);

  const { data, status, isFetching, hasNextPage, fetchNextPage } = UseGetFullTaskList({
    itemId: hubId,
    itemType: 'hub',
    assigneeUserId: filterTaskByAssigneeIds
  });

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);

  const lists = useMemo(() => generateLists(tasks), [tasks]);

  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
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
        extendedBar={{
          name: 'TASKS',
          children: <ActiveHub />,
          source: hubIcon
        }}
        additional={<FilterByAssigneesSliderOver data={tasks} />}
      >
        <section
          style={{ minHeight: '0', maxHeight: '90vh' }}
          className="w-full h-full p-4 space-y-10 overflow-y-scroll"
        >
          {/* lists */}
          {Object.keys(lists).map((listId) => (
            <List key={listId} tasks={lists[listId]} />
          ))}
        </section>
      </Page>
    </>
  );
}
