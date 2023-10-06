import React from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppSelector } from '../../app/hooks';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { getInitials } from '../../app/helpers';
import { Hub, List, Wallet } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

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
  handleTabClick: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string,
    name: string,
    type: string
  ) => void;
  handleClick: (id: string) => void;
}
export default function SearchHubItem({ item, showChildren, type, handleTabClick, handleClick }: TaskItemProps) {
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);
  const paletteColor = type === EntityType.hub ? 'blue' : 'orange';

  const collapseNavAndSubhub = !showSidebar && type === EntityType.subHub;

  const renderEmptyArrowBlock = () => {
    return <div className="pl-3.5" />;
  };

  return (
    <>
      <div
        className={`bg-white truncate items-center group ${
          item.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100'
        }`}
        tabIndex={0}
        style={{
          zIndex: '2',
          opacity: 100
        }}
      >
        <div
          className={`relative flex items-center justify-between ${showSidebar ? 'pl-3' : 'pl-2.5'}`}
          style={{ height: '30px' }}
        >
          <div
            role="button"
            className="flex truncate items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
            style={{
              marginLeft: type === EntityType.subHub && !showSidebar ? '-14px' : type === EntityType.subHub ? '0' : '',
              paddingLeft:
                type === EntityType.subHub && !showSidebar ? '5px' : type === EntityType.subHub ? '15px' : '5px'
            }}
          >
            {item?.wallets?.length || item?.lists?.length || item.has_descendants ? (
              <div onClick={() => handleClick(item.id)}>
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
              <div className="flex items-center justify-center w-5 h-5">
                {item.path !== null ? (
                  <img src={item.path} alt="hubs image" className="w-full h-full rounded" />
                ) : (
                  <AvatarWithInitials
                    initials={getInitials(item.name)}
                    height="h-5"
                    width="w-5"
                    backgroundColour={item.color ?? (paletteColor as string)}
                    roundedStyle="rounded"
                  />
                )}
              </div>
              <span className="ml-5 overflow-hidden">
                <p
                  className="capitalize truncate cursor-pointer"
                  style={{
                    fontSize: '13px',
                    lineHeight: '15.56px',
                    verticalAlign: 'baseline',
                    letterSpacing: '0.28px'
                  }}
                  onClick={(e) => handleTabClick(e, item.id, item.name, EntityType.hub)}
                >
                  {item.name}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
