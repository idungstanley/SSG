import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { pilotHubConfig } from '../pilot/components/createEntity/createHub/pilotConfig';
import AdditionalHeader from '../../../layout/components/MainLayout/Header/AdditionHeader';
import Page from '../../../components/Page';
import { Header } from '../../../components/TasksHeader';
import { pilotWalletConfig } from '../pilot/components/createEntity/createWallet/pilotConfig';

export default function TasksIndex() {
  const { showCreateHubSlideOver, showCreateWalletSlideOver } = useAppSelector((state) => state.slideOver);
  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={showCreateWalletSlideOver ? pilotWalletConfig : pilotHubConfig}
        additionalHeader={<AdditionalHeader />}
      >
        <Header />
        <section>
          <div className="flex items-center justify-center w-full h-full">
            <p>Under Construction</p>
          </div>
        </section>
      </Page>
    </>
  );
}

function PilotSection() {
  const dispatch = useAppDispatch();
  const { showCreateHubSlideOver, showCreateWalletSlideOver } = useAppSelector((state) => state.slideOver);
  // set data for pilot
  useEffect(() => {
    const selectedItemType = 'Under Construction';

    if (showCreateHubSlideOver || showCreateWalletSlideOver) {
      dispatch(
        setShowPilotSideOver({
          id: 'unknown',
          type: selectedItemType,
          show: true
        })
      );
    }
  }, [showCreateHubSlideOver, showCreateWalletSlideOver]);

  return null;
}
