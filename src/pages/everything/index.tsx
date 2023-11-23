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
import { setKeyBoardSelectedIndex, setTaskColumnIndex, setTasks } from '../../features/task/taskSlice';
import { VerticalScrollNoCallback } from '../../components/ScrollableContainer/VerticalScrollNoCallback';

export default function EverythingPage() {
  const dispatch = useAppDispatch();

  const {
    tasks: tasksStore,
    scrollGroupView,
    keyBoardSelectedIndex,
    taskColumns,
    taskColumnIndex
  } = useAppSelector((state) => state.task);

  const { data, hasNextPage, fetchNextPage, isFetching } = UseGetEverythingTasks();

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks), [tasks]);

  useEffect(() => {
    if (Object.keys(lists).length) {
      dispatch(setTasks({ ...tasksStore, ...lists }));
    }
  }, [lists]);

  const combinedArr = Object.values(tasksStore).flatMap((lists) => lists);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      if (keyBoardSelectedIndex !== null) {
        const newIndex = Math.max(0, keyBoardSelectedIndex - 1);
        dispatch(setKeyBoardSelectedIndex(newIndex));
      } else {
        dispatch(setKeyBoardSelectedIndex(0));
      }
    } else if (e.key === 'ArrowDown') {
      if (keyBoardSelectedIndex !== null) {
        const newIndex = Math.min(combinedArr.length - 1, keyBoardSelectedIndex + 1);
        dispatch(setKeyBoardSelectedIndex(newIndex));
      } else {
        dispatch(setKeyBoardSelectedIndex(0));
      }
    } else if (e.key === 'ArrowLeft' && taskColumnIndex !== null) {
      const newIndex = Math.max(0, taskColumnIndex - 1);
      dispatch(setTaskColumnIndex(newIndex));
    }

    if (e.key === 'ArrowRight' && taskColumnIndex !== null) {
      const newIndex = Math.min(taskColumns.length - 1, taskColumnIndex + 1);
      dispatch(setTaskColumnIndex(newIndex));
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyBoardSelectedIndex, taskColumns, taskColumnIndex]);

  // infinite scroll
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    handleScroll(e);
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (hasNextPage && !isFetching) {
      const container = e.target as HTMLElement;
      const scrollPositionForLoading = 0.7;
      const scrollDifference =
        container?.scrollHeight * scrollPositionForLoading - container.scrollTop - container.clientHeight;
      const range = 1;
      if (scrollDifference <= range) {
        if (hasNextPage) {
          fetchNextPage();
        }
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
        {location.search.includes('no-callback') ? (
          <VerticalScrollNoCallback onScroll={onScroll}>
            <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
              {/* lists */}
              {Object.keys(tasksStore).map((listId) => (
                <Fragment key={listId}>
                  <List tasks={tasksStore[listId]} combinedTasksArr={combinedArr} />
                </Fragment>
              ))}
            </section>
          </VerticalScrollNoCallback>
        ) : location.search.includes('basic') ? (
          <section
            style={{ minHeight: '0', maxHeight: '83vh', overflowY: 'auto' }}
            className="w-full h-full p-4 pb-0 space-y-10"
            onScroll={onScroll}
          >
            {/* lists */}
            {Object.keys(tasksStore).map((listId) => (
              <Fragment key={listId}>
                <List tasks={tasksStore[listId]} combinedTasksArr={combinedArr} />
              </Fragment>
            ))}
          </section>
        ) : (
          <VerticalScroll onScroll={onScroll}>
            <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
              {/* lists */}
              {Object.keys(tasksStore).map((listId) => (
                <Fragment key={listId}>
                  <List tasks={tasksStore[listId]} combinedTasksArr={combinedArr} />
                </Fragment>
              ))}
            </section>
          </VerticalScroll>
        )}
        {Object.keys(lists).length > 1 && scrollGroupView && <GroupHorizontalScroll />}
      </Page>
    </>
  );
}
