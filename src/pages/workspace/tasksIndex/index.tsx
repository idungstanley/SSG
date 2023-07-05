import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import AdditionalHeader from '../../../layout/components/MainLayout/Header/AdditionHeader';
import Page from '../../../components/Page';
import { Header } from '../../../components/TasksHeader';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { pilotConfig } from '../hubs/components/PilotSection';
import { useParams } from 'react-router-dom';

export default function TasksIndex() {
  return (
    <>
      <PilotSection />
      <Page pilotConfig={pilotConfig} additionalHeader={<AdditionalHeader />}>
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
  const { createEntityType, showIndependentPilot } = useAppSelector((state) => state.workspace);
  const { listId, hubId, walletId } = useParams();
  const isEntityActive = !!listId || !!hubId || !!walletId;
  // set data for pilot
  useEffect(() => {
    const selectedItemType = 'Under Construction';

    if (createEntityType !== null || (!isEntityActive && showIndependentPilot)) {
      dispatch(
        setShowPilotSideOver({
          id: 'unknown',
          type: selectedItemType,
          show: true
        })
      );
    }
  }, [createEntityType, isEntityActive, showIndependentPilot]);

  return null;
}
