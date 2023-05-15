import React, { useEffect } from 'react';
import Profile from '../components/UserSettings/Profile';
import Personalization from '../components/UserSettings/Personalization';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveTab } from '../../../../features/settings/user/userSettingsSlice';
import { IUserData } from '../../../../features/workspace/workspace.interfaces';

function UserSettings() {
  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state) => state.userSetting);

  useEffect(() => {
    dispatch(setActiveTab('My Account'));
  }, []);

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
