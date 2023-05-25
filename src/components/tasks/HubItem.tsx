import React, { useEffect, useState } from 'react';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSubMenu } from '../../features/hubs/hubSlice';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import Palette from '../ColorPalette';
import UploadImage from '../ColorPalette/component/UploadImage';
import { InvalidateQueryFilters } from '@tanstack/react-query';
import { setCreateWlLink } from '../../features/workspace/workspaceSlice';
import SearchIconUpload from '../ColorPalette/component/SearchIconUpload';
import { ListColourProps } from './ListItem';
import { useParams } from 'react-router-dom';

interface TaskItemProps {
  item: {
    id: string;
    name: string;
    path?: string | null;
    color?: string | null;
    parent_id?: string | null;
  };
  handleClick: (id: string, index?: number) => void;
  showChildren: string | null | undefined;
  handleLocation: (id: string, name: string, index?: number) => void;
  handleHubSettings: (id: string, name: string, e: React.MouseEvent<SVGElement>) => void;
  index?: number;
  isSticky?: boolean;
  type: string;
  topNumber?: string;
  zNumber?: string;
  stickyButtonIndex?: number | undefined;
}
export default function HubItem({
  handleClick,
  item,
  handleLocation,
  handleHubSettings,
  showChildren,
  type,
  index,
  isSticky,
  stickyButtonIndex,
  topNumber = '0',
  zNumber
}: TaskItemProps) {
  const dispatch = useAppDispatch();
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);
  // const { openedHubId } = useAppSelector((state) => state.hub);
  const [uploadId, setUploadId] = useState<string | null | undefined>('');
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps>(
    type === 'hub' ? 'blue' : 'orange'
  );

  const collapseNavAndSubhub = !showSidebar && type === 'subhub';

  const { hubId } = useParams();
  const { paletteId, show } = paletteDropdown;

  const handleHubColour = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (showSidebar) {
      e.stopPropagation();
      dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: 'hub' }));
    }
  };

  useEffect(() => {
    setUploadId(paletteId);
  }, [paletteId]);

  const handleItemAction = (id: string) => {
    dispatch(setCreateWlLink(false));
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: type == 'hub' ? 'hubs' : 'subhub'
      })
    );
  };

  return (
    <>
      <div
        className={`flex justify-between items-center group ${
          item.id === activeItemId ? 'text-green-700 font-medium' : 'hover:bg-gray-100'
        } ${isSticky && stickyButtonIndex === index ? 'sticky z-50 bg-white' : ''}`}
        tabIndex={0}
        onClick={() => handleClick(item.id, index)}
        style={{
          backgroundColor: `${item.id === hubId ? '#BF00FF21' : ''}`,
          top: isSticky && showSidebar ? topNumber : '',
          zIndex: isSticky ? zNumber : '10'
        }}
      >
        <div
          className={`relative flex items-center justify-between ${showSidebar ? 'pl-3' : 'pl-2.5'}`}
          style={{ height: '30px' }}
        >
          {item.id === hubId && (
            <span
              className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg"
              style={{ backgroundColor: '#BF00FF' }}
            />
          )}
          <div
            role="button"
            className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
            style={{ paddingLeft: type === 'subhub' && !showSidebar ? '5px' : type === 'subhub' ? '10px' : '' }}
          >
            {!collapseNavAndSubhub && (
              <div>
                {showChildren === item.id ? (
                  <span className="flex flex-col">
                    <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
                  </span>
                ) : (
                  <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
                )}
              </div>
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
                <a
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
                </a>
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex items-center pr-1 space-x-1 text-black opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineEllipsis
            onClick={(e) => {
              handleHubSettings(item.id, item.name, e);
            }}
            className="cursor-pointer"
            id="menusettings"
          />
          <AiOutlinePlus onClick={() => handleItemAction(item.id)} className="cursor-pointer" />
        </div>
      </div>
      <UploadImage endpoint={`hubs/${uploadId}`} invalidateQuery={['hubs'] as InvalidateQueryFilters<unknown>} />
      {paletteId == item.id && show ? (
        <Palette title="Hub Colour" setPaletteColor={setPaletteColor} bottomContent={<SearchIconUpload />} />
      ) : null}
    </>
  );
}
