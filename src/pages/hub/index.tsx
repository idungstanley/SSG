import { useEffect, useMemo, Fragment, UIEvent } from 'react';
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
import { setSaveSettingList, setSaveSettingOnline, setSubtasks, setTasks } from '../../features/task/taskSlice';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';
import { generateSubtasksList, generateSubtasksArray } from '../../utils/generateLists';
import { IHubDetails } from '../../features/hubs/hubs.interfaces';

export default function HubPage() {
  const dispatch = useAppDispatch();
  const { hubId, subhubId, taskId } = useParams();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { tasks: tasksStore, saveSettingLocal, subtasks } = useAppSelector((state) => state.task);
  const formatSettings = useformatSettings();

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

  const { data, hasNextPage, fetchNextPage, isFetching } = UseGetFullTaskList({
    itemId: hubId || subhubId,
    itemType: EntityType.hub
  });

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks, hub?.data.hub as IHubDetails), [tasks, hub]);

  useEffect(() => {
    if (Object.keys(lists).length) {
      dispatch(setTasks({ ...tasksStore, ...lists }));

      const newSubtasksArr = generateSubtasksArray(lists);
      if (newSubtasksArr.length) {
        const newSubtasks = generateSubtasksList(newSubtasksArr, hub?.data.hub as IHubDetails);
        dispatch(setSubtasks({ ...subtasks, ...newSubtasks }));
      }
    }
  }, [lists]);

  // infinite scroll
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    handleScroll(e);
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (hasNextPage && !isFetching) {
      const container = e.target as HTMLElement;
      const twoThirdsOfScroll = 0.66;
      const scrollDifference =
        container?.scrollHeight * twoThirdsOfScroll - container.scrollTop - container.clientHeight;
      const range = 1;
      if (scrollDifference <= range) {
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
        extendedBar={{
          name: 'TASKS',
          children: <ActiveHub />,
          source: hubIcon
        }}
        additional={<FilterByAssigneesSliderOver />}
      >
        <Header />
        <VerticalScroll onScroll={onScroll}>
          <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
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
