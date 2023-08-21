import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTaskListService } from '../../features/task/taskService';
import { setActiveItem } from '../../features/workspace/workspaceSlice';
import { UseGetListDetails } from '../../features/list/listService';
import PilotSection, { pilotConfig } from '../workspace/lists/components/PilotSection';
import Page from '../../components/Page';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import hubIcon from '../../assets/branding/hub.png';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { useScroll } from '../../hooks/useScroll';
import { setUpdateCords } from '../../features/task/taskSlice';
import TaskQuickAction from '../workspace/tasks/component/taskQuickActions/TaskQuickAction';
import { List } from '../../components/Views/ui/List/List';
import { Header } from '../../components/TasksHeader';
import { GroupHorizontalScroll } from '../../components/ScrollableContainer/GroupHorizontalScroll';
import { EntityType } from '../../utils/EntityTypes/EntityType';

export function ListPage() {
  const dispatch = useAppDispatch();
  const { listId, taskId } = useParams();

  const { listView, filterTaskByAssigneeIds } = useAppSelector((state) => state.task);

  const containerRef = useRef<HTMLDivElement>(null);

  // get list details to set active entity
  const { data: list } = UseGetListDetails({ activeItemId: listId, activeItemType: EntityType.list });
  const listName = list?.data.list.name ?? '';

  useEffect(() => {
    if (list) {
      if (listId && !taskId) {
        dispatch(setActiveItem({ activeItemId: listId, activeItemType: EntityType.list, activeItemName: listName }));
      }
    }
  }, [list]);

  // get list tasks
  const { data, hasNextPage, fetchNextPage } = getTaskListService({ listId, assigneeUserId: filterTaskByAssigneeIds });
  const tasks = data ? data.pages.flatMap((page) => page.data.tasks) : [];

  // infinite scroll
  useEffect(() => {
    function handleScroll(event: UIEvent | Event) {
      const container = event.target as HTMLElement;
      const twoThirdsOfScroll = 0.66;
      const scrollDifference =
        container?.scrollHeight * twoThirdsOfScroll - container.scrollTop - container.clientHeight;
      const range = 1;
      if (scrollDifference <= range && hasNextPage) {
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

  // update cords for modal on scroll
  const onScroll = useScroll(() => dispatch(setUpdateCords()));

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
        <>
          <Header />

          {/* main content */}
          <div
            style={{ minHeight: '0', maxHeight: '83vh' }}
            ref={containerRef}
            className="w-full h-full p-4 pb-0 space-y-10 overflow-y-scroll"
            onScroll={onScroll}
          >
            {listView && <TaskQuickAction listDetailsData={listName} />}

            {tasks.length ? <List tasks={tasks} /> : []}
          </div>
          {tasks.length > 1 && <GroupHorizontalScroll />}
        </>
      </Page>
    </>
  );
}
