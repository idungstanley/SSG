import { ReactNode } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setDraggableItem } from '../../../../features/list/listSlice';
import { useMoveTask } from '../../../../features/task/taskService';
import { useQueryClient } from '@tanstack/react-query';
import { generateFilters } from '../../../../components/TasksHeader/lib/generateFilters';
import { setPlaces } from '../../../../features/account/accountSlice';
import { arrayMove } from '@dnd-kit/sortable';

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

    console.log(over);

    // drag and drop places
    if (isPlace) {
      if (active.id !== over?.id) {
        const findActive = places.find((i) => i.id === active.id);
        const findOver = places.find((i) => i.id === over?.id);

        if (findActive && findOver) {
          const oldIndex = places.indexOf(findActive);
          const newIndex = places.indexOf(findOver);

          const sortArray = arrayMove(places, oldIndex, newIndex);

          localStorage.setItem('placeItem', JSON.stringify([...sortArray.map((i) => i.id)]));

          dispatch(setPlaces(sortArray));
        }
      }
    } else {
      // drag and drop tasks
      if (overId && activeId) {
        onMove({
          taskId: activeId,
          listId: overId
        });
      }

      // reset dragging item
      dispatch(setDraggableItem(null));
      queryClient.invalidateQueries(['task', { listId: overId, assigneeUserId, sortArrUpdate, filters }]);
    }
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );
}
