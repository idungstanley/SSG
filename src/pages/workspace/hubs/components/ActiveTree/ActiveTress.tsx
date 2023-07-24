import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hub, InputData } from './activetree.interfaces';
import { useGetHubs } from '../../../../../features/hubs/hubService';
import CreateTree from './CreateTree';
import UpdateTree from './updateTree/UpdateTree';
import HList from './Items/hub/HList';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setFilteredResults } from '../../../../../features/search/searchSlice';
import { getHub } from '../../../../../features/hubs/hubSlice';

export default function ActiveTress() {
  const dispatch = useAppDispatch();
  const { listId, hubId, walletId, workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { filteredResults } = useAppSelector((state) => state.search);

  const [hubs, setHubs] = useState<Hub[]>([]);

  const fetch = currentWorkspaceId == workSpaceId;
  const fetchTree = !hubs.length && fetch && (!!hubId || !!walletId || !!listId);
  const id = currentItemId;

  const { data } = useGetHubs({ includeTree: fetchTree, hub_id: id, wallet_id: id, list_id: listId });

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
    }
  }, [hubs, data]);

  return (
    <div className="flex flex-col gap-2">
      <HList hubs={filteredResults} />
    </div>
  );
}
