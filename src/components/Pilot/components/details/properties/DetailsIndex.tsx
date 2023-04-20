import React from 'react';
// import { useAppSelector } from '../../../../../app/hooks';
import { UseGetHubDetails } from '../../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../../features/list/listService';
import { getOneTaskServices } from '../../../../../features/task/taskService';
import PropertyDetails from './subDetailsIndex/PropertyDetails';
import { useParams } from 'react-router-dom';

export default function DetailsIndex() {
  // const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { hubId, walletId, listId, taskId } = useParams();

  const { data: hub } = UseGetHubDetails({
    activeItemId: hubId,
    activeItemType: 'hub'
  });

  const { data: wallet } = UseGetWalletDetails({
    activeItemId: walletId,
    activeItemType: 'wallet'
  });
  // console.log(wallet?.data.wallet);
  const { data: list } = UseGetListDetails({
    activeItemId: listId,
    activeItemType: 'list'
  });

  const { data: task } = getOneTaskServices({ task_id: taskId != undefined ? taskId : null });

  const taskDetails = task?.data.task;

  const showDetailsType = () => {
    if (taskId !== undefined) {
      return <PropertyDetails Details={taskDetails} key={taskDetails?.id} />;
    } else if (hubId) {
      return <PropertyDetails Details={hub?.data.hub} key={hub?.data.hub.id} />;
    } else if (walletId) {
      return <PropertyDetails Details={wallet?.data.wallet} key={wallet?.data.wallet.id} />;
    } else if (listId) {
      return <PropertyDetails Details={list?.data.list} key={list?.data.list.id} />;
    }
  };

  return (
    <>
      <section className="mt-3">{showDetailsType()}</section>
    </>
  );
}
