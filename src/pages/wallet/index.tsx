import { useEffect, useMemo, Fragment, UIEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { setSaveSettingList, setSaveSettingOnline, setSubtasks, setTasks } from '../../features/task/taskSlice';
import { List } from '../../components/Views/ui/List/List';
import { Header } from '../../components/TasksHeader';
import { GroupHorizontalScroll } from '../../components/ScrollableContainer/GroupHorizontalScroll';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setActiveItem, setActiveView } from '../../features/workspace/workspaceSlice';
import { useformatSettings } from '../workspace/tasks/TaskSettingsModal/ShowSettingsModal/FormatSettings';
import { VerticalScroll } from '../../components/ScrollableContainer/VerticalScroll';
import { generateSubtasksArray, generateSubtasksList } from '../../utils/generateLists';
import { IWalletDetails } from '../../features/wallet/wallet.interfaces';
import { generateUrlWithViewId } from '../../app/helpers';
import { IView } from '../../features/hubs/hubs.interfaces';
import { Spinner } from '../../common';

export function WalletPage() {
  const dispatch = useAppDispatch();
  const { walletId, taskId } = useParams();
  const navigate = useNavigate();

  const { tasks: tasksStore, saveSettingLocal, scrollGroupView } = useAppSelector((state) => state.task);

  const formatSettings = useformatSettings();

  // get wallet details to set active entity
  const { data: wallet } = UseGetWalletDetails({ activeItemId: walletId, activeItemType: EntityType.wallet });

  // get task_view id for list view
  const saveSettingList = wallet?.data?.wallet.task_views?.find((element) => element.type === 'list');
  const task_views_id = saveSettingList ? saveSettingList.id : '';

  UseUpdateTaskViewSettings({
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

      const currentView = wallet?.data.wallet.task_views.find(
        (view) => view.type === EntityType.list && view.is_required
      );
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
  }, [wallet]);

  // get tasks
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } = UseGetFullTaskList({
    itemId: walletId,
    itemType: EntityType.wallet
  });

  const tasks = useMemo(() => (data ? data.pages.flatMap((page) => page.data.tasks) : []), [data]);
  const lists = useMemo(() => generateLists(tasks, wallet?.data.wallet as IWalletDetails), [tasks, wallet]);

  useEffect(() => {
    if (Object.keys(lists).length) {
      dispatch(setTasks(lists));

      const newSubtasksArr = generateSubtasksArray(lists);
      if (newSubtasksArr.length) {
        const newSubtasks = generateSubtasksList(newSubtasksArr, wallet?.data.wallet as IWalletDetails);
        dispatch(setSubtasks(newSubtasks));
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
      const twoThirdsOfScroll = 0.7;
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
          {(isLoading || isFetching) && !Object.keys(lists).length ? (
            <div
              className="flex items-center justify-center w-full h-full mx-auto mt-5"
              style={{ minHeight: '0', maxHeight: '83vh' }}
            >
              <Spinner color="#0F70B7" />
            </div>
          ) : (
            <VerticalScroll onScroll={onScroll}>
              {/* main content */}
              <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
                {/* lists */}
                {Object.keys(lists).map((listId) => (
                  <Fragment key={listId}>{tasksStore[listId] ? <List tasks={tasksStore[listId]} /> : null}</Fragment>
                ))}
              </section>
              {Object.keys(lists).length > 1 && scrollGroupView && <GroupHorizontalScroll />}
            </VerticalScroll>
          )}
        </>
      </Page>
    </>
  );
}
