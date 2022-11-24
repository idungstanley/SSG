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
