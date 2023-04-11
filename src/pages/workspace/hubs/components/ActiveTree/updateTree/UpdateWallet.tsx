import { List, Wallet } from '../activetree.interfaces';
import UpdateList from './UpdateList';

export default function UpdateWallet(
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
        children: UpdateWallet(wallet.children, updateFn, idToUpdate),
        lists: UpdateList(wallet.lists, updateFn, idToUpdate)
      };
    }
    if (wallet.lists.length) {
      return {
        ...wallet,
        lists: UpdateList(wallet.lists, updateFn, idToUpdate)
      };
    }

    return wallet;
  });
}
