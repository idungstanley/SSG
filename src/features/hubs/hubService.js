import requestNew from '../../app/requestNew';

export const createHubService = (data) => {
  const response = requestNew({
    url: 'at/hubs',
    method: 'POST',
    params: {
      name: data.name,
    },
  }, true);
  return response;
};

export const getHubListService = () => {
  const response = requestNew({
    url: 'at/hubs',
    method: 'GET',
  }, true);
  return response;
};
