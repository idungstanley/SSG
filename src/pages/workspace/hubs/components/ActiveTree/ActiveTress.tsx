import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Hub, InputData } from './activetree.interfaces';
import { useGetHubs } from '../../../../../features/hubs/hubService';
import CreateTree from './CreateTree';
import UpdateTree from './updateTree/UpdateTree';
import HList from './Items/hub/HList';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setFilteredResults } from '../../../../../features/search/searchSlice';
import { getHub, setParentHubExt } from '../../../../../features/hubs/hubSlice';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { findFirstActiveEntity, findFirstActiveEntityExt, findParentHubId } from '../../../../../app/helpers';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { setParentWalletId } from '../../../../../features/wallet/walletSlice';

export default function ActiveTress() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { listId, hubId, walletId, workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { currentItemId, activeItemId } = useAppSelector((state) => state.workspace);
  const { filteredResults } = useAppSelector((state) => state.search);
  const { parentHubExt } = useAppSelector((state) => state.hub);

  const [hubs, setHubs] = useState<Hub[]>([]);
  const [activeEntityExt, setActiveEntityExt] = useState<{ id: string; type: string }>();

  const fetch = currentWorkspaceId == workSpaceId;
  const fetchTree = !hubs.length && fetch && (!!hubId || !!walletId || !!listId);
  const id = currentItemId;

  const { data } = useGetHubs({ includeTree: fetchTree, hub_id: id, wallet_id: id, list_id: listId });

  useEffect(() => {
    if (data && !parentHubExt.id) {
      const newParentHubId = findParentHubId(data);
      setActiveEntityExt(findFirstActiveEntityExt(location));
      dispatch(setParentHubExt({ id: newParentHubId, type: EntityType.hub }));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const incoming: InputData = {
        hubs: data.hubs ? [...data.hubs.map((i) => ({ ...i, children: [], wallets: [], lists: [] }))] : [],
        wallets: data.wallets ? [...data.wallets.map((i) => ({ ...i, children: [], lists: [] }))] : [],
        lists: data.lists ? [...data.lists.map((i) => ({ ...i, children: [] }))] : []
      };

      if (fetchTree) {
        setHubs(() => [...CreateTree(incoming)]);
      } else {
        setHubs((prev) =>
          !prev.length
            ? [...incoming.hubs]
            : [
                ...UpdateTree(
                  hubs,
                  (item) => {
                    if ('wallets' in item && 'lists' in item) {
                      return {
                        ...item,
                        children: [...incoming.hubs],
                        wallets: [...incoming.wallets],
                        lists: [...incoming.lists]
                      };
                    } else if ('lists' in item) {
                      return {
                        ...item,
                        children: [...incoming.wallets],
                        lists: [...incoming.lists]
                      };
                    } else if ('children' in item) {
                      return {
                        ...item,
                        children: [...incoming.lists]
                      };
                    } else {
                      return item;
                    }
                  },
                  id || listId
                )
              ]
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (hubs) {
      dispatch(setFilteredResults(hubs));
      dispatch(getHub(hubs));

      if (activeEntityExt?.id && !activeItemId) {
        const firstEntity = findFirstActiveEntity(activeEntityExt, hubs);
        const { currentEntity, currentType, parrentWalletId } = firstEntity;
        if (currentEntity && currentType) {
          dispatch(
            setActiveItem({
              activeItemId: currentEntity.id,
              activeItemType: currentType,
              activeItemName: currentEntity.name
            })
          );
        }
        if (parrentWalletId) {
          dispatch(setParentWalletId(parrentWalletId));
        }
      }
    }
  }, [hubs, data]);

  return (
    <div className="flex flex-col gap-2">
      <HList hubs={filteredResults} />
    </div>
  );
}
