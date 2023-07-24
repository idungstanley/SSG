/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Hub, InputData, List, Wallet } from './activetree.interfaces';

export default function CreateTree(data: InputData): Hub[] {
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
