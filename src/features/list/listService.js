import requestNew from '../../app/requestNew';

export const createListService = (data) => {
  const response = requestNew(
    {
      url: 'at/lists',
      method: 'POST',
      data: {
        name: data.listName,
        hub_id: data.hubId,
        wallet_id: data.parentId,
      },
    },
    true,
  );
  return response;
};

// get lists
export const getListService = (data) => {
  const hubID = data.queryKey[1];
  const response = requestNew({
    url: 'at/lists',
    method: 'GET',
    data: {
      hub_id: hubID,
    },
  }, true);
  return response;
};

export const getListsListService = (data) => {
  const walletID = data.queryKey[1];
  const response = requestNew(
    {
      url: 'at/lists',
      method: 'GET',
      data: {
        wallet_id: walletID,
      },
    },
    true,
  );
  return response;
};
