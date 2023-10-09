/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ListProps } from '../../activetree.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  setActiveItem,
  setActiveTabId,
  setCurrentItem,
  setOpenedEntitiesIds,
  setShowExtendedBar,
  setShowPilot
} from '../../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import { cl } from '../../../../../../../utils';
import HubItem from '../../../../../../../components/AlsoHr/HubItem';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../../../../../../components/tasks/HubItemOverLay';

export default function SubHubList({ hubs }: ListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { openedEntitiesIds } = useAppSelector((state) => state.workspace);
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
    navigate(`hr/sh/${id}`, {
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
          </div>
        </div>
      ))}
    </>
  );
}
