import axios, { AxiosError, AxiosResponse } from 'axios';

const requestForBuffer = async (options: Record<string, unknown>) => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken') || 'null');
  const currentWorkspaceId = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || 'null'
  );

  const baseURL = `${process.env.REACT_APP_API_BASE_URL}/api/af/`;
  const headers = accessToken && {
    Authorization: `Bearer ${accessToken}`,
    current_workspace_id: currentWorkspaceId,
  };

  const client = axios.create({
    baseURL,
    headers,
    responseType: 'arraybuffer',
  });

  // request handler
  const onSuccess = (response: AxiosResponse) => {
    const { data } = response;
    return data;
  };

  // error handler
  function onError(error: AxiosError) {
    return Promise.reject(error.response);
  }

  // adding success and error handlers to client
  return client(options).then(onSuccess).catch(onError);
};

export default requestForBuffer;
