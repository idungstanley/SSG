import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSubHub } from '../../../features/hubs/hubService';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setHubParentId, setSubHubExt } from '../../../features/hubs/hubSlice';
import SHubDropdownList from '../../ItemsListInSidebar/components/SHubDropdownList';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setShowHub
} from '../../../features/workspace/workspaceSlice';
import HubItem from '../../tasks/HubItem';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../tasks/HubItemOverLay';
import { EntityType } from '../../../utils/EntityTypes/EntityType';

export default function SubHubIndex() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { hubParentId } = useAppSelector((state) => state.hub);
  const { draggableItemId } = useAppSelector((state) => state.list);

  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const { data, isSuccess } = useGetSubHub({ parentId: activeItemId });

  if (isSuccess) {
    data?.data?.hubs.map(({ parent_id }) => dispatch(setHubParentId(parent_id)));
  }

  const handleLocation = (id: string, name: string) => {
    dispatch(setSubHubExt({ id: id, type: EntityType.subHub }));
    navigate(`/${currentWorkspaceId}/tasks/sh/${id}`);
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
    setOpenedIds([]);
  };

  const handleClick = (id: string) => {
    if (openedIds.includes(id)) {
      setOpenedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenedIds((prev) => [...prev, id]);
    }
  };

  const draggableItem = draggableItemId ? data?.data?.hubs.find((i) => i.id === draggableItemId) : null;

  return activeItemId === hubParentId ? (
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
              showChildren={openedIds.includes(subhub.id)}
              handleLocation={handleLocation}
              type="subhub"
            />
            {openedIds.includes(subhub.id) ? <SHubDropdownList currenId={subhub.id} /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
