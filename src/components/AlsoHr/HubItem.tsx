import { HrHub } from '../../pages/workspace/alsoHr/components/ActiveTree/activetree.interfaces';
import { IHrHub } from '../../features/hr/hubs.interfaces';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveBackground from '../tasks/Component/ActiveBackground';
import ActiveBarIdentification from '../tasks/Component/ActiveBarIdentification';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import { getInitials } from '../../app/helpers';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import ToolTip from '../Tooltip/Tooltip';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import HubManagerIcon from '../../assets/icons/HubManager';

interface TaskItemProps {
  item: {
    id: string;
    name: string;
    path?: string | null;
    color?: string | null;
    parent_id?: string | null;
    children?: HrHub[];
    has_descendants: boolean;
  };
  showChildren: boolean;
  type: string;
  topNumber?: string;
  zNumber?: string;
  isExtendedBar?: boolean;
  handleClick: (id: string, type?: string) => void;
  handleLocation: (id: string, name: string, item: IHrHub) => void;
}

export default function HubItem({
  item,
  showChildren,
  type,
  topNumber = '0',
  zNumber,
  isExtendedBar,
  handleClick,
  handleLocation
}: TaskItemProps) {
  const { hubId, subhubId } = useParams();

  const { activeItemId, openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const renderEmptyArrowBlock = () => {
    return <div className="pl-3.5" />;
  };

  const { isOver, setNodeRef } = useDroppable({
    id: item.id,
    data: {
      isOverHub: true
    }
  });

  useEffect(() => {
    if (isOver) {
      handleClick(item.id, 'isOver');
    }
  }, [isOver]);

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform
  } = useDraggable({
    id: item.id,
    data: {
      isHub: true
    }
  });

  const paddingLeft = () => {
    if (!showSidebar) {
      return '7px';
    }

    if (type === EntityType.subHub) {
      if (isExtendedBar) {
        return '27px';
      } else {
        return '35px';
      }
    } else {
      return '27px';
    }
  };

  return (
    <div
      className={`${openedEntitiesIds.includes(item.id) ? 'sticky bg-white opacity-100' : ''}`}
      style={{
        top: openedEntitiesIds.includes(item.id) && showSidebar ? topNumber : '',
        zIndex: openedEntitiesIds.includes(item.id) ? zNumber : '2',
        opacity: transform ? 0 : 100
      }}
    >
      <div
        className={`bg-white truncate items-center group ${item.id !== activeItemId && 'hover:bg-gray-100'} ${
          isOver ? 'bg-primary-100 border-primary-500 shadow-inner shadow-primary-300' : ''
        }`}
        ref={setNodeRef}
        tabIndex={0}
        onClick={
          showSidebar || isExtendedBar
            ? () => handleClick(item.id)
            : () => handleLocation(item.id, item.name, item as Hub)
        }
      >
        <div
          className="relative flex items-center justify-between"
          style={{ height: '30px', paddingLeft: paddingLeft() }}
        >
          <ActiveBackground showBgColor={item.id === hubId || item.id === subhubId} />
          <ActiveBarIdentification showBar={item.id === hubId || item.id === subhubId} />
          {showSidebar && !isExtendedBar ? (
            <div
              className="absolute left-2 rounded-r-lg opacity-0 cursor-move left-0.5 group-hover:opacity-100"
              ref={draggableRef}
              {...listeners}
              {...attributes}
            ></div>
          ) : null}
          <div
            role="button"
            className="flex truncate items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
          >
            {item.children?.length && item.has_descendants ? (
              <div>
                {showChildren ? (
                  <span className="flex flex-col">
                    <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
                  </span>
                ) : (
                  <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
                )}
              </div>
            ) : (
              renderEmptyArrowBlock()
            )}

            {item.parent_id ? (
              <div className="flex items-center flex-1 min-w-0 gap-1">
                <AvatarWithInitials
                  initials={getInitials(item.name)}
                  height="h-5"
                  width="w-5"
                  backgroundColour="#D9D9D9"
                  roundedStyle="rounded"
                  textColor="#000"
                />
              </div>
            ) : (
              <HubManagerIcon />
            )}
            <span className="ml-2 overflow-hidden">
              <ToolTip title={item.name}>
                <p
                  className="capitalize truncate cursor-pointer"
                  style={{
                    fontSize: '13px',
                    lineHeight: '15.56px',
                    verticalAlign: 'baseline',
                    letterSpacing: '0.28px'
                  }}
                  onClick={() => handleLocation(item.id, item.name, item as Hub)}
                >
                  {item.name}
                </p>
              </ToolTip>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
