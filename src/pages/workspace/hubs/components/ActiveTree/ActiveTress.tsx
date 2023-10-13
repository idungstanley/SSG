import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Hub } from './activetree.interfaces';
import { useGetAllHubs, useGetActiveHubChildren } from '../../../../../features/hubs/hubService';
import CreateTree from './CreateTree';
import HList from './Items/hub/HList';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setFilteredResults } from '../../../../../features/search/searchSlice';
import { getHub, setParentHubExt } from '../../../../../features/hubs/hubSlice';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import {
  findAllIdsBeforeActiveEntity,
  findFirstActiveEntity,
  findFirstActiveEntityExt
} from '../../../../../app/helpers';
import { setActiveItem, setOpenedEntitiesIds } from '../../../../../features/workspace/workspaceSlice';
import { IHub } from '../../../../../features/hubs/hubs.interfaces';

interface HubProps {
  placeHubType: string;
}

export default function ActiveTress({ placeHubType }: HubProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { hubId } = useParams();
  const { activeItemId, openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { filteredResults } = useAppSelector((state) => state.search);
  const { parentHubExt } = useAppSelector((state) => state.hub);

  const [hubs, setHubs] = useState<Hub[]>([]);
  const [activeEntityExt, setActiveEntityExt] = useState<{ id: string; type: string }>();
  const [newHubId, setNewHubId] = useState<string>('');

  const { data: allHubs } = useGetAllHubs();
  const { data: allHubTree } = useGetActiveHubChildren({ hub_id: newHubId || hubId, hubs: allHubs?.hubs as IHub[] });

  useEffect(() => {
    if (allHubTree?.tree.length && allHubs && hubs.length) {
      const currentHubId = allHubTree.tree[0].parent_id || hubId;
      const currentItem = hubs.find((item) => item.id === currentHubId);
      if (!currentItem?.children) {
        setHubs(() => [...CreateTree(allHubTree.tree, currentHubId as string, hubs as Hub[], placeHubType)]);
      }
    }
  }, [allHubTree, allHubs, hubs]);

  useEffect(() => {
    if (activeEntityExt?.id && allHubTree && !openedEntitiesIds.length) {
      dispatch(setOpenedEntitiesIds(findAllIdsBeforeActiveEntity(activeEntityExt.id, allHubTree.tree)));
    }
  }, [activeEntityExt?.id, allHubTree]);

  useEffect(() => {
    if (allHubTree?.tree.length && !parentHubExt.id) {
      const newParentHubId = allHubTree.tree[0].parent_id;
      setActiveEntityExt(findFirstActiveEntityExt(location));
      dispatch(setParentHubExt({ id: newParentHubId, type: EntityType.hub }));
    }
  }, [allHubTree, parentHubExt.id]);

  useEffect(() => {
    if (allHubs && !hubs.length) {
      const incoming = {
        hubs: allHubs.hubs ? [...allHubs.hubs] : []
      };
      setHubs([...incoming.hubs] as Hub[]);
    }
  }, [allHubs]);

  useEffect(() => {
    if (hubs && hubs.length) {
      dispatch(setFilteredResults(hubs));
      dispatch(getHub(hubs));

      if (activeEntityExt?.id && !activeItemId) {
        const { currentEntity, currentType } = findFirstActiveEntity(activeEntityExt, hubs);
        if (currentEntity && currentType) {
          dispatch(
            setActiveItem({
              activeItemId: currentEntity.id,
              activeItemType: currentType,
              activeItemName: currentEntity.name
            })
          );
        }
      }
    }
  }, [hubs]);

  const handleOpenNewHub = (id: string) => {
    setNewHubId(id);
  };

  return (
    <div className="flex flex-col gap-2">
      <HList hubs={filteredResults} openNewHub={handleOpenNewHub} placeHubType={placeHubType} />
    </div>
  );
}
