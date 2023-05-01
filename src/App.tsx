import { RouterProvider } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import Prompt from './common/Prompt';
import { selectCurrentUser } from './features/auth/authSlice';
// import './styles/index.css';
// import { setOnlineStatus } from './features/community/communityService';
import { useGetSelf } from './features/settings/user/userSettingsServices';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setUserData, setUserInfo } from './features/settings/user/userSettingsSlice';

function App() {
  const user = useAppSelector(selectCurrentUser);
  // const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // setOnlineStatus();

  const { data, status } = useGetSelf();

  useEffect(() => {
    if (status === 'success') {
      dispatch(setUserData(data?.data.user));
      dispatch(setUserInfo({ ...data?.data.user }));
    }
  }, [data]);

  return (
    <>
      <RouterProvider router={routes(user)} />
      <Toaster position="bottom-left" />
      <Prompt />
    </>
  );
}
export default App;
