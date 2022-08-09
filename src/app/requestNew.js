import axios from 'axios';

const client = (() => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

  console.log(`access token ${accessToken}`);

  return axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      current_workspace_id: currentWorkspaceId,
    },
  });
})();

// the request function which will destructure the response
const requestNew = async function (options) {
  // request handler
  const onSuccess = function (response) {
    const { data } = response;
    return data;
  };

  // error handler
  const onError = function (error) {
    return Promise.reject(error.response);
  };

  // adding success and error handlers to client
  return client(options).then(onSuccess).catch(onError);
};

export default requestNew;
