import React, { useEffect } from 'react';
import SideBar from './components/sidebar/SideBar';
import Profile from './components/Profile';
import Personalization from './components/Personalization';
import { Spinner } from '../../../common';
import { useAppDispatch } from '../../../app/hooks';
import { setActiveTab, setUserData, setUserInfo } from '../../../features/settings/user/userSettingsSlice';
import { useGetSelf } from '../../../features/settings/user/userSettingsServices';

function UserSettings() {
  const { data, status } = useGetSelf();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveTab('My Settings'));
    if (status === 'success') {
      dispatch(setUserData(data?.data.user));
      dispatch(setUserInfo({ ...data?.data.user }));
    }
  }, [status, data, dispatch]);

  if (status === 'loading') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size={50} color="#0F70B7" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      <section
        style={{ height: '100vh' }}
        className="w-1/5 bg-white h-screen overflow-auto border-r-2 border-gray-300 overflow-auto"
      >
        <SideBar />
      </section>
      <div className="w-4/5 flex">
        <section className="m-auto flex h-full w-1/3">
          <Profile />
        </section>
        <section className="m-auto flex h-full w-2/3">
          <Personalization data={data?.data.user} />
        </section>
      </div>
    </div>
  );
}

export default UserSettings;
