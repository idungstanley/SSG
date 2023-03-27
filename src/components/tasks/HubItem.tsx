import React, { useState } from 'react';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSubMenu } from '../../features/hubs/hubSlice';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import Palette from '../ColorPalette';
import UploadFileModal from '../UploadFileModal';
import { InvalidateQueryFilters } from '@tanstack/react-query';

interface TaskItemProps {
  item: {
    id: string;
    name: string;
    color?: string | null;
  };
  handleClick: (id: string, name?: string) => void;
  handleLocation: (id: string, name: string) => void;
  handleHubSettings: (id: string, name: string, e: React.MouseEvent<SVGElement>) => void;
  showChildren: string | null;
  type?: string;
}
export default function HubItem({
  handleClick,
  item,
  handleLocation,
  showChildren,
  handleHubSettings,
  type
}: TaskItemProps) {
  const dispatch = useAppDispatch();
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { showSidebar } = useAppSelector((state) => state.account);
  const [paletteColor, setPaletteColor] = useState<string | undefined>(type === 'hub' ? 'blue' : 'orange');
  const handleHubColour = (id: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setPaletteDropDown({ paletteId: id, paletteType: 'hub' }));
  };
  const handleItemAction = (id: string) => {
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
          item.id === activeItemId ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-100'
        }`}
        tabIndex={0}
        onClick={() => handleClick(item.id)}
      >
        <div className="relative flex items-center justify-between">
          {item.id === activeItemId && (
            <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
          )}
          <div
            role="button"
            className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
            style={{ paddingLeft: type === 'subhub' ? '10px' : '' }}
          >
            {showSidebar && (
              <div>
                {item.id === showChildren ? (
                  <span className="flex flex-col">
                    <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
                  </span>
                ) : (
                  <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
                )}
              </div>
            )}

            <div className={`flex items-center flex-1 min-w-0 ${!showSidebar && 'ml-3'}`}>
              <div onClick={(e) => handleHubColour(item.id, e)}>
                <AvatarWithInitials
                  initials={item.name
                    .split(' ')
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase()}
                  height={showSidebar ? 'h-4' : 'h-6'}
                  width={showSidebar ? 'w-4' : 'w-6'}
                  backgroundColour={item.color !== null ? item.color : paletteColor}
                  roundedStyle="rounded"
                />
              </div>
              <span className="ml-4 overflow-hidden">
                <a
                  className="capitalize truncate cursor-pointer"
                  style={{
                    fontSize: '13px',
                    lineHeight: '15.56px',
                    verticalAlign: 'baseline',
                    letterSpacing: '0.28px'
                  }}
                  onClick={() => handleLocation(item.id, item.name)}
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
      {paletteDropdown === item.id ? (
        <Palette
          title="Hub Colour"
          setPaletteColor={setPaletteColor}
          bottomContent={
            <UploadFileModal
              endpoint={`hubs/${item.id || ''}`}
              invalidateQuery={['hub-image'] as InvalidateQueryFilters<unknown>}
            />
          }
        />
      ) : null}
    </>
  );
}
