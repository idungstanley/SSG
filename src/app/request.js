/* eslint-disable */
import axios from 'axios';

/**
 * Request Wrapper with default success/error actions
 */
const request = async (options) => {
  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/af`;
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const currentWorkspaceId = JSON.parse(localStorage.getItem("currentWorkspaceId"));

  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'current_workspace_id': currentWorkspaceId,
    },
  });

  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    console.debug('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx

      // Unauthenticate (e.g. access token expired)
      if (error.response.status === 401) {
      }

      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log('Error Message:', error.message);
    }

    var messageTitle = '';
    var messageBody = null;

    if (error.response.status === 403) {
      messageTitle = 'Oops! You are not authorized to perform this action.';
    } else if (error.response.status === 401) {
      messageTitle = 'Oops! You are no longer authenticated. Please logout and login again.';
    } else if (error.response.status === 400 || error.response.status === 422) {
      messageTitle = error.response.data.message.title;
      messageBody = error.response.data.message.body;
    } else {
      messageTitle = 'Oops! An unknown error has occurred.';
    }

    return Promise.reject({
      message: {
        title: messageTitle,
        body: messageBody,
      },
      status: {
        code: error.response.status,
      },
    });
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
