import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { cl } from '../../../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setActiveTabId } from '../../../../../../features/workspace/workspaceSlice';
import ActiveBarIdentification from '../../../../../tasks/Component/ActiveBarIdentification';

interface TabProps {
  id: string;
  label: string;
  icon: JSX.Element;
  showTabLabel: boolean;
}

export default function Tab({ id, label, icon, showTabLabel }: TabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });
  const { activeTabId } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined, // ? bg for draggable, can be replaced by any style
    zIndex: isDragging ? 1 : undefined, // important for overlay
    height: '40px',
    borderLeft: '0',
    borderTop: '0',
    borderBottom: '.25px solid #B2B2B2'
  };

  const handleClick = (tabId: string) => {
    dispatch(setActiveTabId(tabId));
  };

  const isActiveTab = id === activeTabId;

  return (
    <div
      style={style}
      onClick={() => handleClick(id)}
      className={cl(
        isActiveTab
          ? 'bg-primary-200 text-primary-700'
          : 'alsoit-gray-300 hover:text-gray-700 hover:bg-alsoit-gray-125',
        'group relative flex items-center justify-between cursor-pointer text-sm h-full transition duration-500 border-alsoit-gray-75'
      )}
      aria-current={isActiveTab ? 'page' : undefined}
    >
      <ActiveBarIdentification showBar={isActiveTab} />
      {/* drag area */}
      <span ref={setNodeRef} {...attributes} {...listeners} className="opacity-0 group-hover:opacity-100">
        <MdDragIndicator aria-hidden="true" className="w-4 h-4 text-gray-400 cursor-move" />
      </span>

      {/* main content */}
      <div
        title={label}
        className={cl(
          'flex items-center text-xs gap-2 truncate',
          isActiveTab && 'text-primary-700 font-medium',
          showTabLabel ? 'justify-start w-full' : 'justify-center'
        )}
      >
        <span className="flex justify-center" style={{ width: '20px' }}>
          {icon}
        </span>
        {showTabLabel ? (
          <p className="truncate font-medium" style={{ fontSize: '13px' }}>
            {label}
          </p>
        ) : null}
      </div>
      <div />
    </div>
  );
}
