import React, { useEffect, useState } from 'react';
import { ListProps } from '../../activetree.interfaces';
import WList from '../wallet/WList';
import LList from '../list/LList';
import { useNavigate } from 'react-router-dom';
import HubItem from '../../../../../../../components/tasks/HubItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setActiveTabId,
  setCurrentItem,
  setIsFirstOpened,
  setOpenedEntitiesIds,
  setOpenedParentsIds,
  setShowHub,
  setShowPilot
} from '../../../../../../../features/workspace/workspaceSlice';
import { getCurrSubHubId, setOpenedHubId, setSubHubExt } from '../../../../../../../features/hubs/hubSlice';
import { cl } from '../../../../../../../utils';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import HubItemOverlay from '../../../../../../../components/tasks/HubItemOverLay';
import { DragOverlay } from '@dnd-kit/core';

export default function SubHubList({ hubs }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showExtendedBar, openedParentsIds, openedEntitiesIds, isFirstOpened } = useAppSelector(
    (state) => state.workspace
  );
  const { showSidebar } = useAppSelector((state) => state.account);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);
  const [openedSubhubsIds, setOpenedSubhubIds] = useState<string[]>([]);

  useEffect(() => {
    if (isFirstOpened) {
      for (const hub of hubs) {
        if (hub.children.length || hub.wallets.length || hub.lists.length) {
          setOpenedSubhubIds((prev) => [...prev, hub.id]);
          dispatch(setOpenedEntitiesIds([...openedEntitiesIds, hub.id]));
        }
      }
    }
  }, [hubs, isFirstOpened]);

  const handleLocation = (id: string, name: string, index?: number) => {
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.subHub,
        activeItemName: name
      })
    );
    dispatch(setSubHubExt({ id: id, type: EntityType.subHub }));
    dispatch(
      getCurrSubHubId({
        currSubHubId: id,
        currSubHubIdType: EntityType.subHub
      })
    );
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setActiveEntityName(name));
    dispatch(setActiveEntity({ id: id, type: EntityType.subHub }));
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`tasks/h/${id}`, {
      replace: true
    });
    localStorage.setItem(
      'hubDetailsStorage',
      JSON.stringify({
        activeItemId: id,
        activeItemType: EntityType.subHub,
        activeItemName: name
      })
    );
  };

  const handleClick = (id: string, parent_id: string | null, index?: number) => {
    dispatch(setSubHubExt({ id, type: EntityType.subHub }));
    dispatch(setIsFirstOpened(false));

    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    if (!showSidebar) {
      navigate(`tasks/h/${id}`, {
        replace: true
      });
    }

    dispatch(setOpenedHubId(id));
    dispatch(setShowHub(true));

    if (openedSubhubsIds.includes(id)) {
      if (openedSubhubsIds.length === 1) {
        dispatch(setOpenedParentsIds(openedParentsIds.filter((item) => item !== parent_id)));
      }
      setOpenedSubhubIds((prev) => prev.filter((subhubId) => subhubId !== id));
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((subhubId) => subhubId !== id)));
    } else {
      if (parent_id) {
        dispatch(setOpenedParentsIds([...openedParentsIds, parent_id]));
      }
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds, id]));
      setOpenedSubhubIds((prev) => [...prev, id]);
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
      {hubs.map((hub, index) => (
        <div key={hub.id} className={cl(!showSidebar && 'overflow-hidden w-12')}>
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={openedEntitiesIds.includes(hub.id)}
              handleLocation={handleLocation}
              isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
              stickyButtonIndex={stickyButtonIndex}
              index={index}
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
