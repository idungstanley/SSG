import React from 'react';
import { MdDragIndicator } from 'react-icons/md';
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
  item?: NeighborsProps;
  items?: NeighborsProps[];
}

export default function SubtabDrag({ id, item, items, icon, showPilot, activeSub, name, source }: TabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  const dispatch = useDispatch();

  const activeItem = items?.find((item) => item.id === activeSub);
  const Neighbors = useFindNeighbors(items as NeighborsProps[], activeItem as NeighborsProps);

  const { leftNeighbor, rightNeighbor } = Neighbors;

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined,
    zIndex: isDragging ? 1 : undefined
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
    const leftItem = leftNeighbor && items?.find((item) => item.id === leftNeighbor.id);
    const rightItem = rightNeighbor && items?.find((item) => item.id === rightNeighbor.id);

    switch (item?.id) {
      case activeItem:
        return 'rounded-t-md';
      case leftItem?.id:
        return 'rounded-b-md';
      case rightItem?.id:
        return 'rounded-b-md';
      default:
        return '';
    }
  };

  return (
    <section
      className={`flex w-full flex-col truncate bg-gray-100 divide-x ${borderNeighbors()}`}
      key={id}
      style={style}
    >
      <div
        key={id}
        onClick={() => handleClick(id)}
        className={`relative w-full flex truncate justify-center flex-grow p-1 font-medium transition cursor-pointer group hover:text-primary-700  ${
          id === activeSub && 'bg-primary-100 rounded-t-md text-primary-700'
        } ${borderNeighbors()}`}
      >
        <span className="focus:cursor-move" ref={setNodeRef} {...attributes} {...listeners}>
          <span
            className={`${!showPilot && 'text-xs'} ${
              id === activeSub && !showPilot && 'bg-green-500 p-2 rounded'
            } flex truncate`}
          >
            {icon ? icon : <img src={source} alt="Hub Icon" className="w-2 h-2" />}
            {item && <p className="truncate">{item.name}</p>}
          </span>
        </span>
      </div>
    </section>
  );
}
