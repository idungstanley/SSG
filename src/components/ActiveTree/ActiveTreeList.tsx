import React, { useState } from 'react';
import LList from '../../pages/workspace/hubs/components/ActiveTree/Items/list/LList';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import { FaFolder } from 'react-icons/fa';
import { useAppDispatch } from '../../app/hooks';
import { setOpenedHubId, setParentHubExt, setSelectedTreeDetails, setSubHubExt } from '../../features/hubs/hubSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { getInitials } from '../../app/helpers';
import { setCurrentItem, setShowHub } from '../../features/workspace/workspaceSlice';

interface hubsProps {
  hubs: Hub[];
  paddingLeft?: string;
  setToggleTree?: React.Dispatch<React.SetStateAction<boolean>>;
  level?: number;
}
export default function ActiveTreeList({ hubs, paddingLeft, setToggleTree, level = 1 }: hubsProps) {
  const dispatch = useAppDispatch();

  const [showChildren, setShowChidren] = useState<string | null | undefined>('');
  const [openedNewHubId, setOpenedNewHubId] = useState<string>('');

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

  const handleClick = (id: string, type: string) => {
    setShowChidren(id === showChildren ? '' : id);
    dispatch(setSubHubExt({ id: null, type: null }));
    dispatch(setParentHubExt({ id, type: EntityType.hub }));

    dispatch(setOpenedHubId(id));
    dispatch(setShowHub(true));

    if (id === openedNewHubId) {
      setShowChidren(null);
      setOpenedNewHubId('');
    } else {
      setShowChidren(id);
      setOpenedNewHubId(id);
    }

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: type
      })
    );
  };

  return (
    <>
      {hubs.map((hub) => (
        <div key={hub.id} className="my-2 mx-0 cursor-pointer">
          <div className={`relative flex items-center hover:bg-gray-200 p-1 rounded-md ${paddingLeft} pl-4`}>
            {hub.has_descendants ? (
              <div style={{ marginLeft: '-13px' }} onClick={() => handleClick(hub.id, EntityType.hub)}>
                {showChildren === hub.id ? (
                  <span className="flex flex-col">
                    <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
                  </span>
                ) : (
                  <span className="flex flex-col">
                    <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
                  </span>
                )}
              </div>
            ) : null}
            <div className="flex items-center justify-center w-5 h-5">
              {hub.path ? (
                <img src={hub.path} alt="hubs image" className="w-full h-full rounded" />
              ) : (
                <AvatarWithInitials
                  initials={getInitials(hub.name)}
                  height="h-5"
                  width="w-5"
                  backgroundColour={hub.color ?? 'blue'}
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
          {hub.children.length && showChildren === hub.id ? (
            <ActiveTreeList paddingLeft="pl-6" level={level + 1} setToggleTree={setToggleTree} hubs={hub.children} />
          ) : null}

          <div>
            {hub.wallets.length && showChildren === hub.id
              ? hub.wallets.map((wallet) => (
                  <div key={wallet.id} className="relative flex items-center hover:bg-gray-200 p-1 rounded-md pl-7">
                    {wallet.has_descendants ? (
                      <div style={{ marginLeft: '-13px' }} onClick={() => handleClick(hub.id, EntityType.wallet)}>
                        {showChildren === hub.id ? (
                          <span className="flex flex-col">
                            <VscTriangleDown
                              className="flex-shrink-0 h-2"
                              aria-hidden="true"
                              color="rgba(72, 67, 67, 0.64)"
                            />
                          </span>
                        ) : (
                          <span className="flex flex-col">
                            <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
                          </span>
                        )}
                      </div>
                    ) : null}
                    <FaFolder />
                    <p className="ml-5" onClick={(e) => handleTabClick(e, wallet.id, wallet.name, EntityType.wallet)}>
                      {wallet.name}
                    </p>
                  </div>
                ))
              : null}
            {hub.lists.length ? <LList list={hub.lists} leftMargin={false} paddingLeft={10} /> : null}
          </div>
        </div>
      ))}
    </>
  );
}
