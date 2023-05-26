import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTaskListService } from '../../features/task/taskService';
import { setActiveEntityName, setActiveItem } from '../../features/workspace/workspaceSlice';
import { UseGetListDetails } from '../../features/list/listService';
import PilotSection, { pilotConfig } from '../workspace/lists/components/PilotSection';
import Page from '../../components/Page';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import ListNav from '../workspace/lists/components/renderlist/ListNav';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import hubIcon from '../../assets/branding/hub.png';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { ITaskFullList } from '../../features/task/interface.tasks';
import { useScroll } from '../../hooks/useScroll';
import { setUpdateCords } from '../../features/task/taskSlice';
import TaskQuickAction from '../workspace/tasks/component/taskQuickActions/TaskQuickAction';
import { List } from '../../components/Views/ui/List/List';
import { Header } from '../../components/Tasks';

export function ListPage() {
  const dispatch = useAppDispatch();
  const { listId } = useParams();
  const { listView, filterTaskByAssigneeIds } = useAppSelector((state) => state.task);

  const containerRef = useRef<HTMLDivElement>(null);

  // get list details to set active entity
  const { data: list } = UseGetListDetails({ activeItemId: listId, activeItemType: 'list' });
  const listName = list?.data.list.name ?? '';

  useEffect(() => {
    if (list) {
      if (listId) {
        dispatch(setActiveItem({ activeItemId: listId, activeItemType: 'list', activeItemName: listName }));
        dispatch(setActiveEntityName(listName));
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
      const scrollDifference = container?.scrollHeight - container.scrollTop - container.clientHeight;
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

  // update cords for modal on scroll
  const onScroll = useScroll(() => dispatch(setUpdateCords()));

  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        header={
          <section id="nav" className="capitalize" style={{ height: '50px' }}>
            <ListNav
              navName={listName}
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
        additional={<FilterByAssigneesSliderOver data={tasks as ITaskFullList[]} />}
      >
        <>
          <Header />

          {/* main content */}
          <div
            style={{ minHeight: '0', maxHeight: '85vh' }}
            ref={containerRef}
            className="w-full h-full p-4 space-y-10 overflow-y-scroll"
            onScroll={onScroll}
          >
            {listView && <TaskQuickAction listDetailsData={listName} />}

            {tasks.length ? <List tasks={tasks} /> : null}
          </div>
        </>
      </Page>
    </>
  );
}
