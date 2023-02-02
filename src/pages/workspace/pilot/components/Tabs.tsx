import React, { useRef, useState } from 'react';
import communicationIcon from '../../../../assets/branding/communication.png';
import logsIcon from '../../../../assets/branding/logs.png';
import detailIcon from '../../../../assets/branding/detail.png';
import automationIcon from '../../../../assets/branding/automation.png';
import timeclockIcon from '../../../../assets/branding/timeclock.png';
import permissionIcon from '../../../../assets/branding/permission.png';
import checklistIcon from '../../../../assets/branding/checklist-icon.svg';
import { classNames } from '../../../../utils';
import { HiChevronDoubleRight, HiChevronDoubleUp } from 'react-icons/hi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  setPilotWidth,
  setShowPilot,
  setShowPilotIconView,
} from '../../../../features/workspace/workspaceSlice';
import { MdDragIndicator } from 'react-icons/md';
import DetailsSubTab from './details/DetailsSubTab';
import CommunicationSubTab from './communication/CommunicationSubTab';
import TimeSubTab from './timeClock/subtabs/TimeSubTab';

interface TabProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

interface IItem {
  id: number;
  name: string;
  source: any;
  subTab?: any;
}
function Tab({ activeTabId, setActiveTabId }: TabProps) {
  const dispatch = useDispatch();
  const {
    showPilot,
    showPilotIconView,
    activeItemName,
    activeItemType,
    pilotWidth,
  } = useAppSelector((state) => state.workspace);
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [scrollTop, setScrollTop] = useState<string>('');
  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (sidebarRef !== undefined) {
        if (sidebarRef.current !== undefined && sidebarRef.current !== null)
          if (isResizing) {
            dispatch(
              setPilotWidth(
                mouseMoveEvent.clientX - sidebarRef?.current?.offsetLeft
              )
            );
          }
      }
    },
    [isResizing]
  );
  console.log(pilotWidth);
  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing, pilotWidth]);
  const handleClick = (tabId: number) => {
    setActiveTabId(tabId);
  };
  const handleShowPilot = () => {
    if (showPilot) {
      dispatch(setShowPilot(false));
    } else {
      dispatch(setShowPilot(true));
    }
  };
  const handleShowPilotIconView = () => {
    if (showPilotIconView) {
      dispatch(setShowPilotIconView(false));
    } else {
      dispatch(setShowPilotIconView(true));
    }
  };

  const [items, setItems] = useState<IItem[]>([
    {
      id: 1,
      name: 'Connect',
      source: communicationIcon,
      subTab: <CommunicationSubTab />,
    },
    {
      id: 2,
      name: 'Logs',
      source: logsIcon,
    },
    {
      id: 3,
      name: 'Permissions',
      source: permissionIcon,
    },

    {
      id: 4,
      name: 'Details',
      source: detailIcon,
      subTab: <DetailsSubTab />,
    },
    {
      id: 5,
      name: 'Automation',
      source: automationIcon,
    },
    {
      id: 6,
      name: 'TimeClock',
      source: timeclockIcon,
      subTab: <TimeSubTab />,
    },
    {
      id: 7,
      name: 'Checklist',
      source: checklistIcon,
    },
  ]);

  // Drag an drop functionality
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  const handleSort = () => {
    const _pilotOptions = [...items];
    const draggedItemContent = _pilotOptions.splice(dragItem.current, 1)[0];
    _pilotOptions.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_pilotOptions);
  };

  return (
    <div
      className="gap-4 pb-1 border"
      aria-label="Tabs"
      ref={sidebarRef}
      style={
        showPilot
          ? { maxWidth: '450px', width: `${pilotWidth}px`, minWidth: '230px' }
          : { width: '48px' }
      }
    >
      <span className="group">
        <div
          className={`absolute top-0 left-0 bottom-0 z-40 h-full justify-self-end shrink-0 grow-0 cursor-all-scroll ${
            pilotWidth >= 230 && 'group-hover:bg-green-300'
          }`}
          onMouseDown={startResizing}
          onMouseUp={stopResizing}
          style={{
            cursor: 'col-resize',
            width: `${pilotWidth > 320 ? '4px' : '2px'}`,
          }}
        ></div>
        <div
          className={`absolute top-0 bottom-0 h-full z-40 justify-self-end shrink-0 grow-0 cursor-all-scroll ${
            pilotWidth <= 320 && 'group-hover:bg-green-300'
          }`}
          style={{
            cursor: 'col-resize',
            width: `${pilotWidth < 230 ? '4px' : '2px'}`,
            left: `${pilotWidth < 230 ? '-4.8px' : '-2.8px'}`,
          }}
          onMouseDown={startResizing}
        ></div>
      </span>
      <section>
        <div id="entity" className="flex -mb-3 p-1 text-xs capitalize">
          <p className="text-gray-600"> {activeItemType && activeItemType}</p>
          <p>:</p>
          <p className="pl-1 text-gray-500 capitalize">
            {activeItemName && activeItemName}
          </p>
        </div>
        <div
          className={`flex items-center h-fit px-2 ${
            showPilot ? 'flex-row py-2' : 'flex-col gap-1'
          }`}
        >
          <HiChevronDoubleRight
            onClick={() => handleShowPilot()}
            className={`cursor-pointer ${
              showPilot
                ? 'translate-x-4 skew-y-3'
                : 'transform -rotate-180 mb-1'
            }`}
          />
          <BsThreeDotsVertical />
        </div>
      </section>
      <div
        className={`flex relative divide-x ${
          showPilot ? 'flex-row' : 'flex-col'
        } ${showPilotIconView ? 'flex-wrap' : 'flex-wrap'}`}
      >
        {showPilot && (
          <span
            className={`z-10 text-xs border flex items-center hover:text-green-500 ${
              showPilotIconView ? 'text-green-500 transform -rotate-180' : ''
            }`}
          >
            <HiChevronDoubleUp onClick={() => handleShowPilotIconView()} />
          </span>
        )}
        {items.map((item, index) => (
          <section
            key={item.id}
            className={`flex flex-auto ${
              item.id === activeTabId && showPilot === false
                ? 'flex-col'
                : 'flex-row'
            }`}
          >
            <div
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={classNames(
                item.id === activeTabId
                  ? 'bg-gray-300 text-black'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                showPilot ? 'border-y-2 border gap-2 pr-6' : 'py-3 px-3',
                showPilotIconView ? 'w-12' : '',
                'relative group py-2 font-medium h-fit flex-grow items-center cursor-pointer flex justify-center transition'
              )}
              aria-current={item.id === activeTabId ? 'page' : undefined}
            >
              {item.id === activeTabId && (
                <span className="absolute top-0 left-0 right-0 bg-green-500 h-0.5 w-fit"></span>
              )}
              <div className="flex items-center">
                <span
                  className={`text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                    showPilot ? 'block' : 'hidden'
                  }`}
                >
                  <MdDragIndicator />
                </span>
                <img src={item.source} alt="" className="w-4 h-4" />
              </div>
              <p
                className={`text-xs ${showPilot ? 'block' : 'hidden'} ${
                  showPilotIconView ? 'hidden' : 'block'
                }`}
              >
                {item.name}
              </p>
            </div>
            {item.id === activeTabId && showPilot === false && item.subTab}
          </section>
        ))}
      </div>
    </div>
  );
}

export default Tab;
