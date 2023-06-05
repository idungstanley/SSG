import { Hub, List, Wallet } from '../activetree.interfaces';
import UpdateWallet from './UpdateWallet';
import UpdateList from './UpdateList';

export default function UpdateTree(
  existingTree: Hub[],
  updateFn: <T extends Hub | Wallet | List>(i: T) => T,
  updatedData: Hub[],
  idToUpdate?: string | null,
  dataChanged?: boolean
): Hub[] {
  if (!idToUpdate && dataChanged) {
    return updatedData;
  } else {
    existingTree;
  }

  return existingTree.map((hub) => {
    if (hub.id === idToUpdate) {
      return updateFn(hub);
    } else if (hub.children.length) {
      return {
        ...hub,
        children: UpdateTree(hub.children, updateFn, updatedData, idToUpdate)
      };
    } else if (hub.wallets.length) {
      return {
        ...hub,
        wallets: UpdateWallet(hub.wallets, updateFn, idToUpdate)
      };
    } else if (hub.lists.length) {
      return {
        ...hub,
        lists: UpdateList(hub.lists, updateFn, idToUpdate)
      };
    }
    return hub;
  });
}
