/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const accessTokenLS = localStorage.getItem('accessToken') || '"';
const currentWorkspaceIdLS = localStorage.getItem('currentWorkspaceId') || '"';

const requestNew = async(options: Record<string, unknown>, isMainEndpoint?: boolean, isTaskEndpoint?: boolean) => {
  const accessToken = JSON.parse(accessTokenLS);
  const currentWorkspaceId = JSON.parse(
    currentWorkspaceIdLS,
  );

  const additionalRoute = isMainEndpoint ? '' : isTaskEndpoint ? 'at' : 'af';

  const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/${additionalRoute}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      current_workspace_id: currentWorkspaceId,
    },
  });

  // request handler
  const onSuccess = (response: any) => {
    const { data } = response;
    return data;
  };

  // error handler
  function onError(error: any) {
    return Promise.reject(error.response);
  }

  // adding success and error handlers to client
  return client(options).then(onSuccess).catch(onError);
};

export default requestNew;
