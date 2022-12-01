import React, { useCallback, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import 'tippy.js/dist/tippy.css';
import Prompt from './common/Prompt';
import ContextMenu from './common/ContextMenu';
import { resetContextMenu } from './features/general/contextMenu/contextMenuSlice';
import { selectCurrentUser } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  const { anchorPointX, anchorPointY, showContextMenu } = useSelector(
    (state) => state.contextMenu,
  );

  const handleClick = useCallback(
    () => dispatch(resetContextMenu()),
    [showContextMenu],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

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

      {showContextMenu ? (
        <div
          className="menu"
          style={{
            top: anchorPointY,
            left: anchorPointX,
          }}
        >
          <ContextMenu />
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default App;
