import React from 'react';
import LList from '../../pages/workspace/hubs/components/ActiveTree/Items/list/LList';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import { FaFolder } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTreeDetails } from '../../features/hubs/hubSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';

interface hubsProps {
  hubs: Hub[];
  paddingLeft?: string;
  setToggleTree?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ActiveTreeList({ hubs, paddingLeft, setToggleTree }: hubsProps) {
  const dispatch = useAppDispatch();

  const handleTabClick = (id: string, name: string, type: string) => {
    dispatch(setSelectedTreeDetails({ name, id, type }));
    setToggleTree?.(false);
  };
  return (
    <>
      {hubs.map((hub) => (
        <div key={hub.id} className="my-1 cursor-pointer">
          <div
            className={`relative flex items-center hover:bg-gray-200 p-1 rounded-md ${paddingLeft}`}
            onClick={() => handleTabClick(hub.id, hub.name, EntityType.hub)}
          >
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
              >
                {hub.name}
              </p>
            </span>
          </div>
          {hub.children.length ? (
            <ActiveTreeList setToggleTree={setToggleTree} hubs={hub.children} paddingLeft="pl-4" />
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
