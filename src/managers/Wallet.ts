import { IWallet } from '../features/wallet/wallet.interfaces';
import { Hub } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findParentOfEntity, findCurrentEntity } from './SearchAndUpdate';

export const changeWalletColorManager = (id: string, hubs: Hub[], color: unknown) => {
  const updateColor = (item: IWallet) => {
    let newWallet = { ...item };
    newWallet = {
      ...newWallet,
      color: JSON.stringify(color)
    };
    return newWallet;
  };

  const updatedTree = findCurrentEntity('wallet', id, hubs, updateColor as <IWallet>(item: IWallet) => IWallet);
  return updatedTree;
};

export const deleteWalletManager = (id: string, hubs: Hub[]) => {
  const deleteWallet = (wallets: IWallet[]) => {
    return [...wallets].filter((wallet) => wallet.id !== id);
  };

  const updatedTree = findParentOfEntity('wallet', id, hubs, deleteWallet as <IWallet>(item: IWallet) => IWallet);
  return updatedTree;
};
