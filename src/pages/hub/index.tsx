import { useEffect, useMemo, useRef, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetHubDetails } from '../../features/hubs/hubService';
import { UseGetFullTaskList, UseUpdateTaskViewSettings } from '../../features/task/taskService';
import { setActiveItem } from '../../features/workspace/workspaceSlice';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import PilotSection, { pilotConfig } from '../workspace/hubs/components/PilotSection';
import hubIcon from '../../assets/branding/hub.png';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { List } from '../../components/Views/ui/List/List';
import { generateLists } from '../../utils';
import { Header } from '../../components/TasksHeader';
import { VerticalScroll } from '../../components/ScrollableContainer/VerticalScroll';
import { GroupHorizontalScroll } from '../../components/ScrollableContainer/GroupHorizontalScroll';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import {
  setIsTasksUpdated,
  setSaveSettingList,
  setSaveSettingLocal,
  setSaveSettingOnline,
  setTasks
} from '../../features/task/taskSlice';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';

export default function HubPage() {
  const dispatch = useAppDispatch();
  const { hubId, subhubId, taskId } = useParams();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { tasks: tasksStore, isTasksUpdated, saveSettingLocal } = useAppSelector((state) => state.task);
  const formatSettings = useformatSettings();

  const containerRef = useRef<HTMLDivElement>(null);

  const { data: hub } = UseGetHubDetails({ activeItemId: hubId, activeItemType: EntityType.hub });
  const saveSettingList = hub?.data.hub.task_views?.find((element) => element.type === 'list');

  const task_views_id = saveSettingList ? saveSettingList.id : '';

  const { isSuccess } = UseUpdateTaskViewSettings({
    task_views_id,
    taskDate: saveSettingLocal as { [key: string]: boolean }
  });

  // set entity name
  useEffect(() => {
    if (hub && !taskId) {
      const hubName = hub.data.hub.name;
      dispatch(
        setActiveItem({
          activeItemId: activeItemId as string,
          activeItemType: activeItemType as string,
          activeItemName: hubName
        })
      );
    }

    dispatch(setSaveSettingList(saveSettingList));

    if (saveSettingList?.view_settings) {
      dispatch(setSaveSettingOnline(saveSettingList.view_settings as { [key: string]: boolean }));
      formatSettings(saveSettingList.view_settings);
    } else {
      dispatch(setSaveSettingOnline(saveSettingLocal));
    }
  }, [hub, saveSettingList]);

  const { data, hasNextPage, fetchNextPage } = UseGetFullTaskList({
    itemId: hubId || subhubId,
    itemType: EntityType.hub
  });

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks, hub?.data.hub.custom_fields), [tasks, hub]);

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

  useEffect(() => {
    if (lists && !Object.keys(tasksStore).length) {
      dispatch(setTasks({ ...tasksStore, ...lists }));
      dispatch(setIsTasksUpdated(true));
    }
  }, [lists, tasksStore]);

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
        <VerticalScroll>
          <section
            ref={containerRef}
            style={{ minHeight: '0', maxHeight: '83vh' }}
            className="w-full h-full p-4 space-y-10 pb-0"
          >
            {/* lists */}
            {Object.keys(lists).map((listId) => (
              <Fragment key={listId}>
                {tasksStore[listId] && tasks.length && isTasksUpdated ? (
                  <div key={listId}>
                    <List tasks={tasksStore[listId]} />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </section>
        </VerticalScroll>
        {Object.keys(lists).length > 1 && <GroupHorizontalScroll />}
      </Page>
    </>
  );
}
