/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IHub, IWallet, IList } from '../../../../../features/hubs/hubs.interfaces';
import { Hub, List, Wallet } from './activetree.interfaces';

export default function CreateTree(data: [IHub | IWallet | IList], currentHubId: string, hubs: Hub[]) {
  const newHubs = [...hubs];
  const hubsById: Map<string, Hub> = new Map();
  const subHubsById: Map<string, Hub> = new Map();
  const walletsById: Map<string, Wallet> = new Map();
  const listsById: Map<string, List> = new Map();

  for (let hub of newHubs) {
    if (hub.id === currentHubId) {
      hub = {
        ...hub,
        children: [],
        wallets: [],
        lists: []
      };
      hubsById.set(hub.id, hub);
    } else {
      hubsById.set(hub.id, hub);
    }
  }

  const subHubs = data.filter((item) => !item.type) as Hub[];
  if (subHubs.length) {
    for (let subHub of subHubs) {
      subHub = {
        ...subHub,
        children: [],
        wallets: [],
        lists: []
      };
      hubsById.set(subHub.id, subHub);
    }
  }

  const wallets = data.filter((item) => item.type === 'wallet') as Wallet[];
  if (wallets.length) {
    for (let wallet of wallets) {
      wallet = {
        ...wallet,
        children: [],
        lists: []
      };
      walletsById.set(wallet.id, wallet);
    }
  }

  const lists = data.filter((item) => item.type === 'list') as List[];
  if (lists.length) {
    for (let list of lists) {
      list = {
        ...list,
        children: []
      };
      listsById.set(list.id, list);
    }
  }

  for (const wallet of walletsById.values()) {
    if (wallet.parent_id) {
      const hub = hubsById.get(wallet.parent_id);
      const subHub = subHubsById.get(wallet.parent_id);
      const parentWallet = walletsById.get(wallet.parent_id);
      if (hub) {
        hub.wallets.push(wallet);
      }
      if (subHub) {
        subHub.wallets.push(wallet);
      }
      if (parentWallet) {
        parentWallet.children?.push(wallet);
      }
    }
  }

  for (const list of listsById.values()) {
    if (list.parent_id) {
      const hub = hubsById.get(list.parent_id);
      const subHub = subHubsById.get(list.parent_id);
      const wallet = walletsById.get(list.parent_id);
      if (hub) {
        hub.lists.push(list);
      }
      if (subHub) {
        subHub.lists.push(list);
      }
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
