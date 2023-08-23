import { IWallet } from '../features/wallet/wallet.interfaces';
import { Hub, Wallet } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { EntityType } from '../utils/EntityTypes/EntityType';
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

  const updatedTree = findCurrentEntity(
    EntityType.wallet,
    id,
    hubs,
    updateWallet as <IWallet>(item: IWallet) => IWallet
  );
  return updatedTree;
};

export const deleteWalletManager = (id: string, hubs: Hub[]) => {
  const deleteWallet = (wallets: IWallet[]) => {
    return [...wallets].filter((wallet) => wallet.id !== id);
  };

  const updatedTree = findParentOfEntity(
    EntityType.wallet,
    id,
    hubs,
    deleteWallet as <IWallet>(item: IWallet) => IWallet
  );
  return updatedTree;
};

export const createWalletManager = (type: string, parentId: string | null, hubs: Hub[], newWalletFromData: IWallet) => {
  const createWallet = (parent: Wallet | Hub) => {
    const newWallet = {
      ...newWalletFromData,
      children: [],
      lists: []
    };
    if (type.includes('hub')) {
      const newParent = { ...parent } as Hub;
      return {
        ...newParent,
        wallets: [...newParent.wallets, newWallet]
      };
    }
    if (type.includes('wallet')) {
      const newParent = { ...parent } as Wallet;
      return {
        ...newParent,
        children: [...newParent.children, newWallet]
      };
    }
  };

  const id = parentId ?? '';
  const updatedTree = findCurrentEntity(type, id, hubs, createWallet as <IWallet>(item: IWallet) => IWallet);
  return updatedTree;
};

export const findAllEntitiesIdsOfWallet = (id: string, hubs: Hub[], openedEntitiesIds: string[]): string[] => {
  const currentEntitiesIds: string[] = [id, ...openedEntitiesIds];
  const findAllEntitiesIds = (currentWallet: Wallet) => {
    if (currentWallet.children.length) {
      for (const children of currentWallet.children) {
        currentEntitiesIds.push(children.id);
      }
    }
    return currentWallet;
  };

  findCurrentEntity(EntityType.wallet, id, hubs, findAllEntitiesIds as <IHub>(item: IHub) => IHub);
  return currentEntitiesIds;
};

export const removeEntityChildrenIdsOfWallet = (id: string, hubs: Hub[], openedEntitiesIds: string[]): string[] => {
  const currentEntitiesIds: string[] = [...openedEntitiesIds];
  const idsForRemove: string[] = [];
  const findAllEntitiesIds = (currentWallet: Wallet) => {
    if (currentWallet.children.length) {
      for (const children of currentWallet.children) {
        idsForRemove.push(children.id);
      }
      currentEntitiesIds.splice(
        0,
        currentEntitiesIds.length,
        ...currentEntitiesIds.filter((n) => !idsForRemove.includes(n))
      );
    }
    return currentWallet;
  };

  findCurrentEntity(EntityType.wallet, id, hubs, findAllEntitiesIds as <IHub>(item: IHub) => IHub);
  return currentEntitiesIds;
};

export const findCurrentWallet = (id: string, hubs: Hub[]) => {
  let currentEntity = {};
  const findWallet = (currentWallet: Wallet) => {
    currentEntity = currentWallet;
    return currentWallet;
  };
  findCurrentEntity(EntityType.wallet, id, hubs, findWallet as <IWallet>(item: IWallet) => IWallet);
  return currentEntity as Wallet;
};
