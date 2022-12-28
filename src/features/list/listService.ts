import requestNew from '../../app/requestNew';

export const createListService = (data: {listName: string, hubId?: string, parentId?: string}) => {
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
  const response = requestNew(
    {
      url: 'at/lists',
      method: 'GET',
      params: {
        hub_id: hubID,
      },
    },
    true
  );
  return response;
};

export const getListsListService = (data) => {
  const walletID = data.queryKey[1];
  const response = requestNew(
    {
      url: 'at/lists',
      method: 'GET',
      params: {
        wallet_id: walletID,
      },
    },
    true,
  );
  return response;
};

// get list details
export const getListsDetailsService = (data) => {
  const listID = data.queryKey[1];
  const response = requestNew(
    {
      url: `at/lists/${listID}`,
      method: 'GET',
    },
    true,
  );
  return response;
};