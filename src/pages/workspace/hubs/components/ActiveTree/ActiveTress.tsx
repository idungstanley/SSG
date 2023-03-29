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

export default function ActiveTress() {
  const [hubs, setHubs] = useState<Hub[]>([]);

  const { hubId, listId, walletId } = useParams();

  const fetchTree = hubs.length === 0 && (!!hubId || !!listId || !!walletId);

  const { data } = useGetHubs({ includeTree: fetchTree, hubId, walletId, listId });

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
                  hubId || walletId || listId
                )
              ]
        );
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-2 space-x-2">
      <HList hubs={hubs} leftMargin={false} />
    </div>
  );
}
