import React, { useState } from 'react';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setParentHubExt, setSelectedTreeDetails } from '../../features/hubs/hubSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setCurrentItem } from '../../features/workspace/workspaceSlice';
import SearchHubItem from '../tasks/SearchHubItem';
import SearchSubHList from '../../pages/workspace/hubs/components/ActiveTree/Items/hub/SearchSubHList';
import SearchWList from '../../pages/workspace/hubs/components/ActiveTree/Items/wallet/SearchWList';
import SearchLList from '../../pages/workspace/hubs/components/ActiveTree/Items/list/SearchLList';

interface hubsProps {
  hubs: Hub[];
  openNewHub: (id: string) => void;
  setToggleTree?: React.Dispatch<React.SetStateAction<boolean>>;
  option?: string;
}
export default function ActiveTreeList({ hubs, openNewHub, setToggleTree, option }: hubsProps) {
  const dispatch = useAppDispatch();

  const { lastActiveItem } = useAppSelector((state) => state.workspace);

  const [showChildren, setShowChidren] = useState<string | null | undefined>('');
  const [openedNewHubId, setOpenedNewHubId] = useState<string>('');

  const handleTabClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string,
    name: string,
    type: string
  ) => {
    if (option !== 'taskDuplicate') {
      e.stopPropagation();
      dispatch(setSelectedTreeDetails({ name, id, type }));
      setToggleTree?.(false);
    }
  };

  const handleClick = (id: string) => {
    dispatch(setParentHubExt({ id, type: EntityType.hub }));

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
        currentItemType: EntityType.hub
      })
    );
    openNewHub(id);
  };

  const isCanBeOpen = (id: string) => {
    if (openedNewHubId) {
      return openedNewHubId === id;
    }
    return !!showChildren;
  };

  return (
    <>
      {hubs.map((hub) => (
        <div key={hub.id}>
          <div className="relative flex flex-col">
            <SearchHubItem
              item={hub}
              handleClick={handleClick}
              handleTabClick={handleTabClick}
              showChildren={
                ((hub?.children?.length || hub?.wallets?.length || hub?.lists?.length) &&
                  showChildren &&
                  isCanBeOpen(hub.id)) as boolean
              }
              type={EntityType.hub}
            />
            {hub?.children?.length && isCanBeOpen(hub.id) ? (
              <SearchSubHList hubs={hub.children as Hub[]} handleTabClick={handleTabClick} />
            ) : null}
            <div
              style={
                (lastActiveItem === 'Sub Hub' || lastActiveItem === 'Wallet') && option !== 'taskDuplicate'
                  ? { opacity: '0.5', pointerEvents: 'none' }
                  : {}
              }
            >
              {hub?.wallets?.length && showChildren && isCanBeOpen(hub.id) ? (
                <SearchWList
                  wallets={hub.wallets}
                  leftMargin={false}
                  type="wallet"
                  paddingLeft="33"
                  handleTabClick={handleTabClick}
                />
              ) : null}
            </div>
            <div style={option !== 'taskDuplicate' ? { opacity: '0.5', pointerEvents: 'none' } : {}}>
              {hub?.lists?.length && showChildren && isCanBeOpen(hub.id) ? (
                <SearchLList list={hub.lists} leftMargin={false} paddingLeft="48" />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
