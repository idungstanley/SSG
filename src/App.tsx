import { RouterProvider } from 'react-router-dom';
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
  const { data, status } = useGetSelf();

  useEffect(() => {
    if (status === 'success') {
      dispatch(setUserData(data?.data.user));
      dispatch(setUserInfo({ ...data?.data.user }));
    }
  }, [data]);

  // useEffect(() => {
  //   $(document).ready(function () {
  //     const maxScreen = 2560;
  //     const screenWidth = window.innerWidth;
  //     if (screenWidth <= maxScreen) {
  //       $('html').css('zoom', '0.85');
  //     }
  //   });
  // }, []);

  console.log(window.innerWidth);

  return (
    <>
      <RouterProvider router={routes(user)} />
      {/* <Toaster position="bottom-left" /> */}
      <Prompt />
    </>
  );
}
export default App;
