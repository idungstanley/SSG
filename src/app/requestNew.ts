import axios, { AxiosError, AxiosResponse } from 'axios';

async function requestNew<T>(options: Record<string, unknown>): Promise<T> {
  const accessToken = JSON.parse(localStorage.getItem('accessToken') ?? 'null') as string;
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId') || 'null') as string;

  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
        current_workspace_id: currentWorkspaceId
      }
    : undefined;

  const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/`,
    headers
  });

  // request handler
  const onSuccess = (response: AxiosResponse<T>) => {
    const { data } = response;
    return data;
  };

  // error handler
  function onError(error: AxiosError) {
    return Promise.reject(error.response);
  }

  const response = client(options).then(onSuccess).catch(onError);
  // adding success and error handlers to client
  return response;
}

export default requestNew;
