import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import SHubDropdownList from '../../ItemsListInSidebar/components/SHubDropdownList';
import { setActiveItem, setExtendedBarOpenedEntitiesIds } from '../../../features/workspace/workspaceSlice';
import HubItem from '../../tasks/HubItem';
import { setShowPilotSideOver } from '../../../features/general/slideOver/slideOverSlice';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../tasks/HubItemOverLay';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { Hub } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { APP_TASKS } from '../../../app/constants/app';

interface ISubHubIndexProps {
  data: Hub[];
}

export default function SubHubIndex({ data }: ISubHubIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { draggableItemId } = useAppSelector((state) => state.list);
  const { extendedBarOpenedEntitiesIds } = useAppSelector((state) => state.workspace);

  const handleLocation = (id: string, name: string) => {
    navigate(`/${currentWorkspaceId}/tasks/sh/${id}`);
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
  };

  const handleClick = (id: string) => {
    if (extendedBarOpenedEntitiesIds.includes(id)) {
      dispatch(setExtendedBarOpenedEntitiesIds(extendedBarOpenedEntitiesIds.filter((item) => item !== id)));
    } else {
      dispatch(setExtendedBarOpenedEntitiesIds([...extendedBarOpenedEntitiesIds, id]));
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
              showChildren={extendedBarOpenedEntitiesIds.includes(subhub.id)}
              handleLocation={handleLocation}
              type="subhub"
              isExtendedBar={true}
              placeHubType={APP_TASKS}
            />
            {extendedBarOpenedEntitiesIds.includes(subhub.id) ? <SHubDropdownList parentId={subhub.id} /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
