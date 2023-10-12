import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import Prompt from './common/Prompt';
import { selectCurrentUser } from './features/auth/authSlice';
import { useGetSelf } from './features/settings/user/userSettingsServices';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setUserData, setUserInfo } from './features/settings/user/userSettingsSlice';
import { IUseSettingsProfile, setUserSettingsProfile } from './features/task/taskSlice';

function App() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data, status } = useGetSelf();

  useEffect(() => {
    if (status === 'success') {
      dispatch(setUserData(data?.data.user));
      dispatch(setUserInfo({ ...data?.data.user }));
      dispatch(setUserSettingsProfile(data?.data.user_settings as IUseSettingsProfile[]));
    }
  }, [data]);

  return (
    <>
      <RouterProvider router={routes(user)} />
      <Prompt />
    </>
  );
}
export default App;
