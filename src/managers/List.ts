import { IList } from '../features/hubs/hubs.interfaces';
import { Hub, Wallet } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { EntityType } from '../utils/EntityTypes/EntityType';
import { findCurrentEntity, findParentOfEntity } from './SearchAndUpdate';

export const changeListManager = (id: string, hubs: Hub[], listFromResponse: IList) => {
  const updateList = (item: IList) => {
    let newList = { ...item };
    const { name, color, shape, description } = listFromResponse;
    newList = {
      ...newList,
      name,
      color,
      shape: shape || '',
      description: description || ''
    };
    return newList;
  };

  const updatedTree = findCurrentEntity(EntityType.list, id, hubs, updateList as <IList>(item: IList) => IList);
  return updatedTree;
};

export const deleteListManager = (id: string, hubs: Hub[]) => {
  const deleteList = (lists: IList[]) => {
    return [...lists].filter((lists) => lists.id !== id);
  };

  const updatedTree = findParentOfEntity(EntityType.list, id, hubs, deleteList as <IList>(item: IList) => IList);
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
  const type = walletId ? EntityType.wallet : EntityType.hub;
  const updatedTree = findCurrentEntity(type, id, hubs, createList as <IList>(item: IList) => IList);
  return updatedTree;
};
