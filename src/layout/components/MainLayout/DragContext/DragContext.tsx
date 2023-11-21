import { ReactNode, useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setDragOverItem,
  setDragOverList,
  setDragOverTask,
  setDraggableItem,
  setDraggableTask
} from '../../../../features/list/listSlice';
import { useMoveTask, useMultipleTaskMove } from '../../../../features/task/taskService';
import { setPlaces } from '../../../../features/account/accountSlice';
import { arrayMove } from '@dnd-kit/sortable';
import { useMoveListService } from '../../../../features/list/listService';
import { useMoveHubsService } from '../../../../features/hubs/hubService';
import { useMoveWalletsService } from '../../../../features/wallet/walletService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { setDragToBecomeSubTask } from '../../../../features/task/taskSlice';
import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { IList } from '../../../../features/hubs/hubs.interfaces';
import MatchStatusPopUp from '../../../../components/status/Components/MatchStatusPopUp';
import { setMatchedStatus, setStatusesToMatch } from '../../../../features/hubs/hubSlice';
import { setMatchData } from '../../../../features/general/prompt/promptSlice';

interface DragContextProps {
  children: ReactNode;
}
export default function DragContext({ children }: DragContextProps) {
  //Variables
  const minDistanceToMakeSubtask = 20;

  //App hooks
  const dispatch = useAppDispatch();

  // needed for invalidation
  const { dragToBecomeSubTask, selectedTasksArray } = useAppSelector((state) => state.task);
  const { places } = useAppSelector((state) => state.account);
  const { matchData } = useAppSelector((state) => state.prompt);
  const { matchedStatus, statusesToMatch } = useAppSelector((state) => state.hub);
  const { draggableTask, dragOverList } = useAppSelector((state) => state.list);

  const { mutate: onMove } = useMoveTask();
  const { mutate: onMultipleTaskMove } = useMultipleTaskMove();
  const { mutate: onMoveList } = useMoveListService();
  const { mutate: onMoveHub } = useMoveHubsService();
  const { mutate: onMoveWallet } = useMoveWalletsService();

  // set active task id to store
  const onDragStart = (e: DragStartEvent) => {
    const id = e.active.id as string;
    if (e.active?.data.current?.isTask) {
      const movingTask = e.active?.data.current?.movingTask as ITaskFullList;
      dispatch(setDraggableTask(movingTask));
    }

    dispatch(setDraggableItem(id));
    dispatch(setDragToBecomeSubTask(true));
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    const overId = over?.id as string;
    const activeId = active?.id as string;
    const isPlace = over?.data.current?.isPlace && active?.data.current?.isPlace;
    const isTaskToList = over?.data.current?.isOverList && active?.data.current?.isTask && !over?.data.current?.isTask;
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
        if (selectedTasksArray.length && selectedTasksArray.includes(activeId)) {
          onMultipleTaskMove({
            taskIds: selectedTasksArray,
            listId: overId,
            overType: EntityType.list
          });
        } else {
          onMove({
            taskId: activeId,
            listId: overId,
            overType: EntityType.list
          });
        }
      }
    }
    if (isListToHub) {
      onMoveList({
        listId: activeId,
        hubId: overId,
        type: EntityType.hub
      });
    }
    if (isListToWallet) {
      onMoveList({
        listId: activeId,
        hubId: overId,
        type: EntityType.wallet
      });
    }
    if (isTaskToTask) {
      if (activeId !== overId) {
        if (dragToBecomeSubTask) {
          onMove({
            taskId: activeId,
            listId: overId,
            overType: EntityType.task
          });
        } else {
          onMove({
            taskId: activeId,
            moveAfterId: overId,
            overType: EntityType.task
          });
        }
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
          overType: EntityType.wallet
        });
      }
    }
    if (isWalletToHub) {
      if (activeId !== overId) {
        onMoveWallet({
          walletId: activeId,
          hubId: overId,
          overType: EntityType.hub
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

  const onDragOver = (e: DragOverEvent) => {
    const id = e.over?.id as string;
    dispatch(setDragOverItem(id));
    // Determine if the task should become a subtask
    if (e.delta?.x >= minDistanceToMakeSubtask) {
      dispatch(setDragToBecomeSubTask(true));
    } else {
      dispatch(setDragToBecomeSubTask(false));
    }

    if (e.over?.data.current?.isOverTask) {
      dispatch(setDragOverList(null));
      dispatch(setDragOverTask(e.over?.data.current?.overTask as ITaskFullList));
    }
    if (e.over?.data.current?.isOverList) {
      dispatch(setDragOverTask(null));
      dispatch(setDragOverList(e.over?.data.current?.overList as IList));
    }
  };

  const [matchingStatusValidation, setMatchingStatusValidation] = useState<string>('');

  const clearMatchData = () => {
    setMatchingStatusValidation('');
    dispatch(setMatchData([]));
    dispatch(setMatchedStatus([]));
    dispatch(setStatusesToMatch([]));
  };

  const matchStatusArray = [
    {
      label: 'Save Changes',
      style: 'danger',
      callback: async () => {
        if (matchedStatus.length !== matchData.length) {
          setMatchingStatusValidation('Whoops! Select a status for every conflicting status');
          setTimeout(() => {
            setMatchingStatusValidation('');
          }, 3000);
        } else {
          if (selectedTasksArray.length && selectedTasksArray.includes(draggableTask?.id as string)) {
            const mathesArray: { from: string; to: string }[] = [];
            matchedStatus.forEach((item, index) => {
              const currentId = statusesToMatch.find((status) => matchedStatus[index].name === status.name)
                ?.id as string;
              mathesArray.push({ from: item.id as string, to: currentId });
            });
            onMultipleTaskMove({
              taskIds: selectedTasksArray,
              listId: dragOverList?.id as string,
              overType: EntityType.list,
              status_matches: mathesArray
            });
          } else {
            let newId = '';
            if (statusesToMatch.length) {
              newId = statusesToMatch.find((status) => matchedStatus[0].name === status.name)?.id as string;
            }
            if (draggableTask?.id && dragOverList?.id) {
              onMove({
                taskId: draggableTask?.id as string,
                listId: dragOverList?.id as string,
                overType: EntityType.list,
                status_from: matchData[0].id as string,
                status_to: newId
              });
            }
          }
          clearMatchData();
        }
      }
    },
    {
      label: 'Cancel',
      style: 'plain',
      callback: () => {
        clearMatchData();
      }
    }
  ];

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      {children}
      <MatchStatusPopUp
        validationMessage={matchingStatusValidation}
        options={matchStatusArray}
        title="Match Statuses"
        body={`You changed statuses in your List. ${matchData?.length} status will be affected. How should we handle these statuses?`}
        setShow={() => dispatch(setStatusesToMatch([]))}
        show={!!statusesToMatch.length && !!dragOverList?.id}
      />
    </DndContext>
  );
}
