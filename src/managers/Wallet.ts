import { IWallet } from '../features/wallet/wallet.interfaces';
import { Hub, Wallet } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findParentOfEntity, findCurrentEntity } from './SearchAndUpdate';

export const changeWalletManager = (id: string, hubs: Hub[], walletFromResponse: IWallet) => {
  const updateWallet = (item: IWallet) => {
    let newWallet = { ...item };
    const { name, color, description } = walletFromResponse;
    newWallet = {
      ...newWallet,
      name,
      color,
      description: description || ''
    };
    return newWallet;
  };

  const updatedTree = findCurrentEntity('wallet', id, hubs, updateWallet as <IWallet>(item: IWallet) => IWallet);
  return updatedTree;
};

export const deleteWalletManager = (id: string, hubs: Hub[]) => {
  const deleteWallet = (wallets: IWallet[]) => {
    return [...wallets].filter((wallet) => wallet.id !== id);
  };

  const updatedTree = findParentOfEntity('wallet', id, hubs, deleteWallet as <IWallet>(item: IWallet) => IWallet);
  return updatedTree;
};

export const createWalletManager = (
  hubId: string | null,
  parentId: string | null,
  hubs: Hub[],
  newWalletFromData: IWallet
) => {
  const createWallet = (parent: Wallet | Hub) => {
    const newWallet = {
      ...newWalletFromData,
      children: [],
      lists: []
    };
    if (hubId) {
      const newParent = { ...parent } as Hub;
      return {
        ...newParent,
        wallets: [...newParent.wallets, newWallet]
      };
    }
    if (parentId) {
      const newParent = { ...parent } as Wallet;
      return {
        ...newParent,
        children: [...newParent.children, newWallet]
      };
    }
  };

  const id = hubId ? hubId : parentId ? parentId : '';
  const type = parentId ? 'wallet' : 'hub';
  const updatedTree = findCurrentEntity(type, id, hubs, createWallet as <IWallet>(item: IWallet) => IWallet);
  return updatedTree;
};
