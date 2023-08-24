import React from 'react';
import { ListProps } from '../../activetree.interfaces';
import WList from '../wallet/WList';
import LList from '../list/LList';
import { useNavigate } from 'react-router-dom';
import HubItem from '../../../../../../../components/tasks/HubItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import {
  setActiveItem,
  setActiveTabId,
  setCurrentItem,
  setOpenedEntitiesIds,
  setShowExtendedBar,
  setShowPilot
} from '../../../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../../../utils';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import HubItemOverlay from '../../../../../../../components/tasks/HubItemOverLay';
import { DragOverlay } from '@dnd-kit/core';

export default function SubHubList({ hubs }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { showExtendedBar, openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const handleLocation = (id: string, name: string) => {
    if (openedEntitiesIds.includes(id)) {
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((item) => item !== id)));
    } else {
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds, id]));
    }
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.subHub,
        activeItemName: name
      })
    );
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`tasks/sh/${id}`, {
      replace: true
    });
    if (!showSidebar) {
      dispatch(setShowExtendedBar(true));
    }
  };

  const handleClick = (id: string) => {
    if (openedEntitiesIds.includes(id)) {
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((subhubId) => subhubId !== id)));
    } else {
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds, id]));
    }

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: EntityType.hub
      })
    );
  };

  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? hubs.find((i) => i.id === draggableItemId) : null;

  return (
    <>
      {draggableItem ? (
        <DragOverlay>
          <HubItemOverlay item={draggableItem} type="subhub" />
        </DragOverlay>
      ) : null}
      {hubs.map((hub) => (
        <div key={hub.id} className={cl(!showSidebar && 'overflow-hidden w-12')}>
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={openedEntitiesIds.includes(hub.id)}
              handleLocation={handleLocation}
              type={EntityType.subHub}
              topNumber="80px"
              zNumber="4"
            />
            {showSidebar && (
              <div>
                {hub.wallets.length && openedEntitiesIds.includes(hub.id) ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    topNumber={hub.parent_id ? 110 : 80}
                    type="wallet"
                    paddingLeft="35"
                  />
                ) : null}
                {hub.lists.length && openedEntitiesIds.includes(hub.id) && !showExtendedBar ? (
                  <LList list={hub.lists} leftMargin={false} paddingLeft="50" />
                ) : null}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
