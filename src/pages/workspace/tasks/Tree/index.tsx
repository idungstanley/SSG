/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CubeIcon, RectangleStackIcon, WalletIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { IHub, IList, IWallet } from '../../../../features/hubs/hubs.interfaces';
import { useGetHubs } from '../../../../features/hubs/hubService';
import { cl } from '../../../../utils';

interface Wallet extends IWallet {
  children: Wallet[];
  lists: List[];
}

interface List extends IList {
  children: List[];
}

interface Hub extends IHub {
  children: Hub[];
  wallets: Wallet[];
  lists: List[];
}

interface InputData {
  hubs: Hub[];
  wallets: Wallet[];
  lists: List[];
}

function updateList(existingTree: List[], updateFn: (i: List) => List, idToUpdate: string): List[] {
  return existingTree.map((list) => {
    if (list.id === idToUpdate) {
      return updateFn(list);
    } else if (list.children) {
      return {
        ...list,
        children: updateList(list.children, updateFn, idToUpdate)
      };
    }

    return list;
  });
}

function updateWallet(
  existingTree: Wallet[],
  updateFn: <T extends Wallet | List>(i: T) => T,
  idToUpdate: string
): Wallet[] {
  return existingTree.map((wallet) => {
    if (wallet.id === idToUpdate) {
      return updateFn(wallet);
    }
    if (wallet.children.length) {
      return {
        ...wallet,
        children: updateWallet(wallet.children, updateFn, idToUpdate),
        lists: updateList(wallet.lists, updateFn, idToUpdate)
      };
    }
    if (wallet.lists.length) {
      return {
        ...wallet,
        lists: updateList(wallet.lists, updateFn, idToUpdate)
      };
    }

    return wallet;
  });
}

function updateTree(
  existingTree: Hub[],
  updateFn: <T extends Hub | Wallet | List>(i: T) => T,
  idToUpdate?: string
): Hub[] {
  if (!idToUpdate) {
    return existingTree;
  }

  return existingTree.map((hub) => {
    if (hub.id === idToUpdate) {
      return updateFn(hub);
    } else if (hub.children.length) {
      return {
        ...hub,
        children: updateTree(hub.children, updateFn, idToUpdate)
      };
    } else if (hub.wallets.length) {
      return {
        ...hub,
        wallets: updateWallet(hub.wallets, updateFn, idToUpdate)
      };
    } else if (hub.lists.length) {
      return {
        ...hub,
        lists: updateList(hub.lists, updateFn, idToUpdate)
      };
    }

    return hub;
  });
}

// const createHubTree = (hubs: Hub[], hubIds: Map<string, Hub>) => {
//   for (const hub of hubs) {
//     hubIds.set(hub.id, hub);
//     if (hub.children.length) {
//       createHubTree(hub.children, hubIds);
//     }
//   }
// };

function createTree(data: InputData): Hub[] {
  const hubsById: Map<string, Hub> = new Map();
  const walletsById: Map<string, Wallet> = new Map();
  const listsById: Map<string, List> = new Map();

  for (const hub of data.hubs) {
    hub.children = [];
    hub.wallets = [];
    hub.lists = [];
    hubsById.set(hub.id, hub);
  }

  for (const wallet of data.wallets) {
    wallet.children = [];
    wallet.lists = [];
    walletsById.set(wallet.id, wallet);
  }

  for (const list of data.lists) {
    list.children = [];
    listsById.set(list.id, list);
  }

  for (const wallet of walletsById.values()) {
    if (wallet.hub_id) {
      const hub = hubsById.get(wallet.hub_id);
      if (hub) {
        hub.wallets.push(wallet);
      }
    }
    if (wallet.parent_id) {
      if (wallet.parent_id) {
        const parentWallet = walletsById.get(wallet.parent_id);
        if (parentWallet) {
          parentWallet.children?.push(wallet);
        }
      }
    }
  }

  for (const list of listsById.values()) {
    if (list.hub_id) {
      const hub = hubsById.get(list.hub_id);
      if (hub) {
        hub.lists.push(list);
      }
    }
    if (list.parent_id) {
      const parent = listsById.get(list.parent_id);
      if (parent) {
        parent.children.push(list);
      }
    }
    if (list.wallet_id !== null) {
      const wallet = walletsById.get(list.wallet_id);

      if (wallet) {
        wallet.lists.push(list);
      }
    }
  }

  const rootHubs: Hub[] = [];
  for (const hub of hubsById.values()) {
    if (hub.parent_id) {
      const parentHub = hubsById.get(hub.parent_id);
      if (parentHub) {
        parentHub.children.push(hub);
      }
    } else {
      rootHubs.push(hub);
    }
  }

  return rootHubs;
}

