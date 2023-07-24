import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Page from '../../components/Page';
import { UseGetFullTaskList } from '../../features/task/taskService';
import { UseGetWalletDetails } from '../../features/wallet/walletService';
import { setActiveItem, setCurrentWalletName } from '../../features/workspace/workspaceSlice';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import { generateLists } from '../../utils';
import PilotSection, { pilotConfig } from '../workspace/wallet/components/PilotSection';
import hubIcon from '../../assets/branding/hub.png';
import ActiveHub from '../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import FilterByAssigneesSliderOver from '../workspace/lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { useScroll } from '../../hooks/useScroll';
import { setUpdateCords } from '../../features/task/taskSlice';
import { List } from '../../components/Views/ui/List/List';
import { Header } from '../../components/TasksHeader';

export function WalletPage() {
  const dispatch = useAppDispatch();
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { walletId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  // get wallet details to set active entity
  const { data: wallet } = UseGetWalletDetails({ activeItemId: walletId, activeItemType: 'wallet' });
  const walletName = wallet?.data.wallet.name ?? '';

  useEffect(() => {
    if (wallet) {
      dispatch(setActiveItem({ activeItemId: walletId, activeItemType: 'wallet', activeItemName: walletName }));
      dispatch(setCurrentWalletName(walletName));
    }
  }, [wallet]);

  // get tasks
  const { data, hasNextPage, fetchNextPage } = UseGetFullTaskList({
    itemId: walletId,
    itemType: 'wallet',
    assigneeUserId: filterTaskByAssigneeIds
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

  const lists = useMemo(() => generateLists(tasks), [tasks]);

  // update cords for modal on scroll
  const onScroll = useScroll(() => dispatch(setUpdateCords()));

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
            className="w-full h-full p-4 space-y-10 overflow-y-scroll"
          >
            {/* lists */}
            {Object.keys(lists).map((listId) => (
              <List key={listId} tasks={lists[listId]} />
            ))}
          </section>
        </>
      </Page>
    </>
  );
}
