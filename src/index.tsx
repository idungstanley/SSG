import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';
import App from './App';
import { store } from './app/store';
import Toast from './common/Toast';
import { IErrorRequest, ISuccessRequest } from './types';
import { GoogleOAuthProvider } from '@react-oauth/google';

const onError = (error: unknown): unknown => {
  const typedError = error as IErrorRequest;
  let title: string;
  let body: string;

  if (!error) {
    title = 'Oops! An internal server error occurred.';
    toast.custom((t) => <Toast type="error" title={title} body={body} toastId={t.id} />);
    return;
  }

  if (typedError.status === 403) {
    title = 'Oops! You are not authorized to perform this action.';
  } else if (typedError.status === 401) {
    title = 'Oops! You are no longer authenticated. Please logout and login again.';
  } else if (typedError.status === 500 || !typedError) {
    title = 'Oops! An internal server error occurred.';
  } else if (typedError.status === 404) {
    title = 'Oops! Resource not found.';
  } else if (typedError?.data?.message) {
    title = typedError?.data?.message.title;
    body = typedError?.data?.message.body;
  } else {
    title = typedError?.statusText || typedError?.message;
  }

  toast.custom((t) => <Toast type="error" title={title} body={body} toastId={t.id} />);
};

const onSuccess = (data: unknown): unknown => {
  let title: string;
  let body: string;

  const typedSuccess = data as ISuccessRequest;

  if (!typedSuccess?.message?.title) {
    return;
  }

  if (typedSuccess?.message) {
    title = typedSuccess?.message.title;
    body = typedSuccess?.message.body;
  } else {
    title = 'Success';
  }

  toast.custom((t) => <Toast type="success" title={title} body={body} toastId={t.id} />);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 86400000 // 24 hours
    }
  },
  queryCache: new QueryCache({
    onError
  }),
  mutationCache: new MutationCache({
    onError,
    onSuccess
  })
});

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '""';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />

          {/* // ? delete the line below to remove flower icon in bottom right side of page  */}
          <ReactQueryDevtools position="bottom-right" />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
