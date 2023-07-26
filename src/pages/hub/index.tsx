import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetHubDetails } from '../../features/hubs/hubService';
import { UseGetFullTaskList } from '../../features/task/taskService';
import { setActiveEntityName, setActiveItem } from '../../features/workspace/workspaceSlice';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import PilotSection, { pilotConfig } from '../workspace/hubs/components/PilotSection';
import hubIcon from '../../assets/branding/hub.png';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { List } from '../../components/Views/ui/List/List';
import { generateLists } from '../../utils';
import { Header } from '../../components/TasksHeader';
import { ScrollableContainer } from '../../components/ScrollableContainer/ScrollableContainer';

export default function HubPage() {
  const dispatch = useAppDispatch();
  const { hubId, taskId } = useParams();
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: hub } = UseGetHubDetails({ activeItemId: hubId, activeItemType: 'hub' });

  // set entity name
  useEffect(() => {
    if (hub && !taskId) {
      const hubName = hub.data.hub.name;
      dispatch(setActiveItem({ activeItemId: hubId, activeItemType: 'hub', activeItemName: hubName }));
      dispatch(setActiveEntityName(hubName));
    }
  }, [hub]);

  const { data, hasNextPage, fetchNextPage } = UseGetFullTaskList({
    itemId: hubId,
    itemType: 'hub',
    assigneeUserId: filterTaskByAssigneeIds
  });

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);

  const lists = useMemo(() => generateLists(tasks), [tasks]);
  // infinite scroll
  useEffect(() => {
    function handleScroll(event: Event) {
      const container = event.target as HTMLElement;
      const scrollDifference = container.scrollHeight - container.scrollTop - container.clientHeight;
      const range = 1;

      if (scrollDifference <= range && scrollDifference >= -range && hasNextPage) {
        fetchNextPage();
      }
    }

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasNextPage]);

  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        extendedBar={{
          name: 'TASKS',
          children: <ActiveHub />,
          source: hubIcon
        }}
        additional={<FilterByAssigneesSliderOver />}
      >
        <Header />
        <ScrollableContainer scrollDirection="y">
          <section
            ref={containerRef}
            style={{ minHeight: '0', maxHeight: '83vh' }}
            className="w-full h-full p-4 space-y-10"
          >
            {/* lists */}
            {Object.keys(lists).map((listId) => (
              <div key={listId}>
                <List tasks={lists[listId]} />
              </div>
            ))}
          </section>
        </ScrollableContainer>
      </Page>
    </>
  );
}
