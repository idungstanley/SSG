import { useEffect, useMemo, Fragment, UIEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetHubDetails } from '../../features/hubs/hubService';
import { UseGetFullTaskList, UseUpdateTaskViewSettings } from '../../features/task/taskService';
import { setActiveItem, setActiveView } from '../../features/workspace/workspaceSlice';
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
  setKeyBoardSelectedIndex,
  setSaveSettingList,
  setSaveSettingOnline,
  setSubtasks,
  setTasks
} from '../../features/task/taskSlice';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';
import { generateSubtasksList, generateSubtasksArray } from '../../utils/generateLists';
import { IHubDetails, IView } from '../../features/hubs/hubs.interfaces';
import { updatePageTitle } from '../../utils/updatePageTitle';
import { generateUrlWithViewId } from '../../app/helpers';

export default function HubPage() {
  useEffect(() => {
    updatePageTitle('Tasks');
    return () => {
      updatePageTitle('');
    };
  }, []);

  const dispatch = useAppDispatch();
  const { hubId, taskId } = useParams();
  const navigate = useNavigate();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const {
    tasks: tasksStore,
    saveSettingLocal,
    subtasks,
    scrollGroupView,
    keyBoardSelectedIndex
  } = useAppSelector((state) => state.task);
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
      const currentView = hub?.data.hub.task_views.find((view) => view.type === EntityType.list && view.is_required);
      const newUrl = generateUrlWithViewId(currentView?.id as string);
      dispatch(setActiveView(currentView as IView));
      navigate(newUrl);
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
    itemId: hubId,
    itemType: EntityType.hub
  });

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks, hub?.data.hub as IHubDetails), [tasks, hub]);

  const combinedArr = Object.values(lists).flatMap((lists) => lists);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' && keyBoardSelectedIndex !== null) {
      const newIndex = Math.max(0, keyBoardSelectedIndex - 1);
      dispatch(setKeyBoardSelectedIndex(newIndex));
    } else if (e.key === 'ArrowDown' && keyBoardSelectedIndex !== null) {
      const newIndex = Math.min(combinedArr.length - 1, keyBoardSelectedIndex + 1);
      dispatch(setKeyBoardSelectedIndex(newIndex));
    } else if (e.key === 'ArrowUp' || (e.key === 'ArrowDown' && keyBoardSelectedIndex === null)) {
      dispatch(setKeyBoardSelectedIndex(0));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyBoardSelectedIndex]);

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
          <section
            style={{ minHeight: '0', maxHeight: '83vh' }}
            className="w-full h-full py-4 pb-0 pl-5 pr-1 space-y-10"
          >
            {/* lists */}
            {Object.keys(lists).map((listId) => (
              <Fragment key={listId}>
                {tasksStore[listId] ? <List tasks={tasksStore[listId]} combinedTasksArr={combinedArr} /> : null}
              </Fragment>
            ))}
          </section>
        </VerticalScroll>
        {Object.keys(lists).length > 1 && scrollGroupView && <GroupHorizontalScroll />}
      </Page>
    </>
  );
}
