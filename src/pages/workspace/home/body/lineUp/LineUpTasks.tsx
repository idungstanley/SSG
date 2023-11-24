import React, { useEffect, useState } from 'react';
import { Task } from '../../../../../features/task/interface.tasks';
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import LineUpTasksItem from './LineUpTasksItem';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';

interface ILineUpTasks {
  lineUp: Task[];
  handleRemoveLineUpTask: (task: Task) => void;
}

export default function LineUpTasks({ lineUp, handleRemoveLineUpTask }: ILineUpTasks) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const idsFromLS = JSON.parse(localStorage.getItem('lineUpTasks') || '[]') as string[];

  const [items, setItems] = useState(lineUp?.sort((a, b) => idsFromLS?.indexOf(a.id) - idsFromLS?.indexOf(b.id)));

  useEffect(() => {
    setItems(lineUp?.sort((a, b) => idsFromLS?.indexOf(a.id) - idsFromLS?.indexOf(b.id)));
  }, [lineUp]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const findActive = items.find((i) => i.id === active.id);
      const findOver = items.find((i) => i.id === over?.id);

      if (findActive && findOver) {
        setItems((items) => {
          const oldIndex = items.indexOf(findActive);
          const newIndex = items.indexOf(findOver);

          const sortArray = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem('lineUpTasks', JSON.stringify([...sortArray.map((i) => i.id)]));

          return sortArray;
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
      <SortableContext strategy={rectSortingStrategy} items={items}>
        {lineUp.map((task) => (
          <div key={task.id}>
            <LineUpTasksItem handleRemoveLineUpTask={handleRemoveLineUpTask} task={task} />
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
}
