import React, { useState } from 'react';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import { ListColourProps } from './ListItem';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import Drag from '../../assets/icons/Drag';
import { getInitials } from '../../app/helpers';

interface TaskItemProps {
  item: {
    id: string;
    name: string;
    path?: string | null;
    color?: string | null;
    parent_id?: string | null;
    has_descendants?: number;
  };
  type: string;
}
export default function HubItemOverlay({ item, type }: TaskItemProps) {
  const [paletteColor] = useState<string | undefined | ListColourProps>(type === EntityType.hub ? 'blue' : 'orange');
  return (
    <>
      <div
        className={'relative flex items-center justify-between pl-2.5 bg-white opacity-75'}
        style={{ height: '30px' }}
      >
        <div className="absolute flex justify-between items-center bg-white opacity-75">
          <Drag />
          <div className="flex items-center justify-center w-5 h-5 mx-2">
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
          <span className="mx-5 overflow-hidden">
            <p
              className="capitalize truncate cursor-pointer"
              style={{
                fontSize: '13px',
                lineHeight: '15.56px',
                verticalAlign: 'baseline',
                letterSpacing: '0.28px'
              }}
            >
              {item.name}
            </p>
          </span>
          <span className="cursor-pointer" id="menusettings">
            <ThreeDotIcon />
          </span>
        </div>
      </div>
    </>
  );
}