export default function Tree() {
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
        setHubs(() => [...createTree(incoming)]);
      } else {
        setHubs((prev) =>
          !prev.length
            ? [...incoming.hubs]
            : [
                ...updateTree(
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
    <div className="flex flex-col gap-2">
      <HubList hubs={hubs} leftMargin={false} />
    </div>
  );
}

interface ListProps {
  hubs: Hub[];
  leftMargin: boolean;
}

function HubList({ hubs, leftMargin }: ListProps) {
  return (
    <>
      {hubs.map((hub) => (
        <div key={hub.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <Item id={hub.id} name={hub.name} parentId={hub.parent_id} />

          {hub.children.length ? <HubList hubs={hub.children} leftMargin /> : null}
          {hub.wallets.length ? <WalletList wallets={hub.wallets} leftMargin /> : null}
          {hub.lists.length ? <ListList list={hub.lists} leftMargin /> : null}
        </div>
      ))}
    </>
  );
}

function ListItem({ id, name, parentId }: { id: string; name: string; parentId: string | null }) {
  const { listId } = useParams();

  const navigate = useNavigate();

  const onClick = (id: string) => {
    const isActive = listId === id;

    navigate(`/list/${isActive ? parentId || '' : id}`, {
      replace: true
    });
  };

  return (
    <div
      className={cl(
        'group flex w-full p-1 justify-between items-center',
        listId === id ? 'hover:bg-green-200 bg-green-100' : 'hover:bg-gray-100'
      )}
    >
      <div onClick={() => onClick(id)} className="flex truncate items-center gap-2 cursor-pointer">
        {listId === id ? (
          <VscTriangleDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <VscTriangleRight className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
        <RectangleStackIcon className="h-5 w-5 cursor-pointer" />
        <p className="truncate" title={name}>
          {name}
        </p>
      </div>
    </div>
  );
}

function ListList({ list, leftMargin }: { list: List[]; leftMargin: boolean }) {
  return (
    <>
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <ListItem id={list.id} name={list.name} parentId={list.parent_id || list.hub_id || list.wallet_id} />

          {list.children.length ? <ListList list={list.children} leftMargin /> : null}
        </div>
      ))}
    </>
  );
}

function WalletItem({ id, name, parentId }: { id: string; name: string; parentId: string | null }) {
  const { walletId } = useParams();

  const navigate = useNavigate();

  const onClick = (id: string) => {
    const isActive = walletId === id;

    navigate(`/wallet/${isActive ? parentId || '' : id}`, {
      replace: true
    });
  };

  return (
    <div
      className={cl(
        'group flex w-full p-1 justify-between items-center',
        walletId === id ? 'hover:bg-green-200 bg-green-100' : 'hover:bg-gray-100'
      )}
    >
      <div onClick={() => onClick(id)} className="flex truncate items-center gap-2 cursor-pointer">
        {walletId === id ? (
          <VscTriangleDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <VscTriangleRight className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
        <WalletIcon className="h-5 w-5 cursor-pointer" />
        <p className="truncate" title={name}>
          {name}
        </p>
      </div>
    </div>
  );
}

function WalletList({ wallets, leftMargin }: { wallets: Wallet[]; leftMargin: boolean }) {
  return (
    <>
      {wallets.map((wallet) => (
        <div key={wallet.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <WalletItem id={wallet.id} name={wallet.name} parentId={wallet.parent_id || wallet.hub_id} />

          {wallet.children.length ? <WalletList wallets={wallet.children} leftMargin /> : null}
          {wallet.lists.length ? <ListList list={wallet.lists} leftMargin /> : null}
        </div>
      ))}
    </>
  );
}

interface ItemProps {
  id: string;
  name: string;
  parentId: string | null;
}

function Item({ id, name, parentId }: ItemProps) {
  const { hubId } = useParams();

  const navigate = useNavigate();

  const onClickHub = (id: string) => {
    const isActiveHub = hubId === id;

    navigate(`/hub/${isActiveHub ? parentId || '' : id}`, {
      replace: true
    });
  };

  return (
    <div
      className={cl(
        'group flex w-full p-1 justify-between items-center',
        hubId === id ? 'hover:bg-green-200 bg-green-100' : 'hover:bg-gray-100'
      )}
    >
      <div onClick={() => onClickHub(id)} className="flex truncate items-center gap-2 cursor-pointer">
        {hubId === id ? (
          <VscTriangleDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <VscTriangleRight className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
        <CubeIcon className="h-5 w-5 cursor-pointer" />
        <p className="truncate" title={name}>
          {name}
        </p>
      </div>
    </div>
  );
}