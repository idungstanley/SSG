import React from 'react';
import { classNames } from '../../../../../../utils';
import { MdDragIndicator } from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';

interface NavItemProps {
  id: number;
  label: string;
  icon: JSX.Element;
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

export default function NavItem({
  id,
  label,
  icon,
  activeTabId,
  setActiveTabId,
}: NavItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined, // ? bg for draggable, can be replaced by any style
    zIndex: isDragging ? 1 : undefined, // important for overlay
  };

  const handleClick = (tabId: number) => {
    setActiveTabId(tabId);
  };

  return (
    <div
      style={style}
      onClick={() => handleClick(id)}
      className={classNames(
        id === activeTabId
          ? 'bg-gray-100 text-gray-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        'group flex items-center justify-between cursor-pointer text-sm gap-2 px-3 py-2 pr-7 border'
      )}
      aria-current={id === activeTabId ? 'page' : undefined}
    >
      {/* drag area */}
      <span
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="opacity-0 group-hover:opacity-100"
      >
        <MdDragIndicator aria-hidden="true" className="w-4 h-4 cursor-move" />
      </span>

      {/* main content */}
      <div className="grid grid-cols-autoFr gap-2 truncate">
        {icon}
        <p className="truncate" title={label}>
          {label}
        </p>
      </div>
      <div />
    </div>
  );
}
