import React, { useEffect } from 'react';
import Profile from '../components/UserSettings/Profile';
import Personalization from '../components/UserSettings/Personalization';
import { Spinner } from '../../../../common';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveTab } from '../../../../features/settings/user/userSettingsSlice';
import { IUserData } from '../../../../features/workspace/workspace.interfaces';

function UserSettings() {
  const dispatch = useAppDispatch();

  const { userData, status } = useAppSelector((state) => state.userSetting);

  useEffect(() => {
    dispatch(setActiveTab('My Settings'));
  }, []);

  if (status === 'loading') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size={50} color="#0F70B7" />
      </div>
    );
  }

  return (
    <section className="flex w-full">
      <section className="m-auto flex h-full w-1/3">
        <Profile />
      </section>
      <section className="m-auto flex h-full w-2/3">
        <Personalization data={userData as IUserData | undefined} />
      </section>
    </section>
  );
}

export default UserSettings;
