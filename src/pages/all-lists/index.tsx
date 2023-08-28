import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetHubDetails } from '../../features/hubs/hubService';
import { UseGetFullTaskList } from '../../features/task/taskService';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import PilotSection, { pilotConfig } from '../workspace/hubs/components/PilotSection';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { List } from '../../components/Views/ui/List/List';
import { generateLists } from '../../utils';
import { Header } from '../../components/TasksHeader';
import { VerticalScroll } from '../../components/ScrollableContainer/VerticalScroll';
import { GroupHorizontalScroll } from '../../components/ScrollableContainer/GroupHorizontalScroll';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { ITaskFullList } from '../../features/task/interface.tasks';
import { setTasks } from '../../features/task/taskSlice';

export default function AllListsPage() {
  const dispatch = useAppDispatch();

  const { hub } = useAppSelector((state) => state.hub);
  const { tasks: tasksStore } = useAppSelector((state) => state.task);

  const [allHubsId, setAllHubsId] = useState<string[]>([]);
  const [currentHubIdInOrder, setCurrentHubIdInOrder] = useState<string>('');
  const [allTasks, setAllTasks] = useState<ITaskFullList[]>([]);

  const { data: hubsData } = UseGetHubDetails({ activeItemId: currentHubIdInOrder, activeItemType: EntityType.hub });

  const { data, hasNextPage, fetchNextPage, isLoading } = UseGetFullTaskList({
    itemId: currentHubIdInOrder,
    itemType: EntityType.hub,
    isEverythingPage: true
  });

  useEffect(() => {
    if (hub.length) {
      setAllHubsId(hub.map((item) => item.id));
    }
  }, hub);

  useEffect(() => {
    if (data && !isLoading) {
      const newTasks = data.pages[0].data.tasks;
      setAllTasks((prev) => [...prev, ...newTasks]);
      if (hasNextPage) {
        fetchNextPage();
      } else {
        setAllHubsId((prev) => prev.slice(1));
      }
    }
  }, [data]);

  useEffect(() => {
    if (allHubsId.length) {
      setCurrentHubIdInOrder(allHubsId[0]);
    }
  }, [allHubsId]);

  const lists = useMemo(() => generateLists([...new Set(allTasks)]), [allTasks]);

  useEffect(() => {
    if (lists) {
      dispatch(setTasks({ ...tasksStore, ...lists }));
    }
  }, [lists]);

  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        additional={<FilterByAssigneesSliderOver />}
      >
        <Header />
        <VerticalScroll>
          <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 space-y-10">
            {/* lists */}
            {Object.keys(lists).map((listId) => (
              <>
                {tasksStore[listId] ? (
                  <div key={listId}>
                    <List tasks={lists[listId]} />
                  </div>
                ) : null}
              </>
            ))}
          </section>
        </VerticalScroll>
        {Object.keys(lists).length > 1 && <GroupHorizontalScroll />}
      </Page>
    </>
  );
}
