import React, { useState, useEffect } from 'react';
import { Hub, ListProps } from '../../activetree.interfaces';
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
import { setParentHubExt } from '../../../../../../../features/hubs/hubSlice';
import { cl } from '../../../../../../../utils';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import { Capitalize } from '../../../../../../../utils/NoCapWords/Capitalize';
import SubHList from './SubHList';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../../../../../../components/tasks/HubItemOverLay';
import { generateViewsUrl } from '../../../../../../../utils/generateViewsUrl';
import { IHub } from '../../../../../../../features/hubs/hubs.interfaces';
import { pilotTabs } from '../../../../../../../app/constants/pilotTabs';

export default function HList({ hubs, openNewHub }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { showExtendedBar, createEntityType, openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { entityToCreate, hub } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);

  const [openedNewHubId, setOpenedNewHubId] = useState<string>('');
  const [allHubsId, setAllHubsId] = useState<string[]>([]);

  const CapitalizeType = Capitalize(entityToCreate);
  const hubCreationStatus = 'New ' + CapitalizeType + ' Under Construction';

  const dummyHub = {
    name: hubCreationStatus,
    id: hubCreationStatus,
    color: 'blue',
    path: null
  };

  const hubsSpread = [...hubs, dummyHub];
  const hubsWithEntity = createEntityType === EntityType.hub ? (hubsSpread as Hub[]) : hubs;

  useEffect(() => {
    if (hub.length) {
      setAllHubsId(hub.map((item) => item.id));
    }
  }, [hub]);

  const handleLocation = (id: string, name: string, item: IHub) => {
    const viewsUrl = generateViewsUrl(id, item, EntityType.hub) as string;
    dispatch(setParentHubExt({ id: id, type: EntityType.hub }));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.hub,
        activeItemName: name
      })
    );
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(pilotTabs.WATCHERS));
    navigate(viewsUrl, {
      replace: true
    });
    if (!showSidebar) {
      dispatch(setShowExtendedBar(true));
    }
  };

  const handleClick = (id: string, type?: string) => {
    dispatch(setParentHubExt({ id, type: EntityType.hub }));

    if (id === openedNewHubId && type !== 'isOver') {
      setOpenedNewHubId('');
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((item) => item !== id)));
    } else {
      setOpenedNewHubId(id);
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds.filter((openedId) => !allHubsId.includes(openedId)), id]));
    }

    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: EntityType.hub
      })
    );
    openNewHub && openNewHub(id);
  };

  const isCanBeOpen = (id: string) => {
    if (openedNewHubId) {
      return openedNewHubId === id;
    }
    if (openedEntitiesIds.includes(id)) return true;
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
      {hubsWithEntity.map((hub) => (
        <div key={hub.id} className={cl(!showSidebar && 'overflow-hidden w-12')}>
          <div className="relative flex flex-col">
            <HubItem
              item={hub}
              handleClick={handleClick}
              showChildren={
                ((hub?.children?.length || hub?.wallets?.length || hub?.lists?.length) &&
                  isCanBeOpen(hub.id)) as boolean
              }
              handleLocation={handleLocation}
              type={EntityType.hub}
              topNumber="50px"
              zNumber="5"
            />
            {hub?.children?.length && isCanBeOpen(hub.id) ? <SubHList hubs={hub.children as Hub[]} /> : null}
            {showSidebar && (
              <div>
                {hub?.wallets?.length && isCanBeOpen(hub.id) ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    topNumber={hub.parent_id ? 110 : 80}
                    type="wallet"
                    paddingLeft="33"
                  />
                ) : null}
                {hub?.lists?.length && isCanBeOpen(hub.id) && !showExtendedBar ? (
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
