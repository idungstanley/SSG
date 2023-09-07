import { useEffect, useMemo, useRef, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetFullTaskList, UseUpdateTaskViewSettings } from '../../features/task/taskService';
import { UseGetWalletDetails } from '../../features/wallet/walletService';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import { generateLists } from '../../utils';
import PilotSection, { pilotConfig } from '../workspace/wallet/components/PilotSection';
import hubIcon from '../../assets/branding/hub.png';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { useScroll } from '../../hooks/useScroll';
import {
  setIsTasksUpdated,
  setSaveSettingList,
  setSaveSettingOnline,
  setTasks,
  setUpdateCords
} from '../../features/task/taskSlice';
import { List } from '../../components/Views/ui/List/List';
import { Header } from '../../components/TasksHeader';
import { GroupHorizontalScroll } from '../../components/ScrollableContainer/GroupHorizontalScroll';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setActiveItem } from '../../features/workspace/workspaceSlice';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';

export function WalletPage() {
  const dispatch = useAppDispatch();
  const { walletId, taskId } = useParams();

  const { tasks: tasksStore, isTasksUpdated, saveSettingLocal } = useAppSelector((state) => state.task);

  const containerRef = useRef<HTMLDivElement>(null);
  const formatSettings = useformatSettings();

  // get wallet details to set active entity
  const { data: wallet } = UseGetWalletDetails({ activeItemId: walletId, activeItemType: EntityType.wallet });

  // get task_view id for list view
  const saveSettingList = wallet?.data?.wallet.task_views?.find((element) => element.type === 'list');
  const task_views_id = saveSettingList ? saveSettingList.id : '';

  const { isSuccess } = UseUpdateTaskViewSettings({
    task_views_id,
    taskDate: saveSettingLocal as { [key: string]: boolean }
  });

  useEffect(() => {
    if (wallet && !taskId) {
      dispatch(
        setActiveItem({
          activeItemId: wallet.data.wallet.id,
          activeItemType: EntityType.wallet,
          activeItemName: wallet.data.wallet.name
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
  }, [wallet]);

  // get tasks
  const { data, hasNextPage, fetchNextPage } = UseGetFullTaskList({
    itemId: walletId,
    itemType: EntityType.wallet
  });

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

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks, wallet?.data.wallet.custom_fields), [tasks, wallet]);

  // update cords for modal on scroll
  const onScroll = useScroll(() => dispatch(setUpdateCords()));

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
        <>
          <Header />

          {/* main content */}
          <section
            onScroll={onScroll}
            ref={containerRef}
            style={{ minHeight: '0', maxHeight: '83vh' }}
            className="w-full h-full p-4 pb-0 space-y-10 overflow-y-scroll"
          >
            {/* lists */}
            {tasks.length && isTasksUpdated ? (
              <>
                {Object.keys(lists).map((listId) => (
                  <Fragment key={listId}>
                    {tasksStore[listId] ? <List key={listId} tasks={tasksStore[listId]} /> : null}
                  </Fragment>
                ))}
              </>
            ) : null}
          </section>
          {Object.keys(lists).length > 1 && <GroupHorizontalScroll />}
        </>
      </Page>
    </>
  );
}
