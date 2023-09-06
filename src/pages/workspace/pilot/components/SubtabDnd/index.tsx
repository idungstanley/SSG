import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useDispatch } from 'react-redux';
import {
  setActiveSubChecklistTabId,
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
  setActiveSubHubManagerTabId
} from '../../../../../features/workspace/workspaceSlice';
import useFindNeighbors, { NeighborsProps } from '../../../../../hooks/useFindNeighbors';

interface TabProps {
  id: number;
  icon?: JSX.Element;
  showPilot?: boolean;
  activeSub?: number | null;
  name: string;
  source?: string;
  item: NeighborsProps;
  items: NeighborsProps[];
}

export default function SubtabDrag({ id, item, items, icon, showPilot, activeSub, name, source }: TabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  const dispatch = useDispatch();

  const activeItem = items.find((item) => item.id === activeSub);
  const Neighbors = useFindNeighbors(items as NeighborsProps[], activeItem as NeighborsProps);

  const { leftNeighbor, rightNeighbor } = Neighbors;
  const leftItem = leftNeighbor && items?.find((item) => item.id === leftNeighbor.id);
  const rightItem = rightNeighbor && items?.find((item) => item.id === rightNeighbor.id);

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined,
    zIndex: isDragging ? 1 : undefined,
    borderBottomRightRadius: id === leftItem?.id ? '0.375rem' : '',
    borderBottomLeftRadius: id === rightItem?.id ? '0.375rem' : ''
  };

  const handleClick = (id: number) => {
    if (name === 'connect') {
      dispatch(setActiveSubCommunicationTabId(id));
    } else if (name === 'details') {
      dispatch(setActiveSubDetailsTabId(id));
    } else if (name === 'Checklist') {
      dispatch(setActiveSubChecklistTabId(id));
    } else if (name === 'hubmanager') {
      dispatch(setActiveSubHubManagerTabId(id));
    }
  };

  const borderNeighbors = () => {
    switch (item?.id) {
      case leftItem?.id:
        return {
          borderBottomRightRadius: '0.375rem'
        };
      case rightItem?.id:
        return {
          borderBottomLeftRadius: '0.375rem'
        };
    }
  };

  return (
    <section className="flex flex-col w-full bg-gray-100 divide-x" key={id} style={style}>
      <div
        key={id}
        onClick={() => handleClick(id)}
        className={`relative w-full flex justify-center flex-grow p-1 font-medium transition cursor-pointer group hover:text-primary-700  ${
          id === activeSub && 'bg-primary-200 rounded-t-md text-primary-700'
        }`}
        style={borderNeighbors()}
      >
        <span
          className={`${!showPilot && 'text-xs'} ${
            id === activeSub && !showPilot && 'bg-green-500 p-2 rounded'
          } flex items-center gap-1`}
        >
          <span className="focus:cursor-move" ref={setNodeRef} {...attributes} {...listeners}>
            {icon ? icon : <img src={source} alt="Hub Icon" className="w-2 h-2" />}
          </span>
          {item && <p className="truncate">{item.name}</p>}
        </span>
      </div>
    </section>
  );
}
