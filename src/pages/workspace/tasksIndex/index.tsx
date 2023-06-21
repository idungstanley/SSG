import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { pilotHubConfig } from '../pilot/components/createEntity/createHub/pilotConfig';
import AdditionalHeader from '../../../layout/components/MainLayout/Header/AdditionHeader';
import Page from '../../../components/Page';
import { Header } from '../../../components/TasksHeader';

export default function TasksIndex() {
  return (
    <>
      <PilotSection />
      <Page pilotConfig={pilotHubConfig} additionalHeader={<AdditionalHeader />}>
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
  const { showCreateHubSlideOver } = useAppSelector((state) => state.slideOver);
  // set data for pilot
  useEffect(() => {
    const selectedItemType = 'create_hub';

    if (showCreateHubSlideOver) {
      dispatch(
        setShowPilotSideOver({
          id: 'unknown',
          type: selectedItemType,
          show: true
        })
      );
    }
  }, [showCreateHubSlideOver]);

  return null;
}
