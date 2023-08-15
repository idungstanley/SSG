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
import SearchIconUpload from '../ColorPalette/component/SearchIconUpload';
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

interface TaskItemProps {
  item: {
    id: string;
    name: string;
    path?: string | null;
    color?: string | null;
    parent_id?: string | null;
    has_descendants?: number;
  };
  showChildren: boolean;
  index?: number;
  isSticky?: boolean;
  type: string;
  topNumber?: string;
  zNumber?: string;
  stickyButtonIndex?: number | undefined;
  handleClick: (id: string, parent_id: string | null, index?: number) => void;
  handleLocation: (id: string, name: string, index?: number) => void;
}
export default function HubItem({
  item,
  showChildren,
  type,
  index,
  isSticky,
  stickyButtonIndex,
  topNumber = '0',
  zNumber,
  handleClick,
  handleLocation
}: TaskItemProps) {
  const dispatch = useAppDispatch();
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { showSidebar, lightBaseColor, baseColor } = useAppSelector((state) => state.account);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const [uploadId, setUploadId] = useState<string | null | undefined>('');
  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps>(
    type === EntityType.hub ? 'blue' : 'orange'
  );

  const collapseNavAndSubhub = !showSidebar && type === EntityType.subHub;

  const { hubId } = useParams();
  const { paletteId, show } = paletteDropdown;

  const handleHubColour = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (showSidebar) {
      e.stopPropagation();
      if (paletteId === id && show) {
        dispatch(setPaletteDropDown({ ...paletteDropdown, show: false }));
      } else {
        dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: EntityType.hub }));
      }
    }
  };

  useEffect(() => {
    setUploadId(paletteId);
  }, [paletteId]);

  const closeSubMenu = () => {
    dispatch(
      getSubMenu({
        SubMenuId: null,
        SubMenuType: null
      })
    );
  };

  const closeMenuDropdown = () => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
        showMenuDropdownType: null
      })
    );
  };

  const handleItemAction = (id: string, name?: string | null) => {
    dispatch(getPrevName(name as string));
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.hub }));
    dispatch(setCreateWlLink(false));
    if (id === SubMenuId) {
      closeSubMenu();
    } else {
      closeMenuDropdown();
      dispatch(
        getSubMenu({
          SubMenuId: id,
          SubMenuType: type == EntityType.hub ? 'hubs' : EntityType.subHub
        })
      );
    }
  };

  const handleHubSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.hub }));
    dispatch(setCreateWLID(id));
    // dispatch(getCurrHubId(id));
    dispatch(setCreateWlLink(false));
    if (id === showMenuDropdown) {
      closeMenuDropdown();
    } else {
      closeSubMenu();
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: id,
          showMenuDropdownType: EntityType.subHub
        })
      );
    }

    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
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

  return (
    <div className="relative">
      <div
        className={`bg-white truncate items-center group ${item.id !== activeItemId && 'hover:bg-gray-100'} ${
          isSticky && stickyButtonIndex === index ? 'sticky bg-white opacity-100' : ''
        } ${isOver ? 'bg-primary-100 border-primary-500 shadow-inner shadow-primary-300' : ''} `}
        ref={setNodeRef}
        tabIndex={0}
        onClick={() => handleClick(item.id, item.parent_id ?? null, index)}
        style={{
          top: isSticky && showSidebar ? topNumber : '',
          zIndex: isSticky ? zNumber : '2',
          opacity: transform ? 0 : 100
        }}
      >
        <div
          className={`relative flex items-center justify-between ${showSidebar ? 'pl-1' : 'pl-2.5'}`}
          style={{ height: '30px' }}
        >
          {item.id === hubId && (
            <span
              className="absolute inset-0 z-0 before:content before:absolute before:inset-0"
              style={{ backgroundColor: lightBaseColor }}
            />
          )}
          {item.id === hubId && (
            <span
              className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg"
              style={{ backgroundColor: baseColor }}
            />
          )}

          <div
            className="absolute rounded-r-lg opacity-0 cursor-move left-0.5 group-hover:opacity-100"
            ref={draggableRef}
            {...listeners}
            {...attributes}
          >
            <Drag />
          </div>
          <div
            role="button"
            className="flex truncate items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
            style={{
              marginLeft: type === EntityType.subHub && !showSidebar ? '-14px' : type === EntityType.subHub ? '0' : '',
              paddingLeft:
                type === EntityType.subHub && !showSidebar ? '5px' : type === EntityType.subHub ? '15px' : '5px'
            }}
          >
            {!collapseNavAndSubhub && item?.has_descendants ? (
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

            <div className={`flex items-center flex-1 min-w-0 gap-1 ${collapseNavAndSubhub && 'ml-3'}`}>
              <div onClick={(e) => handleHubColour(item.id, e)} className="flex items-center justify-center w-5 h-5">
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
                    onClick={() => handleLocation(item.id, item.name, index)}
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
            >
              <span onClick={() => handleItemAction(item.id, item.name)} className="cursor-pointer">
                <PlusIcon active />
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
      {paletteId == item.id && show ? (
        <Palette title="Hub Colour" setPaletteColor={setPaletteColor} bottomContent={<SearchIconUpload />} />
      ) : null}
      {showMenuDropdown === item.id && showSidebar ? <MenuDropdown /> : null}
      {SubMenuId === item.id && showSidebar ? <SubDropdown /> : null}
    </div>
  );
}
