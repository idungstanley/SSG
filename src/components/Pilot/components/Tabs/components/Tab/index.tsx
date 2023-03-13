import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { cl } from '../../../../../../utils';

interface TabProps {
  id: number;
  label: string;
  icon: JSX.Element;
  activeTabId: number;
  setActiveTabId: (i: number) => void;
  showTabLabel: boolean;
}

export default function Tab({ id, label, icon, activeTabId, setActiveTabId, showTabLabel }: TabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined, // ? bg for draggable, can be replaced by any style
    zIndex: isDragging ? 1 : undefined // important for overlay
  };

  const handleClick = (tabId: number) => {
    setActiveTabId(tabId);
  };

  const isActiveTab = id === activeTabId;

  return (
    <div
      style={style}
      onClick={() => handleClick(id)}
      className={cl(
        isActiveTab ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
        'group relative flex items-center justify-between cursor-pointer text-sm px-1 py-2 pr-5 border'
      )}
      aria-current={isActiveTab ? 'page' : undefined}
    >
      {/* green line on active */}
      {isActiveTab ? <div className="absolute bg-green-400 left-0 top-0 w-full h-0.5" /> : null}

      {/* drag area */}
      <span ref={setNodeRef} {...attributes} {...listeners} className="opacity-0 group-hover:opacity-100">
        <MdDragIndicator aria-hidden="true" className="w-4 h-4 cursor-move text-gray-400" />
      </span>

      {/* main content */}
      <div
        title={label}
        className={cl(
          'flex items-center text-xs gap-2 truncate',
          isActiveTab && 'text-black font-medium',
          showTabLabel ? 'justify-start w-full' : 'justify-center'
        )}
      >
        {icon}
        {showTabLabel ? <p className="truncate">{label}</p> : null}
      </div>
      <div />
    </div>
  );
}
