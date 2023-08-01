import { IHub } from '../features/hubs/hubs.interfaces';
import { Hub } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
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

  const updatedTree = findCurrentEntity('hub', id, hubs, updateHub as <IHub>(item: IHub) => IHub);
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
    updatedTree = findCurrentEntity('hub', parentId, hubs, createHub as <IHub>(item: IHub) => IHub);
  } else {
    updatedTree = [...updatedTree, newHub];
  }
  return updatedTree;
};
