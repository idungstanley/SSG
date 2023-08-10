import { IHub } from '../features/hubs/hubs.interfaces';
import { Hub } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { EntityType } from '../utils/EntityTypes/EntityType';
import { findCurrentEntity, findParentOfEntity } from './SearchAndUpdate';

export const changeHubManager = (id: string, hubs: Hub[], hubFromResponse: IHub) => {
  const updateHub = (item: IHub) => {
    let newHub = { ...item };
    const { name, color, current_workspace_id, description } = hubFromResponse;
    newHub = {
      ...newHub,
      name,
      color,
      current_workspace_id: current_workspace_id || '',
      description: description || ''
    };
    return newHub;
  };

  const updatedTree = findCurrentEntity(EntityType.hub, id, hubs, updateHub as <IHub>(item: IHub) => IHub);
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

  updatedTree = findParentOfEntity(EntityType.hub, id, hubs, deleteHub as <IHub>(item: IHub) => IHub);
  return updatedTree;
};

export const createHubManager = (parentId: string | null, hubs: Hub[], newHubFromData: IHub) => {
  const newHub = {
    ...newHubFromData,
    children: [],
    wallets: [],
    lists: []
  };

  const createHub = (parent: Hub) => {
    const newParent = { ...parent } as Hub;
    return {
      ...newParent,
      children: [...newParent.children, newHub]
    };
  };

  let updatedTree = [...hubs];

  if (parentId) {
    updatedTree = findCurrentEntity(EntityType.hub, parentId, hubs, createHub as <IHub>(item: IHub) => IHub);
  } else {
    updatedTree = [...updatedTree, newHub];
  }
  return updatedTree;
};

export const findAllEntitiesIdsOfHub = (id: string, hubs: Hub[], openedEntitiesIds: string[]): string[] => {
  const currentEntitiesIds: string[] = [...openedEntitiesIds];
  const findAllEntitiesIds = (currentHub: Hub) => {
    if (currentHub.children.length) {
      for (const children of currentHub.children) {
        currentEntitiesIds.push(children.id);
      }
    }
    if (currentHub.wallets.length) {
      for (const wallet of currentHub.wallets) {
        currentEntitiesIds.push(wallet.id);
      }
    }
    return currentHub;
  };

  findCurrentEntity(EntityType.hub, id, hubs, findAllEntitiesIds as <IHub>(item: IHub) => IHub);
  return currentEntitiesIds;
};

export const removeEntityChildrenIdsOfHub = (id: string, hubs: Hub[], openedEntitiesIds: string[]): string[] => {
  const currentEntitiesIds: string[] = [...openedEntitiesIds];
  const idsForRemove: string[] = [];
  const findAllEntitiesIds = (currentHub: Hub) => {
    if (currentHub.children.length) {
      for (const children of currentHub.children) {
        idsForRemove.push(children.id);
      }
    }
    if (currentHub.wallets.length) {
      for (const wallet of currentHub.wallets) {
        idsForRemove.push(wallet.id);
      }
    }
    currentEntitiesIds.splice(
      0,
      currentEntitiesIds.length,
      ...currentEntitiesIds.filter((n) => !idsForRemove.includes(n))
    );
    return currentHub;
  };

  findCurrentEntity(EntityType.hub, id, hubs, findAllEntitiesIds as <IHub>(item: IHub) => IHub);
  return currentEntitiesIds;
};
