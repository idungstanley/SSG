import React from 'react';
import { useAppSelector } from '../../../../../../../../app/hooks';
import { UseGetHubDetails } from '../../../../../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../../../../../features/list/listService';
import { getOneTaskServices } from '../../../../../../../../features/task/taskService';
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
  // console.log(wallet?.data.wallet);
  const { data: list } = UseGetListDetails({
    activeItemId,
    activeItemType
  });
  const { data: task } = getOneTaskService({ task_id: activeItemId });
  const taskDetails = task?.data.task;

  const showDetailsType = () => {
    if (activeItemType == 'hub' || activeItemType == 'subhub') {
      return <PropertyDetails Details={hub?.data.hub} key={hub?.data.hub.id} />;
    } else if (activeItemType == 'task') {
      return <PropertyDetails Details={taskDetails} key={taskDetails?.id} />;
    } else if (activeItemType == 'wallet' || activeItemType == 'subWallet') {
      return <PropertyDetails Details={wallet?.data.wallet} key={wallet?.data.wallet.id} />;
    } else if (activeItemType == 'list') {
      return <PropertyDetails Details={list?.data.list} key={list?.data.list.id} />;
    }
  };

  return (
    <>
      <section className="mt-3">{showDetailsType()}</section>
    </>
  );
}
