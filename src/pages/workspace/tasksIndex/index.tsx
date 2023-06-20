import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { pilotListConfig } from '../pilot/components/createEntity/createList/pilotConfig';
import { pilotWalletConfig } from '../pilot/components/createEntity/createWallet/pilotConfig';
import { pilotHubConfig } from '../pilot/components/createEntity/createHub/pilotConfig';
import ListNav from '../lists/components/renderlist/ListNav';
import AdditionalHeader from '../../../layout/components/MainLayout/Header/AdditionHeader';
import Page from '../../../components/Page';
import { Header } from '../../../components/TasksHeader';

export default function TasksIndex() {
  const { showCreateHubSlideOver, showCreateWalletSlideOver } = useAppSelector((state) => state.slideOver);

  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={
          showCreateHubSlideOver ? pilotHubConfig : showCreateWalletSlideOver ? pilotWalletConfig : pilotListConfig
        }
        additionalHeader={<AdditionalHeader />}
      >
        <Header />
        <section>
          <div className="w-full h-full flex items-center justify-center">
            <p>Under Construction</p>
          </div>
        </section>
      </Page>
    </>
  );
}

function PilotSection() {
  const dispatch = useAppDispatch();
  const { showCreateHubSlideOver, showCreateWalletSlideOver, showCreateListSlideOver } = useAppSelector(
    (state) => state.slideOver
  );
  // set data for pilot
  useEffect(() => {
    const selectedItemType = showCreateHubSlideOver
      ? 'create_hub'
      : showCreateWalletSlideOver
      ? 'create_wallet'
      : 'create_list';
    if (showCreateHubSlideOver || showCreateWalletSlideOver || showCreateListSlideOver) {
      dispatch(
        setShowPilotSideOver({
          id: 'unknown',
          type: selectedItemType,
          show: true
        })
      );
    }
  }, [showCreateHubSlideOver, showCreateWalletSlideOver, showCreateListSlideOver]);

  return null;
}
