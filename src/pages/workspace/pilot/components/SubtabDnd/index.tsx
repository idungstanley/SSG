import { useSortable } from '@dnd-kit/sortable';
import { useDispatch } from 'react-redux';
import {
  setActiveSubComingTabId,
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
  setActiveSubHubManagerTabId,
  setActiveSubLogsTabId,
  setActiveSubTimeClockTabId
} from '../../../../../features/workspace/workspaceSlice';
import useFindNeighbors, { NeighborsProps } from '../../../../../hooks/useFindNeighbors';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';
import BlurEffect from '../../../../../components/BlurEffect';
import ActivePilotSubTabRight from '../../../../../assets/icons/ActivePilotSubTabRight';
import ActivePilotSubTabLeft from '../../../../../assets/icons/ActivePilotSubTabLeft';
import React from 'react';

interface TabProps {
  id: string;
  icon?: JSX.Element;
  showPilot?: boolean;
  activeSub?: string | null;
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

  const { leftNeighbor } = Neighbors;
  const leftItem = leftNeighbor && items?.find((item) => item.id === leftNeighbor.id);

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined,
    zIndex: isDragging ? 1 : undefined,
    borderTopRightRadius: '0.375rem',
    borderTopLeftRadius: '0.375rem'
  };

  const handleClick = (id: string) => {
    if (name === pilotTabs.CONNECT) {
      dispatch(setActiveSubCommunicationTabId(id));
    } else if (name === pilotTabs.DETAILS) {
      dispatch(setActiveSubDetailsTabId(id));
    } else if (name === 'hubmanager') {
      dispatch(setActiveSubHubManagerTabId(id));
    } else if (name === pilotTabs.LOGS) {
      dispatch(setActiveSubLogsTabId(id));
    } else if (name === pilotTabs.UTILITIES) {
      dispatch(setActiveSubTimeClockTabId(id));
    } else if (name === pilotTabs.COMING_SOON) {
      dispatch(setActiveSubComingTabId(id));
    }
  };

  return (
    <>
      {item.isVisible ? (
        <section className="relative flex items-center w-full bg-gray-100" key={id} style={style}>
          <div
            key={id}
            onClick={() => handleClick(id)}
            className={`relative w-full h-full flex justify-center flex-grow p-1 font-medium cursor-pointer group text-alsoit-gray-300 hover:text-alsoit-purple-300 transition duration-300 ${
              id === activeSub && 'bg-alsoit-purple-50 rounded-t-md text-alsoit-purple-300'
            }`}
            style={{
              paddingTop: '7px'
            }}
          >
            <span
              className={`${!showPilot && 'text-xs'} ${
                id === activeSub && !showPilot && 'bg-green-500 p-2 rounded'
              } flex items-center justify-center gap-1 w-full overflow-hidden`}
            >
              <span className="pl-0.5 focus:cursor-move" ref={setNodeRef} {...attributes} {...listeners}>
                {icon ? (
                  React.cloneElement(icon, {
                    active: id === activeSub,
                    color: id === activeSub ? '#BF01FE' : '#424242'
                  })
                ) : (
                  <img src={source} alt="Hub Icon" className="w-2 h-2" />
                )}
              </span>
              {item && <p className="whitespace-nowrap">{item.name}</p>}
            </span>
            <BlurEffect
              top="0"
              right="0px"
              bottom="0"
              left="auto"
              width="20px"
              height="28px"
              backgroundImage={`linear-gradient(to right, transparent 0%, ${
                id === activeSub ? '#F9E6FF 80%' : '#f3f4f6 80%'
              })`}
              style={{ borderTopRightRadius: '6px' }}
            />
            {id === activeSub ? (
              <>
                <div className="absolute bottom-0 z-10" style={{ left: '-6px' }}>
                  <ActivePilotSubTabLeft color="#F9E6FF" />
                </div>
                <div className="absolute bottom-0 z-10" style={{ right: '-6px' }}>
                  <ActivePilotSubTabRight color="#F9E6FF" />
                </div>
              </>
            ) : null}
          </div>
          {id !== activeSub && id !== leftItem?.id && id !== items[items.length - 1].id ? (
            <span
              className="absolute right-0"
              style={{ width: '0.6px', height: '15px', backgroundColor: 'rgba(178, 178, 178, .3)' }}
            />
          ) : null}
        </section>
      ) : null}
    </>
  );
}
