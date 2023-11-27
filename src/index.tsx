import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
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
import { newTaskDataRes } from './features/task/interface.tasks';
import { clearUserFromLS } from './utils/ClearStorage';
import * as Sentry from '@sentry/react';
import { Spinner } from './common';

const onError = (error: unknown): unknown => {
  const typedError = error as IErrorRequest;
  let title: string;
  let body: string;

  if (!error) {
    title = 'Oops! An internal server error occurred.';
    toast.custom((t) => <Toast type="error" title={title} body={body} toastId={t.id} />, { duration: 3000 });

    return;
  }

  if (typedError.status === 403) {
    title = 'Oops! You are not authorized to perform this action.';
  } else if (typedError.status === 401) {
    title = 'Oops! You are no longer authenticated.';
    clearUserFromLS();
    window.location.href = '/auth/login';
  } else if (typedError.status === 500 || !typedError) {
    title = 'Oops! An internal server error occurred.';
  } else if (typedError.status === 404) {
    title = 'Oops! Resource not found.';
  } else if (typedError.status === 422) {
    title = typedError.data.message.title;
  } else if (typedError?.data?.message) {
    title = typedError?.data?.message.title;
    body = typedError?.data?.message.body;
  } else {
    title = typedError?.statusText || typedError?.message || typedError.data.message.title;
  }

  toast.custom((t) => <Toast type="error" title={title} body={body} toastId={t.id} />, { duration: 3000 });
};

const onSuccess = (data: unknown): unknown => {
  let title: string;
  let body: string;
  const typedSuccess = data as ISuccessRequest;

  const typedTaskData = data as newTaskDataRes;

  if (!typedSuccess?.message?.title) {
    return;
  }

  if (typedSuccess?.message) {
    title = typedSuccess?.message.title;
    body = typedSuccess?.message.body;
  } else {
    title = 'Success';
  }

  toast.custom(
    (t) => <Toast type="success" title={title} body={body} toastId={t.id} taskData={typedTaskData.data.task} />,
    {
      duration: 3000
    }
  );
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
  mutationCache: new MutationCache({
    onError,
    onSuccess
  }),
  queryCache: new QueryCache({
    onError
  })
});

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '""';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_KEY,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [/^https:\/\/yourserver\.io\/api/]
    }),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-full">
              <Spinner />
            </div>
          }
        >
          <App />
        </Suspense>
        {/* // ? delete the line below to remove flower icon in bottom right side of page  */}
        <ReactQueryDevtools position="bottom-right" />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </Provider>
);
