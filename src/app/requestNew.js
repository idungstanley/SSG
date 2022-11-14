import axios from 'axios';

const requestNew = async (options, isMainRequest) => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

  const additionalRoute = isMainRequest ? '' : 'af';

  const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/${additionalRoute}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      current_workspace_id: currentWorkspaceId,
    },
  });

  // request handler
  const onSuccess = (response) => {
    const { data } = response;
    return data;
  };

  // error handler
  function onError(error) {
    return Promise.reject(error.response);
  }

  // adding success and error handlers to client
  return client(options).then(onSuccess).catch(onError);
};

export default requestNew;
