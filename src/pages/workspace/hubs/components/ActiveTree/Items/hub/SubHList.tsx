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
import { pilotTabs } from '../../../../../../../app/constants/pilotTabs';
import { generateViewsUrl } from '../../../../../../../utils/generateViewsUrl';
import { IHub } from '../../../../../../../features/hubs/hubs.interfaces';
import { APP_TASKS } from '../../../../../../../app/constants/app';
import { setStatusTaskListDetails } from '../../../../../../../features/list/listSlice';

export default function SubHubList({ hubs, placeHubType }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { showExtendedBar, openedEntitiesIds, activeView } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const handleLocation = (id: string, name: string, item: IHub) => {
    dispatch(setStatusTaskListDetails({ listId: undefined, listName: undefined }));
    const viewsUrl = generateViewsUrl(id, activeView?.id as string, item, EntityType.hub) as string;
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
    if (showFullPilot) {
      dispatch(setActiveTabId(pilotTabs.DETAILS));
    }
    navigate(viewsUrl, {
      replace: true
    });
    if (!showSidebar) {
      dispatch(setShowExtendedBar(true));
    }
  };

  const handleClick = (id: string, type?: string) => {
    if (openedEntitiesIds.includes(id) && type !== 'isOver') {
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
              placeHubType={placeHubType}
            />
            {showSidebar && placeHubType == APP_TASKS ? (
              <div>
                {hub.wallets.length && openedEntitiesIds.includes(hub.id) ? (
                  <WList
                    wallets={hub.wallets}
                    leftMargin={false}
                    topNumber={hub.parent_id ? 110 : 80}
                    type="wallet"
                    paddingLeft="50"
                  />
                ) : null}
                {hub.lists.length && openedEntitiesIds.includes(hub.id) && !showExtendedBar ? (
                  <LList list={hub.lists} leftMargin={false} paddingLeft="60" />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}
