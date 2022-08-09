/* eslint-disable */
import React from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Toast from '../../common/Toast';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      if (getState().auth.accessToken && getState().auth.user) {
        headers.set('authorization', `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`);
      }

      if (getState().auth.currentWorkspaceId) {
        headers.set('current_workspace_id', getState().auth.currentWorkspaceId);
      }

      return headers;
    },
  }),
  tagTypes: ['TeamMembers', 'TeamMemberInvites', 'TeamMemberGroups'],
  endpoints: () => ({}),
});

export default mainApi;
