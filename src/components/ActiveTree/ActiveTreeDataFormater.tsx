/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { IHub, IList, IWallet } from '../../features/hubs/hubs.interfaces';
import { useAppDispatch } from '../../app/hooks';
import { Hub, InputData } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import CreateTree from '../../pages/workspace/hubs/components/ActiveTree/CreateTree';
import UpdateTree from '../../pages/workspace/hubs/components/ActiveTree/updateTree/UpdateTree';
import { getHub } from '../../features/hubs/hubSlice';
import ActiveTreeList from './ActiveTreeList';

interface TreeProps {
  data:
    | {
        hubs: IHub[];
        wallets: IWallet[];
        lists: IList[];
      }
    | undefined;
  fetchTree: boolean;
  id?: string | null;
}

export default function ActiveTreeDataFormater({ data, fetchTree, id }: TreeProps) {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const dispatch = useAppDispatch();

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
                  incoming.hubs.filter((item) => item.parent_id === null),
                  id
                )
              ]
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (hubs) {
      console.log(hubs);
      dispatch(getHub(hubs));
    }
  }, [hubs, data]);

  return hubs.length !== 0 ? (
    <div className="overflow-y-scroll absolute space-x-2 w-52 p-1 bg-white rounded-md shadow-2xl border border-gray-100 ml-2 h-64">
      <ActiveTreeList hubs={hubs} />
    </div>
  ) : null;
}
