import React, { useEffect, useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeMenu,
  getPrevName,
  getSubMenu,
  setCreateWLID,
  setSelectedTreeDetails,
  setshowMenuDropdown
} from '../../features/hubs/hubSlice';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import Palette from '../ColorPalette';
import UploadImage from '../ColorPalette/component/UploadImage';
import { InvalidateQueryFilters } from '@tanstack/react-query';
import { setCreateWlLink } from '../../features/workspace/workspaceSlice';
import { ListColourProps } from './ListItem';
import { useParams } from 'react-router-dom';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import PlusIcon from '../../assets/icons/PlusIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import MenuDropdown from '../Dropdown/MenuDropdown';
import SubDropdown from '../Dropdown/SubDropdown';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import Drag from '../../assets/icons/Drag';
import { getInitials } from '../../app/helpers';
import ToolTip from '../Tooltip/Tooltip';
import { Hub, List, Wallet } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveBarIdentification from './Component/ActiveBarIdentification';
import ActiveBackground from './Component/ActiveBackground';
import { useAbsolute } from '../../hooks/useAbsolute';
import { IHub } from '../../features/hubs/hubs.interfaces';

interface TaskItemProps {
  item: {
    id: string;
    name: string;
    path?: string | null;
    color?: string | null;
    parent_id?: string | null;
    children?: Hub[];
    has_descendants: boolean;
    wallets?: Wallet[];
    lists?: List[];
  };
  showChildren: boolean;
  type: string;
  topNumber?: string;
  zNumber?: string;
  isExtendedBar?: boolean;
  handleClick: (id: string, type?: string) => void;
  handleLocation: (id: string, name: string, item: IHub) => void;
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
  const dispatch = useAppDispatch();
  const { hubId, subhubId } = useParams();

  const { activeItemId, openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { showSidebar } = useAppSelector((state) => state.account);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const { updateCords } = useAppSelector((state) => state.task);

  const [uploadId, setUploadId] = useState<string | null | undefined>('');
  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps>(
    type === EntityType.hub ? 'blue' : 'orange'
  );

  const { paletteId, show } = paletteDropdown;

  const handleHubColour = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (showSidebar) {
      e.stopPropagation();
      dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: EntityType.hub }));
    }
  };

  useEffect(() => {
    setUploadId(paletteId);
  }, [paletteId]);

  const handleItemAction = (id: string, name?: string | null) => {
    dispatch(getPrevName(name as string));
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.hub }));
    dispatch(setCreateWlLink(false));
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: type === EntityType.hub ? EntityType.hub : EntityType.subHub
      })
    );
  };

  const handleHubSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.hub }));
    dispatch(setCreateWLID(id));
    dispatch(setCreateWlLink(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: EntityType.hub
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id === 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

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
        return '17px';
      } else {
        return '25px';
      }
    } else {
      return '17px';
    }
  };

  const { cords, relativeRef } = useAbsolute(updateCords, 266);
  const { cords: menuCords, relativeRef: menuRef } = useAbsolute(updateCords, 352);

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
            >
              <Drag />
            </div>
          ) : null}
          <div
            role="button"
            className="flex truncate items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
          >
            {item?.wallets?.length || item?.lists?.length || item.has_descendants ? (
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

            <div className="flex items-center flex-1 min-w-0 gap-1">
              <div
                onClick={(e) => handleHubColour(item.id, e)}
                className="flex items-center justify-center w-5 h-5"
                ref={relativeRef}
              >
                {item.path !== null ? (
                  <img src={item.path} alt="hubs image" className="w-full h-full rounded" />
                ) : (
                  <AvatarWithInitials
                    initials={getInitials(item.name)}
                    height="h-5"
                    width="w-5"
                    backgroundColour={item.color !== null ? item.color : (paletteColor as string)}
                    roundedStyle="rounded"
                  />
                )}
              </div>
              <span className="ml-5 overflow-hidden">
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
          {showSidebar && (
            <div
              className="relative right-0 flex items-center pr-1 space-x-2 text-black opacity-0 z-1 group-hover:opacity-100 hover:text-fuchsia-500"
              onClick={(e) => e.stopPropagation()}
              ref={menuRef}
            >
              <span onClick={() => handleItemAction(item.id, item.name)} className="cursor-pointer">
                <PlusIcon />
              </span>
              <span
                onClick={(e) => {
                  handleHubSettings(item.id, item.name, e);
                }}
                className="cursor-pointer"
                id="menusettings"
              >
                <ThreeDotIcon />
              </span>
            </div>
          )}
        </div>
      </div>
      <UploadImage endpoint={`hubs/${uploadId}`} invalidateQuery={['hubs'] as InvalidateQueryFilters<unknown>} />
      {paletteId === item.id && show ? <Palette title="Hub" setPaletteColor={setPaletteColor} cords={cords} /> : null}
      {showMenuDropdown === item.id && showSidebar ? (
        <MenuDropdown isExtendedBar={isExtendedBar} cords={menuCords} />
      ) : null}
      {SubMenuId === item.id && showSidebar ? <SubDropdown cords={menuCords} /> : null}
    </div>
  );
}
