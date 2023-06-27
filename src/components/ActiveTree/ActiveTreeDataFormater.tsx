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
  setToggleTree?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ActiveTreeDataFormater({ data, fetchTree, id, setToggleTree }: TreeProps) {
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
      dispatch(getHub(hubs));
    }
  }, [hubs, data]);

  return hubs.length !== 0 ? (
    <div
      className="absolute left-0 top-10 right-0 h-64 p-1 ml-2 space-x-2 overflow-y-scroll bg-white border border-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none"
      style={{ boxShadow: '0 1px 10px #00000040', zIndex: '999' }}
    >
      <ActiveTreeList hubs={hubs} setToggleTree={setToggleTree} />
    </div>
  ) : null;
}
