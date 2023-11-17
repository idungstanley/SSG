import React, { CSSProperties, useState } from 'react';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTreeDetails } from '../../features/hubs/hubSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setCurrentItem, setNestedTimeEntityId } from '../../features/workspace/workspaceSlice';
import SearchHubItem from '../tasks/SearchHubItem';
import SearchSubHList from '../../pages/workspace/hubs/components/ActiveTree/Items/hub/SearchSubHList';
import SearchWList from '../../pages/workspace/hubs/components/ActiveTree/Items/wallet/SearchWList';
import SearchLList from '../../pages/workspace/hubs/components/ActiveTree/Items/list/SearchLList';
import { TIME_TABS } from '../../utils/Constants/TimeClockConstants';
import { OPTIONS_WITH_AVAILABLE_LISTS } from '../../pages/workspace/tasks/component/taskMenu/TaskMenu';

export const unavailableStyles: CSSProperties = { opacity: '0.5', pointerEvents: 'none' };

interface hubsProps {
  hubs: Hub[];
  openNewHub: (id: string) => void;
  setToggleTree?: React.Dispatch<React.SetStateAction<boolean>>;
  option?: string;
  checklistId?: string;
}

export default function ActiveTreeList({ hubs, openNewHub, setToggleTree, option, checklistId }: hubsProps) {
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
    if (!OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string)) {
      e.stopPropagation();
      dispatch(setSelectedTreeDetails({ name, id, type }));
      setToggleTree?.(false);
    }

    if (option === TIME_TABS.nestedEntities) {
      dispatch(setNestedTimeEntityId(id));
    }

    // if (option === pilotTabs.CREATE_TASK) {
    //   e.stopPropagation();
    // }
  };

  const handleClick = (id: string) => {
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
              <SearchSubHList
                option={option}
                hubs={hub.children as Hub[]}
                handleTabClick={handleTabClick}
                checklistId={checklistId}
              />
            ) : null}
            <div
              style={
                (lastActiveItem === 'Sub Hub' || lastActiveItem === 'Wallet') &&
                !OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string)
                  ? unavailableStyles
                  : {}
              }
            >
              {hub?.wallets?.length && showChildren && isCanBeOpen(hub.id) ? (
                <SearchWList
                  option={option}
                  wallets={hub.wallets}
                  leftMargin={false}
                  type="wallet"
                  paddingLeft="33"
                  handleTabClick={handleTabClick}
                  checklistId={checklistId}
                />
              ) : null}
            </div>
            <div style={!OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string) ? unavailableStyles : {}}>
              {hub?.lists?.length && showChildren && isCanBeOpen(hub.id) ? (
                <SearchLList
                  option={option}
                  list={hub.lists}
                  leftMargin={false}
                  paddingLeft="48"
                  checklistId={checklistId}
                />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
