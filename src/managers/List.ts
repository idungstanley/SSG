import { IList } from '../features/hubs/hubs.interfaces';
import { Hub, List, Wallet } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
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

export const updateListTasksCountManager = (id: string, hubs: Hub[], count?: number) => {
  const updateList = (item: IList) => {
    let newList = { ...item };
    newList = {
      ...newList,
      tasks_count: count ? count : 0
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

export const createListManager = (type: string, hubs: Hub[], newList: IList) => {
  const createList = (parent: Wallet | Hub) => {
    const newParent = { ...parent };
    return {
      ...newParent,
      lists: newParent?.lists?.length ? [...newParent.lists, newList] : [newList]
    };
  };

  const id = newList.parent_id ?? '';
  const updatedTree = findCurrentEntity(type, id, hubs, createList as <IList>(item: IList) => IList);
  return updatedTree;
};

export const findCurrentList = (id: string, hubs: Hub[]) => {
  let currentEntity = {};
  const findList = (currentList: List) => {
    currentEntity = currentList;
    return currentList;
  };
  findCurrentEntity(EntityType.list, id, hubs, findList as <IList>(item: IList) => IList);
  return currentEntity as List;
};
