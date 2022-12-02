import requestNew from '../../app/requestNew';

export const createListService = (data) => {
  const response = requestNew(
    {
      url: 'at/lists',
      method: 'POST',
      params: {
        name: data.name,
        hub_id: data.hubID,
      },
    },
    true,
  );
  return response;
};

// get lists
export const getListService = (data) => {
  const hubID = data.queryKey[1];
  // console.log(hubID);
  const response = requestNew({
    url: 'at/lists',
    method: 'GET',
    params: {
      hub_id: hubID,
    },
  }, true);
  return response;
};
