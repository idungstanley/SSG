import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { pilotHubConfig } from '../pilot/components/createEntity/createHub/pilotConfig';
import AdditionalHeader from '../../../layout/components/MainLayout/Header/AdditionHeader';
import Page from '../../../components/Page';
import { Header } from '../../../components/TasksHeader';
import { pilotWalletConfig } from '../pilot/components/createEntity/createWallet/pilotConfig';
import { EntityType } from '../../../utils/EntityTypes/EntityType';

export default function TasksIndex() {
  const { createEntityType } = useAppSelector((state) => state.workspace);
  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={createEntityType === EntityType.wallet ? pilotWalletConfig : pilotHubConfig}
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
  const { createEntityType } = useAppSelector((state) => state.workspace);
  // set data for pilot
  useEffect(() => {
    const selectedItemType = 'Under Construction';

    if (createEntityType == EntityType.hub || EntityType.wallet) {
      dispatch(
        setShowPilotSideOver({
          id: 'unknown',
          type: selectedItemType,
          show: true
        })
      );
    }
  }, [createEntityType]);

  return null;
}
