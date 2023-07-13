import React, { useEffect, useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPrevName, getSubMenu, setSelectedTreeDetails } from '../../features/hubs/hubSlice';
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
import { Tooltip } from '@mui/material';

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
  handleClick: (id: string, index?: number) => void;
  handleLocation: (id: string, name: string, index?: number) => void;
  handleHubSettings: (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
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
  handleLocation,
  handleHubSettings
}: TaskItemProps) {
  const dispatch = useAppDispatch();
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showSidebar, lightBaseColor, baseColor } = useAppSelector((state) => state.account);
  const [uploadId, setUploadId] = useState<string | null | undefined>('');
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps>(
    type === EntityType.hub ? 'blue' : 'orange'
  );

  const collapseNavAndSubhub = !showSidebar && type === EntityType.subHub;

  const { hubId } = useParams();
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
        SubMenuType: type == EntityType.hub ? 'hubs' : EntityType.subHub
      })
    );
  };

  const renderEmptyArrowBlock = () => {
    return <div className="pl-3.5" />;
  };

  return (
    <>
      <div
        className={`bg-white truncate items-center group ${
          item.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100'
        } ${isSticky && stickyButtonIndex === index ? 'sticky bg-white opacity-100' : ''}`}
        tabIndex={0}
        onClick={() => handleClick(item.id, index)}
        style={{
          top: isSticky && showSidebar ? topNumber : '',
          zIndex: isSticky ? zNumber : '2'
        }}
      >
        <div
          className={`relative flex items-center justify-between ${showSidebar ? 'pl-3' : 'pl-2.5'}`}
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
            role="button"
            className="flex truncate items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
            style={{
              marginLeft: type === EntityType.subHub && !showSidebar ? '-14px' : type === EntityType.subHub ? '0' : '',
              paddingLeft: type === EntityType.subHub && !showSidebar ? '5px' : type === EntityType.subHub ? '10px' : ''
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

            <div className={`flex items-center flex-1 min-w-0 ${collapseNavAndSubhub && 'ml-3'}`}>
              <div onClick={(e) => handleHubColour(item.id, e)} className="flex items-center justify-center w-5 h-5">
                {item.path !== null ? (
                  <img src={item.path} alt="hubs image" className="w-full h-full rounded" />
                ) : (
                  <AvatarWithInitials
                    initials={item.name
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join('')
                      .toUpperCase()}
                    height="h-5"
                    width="w-5"
                    backgroundColour={item.color !== null ? item.color : (paletteColor as string)}
                    roundedStyle="rounded"
                  />
                )}
              </div>
              <span className="ml-5 overflow-hidden">
                <Tooltip title={item.name} arrow placement="top">
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
                </Tooltip>
              </span>
            </div>
          </div>
          {showSidebar && (
            <div
              className="relative right-0 flex items-center pr-1 space-x-2 text-black opacity-0 z-1 group-hover:opacity-100 hover:text-fuchsia-500"
              onClick={(e) => e.stopPropagation()}
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
      {paletteId == item.id && show ? (
        <Palette title="Hub Colour" setPaletteColor={setPaletteColor} bottomContent={<SearchIconUpload />} />
      ) : null}
    </>
  );
}
