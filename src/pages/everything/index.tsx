import { useEffect, useMemo, UIEvent, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetEverythingTasks } from '../../features/task/taskService';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import PilotSection, { pilotConfig } from '../workspace/hubs/components/PilotSection';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { List } from '../../components/Views/ui/List/List';
import { generateLists } from '../../utils';
import { Header } from '../../components/TasksHeader';
import { VerticalScroll } from '../../components/ScrollableContainer/VerticalScroll';
import { GroupHorizontalScroll } from '../../components/ScrollableContainer/GroupHorizontalScroll';
import { setTasks } from '../../features/task/taskSlice';

export default function EverythingPage() {
  const dispatch = useAppDispatch();

  const { tasks: tasksStore, scrollGroupView } = useAppSelector((state) => state.task);

  const { data, hasNextPage, fetchNextPage } = UseGetEverythingTasks();

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks), [tasks]);

  useEffect(() => {
    if (Object.keys(lists).length) {
      dispatch(setTasks({ ...tasksStore, ...lists }));
    }
  }, [lists]);

  // infinite scroll
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    handleScroll(e);
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.target as HTMLElement;
    const twoThirdsOfScroll = 0.66;
    const scrollDifference = container?.scrollHeight * twoThirdsOfScroll - container.scrollTop - container.clientHeight;
    const range = 1;
    if (scrollDifference <= range) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        additional={<FilterByAssigneesSliderOver />}
      >
        <Header />
        <VerticalScroll onScroll={onScroll}>
          <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
            {/* lists */}
            {Object.keys(tasksStore).map((listId) => (
              <Fragment key={listId}>
                <List tasks={tasksStore[listId]} />
              </Fragment>
            ))}
          </section>
        </VerticalScroll>
        {Object.keys(lists).length > 1 && scrollGroupView && <GroupHorizontalScroll />}
      </Page>
    </>
  );
}
