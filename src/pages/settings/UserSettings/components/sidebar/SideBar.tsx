import React, { useEffect } from 'react';
import Header from '../../../../../layout/components/MainLayout/Sidebar/components/Header/index';
import Workspace from './Workspace';
import { Outlet } from 'react-router-dom';
import User from './User';
import { useGetSelf } from '../../../../../features/settings/user/userSettingsServices';
import { useAppDispatch } from '../../../../../app/hooks';
import { setStatus, setUserData, setUserInfo } from '../../../../../features/settings/user/userSettingsSlice';

function SideBarSettings() {
  const { data, status } = useGetSelf();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStatus(status));
    if (status === 'success') {
      dispatch(setUserData(data?.data.user));
      dispatch(setUserInfo({ ...data?.data.user }));
    }
  }, [status, data, dispatch]);
  return (
    <section className="flex">
      <section style={{ height: '100vh' }} className="w-1/5 bg-white h-screen border-r-2 border-gray-300 overflow-auto">
        <section>
          <Header />
        </section>
        <section>
          <Workspace />
        </section>
        <section>
          <User />
        </section>
      </section>
      {/* outlets */}
      <div style={{ height: '100vh' }} className="w-4/5 h-screen bg-gray-200 flex">
        <Outlet />
      </div>
    </section>
  );
}

export default SideBarSettings;
