import React, { useEffect } from 'react';
import Pilot from '../../../components/Pilot';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { pilotListConfig } from '../pilot/components/createEntity/createList/pilotConfig';
import { pilotWalletConfig } from '../pilot/components/createEntity/createWallet/pilotConfig';
import { pilotHubConfig } from '../pilot/components/createEntity/createHub/pilotConfig';

export default function TasksIndex() {
  const pilotConfig = !!pilotListConfig || !!pilotWalletConfig || !!pilotHubConfig;
  const { showCreateHubSlideOver, showCreateWalletSlideOver } = useAppSelector((state) => state.slideOver);

  return (
    <div className="relative grid w-full h-full grid-cols-frAuto">
      <PilotSection />
      <h1>Index for tasks under construction</h1>
      {pilotConfig ? (
        <Pilot
          pilotConfig={
            showCreateHubSlideOver ? pilotHubConfig : showCreateWalletSlideOver ? pilotWalletConfig : pilotListConfig
          }
        />
      ) : null}
    </div>
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
