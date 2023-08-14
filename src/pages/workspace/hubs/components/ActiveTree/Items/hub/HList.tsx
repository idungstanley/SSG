import React, { useEffect, useState } from 'react';
import { Hub, ListProps } from '../../activetree.interfaces';
import WList from '../wallet/WList';
import LList from '../list/LList';
import { useNavigate, useParams } from 'react-router-dom';
import HubItem from '../../../../../../../components/tasks/HubItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setActiveTabId,
  setCurrentItem,
  setOpenedEntitiesIds,
  setOpenedParentsIds,
  setShowHub,
  setShowPilot
} from '../../../../../../../features/workspace/workspaceSlice';
import {
  getCurrSubHubId,
  setOpenedHubId,
  setParentHubExt,
  setSubHubExt
} from '../../../../../../../features/hubs/hubSlice';
import { cl } from '../../../../../../../utils';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import { Capitalize } from '../../../../../../../utils/NoCapWords/Capitalize';
import SubHList from './SubHList';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../../../../../../components/tasks/HubItemOverLay';

export default function HList({ hubs }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hubId, walletId, listId } = useParams();
  const { currentItemId, showExtendedBar, createEntityType, openedParentsIds, openedEntitiesIds } = useAppSelector(
    (state) => state.workspace
  );
  const { entityToCreate } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);
  const [showChildren, setShowChidren] = useState<string | null | undefined>(null);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);
  const [openedNewHubId, setOpenedNewHubId] = useState<string>('');
  const CapitalizeType = Capitalize(entityToCreate);
  const hubCreationStatus = 'New ' + CapitalizeType + ' Under Construction';
  const id = hubId || walletId || listId || currentItemId;

  const dummyHub = {
    name: hubCreationStatus,
    id: hubCreationStatus,
    wallets: [],
    lists: [],
    children: [],
    color: 'blue',
    path: null
  };

  const hubsSpread = [...hubs, dummyHub];
  const hubsWithEntity = createEntityType === EntityType.hub ? (hubsSpread as Hub[]) : hubs;

  useEffect(() => {
    setShowChidren(id);
  }, []);

  const handleLocation = (id: string, name: string, index?: number) => {
    dispatch(setSubHubExt({ id: null, type: null }));
    dispatch(setParentHubExt({ id: id, type: EntityType.hub }));
    dispatch(
      getCurrSubHubId({
        currSubHubId: null,
        currSubHubIdType: null
      })
    );
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.hub,
        activeItemName: name
      })
    );
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setActiveEntityName(name));
    setShowChidren(id);
    dispatch(setActiveEntity({ id: id, type: EntityType.hub }));
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`tasks/h/${id}`, {
      replace: true
    });
  };

  const handleClick = (id: string, parent_id: string | null, index?: number) => {
    dispatch(setSubHubExt({ id: null, type: null }));
    dispatch(setParentHubExt({ id, type: EntityType.hub }));

    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    if (!showSidebar) {
      navigate(`tasks/h/${id}`, {
        replace: true
      });
    }

    dispatch(setOpenedHubId(id));
    dispatch(setShowHub(true));

    if (id === openedNewHubId) {
      setShowChidren(null);
      setOpenedNewHubId('');
      dispatch(setOpenedParentsIds(openedParentsIds.filter((item) => item !== id)));
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((item) => item !== id)));
    } else {
      if (parent_id) {
        dispatch(setOpenedParentsIds([...openedParentsIds, parent_id]));
      }
      setShowChidren(id);
      setOpenedNewHubId(id);
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds, id]));
    }

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: EntityType.hub
      })
    );
  };

  const isCanBeOpen = (id: string) => {
    if (openedNewHubId) {
      return openedNewHubId === id;
    }
    return !!showChildren;
  };

  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? hubs.find((i) => i.id === draggableItemId) : null;

  return (
    <>
      {draggableItem ? (
        <DragOverlay>
          <HubItemOverlay item={draggableItem} type="hub" />
        </DragOverlay>
      ) : null}
      {hubsWithEntity.map((hub, index) => (
        <div key={hub.id} className={cl(!showSidebar && 'overflow-hidden w-12')}>
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={
                ((hub.children.length || hub.wallets.length || hub.lists.length) && isCanBeOpen(hub.id)) as boolean
              }
              handleLocation={handleLocation}
              isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
              stickyButtonIndex={stickyButtonIndex}
              index={index}
              type={EntityType.hub}
              topNumber="50px"
              zNumber="5"
            />
            {hub.children.length && isCanBeOpen(hub.id) ? <SubHList hubs={hub.children as Hub[]} /> : null}
            {showSidebar && (
              <div>
                {hub.wallets.length && isCanBeOpen(hub.id) ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    topNumber={hub.parent_id ? 110 : 80}
                    type="wallet"
                    paddingLeft="33"
                  />
                ) : null}
                {hub.lists.length && isCanBeOpen(hub.id) && !showExtendedBar ? (
                  <LList list={hub.lists} leftMargin={false} paddingLeft="48" />
                ) : null}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
