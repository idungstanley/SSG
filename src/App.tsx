import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import Prompt from './common/Prompt';
import { selectCurrentUser } from './features/auth/authSlice';

function App() {
  const user = useSelector(selectCurrentUser);
  const routing = useRoutes(routes(user));

  return (
    <div className="h-full flex flex-col">
      {routing}
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
