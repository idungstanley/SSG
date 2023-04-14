import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import Prompt from './common/Prompt';
import { selectCurrentUser } from './features/auth/authSlice';
import './styles/index.css';
import { setOnlineStatus } from './features/community/communityService';

function App() {
  const user = useSelector(selectCurrentUser);
  setOnlineStatus();

  // currentWorkspaceId;
  // const getCurrentWsId = JSON.parse(localStorage.getItem('currentWorkspaceId') as string) as string;
  return (
    <>
      <RouterProvider router={routes(user)} />
      <Toaster position="bottom-left" />
      <Prompt />
    </>
  );
}
export default App;
