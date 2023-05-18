import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import Prompt from './common/Prompt';
import { selectCurrentUser } from './features/auth/authSlice';
import { useGetSelf } from './features/settings/user/userSettingsServices';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setUserData, setUserInfo } from './features/settings/user/userSettingsSlice';

function App() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const currentWorkspaceIdLS: string | undefined = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  ) as string;
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const currWorkspaceId = currentWorkspaceIdLS ? currentWorkspaceIdLS : currentWorkspaceId;

  const { data, status } = useGetSelf();

  useEffect(() => {
    if (status === 'success') {
      dispatch(setUserData(data?.data.user));
      dispatch(setUserInfo({ ...data?.data.user }));
    }
  }, [data]);

  return (
    <>
      <RouterProvider router={routes(user, currentWorkspaceIdLS as string)} />
      <Toaster position="bottom-left" />
      <Prompt />
    </>
  );
}
export default App;
