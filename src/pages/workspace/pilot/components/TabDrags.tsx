import React from 'react';
import { cl } from '../../../../utils';
import { useSortable } from '@dnd-kit/sortable';
import { setActiveTabId } from '../../../../features/workspace/workspaceSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../app/hooks';
import { GrDrag } from 'react-icons/gr';

interface TabProps {
  id: number | undefined;
  name: string | undefined;
  source: string | undefined;
  showPilot?: boolean;
  showPilotIconView?: boolean;
  subTab?: JSX.Element;
}

export default function TabDrag({
  id,
  name,
  source,
  showPilot,
  showPilotIconView,
  subTab,
}: TabProps) {
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
  const dispatch = useDispatch();
  const { activeTabId } = useAppSelector((state) => state.workspace);
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined,
    zIndex: isDragging ? 1 : undefined,
  };

  const handleClick = (tabId: number | undefined) => {
    dispatch(setActiveTabId(tabId));
  };

  return (
    <section
      style={style}
      className={`flex flex-auto ${
        id === activeTabId && showPilot === false ? 'flex-col' : 'flex-row'
      }`}
    >
      <div
        onClick={() => handleClick(id)}
        className={cl(
          id === activeTabId
            ? 'bg-gray-300 text-black'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
          showPilot ? 'gap-2 pr-6' : 'py-3 px-3',
          showPilotIconView ? 'w-12 justify-center' : '',
          'relative group py-2 font-medium h-fit flex-grow items-center cursor-pointer flex transition'
        )}
        aria-current={id === activeTabId ? 'page' : undefined}
      >
        {id === activeTabId && (
          <span
            className={`absolute bg-green-500 ${
              showPilotIconView
                ? 'top-0 left-0 right-0 h-0.5 w-fit'
                : 'top-0 left-0 bottom-0 w-1'
            }`}
          ></span>
        )}
        <div className="flex items-center ml-1">
          <span
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`text-gray-200 justify-center cursor-move opacity-0 group-hover:opacity-100 ${
              showPilot ? 'block' : 'hidden'
            }`}
          >
            <GrDrag className="text-base text-gray-200 opacity-30 w-3 h-3" />
          </span>
          <img src={source} alt="" className="w-4 h-4" />
        </div>
        <p
          className={`text-xs ${showPilot ? 'block' : 'hidden'} ${
            showPilotIconView ? 'hidden' : 'block'
          }`}
        >
          {name}
        </p>
      </div>
      {id === activeTabId && showPilot === false && subTab}
    </section>
  );
}
