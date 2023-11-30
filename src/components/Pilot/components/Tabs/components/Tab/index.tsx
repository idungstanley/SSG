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
    opacity: isDragging ? '.4' : '1',
    backgroundColor: isDragging ? '#fff' : undefined, // ? bg for draggable, can be replaced by any style
    zIndex: isDragging ? 1 : undefined, // important for overlay
    height: showTabLabel ? '40px' : '100%',
    borderLeft: '0',
    borderTop: '0',
    borderBottom: showTabLabel ? '0.25px solid rgba(178, 178, 178, 0.25)' : 'none'
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
          ? 'bg-alsoit-purple-50 text-alsoit-purple-300'
          : 'alsoit-gray-300 hover:text-gray-700 hover:bg-alsoit-gray-125',
        'group relative flex items-center justify-between cursor-pointer text-sm h-full transition duration-500 border-alsoit-gray-75',
        showTabLabel ? '' : 'px-0.5 py-2 pr-5'
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
        className={cl(
          'flex items-center text-xs gap-2 truncate',
          isActiveTab && 'text-alsoit-purple-300 font-medium',
          showTabLabel ? 'justify-start w-full' : 'justify-center'
        )}
      >
        <span className="flex justify-center" style={{ width: '21px' }}>
          {React.cloneElement(icon, { active: isActiveTab })}
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
