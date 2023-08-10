import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { UseGetHubDetails } from '../../../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../../../features/list/listService';
import { getOneTaskServices } from '../../../../../../features/task/taskService';
import PropertyDetails from './subDetailsIndex/PropertyDetails';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';

export default function DetailsIndex() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const { id: activeItemId, type: activeItemType } = pilotSideOver;

  const { data: hub } = UseGetHubDetails({
    activeItemId,
    activeItemType
  });
  const { data: wallet } = UseGetWalletDetails({
    activeItemId,
    activeItemType
  });
  const { data: list } = UseGetListDetails({
    activeItemId,
    activeItemType
  });
  const { data: task } = getOneTaskServices({ task_id: activeItemId });
  const taskDetails = task?.data.task;

  const showDetailsType = () => {
    if (activeItemType === EntityType.hub || activeItemType === EntityType.subHub) {
      return <PropertyDetails Details={hub?.data.hub} key={hub?.data.hub.id} />;
    } else if (activeItemType === EntityType.task) {
      return <PropertyDetails Details={taskDetails} key={taskDetails?.id} />;
    } else if (activeItemType === EntityType.wallet || activeItemType === 'subWallet') {
      return <PropertyDetails Details={wallet?.data.wallet} key={wallet?.data.wallet.id} />;
    } else if (activeItemType === EntityType.list) {
      return <PropertyDetails Details={list?.data.list} key={list?.data.list.id} />;
    }
  };

  return (
    <>
      <section className="mt-3">{showDetailsType()}</section>
    </>
  );
}
