import React, { useState } from 'react';
import LList from '../../pages/workspace/hubs/components/ActiveTree/Items/list/LList';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import { FaFolder } from 'react-icons/fa';
import { useAppDispatch } from '../../app/hooks';
import { setSelectedTreeDetails } from '../../features/hubs/hubSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';

interface hubsProps {
  hubs: Hub[];
  paddingLeft?: string;
  setToggleTree?: React.Dispatch<React.SetStateAction<boolean>>;
  level?: number;
}
export default function ActiveTreeList({ hubs, paddingLeft, setToggleTree, level = 1 }: hubsProps) {
  const dispatch = useAppDispatch();
  const [showChildren, setShowChidren] = useState<boolean>(false);

  const handleTabClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string,
    name: string,
    type: string
  ) => {
    e.stopPropagation();
    dispatch(setSelectedTreeDetails({ name, id, type }));
    setToggleTree?.(false);
  };
  const handleShowChildren = () => {
    setShowChidren((prev) => !prev);
  };
  return (
    <>
      {hubs.map((hub) => (
        <div key={hub.id} className="my-2 cursor-pointer">
          <div
            className={`relative flex items-center hover:bg-gray-200 p-1 rounded-md ${paddingLeft} ${
              hub.children.length > 0 ? '' : 'pl-4'
            }`}
            onClick={() => handleShowChildren()}
          >
            {hub.children.length > 0 && (
              <div>
                {showChildren ? (
                  <span className="flex flex-col">
                    <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
                  </span>
                ) : (
                  <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
                )}
              </div>
            )}
            <div className="flex items-center justify-center w-5 h-5">
              {hub.path !== null ? (
                <img src={hub.path} alt="hubs image" className="w-full h-full rounded" />
              ) : (
                <AvatarWithInitials
                  initials={hub.name
                    .split(' ')
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase()}
                  height="h-5"
                  width="w-5"
                  backgroundColour={hub.color !== null ? hub.color : 'blue'}
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
                onClick={(e) => handleTabClick(e, hub.id, hub.name, EntityType.hub)}
              >
                {hub.name}
              </p>
            </span>
          </div>
          {hub.children.length && showChildren ? (
            <ActiveTreeList paddingLeft="pl-6" level={level + 1} setToggleTree={setToggleTree} hubs={hub.children} />
          ) : null}
          {
            <div>
              {hub.wallets.length
                ? hub.wallets.map((wallet) => (
                    <div key={wallet.id}>
                      <div className="flex">
                        <FaFolder />
                        {wallet.name}
                      </div>
                    </div>
                  ))
                : null}
              {hub.lists.length ? <LList list={hub.lists} leftMargin={false} paddingLeft={10} /> : null}
            </div>
          }
        </div>
      ))}
    </>
  );
}
