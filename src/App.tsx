import { RouterProvider } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import Prompt from './common/Prompt';
// import { selectCurrentUser } from './features/auth/authSlice';
// import './styles/index.css';
// import { setOnlineStatus } from './features/community/communityService';
import { useGetSelf } from './features/settings/user/userSettingsServices';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUserData, setUserInfo } from './features/settings/user/userSettingsSlice';

function App() {
  // const user = useSelector(selectCurrentUser);
  // setOnlineStatus();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.userSetting);

  const { data, status } = useGetSelf();

  useEffect(() => {
    dispatch(setUserData(data?.data.user));
    dispatch(setUserInfo({ ...data?.data.user }));
  }, [data]);

  return status == 'success' ? (
    <>
      <RouterProvider router={routes(userData)} />
      <Toaster position="bottom-left" />
      <Prompt />
    </>
  ) : null;
}
export default App;
