import React, { useState } from 'react';
import { useGetSubHub } from '../../../features/hubs/hubService';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import { getCurrSubHubId, setCreateWLID, setHubParentId, setSubHubExt } from '../../../features/hubs/hubSlice';
import SHubDropdownList from '../../ItemsListInSidebar/components/SHubDropdownList';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setShowHub
} from '../../../features/workspace/workspaceSlice';
// import { useNavigate } from 'react-router-dom';
import HubItem from '../../tasks/HubItem';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../tasks/HubItemOverLay';
import { EntityType } from '../../../utils/EntityTypes/EntityType';

export default function SubHubIndex() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showSubChildren, setShowSubChidren] = useState<string | null | undefined>(null);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { data, status } = useGetSubHub({
    parentId: currentItemId
  });

  if (status === 'success') {
    data?.data?.hubs.map(({ parent_id }) => dispatch(setHubParentId(parent_id)));
  }
  const { hubParentId, subHubExt } = useAppSelector((state) => state.hub);
  const { id: subHubExtId } = subHubExt;

  const handleClick = (id: string) => {
    dispatch(setSubHubExt({ id: id, type: EntityType.subHub }));
    setShowSubChidren(id);
    dispatch(setCreateWLID(id));
    dispatch(
      setActiveItem({
        activeItemType: EntityType.subHub,
        activeItemId: id
      })
    );
    dispatch(setActiveEntity({ id: id, type: EntityType.hub }));
    dispatch(
      getCurrSubHubId({
        currSubHubId: id,
        currSubHubIdType: EntityType.subHub
      })
    );
    if (showSubChildren === id) {
      return setShowSubChidren(null);
    }
  };

  const handleLocation = (id: string, name: string) => {
    dispatch(setSubHubExt({ id: id, type: EntityType.subHub }));
    dispatch(setShowHub(true));
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.subHub,
        activeItemName: name
      })
    );
    dispatch(
      setShowPilotSideOver({
        id: id,
        type: EntityType.subHub,
        show: true,
        title: name
      })
    );
    dispatch(setActiveEntity({ id: id, type: EntityType.hub }));
  };

  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? data?.data?.hubs.find((i) => i.id === draggableItemId) : null;
  return currentItemId === hubParentId ? (
    <div id="subhub">
      {draggableItem ? (
        <DragOverlay>
          <HubItemOverlay item={draggableItem} type="subhub" />
        </DragOverlay>
      ) : null}
      {data?.data?.hubs.length !== 0 &&
        data?.data?.hubs.map((subhub) => (
          <div key={subhub.id}>
            <HubItem
              item={subhub}
              handleClick={handleClick}
              showChildren={!!showSubChildren}
              handleLocation={handleLocation}
              type="subhub"
            />
            {subHubExtId === subhub.id ? <SHubDropdownList /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
