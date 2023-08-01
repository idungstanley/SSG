import { IHub } from '../features/hubs/hubs.interfaces';
import { Hub } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentEntity, findParentOfEntity } from './SearchAndUpdate';

export const changeHubColorManager = (id: string, hubs: Hub[], color: string) => {
  const updateColor = (item: IHub) => {
    let newWallet = { ...item };
    newWallet = {
      ...newWallet,
      color: color
    };
    return newWallet;
  };

  const updatedTree = findCurrentEntity('hub', id, hubs, updateColor as <IHub>(item: IHub) => IHub);
  return updatedTree;
};

export const deleteHubManager = (id: string, hubs: Hub[]) => {
  const deleteHub = (hubs: IHub[]) => {
    return [...hubs].filter((hubs) => hubs.id !== id);
  };

  let updatedTree = [...hubs];

  for (let i = 0; i < updatedTree.length; i++) {
    if (updatedTree[i].id === id) {
      updatedTree = deleteHub(hubs) as Hub[];
      return updatedTree;
    }
  }

  updatedTree = findParentOfEntity('hub', id, hubs, deleteHub as <IHub>(item: IHub) => IHub);
  return updatedTree;
};
