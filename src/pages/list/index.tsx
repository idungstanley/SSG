import { useState, useEffect, UIEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  UseUpdateTaskViewSettings,
  getTaskListService,
  useUpdateSubtaskFilters
} from '../../features/task/taskService';
import { setActiveItem, setActiveViewId } from '../../features/workspace/workspaceSlice';
import { UseGetListDetails } from '../../features/list/listService';
import PilotSection, { pilotConfig } from '../workspace/lists/components/PilotSection';
import Page from '../../components/Page';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import hubIcon from '../../assets/branding/hub.png';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { setSaveSettingList, setSaveSettingOnline, setSubtasks, setTasks } from '../../features/task/taskSlice';
import TaskQuickAction from '../workspace/tasks/component/taskQuickActions/TaskQuickAction';
import { List } from '../../components/Views/ui/List/List';
import { Header } from '../../components/TasksHeader';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { ITaskFullList } from '../../features/task/interface.tasks';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';
import { IListDetailRes, IListDetails } from '../../features/list/list.interfaces';
import { VerticalScroll } from '../../components/ScrollableContainer/VerticalScroll';
import { generateSubtasksList } from '../../utils/generateLists';
import { generateUrlWithViewId } from '../../app/helpers';

export function ListPage() {
  const dispatch = useAppDispatch();
  const { listId, taskId } = useParams();
  const navigate = useNavigate();

  const {
    tasks: tasksStore,
    saveSettingLocal,
    subtasks,
    splitSubTaskState: isSplitMode,
    filters: { option }
  } = useAppSelector((state) => state.task);

  const [tasksFromRes, setTasksFromRes] = useState<ITaskFullList[]>([]);
  const [listDetailsFromRes, setListDetailsFromRes] = useState<IListDetailRes>();
  const [isFiltersChecked, setFiltersChecked] = useState<boolean>(false);

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
  const { data, hasNextPage, fetchNextPage, isFetching } = getTaskListService(listId);

  useEffect(() => {
    if (listId) {
      dispatch(setTasks({}));
      setTasksFromRes([]);
    }
  }, [listId]);

  useEffect(() => {
    if (data) {
      setTasksFromRes(data.pages.flatMap((page) => page.data.tasks as ITaskFullList[]));
    }
  }, [data]);

  useEffect(() => {
    if (listDetails) {
      setListDetailsFromRes(listDetails);
      const currentView = listDetails?.data.list.task_views.find(
        (view) => view.type === EntityType.list && view.is_required
      );
      const newUrl = generateUrlWithViewId(currentView?.id as string);
      dispatch(setActiveViewId(currentView?.id as string));
      navigate(newUrl);
    }
  }, [listDetails]);

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

  useEffect(() => {
    if (tasksFromRes.length && listId && listDetailsFromRes?.data.list.custom_field_columns) {
      const tasksWithCustomFields = tasksFromRes.map((task) => {
        return {
          ...task,
          list: {
            id: listDetailsFromRes.data.list.id,
            name: listDetailsFromRes.data.list.name,
            color: listDetailsFromRes.data.list.color as unknown as string
          },
          task_statuses: listDetailsFromRes.data.list.task_statuses,
          custom_field_columns: listDetailsFromRes.data.list.custom_field_columns
        };
      });
      dispatch(setTasks({ ...tasksStore, [listId]: tasksWithCustomFields as ITaskFullList[] }));

      const newSubtasksArr: ITaskFullList[] = [];
      tasksFromRes.forEach((task) => {
        if (task?.descendants) {
          (task.descendants as ITaskFullList[]).forEach((sub) => {
            const parentName = newSubtasksArr.find((i) => i.id === sub.parent_id)?.name;
            newSubtasksArr.push({
              ...sub,
              parentName: parentName || task.name,
              list_id: task.list_id
            });
          });
        }
      });

      if (newSubtasksArr.length) {
        const newSubtasks = generateSubtasksList(newSubtasksArr, listDetailsFromRes.data.list as IListDetails);
        dispatch(setSubtasks({ ...subtasks, ...newSubtasks }));
      }
    }
  }, [tasksFromRes, listDetailsFromRes]);

  const { mutate: updateSubtaskFilter } = useUpdateSubtaskFilters();
  useEffect(() => {
    if (Object.keys(tasksStore).length && Object.keys(subtasks).length && isSplitMode && !isFiltersChecked) {
      Object.keys(tasksStore).forEach((listId) => {
        tasksStore[listId].forEach((task) => {
          if (task.filters) {
            updateSubtaskFilter({
              parentId: task.filters?.model_id as string,
              filters: { op: option, fields: task.filters.data }
            });
          }
        });
      });
      Object.keys(subtasks).forEach((listId) => {
        subtasks[listId].forEach((task) => {
          if (task.filters) {
            updateSubtaskFilter({
              parentId: task.filters.model_id as string,
              filters: { op: option, fields: task.filters.data }
            });
          }
        });
      });
      setFiltersChecked(true);
    }
  }, [tasksStore, subtasks, isFiltersChecked, isSplitMode]);

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
        <>
          <Header />
          <VerticalScroll onScroll={onScroll}>
            {/* main content */}
            <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
              <TaskQuickAction listDetailsData={listName} />

              {tasksStore[listId as string] && tasksFromRes.length ? (
                <List tasks={tasksStore[listId as string]} />
              ) : null}
            </section>
          </VerticalScroll>
        </>
      </Page>
    </>
  );
}
