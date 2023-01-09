import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import Prompt from './common/Prompt';
import { selectCurrentUser } from './features/auth/authSlice';

function App() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="h-full flex flex-col">
      <RouterProvider router={routes(user)} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            width: '400px',
          },
        }}
      />

      <Prompt />
    </div>
  );
}

export default App;
