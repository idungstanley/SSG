import React, { useEffect } from 'react';
import { UseGetHubDetails } from '../../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../../features/list/listService';
import { getOneTaskServices } from '../../../../../features/task/taskService';
import PropertyDetails from './subDetailsIndex/PropertyDetails';
import { useParams } from 'react-router-dom';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { useAppDispatch } from '../../../../../app/hooks';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

export default function DetailsIndex() {
  const dispatch = useAppDispatch();

  const { hubId, walletId, listId, taskId } = useParams();

  const { data: hub } = UseGetHubDetails({
    activeItemId: hubId,
    activeItemType: EntityType.hub
  });

  const { data: wallet } = UseGetWalletDetails({
    activeItemId: walletId,
    activeItemType: EntityType.wallet
  });
  const { data: list } = UseGetListDetails({
    activeItemId: listId != undefined ? listId : null,
    activeItemType: EntityType.list
  });

  const { data: task } = getOneTaskServices({ task_id: taskId != undefined ? taskId : null });

  const taskDetails = task?.data.task;

  useEffect(() => {
    if (taskId && (hubId || walletId || listId) && taskDetails) {
      dispatch(
        setActiveItem({
          activeItemId: taskDetails.id,
          activeItemType: EntityType.task,
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
