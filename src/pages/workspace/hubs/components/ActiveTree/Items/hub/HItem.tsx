import React from 'react';
import { ItemProps } from '../../activetree.interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import { cl } from '../../../../../../../utils';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppSelector } from '../../../../../../../app/hooks';
import { AvatarWithInitials } from '../../../../../../../components';

export default function HItem({ id, name, parentId }: ItemProps) {
  const { hubId } = useParams();
  const { showSidebar } = useAppSelector((state) => state.account);

  const navigate = useNavigate();

  const onClickHub = (id: string) => {
    const isActiveHub = hubId === id;

    navigate(`h/${isActiveHub ? parentId || '' : id}`, {
      replace: true
    });
  };

  return (
    <div
      className={cl(
        'flex justify-between items-center group',
        hubId === id ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-100'
      )}
      tabIndex={0}
    >
      <div
        onClick={() => onClickHub(id)}
        className="truncate gap-2 cursor-pointer relative flex items-center justify-between"
      >
        {hubId === id && <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />}

        {showSidebar &&
          (hubId === id ? (
            <span className="flex flex-col">
              <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
            </span>
          ) : (
            <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
          ))}
        <div className={`flex items-center flex-1 min-w-0 ${!showSidebar && 'ml-3'}`}>
          <div>
            <AvatarWithInitials
              initials={name
                .split(' ')
                .slice(0, 2)
                .map((word) => word[0])
                .join('')
                .toUpperCase()}
              height={showSidebar ? 'h-4' : 'h-6'}
              width={showSidebar ? 'w-4' : 'w-6'}
              // backgroundColour={item.color !== null ? item.color : paletteColor}
              backgroundColour={'blue'}
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
              // onClick={() => handleLocation(item.id, item.name)}
            >
              {name}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
