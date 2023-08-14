import React, { useEffect } from 'react';
// import { useAppSelector } from '../../../../../app/hooks';
import { UseGetHubDetails } from '../../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../../features/list/listService';
import { getOneTaskServices } from '../../../../../features/task/taskService';
import PropertyDetails from './subDetailsIndex/PropertyDetails';
import { useParams } from 'react-router-dom';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { useAppDispatch } from '../../../../../app/hooks';

export default function DetailsIndex() {
  const dispatch = useAppDispatch();

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
    activeItemId: listId != undefined ? listId : null,
    activeItemType: 'list'
  });

  const { data: task } = getOneTaskServices({ task_id: taskId != undefined ? taskId : null });

  const taskDetails = task?.data.task;

  useEffect(() => {
    if (taskId && (hubId || walletId || listId)) {
      dispatch(
        setActiveItem({
          activeItemId: taskDetails?.id,
          activeItemType: 'task',
          activeItemName: taskDetails?.name
        })
      );
    }
  }, [taskDetails]);

  const showDetailsType = () => {
    if (taskId && (hubId || walletId || listId)) {
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
