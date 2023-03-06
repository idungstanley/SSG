import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { UseGetHubDetails } from '../../../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../../../features/list/listService';
import { getOneTaskServices } from '../../../../../../features/task/taskService';
import PropertyDetails from './subDetailsIndex/PropertyDetails';

export default function DetailsIndex() {
  // const { activeItemId, activeItemType } = useAppSelector(
  //   (state) => state.workspace
  // );
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
  const hubDetails = hub?.data.hub;
  const walletDetails = wallet?.data.wallet;
  const listDetails = list?.data.list;

  const showDetailsType = () => {
    if (activeItemType == 'hub' || activeItemType == 'subhub') {
      return <PropertyDetails Details={hubDetails} key={hubDetails?.id} />;
    } else if (activeItemType == 'task') {
      return <PropertyDetails Details={taskDetails} key={taskDetails?.id} />;
    } else if (activeItemType == 'wallet' || activeItemType == 'subWallet') {
      return <PropertyDetails Details={walletDetails} key={walletDetails?.id} />;
    } else if (activeItemType == 'list') {
      return <PropertyDetails Details={listDetails} key={listDetails?.id} />;
    }
  };

  return (
    <>
      <section className="mt-3">{showDetailsType()}</section>
    </>
  );
}
