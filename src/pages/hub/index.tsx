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
import { setSaveSettingList, setSaveSettingOnline, setTasks } from '../../features/task/taskSlice';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';
import { IField } from '../../features/list/list.interfaces';

export default function HubPage() {
  const dispatch = useAppDispatch();
  const { hubId, subhubId, taskId } = useParams();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { tasks: tasksStore, saveSettingLocal } = useAppSelector((state) => state.task);
  const formatSettings = useformatSettings();

  const containerRef = useRef<HTMLDivElement>(null);

  const { data: hub } = UseGetHubDetails({ activeItemId: hubId, activeItemType: EntityType.hub });

  // get task_view id for list view
  const saveSettingList = hub?.data.hub.task_views?.find((element) => element.type === 'list');
  const task_views_id = saveSettingList ? saveSettingList.id : '';

  UseUpdateTaskViewSettings({
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
    // check if views settings exist and use else use local list view settings
    if (saveSettingList?.view_settings) {
      dispatch(setSaveSettingOnline(saveSettingList.view_settings as { [key: string]: boolean }));
      formatSettings(saveSettingList.view_settings);
    } else {
      dispatch(setSaveSettingOnline(saveSettingLocal));
    }
  }, [hub]);

  const { data, hasNextPage, fetchNextPage } = UseGetFullTaskList({
    itemId: hubId || subhubId,
    itemType: EntityType.hub
  });

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks, hub?.data.hub?.custom_field_columns as IField[]), [tasks, hub]);

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
    if (Object.keys(lists).length) {
      dispatch(setTasks({ ...tasksStore, ...lists }));
    }
  }, [lists]);

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
            style={{ minHeight: '0', maxHeight: '83vh', maxWidth: '' }}
            className="w-full h-full p-4 pb-0 space-y-10"
          >
            {/* lists */}
            {Object.keys(lists).map((listId) => (
              <Fragment key={listId}>{tasksStore[listId] ? <List tasks={tasksStore[listId]} /> : null}</Fragment>
            ))}
          </section>
        </VerticalScroll>
        {Object.keys(lists).length > 1 && <GroupHorizontalScroll />}
      </Page>
    </>
  );
}
