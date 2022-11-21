import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import Toast from './common/Toast';

const onError = (error) => {
  var title;
  var body;

  if (!error) {
    title = 'Oops! An internal server error occurred.';
    toast.custom((t) => (
      <Toast type="error" title={title} body={body} toastId={t.id} />
    ));
    return;
  }

  if (error.status === 403) {
    title = 'Oops! You are not authorized to perform this action.';
  } else if (error.status === 401) {
    title = 'Oops! You are no longer authenticated. Please logout and login again.';
  } else if (error.status === 500 || !error) {
    title = 'Oops! An internal server error occurred.';
  } else if (error.status === 404) {
    title = 'Oops! Resource not found.';
  } else if (error?.data?.message) {
    title = error?.data?.message.title;
    body = error?.data?.message.body;
  } else {
    title = error?.statusText || error?.message;
  }

  toast.custom((t) => (
    <Toast type="error" title={title} body={body} toastId={t.id} />
  ));
};

const onSuccess = (data) => {
  var title;
  var body;

  if (!data?.message?.title) {
    return;
  }

  if (data?.message) {
    title = data?.message.title;
    body = data?.message.body;
  } else {
    title = 'Success';
  }

  toast.custom((t) => (
    <Toast type="success" title={title} body={body} toastId={t.id} />
  ));
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 86400000, // 24 hours
    },
  },
  queryCache: new QueryCache({
    onError,
  }),
  mutationCache: new MutationCache({
    onError,
    onSuccess,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools position="bottom-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
