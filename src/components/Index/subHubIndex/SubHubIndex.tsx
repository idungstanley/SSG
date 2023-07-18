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

export default function SubHubIndex() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showSubChildren, setShowSubChidren] = useState<string | null | undefined>(null);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { data, status } = useGetSubHub({
    parentId: currentItemId
  });
  const type = 'subhub';

  if (status === 'success') {
    data?.data?.hubs.map(({ parent_id }) => dispatch(setHubParentId(parent_id)));
  }
  const { hubParentId, subHubExt } = useAppSelector((state) => state.hub);
  const { id: subHubExtId } = subHubExt;

  const handleClick = (id: string) => {
    dispatch(setSubHubExt({ id: id, type: type }));
    setShowSubChidren(id);
    dispatch(setCreateWLID(id));
    dispatch(
      setActiveItem({
        activeItemType: 'subhub',
        activeItemId: id
      })
    );
    dispatch(setActiveEntity({ id: id, type: 'hub' }));
    dispatch(
      getCurrSubHubId({
        currSubHubId: id,
        currSubHubIdType: 'subhub'
      })
    );
    if (showSubChildren === id) {
      return setShowSubChidren(null);
    }
  };

  const handleLocation = (id: string, name: string) => {
    dispatch(setSubHubExt({ id: id, type: type }));
    dispatch(setShowHub(true));
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'subhub',
        activeItemName: name
      })
    );
    dispatch(
      setShowPilotSideOver({
        id: id,
        type: 'subhub',
        show: true,
        title: name
      })
    );
    // navigate(`/h/${id}`);
    dispatch(setActiveEntity({ id: id, type: 'hub' }));
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
