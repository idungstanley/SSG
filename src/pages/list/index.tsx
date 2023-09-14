import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseUpdateTaskViewSettings, getTaskListService } from '../../features/task/taskService';
import { setActiveItem } from '../../features/workspace/workspaceSlice';
import { UseGetListDetails } from '../../features/list/listService';
import PilotSection, { pilotConfig } from '../workspace/lists/components/PilotSection';
import Page from '../../components/Page';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import hubIcon from '../../assets/branding/hub.png';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { useScroll } from '../../hooks/useScroll';
import { setSaveSettingList, setSaveSettingOnline, setTasks, setUpdateCords } from '../../features/task/taskSlice';
import TaskQuickAction from '../workspace/tasks/component/taskQuickActions/TaskQuickAction';
import { List } from '../../components/Views/ui/List/List';
import { Header } from '../../components/TasksHeader';
import { GroupHorizontalScroll } from '../../components/ScrollableContainer/GroupHorizontalScroll';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { ITaskFullList } from '../../features/task/interface.tasks';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';

export function ListPage() {
  const dispatch = useAppDispatch();
  const { listId, taskId } = useParams();

  const { tasks: tasksStore, saveSettingLocal } = useAppSelector((state) => state.task);

  const containerRef = useRef<HTMLDivElement>(null);

  const formatSettings = useformatSettings();

  // get list details to set active entity
  const { data: listDetails } = UseGetListDetails(listId);
  const listName = listDetails?.data.list.name ?? '';

  // get task_view id for list view
  const saveSettingList = listDetails?.data?.list.task_views?.find((element) => element.type === 'list');
  const task_views_id = saveSettingList ? saveSettingList.id : '';

  UseUpdateTaskViewSettings({
    task_views_id,
    taskDate: saveSettingLocal as { [key: string]: boolean }
  });

  // get list tasks
  const { data, hasNextPage, fetchNextPage } = getTaskListService(listId);
  const tasks = data ? data.pages.flatMap((page) => page.data.tasks) : [];

  useEffect(() => {
    if (listDetails) {
      if (listId && !taskId) {
        dispatch(setActiveItem({ activeItemId: listId, activeItemType: EntityType.list, activeItemName: listName }));
      }
    }

    dispatch(setSaveSettingList(saveSettingList));
    // check if views settings exist and use else use local list view settings
    if (saveSettingList?.view_settings) {
      dispatch(setSaveSettingOnline(saveSettingList.view_settings as { [key: string]: boolean }));
      formatSettings(saveSettingList.view_settings);
    } else {
      dispatch(setSaveSettingOnline(saveSettingLocal));
    }
  }, [listDetails]);

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

  useEffect(() => {
    if (tasks.length && listId && !tasksStore[listId] && listDetails?.data.list.custom_field_columns) {
      const tasksWithCustomFields = tasks.map((task) => {
        return {
          ...task,
          custom_field_columns: listDetails.data.list.custom_field_columns
        };
      });
      dispatch(setTasks({ ...tasksStore, [listId]: tasksWithCustomFields as ITaskFullList[] }));
    }
  }, [tasks, listDetails]);

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
            <TaskQuickAction listDetailsData={listName} />

            {tasksStore[listId as string] && tasks.length ? (
              <List
                tasks={tasksStore[listId as string]}
                subtasksCustomeFields={tasks[0].custom_field_columns}
                listDetails={listDetails}
              />
            ) : null}
          </div>
          {tasks?.length > 1 && <GroupHorizontalScroll />}
        </>
      </Page>
    </>
  );
}
