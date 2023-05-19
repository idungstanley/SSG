/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  const [hubs, setHubs] = useState<Hub[]>([]);

  const { listId, hubId, walletId, workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { filteredResults } = useAppSelector((state) => state.search);

  const id = currentItemId;
  const fetch = currentWorkspaceId == workSpaceId;

  const fetchTree = hubs.length === 0 && fetch && (!!listId || !!hubId || !!walletId);

  const { data } = useGetHubs({ includeTree: fetchTree, hub_id: id, wallet_id: id, listId });

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
  }, [hubs]);

  return (
    <div className="flex flex-col gap-2 space-x-2">
      <HList hubs={filteredResults} leftMargin={false} taskType="hub" />
    </div>
  );
}
