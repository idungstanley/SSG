import React from 'react';
import SideBar from './components/sidebar/SideBar';
import Profile from './components/Profile';
import Personalization from './components/Personalization';
import { getSelf } from '../../../features/workspace/workspaceService';
import { Spinner } from '../../../common';
import { useAppDispatch } from '../../../app/hooks';
import { setUserData, setUserInfo } from '../../../features/settings/user/userSettingsSlice';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function UserSettings() {
  const { data, status } = getSelf();
  const dispatch = useAppDispatch();

  if (status === 'loading') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size={50} color="#0F70B7" />
      </div>
    );
  }
  if (status === 'success') {
    dispatch(setUserData(data?.data.user));
    dispatch(
      setUserInfo({
        ...data?.data.user
      })
    );
    return (
      <div className="w-screen h-screen bg-gray-200 flex">
        <section
          style={{ height: '100vh' }}
          className="w-1/5 bg-white h-screen overflow-auto border-r-2 border-gray-300 overflow-auto"
        >
          <SideBar data={data?.data.user} />
        </section>
        <div className="w-4/5">
          <section className="m-auto flex h-full">
            <Profile />
            <Personalization data={data?.data.user} />
          </section>
        </div>
      </div>
    );
  }
  // return status === 'success' ? : null;
}

export default UserSettings;
