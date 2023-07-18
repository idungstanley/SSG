import { ReactNode } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setDraggableItem } from '../../../../features/list/listSlice';
import { useMoveTask } from '../../../../features/task/taskService';
import { useQueryClient } from '@tanstack/react-query';
import { generateFilters } from '../../../../components/TasksHeader/lib/generateFilters';
import { setPlaces } from '../../../../features/account/accountSlice';
import { arrayMove } from '@dnd-kit/sortable';
import { useMoveListService } from '../../../../features/list/listService';
import { useMoveHubsService } from '../../../../features/hubs/hubService';
import { useMoveWalletsService } from '../../../../features/wallet/walletService';

interface DragContextProps {
  children: ReactNode;
}

export default function DragContext({ children }: DragContextProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // needed for invalidation
  const { filterTaskByAssigneeIds: assigneeUserId } = useAppSelector((state) => state.task);
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;
  const { filters } = generateFilters();
  const { places } = useAppSelector((state) => state.account);

  const { mutate: onMove } = useMoveTask();
  const { mutate: onMoveList } = useMoveListService();
  const { mutate: onMoveHub } = useMoveHubsService();
  const { mutate: onMoveWallet } = useMoveWalletsService();

  // set active task id to store
  const onDragStart = (e: DragStartEvent) => {
    const id = e.active.id as string;

    dispatch(setDraggableItem(id));
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    const overId = over?.id as string;
    const activeId = active?.id as string;
    const isPlace = over?.data.current?.isPlace && active?.data.current?.isPlace;
    const isTaskToList = over?.data.current?.isOverList && active?.data.current?.isTask;
    const isListToHub = over?.data.current?.isOverHub && active?.data.current?.isList;
    const isListToWallet = over?.data.current?.isOverWallet && active?.data.current?.isList;

    const isTaskToTask = over?.data.current?.isOverTask && active?.data.current?.isTask;

    const isHubToHub = over?.data.current?.isOverHub && active?.data.current?.isHub;

    const isWalletToWallet = over?.data.current?.isOverWallet && active?.data.current?.isWallet;

    const isWalletToHub = over?.data.current?.isOverHub && active?.data.current?.isWallet;
    // drag and drop places
    if (isPlace) {
      handleMovePlace(active.id, over?.id);
    }
    if (isTaskToList) {
      // drag and drop tasks
      if (overId && activeId) {
        onMove({
          taskId: activeId,
          listId: overId,
          overType: 'list'
        });
      }
      // reset dragging item
      dispatch(setDraggableItem(null));
      queryClient.invalidateQueries(['task', { listId: overId, assigneeUserId, sortArrUpdate, filters }]);
    }
    if (isListToHub) {
      onMoveList({
        listId: activeId,
        hubId: overId,
        type: 'hub'
      });
      dispatch(setDraggableItem(null));
    }
    if (isListToWallet) {
      onMoveList({
        listId: activeId,
        hubId: overId,
        type: 'wallet'
      });
      dispatch(setDraggableItem(null));
    }
    if (isTaskToTask) {
      if (activeId !== overId) {
        onMove({
          taskId: activeId,
          listId: overId,
          overType: 'task'
        });
        dispatch(setDraggableItem(null));
      }
    }

    if (isHubToHub) {
      if (activeId !== overId) {
        onMoveHub({
          parent_id: overId,
          hubId: activeId
        });
      }
    }
    if (isWalletToWallet) {
      if (activeId !== overId) {
        onMoveWallet({
          walletId: activeId,
          parent_id: overId,
          overType: 'wallet'
        });
      }
    }
    if (isWalletToHub) {
      if (activeId !== overId) {
        onMoveWallet({
          walletId: activeId,
          hubId: overId,
          overType: 'hub'
        });
      }
    }
  };

  const handleMovePlace = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
    if (activeId !== overId) {
      const findActive = places.find((i) => i.id === activeId);
      const findOver = places.find((i) => i.id === overId);

      if (findActive && findOver) {
        const oldIndex = places.indexOf(findActive);
        const newIndex = places.indexOf(findOver);

        const sortArray = arrayMove(places, oldIndex, newIndex);

        localStorage.setItem('placeItem', JSON.stringify([...sortArray.map((i) => i.id)]));

        dispatch(setPlaces(sortArray));
      }
    }
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
}
