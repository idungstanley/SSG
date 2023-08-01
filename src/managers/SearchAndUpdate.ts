import { Hub, List, Wallet } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

function findInChildren(hubs: Hub[], id: string, type: string, func: <T>(item: T) => T) {
  const newHubsArray = [...hubs];
  for (let i = 0; i < newHubsArray.length; i++) {
    if (type === 'hub' && newHubsArray[i].id === id) {
      newHubsArray[i] = func(newHubsArray[i]);
    }
    if (type === 'list' && newHubsArray[i].lists.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        lists: findInLists(newHubsArray[i].lists, id, func)
      };
    }
    if (newHubsArray[i].wallets.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        wallets: findInWallets(newHubsArray[i].wallets, id, type, func)!
      };
    }
  }
  return newHubsArray;
}

function findInWallets(wallets: Wallet[], id: string, type: string, func: <T>(item: T) => T) {
  const newWalletsArr = [...wallets];
  for (let i = 0; i < newWalletsArr.length; i++) {
    if (type === 'wallet' && newWalletsArr[i].id === id) {
      newWalletsArr[i] = func(newWalletsArr[i]);
    }
    if ((type === 'wallet' || type === 'list') && newWalletsArr[i].children.length) {
      newWalletsArr[i] = {
        ...newWalletsArr[i],
        children: findInWalletChildren(newWalletsArr[i].children, id, type, func)
      };
    }
    if (type === 'list' && newWalletsArr[i].lists.length) {
      newWalletsArr[i] = {
        ...newWalletsArr[i],
        lists: findInLists(newWalletsArr[i].lists, id, func)
      };
    }
    return newWalletsArr;
  }
}

function findInWalletChildren(wallets: Wallet[], id: string, type: string, func: <T>(item: T) => T) {
  const newWalletArray = [...wallets];
  for (let i = 0; i < newWalletArray.length; i++) {
    if (type === 'wallet' && newWalletArray[i].id === id) {
      newWalletArray[i] = func(newWalletArray[i]);
    }
    if (type === 'list' && newWalletArray[i].lists.length) {
      newWalletArray[i] = {
        ...newWalletArray[i],
        lists: findInLists(newWalletArray[i].lists, id, func)
      };
    }
    if (newWalletArray[i].children.length) {
      newWalletArray[i] = {
        ...newWalletArray[i],
        children: findInWalletChildren(newWalletArray[i].children, id, type, func)
      };
    }
  }
  return newWalletArray;
}

function findInLists(lists: List[], id: string, func: <T>(item: T) => T) {
  const newListsArray = [...lists];
  for (let i = 0; i < newListsArray.length; i++) {
    if (newListsArray[i].id === id) {
      newListsArray[i] = func(newListsArray[i]);
    }
  }
  return newListsArray;
}

export function findCurrentEntity(type: string, id: string, hubs: Hub[], func: <T>(item: T) => T): Hub[] {
  const newHubsArray = [...hubs];
  for (let i = 0; i < newHubsArray.length; i++) {
    if (type === 'hub' && newHubsArray[i].id === id) {
      newHubsArray[i] = func(newHubsArray[i]);
    }
    if (newHubsArray[i].children.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        children: findInChildren(newHubsArray[i].children, id, type, func)!
      };
    }
    if ((type === 'wallet' || type === 'list') && newHubsArray[i].wallets.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        wallets: findInWallets(newHubsArray[i].wallets, id, type, func)!
      };
    }
    if (type === 'list' && newHubsArray[i].lists.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        lists: findInLists(newHubsArray[i].lists, id, func)
      };
    }
  }
  return newHubsArray;
}

function updateParentOfWallets(type: string, wallets: Wallet[], id: string, func: <T>(item: T) => T) {
  let newWalletsArray = [...wallets];
  for (let i = 0; i < newWalletsArray.length; i++) {
    if (type === 'wallet' && newWalletsArray[i].id === id) {
      newWalletsArray = func(newWalletsArray);
      break;
    }
    if (newWalletsArray[i].children.length) {
      newWalletsArray[i] = {
        ...newWalletsArray[i],
        children: updateParentOfWallets(type, newWalletsArray[i].children, id, func)
      };
    }
    if (type === 'list' && newWalletsArray[i].lists.length) {
      newWalletsArray[i] = {
        ...newWalletsArray[i],
        lists: updateParentOfLists(newWalletsArray[i].lists, id, func)
      };
    }
  }
  return newWalletsArray;
}

function updateParentOfHubs(type: string, hubs: Hub[], id: string, func: <T>(item: T) => T) {
  let newHubsArray = [...hubs];
  for (let i = 0; i < newHubsArray.length; i++) {
    if (type === 'hub' && newHubsArray[i].id === id) {
      newHubsArray = func(newHubsArray);
      break;
    }

    if (type === 'wallet' && newHubsArray[i].wallets.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        wallets: updateParentOfWallets(type, newHubsArray[i].wallets, id, func)
      };
    }

    if (type === 'list' && newHubsArray[i].lists.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        lists: updateParentOfLists(newHubsArray[i].lists, id, func)
      };
    }
  }
  return newHubsArray;
}

function updateParentOfLists(lists: List[], id: string, func: <T>(item: T) => T) {
  let newListsArray = [...lists];
  for (let i = 0; i < newListsArray.length; i++) {
    if (newListsArray[i].id === id) {
      newListsArray = func(newListsArray);
      break;
    }
  }
  return newListsArray;
}

export function findParentOfEntity(type: string, id: string, hubs: Hub[], func: <T>(item: T) => T) {
  const newHubsArray = [...hubs];
  for (let i = 0; i < newHubsArray.length; i++) {
    // check sub hubs
    if (newHubsArray[i].children.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        children: updateParentOfHubs(type, newHubsArray[i].children, id, func)
      };
    }
    // check first level of wallets
    if ((type === 'wallet' || type === 'list') && newHubsArray[i].wallets.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        wallets: updateParentOfWallets(type, newHubsArray[i].wallets, id, func)
      };
    }
    // check first level of lists
    if (type === 'list' && newHubsArray[i].lists.length) {
      newHubsArray[i] = {
        ...newHubsArray[i],
        lists: updateParentOfLists(newHubsArray[i].lists, id, func)
      };
    }
  }
  return newHubsArray;
}
