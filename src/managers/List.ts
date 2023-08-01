import { IList } from '../features/hubs/hubs.interfaces';
import { Hub, Wallet } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentEntity, findParentOfEntity } from './SearchAndUpdate';

export const changeListColorManager = (id: string, hubs: Hub[], color: unknown) => {
  const updateColor = (item: IList) => {
    let newList = { ...item };
    newList = {
      ...newList,
      color: JSON.stringify(color as string)
    };
    return newList;
  };

  const updatedTree = findCurrentEntity('list', id, hubs, updateColor as <IList>(item: IList) => IList);
  return updatedTree;
};

export const deleteListManager = (id: string, hubs: Hub[]) => {
  const deleteList = (lists: IList[]) => {
    return [...lists].filter((lists) => lists.id !== id);
  };

  const updatedTree = findParentOfEntity('list', id, hubs, deleteList as <IList>(item: IList) => IList);
  console.log('deleteListManager', hubs);
  return updatedTree;
};

export const createListManager = (walletId: string | null, parentId: string | null, hubs: Hub[], newList: IList) => {
  const createList = (parent: Wallet | Hub) => {
    const newParent = { ...parent };
    return {
      ...newParent,
      lists: [...newParent.lists, newList]
    };
  };

  const id = walletId ? walletId : parentId ? parentId : '';
  const type = walletId ? 'wallet' : 'hub';
  const updatedTree = findCurrentEntity(type, id, hubs, createList as <IList>(item: IList) => IList);
  console.log('createListManager', hubs);
  return updatedTree;
};
