import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setSubHubExt } from '../../../features/hubs/hubSlice';
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
import { Hub } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface ISubHubIndexProps {
  data: Hub[];
}

export default function SubHubIndex({ data }: ISubHubIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { draggableItemId } = useAppSelector((state) => state.list);

  const [openedIds, setOpenedIds] = useState<string[]>([]);

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

  const draggableItem = draggableItemId ? data.find((i) => i.id === draggableItemId) : null;

  return data?.length ? (
    <div id="subhub">
      {draggableItem ? (
        <DragOverlay>
          <HubItemOverlay item={draggableItem} type="subhub" />
        </DragOverlay>
      ) : null}
      {data.length &&
        data.map((subhub) => (
          <div key={subhub.id}>
            <HubItem
              item={subhub}
              handleClick={handleClick}
              showChildren={openedIds.includes(subhub.id)}
              handleLocation={handleLocation}
              type="subhub"
            />
            {openedIds.includes(subhub.id) ? <SHubDropdownList parentId={subhub.id} /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
