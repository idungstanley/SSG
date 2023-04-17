import React from 'react';
import CurrentUser from './CurrentUser';
import Region from './Region';
// import { IUserData } from '../../../../features/workspace/workspace.interfaces';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { setShowConfirmationModal, setUserInfo } from '../../../../features/settings/user/userSettingsSlice';
import CurrentUserModal from './CurrentUserModal';
import UploadAvatar from './UploadAvatar';
import { InvalidateQueryFilters } from '@tanstack/react-query';

function Profile() {
  const { name, email, time_format, date_format, start_week, currentUserModal, showAvatarUpload } = useAppSelector(
    (state) => state.userSetting
  );
  const dispatch = useAppDispatch();

  return (
    <div className="w-full bg-white m-2 p-4 rounded-lg">
      <h1 className="font-bold text-=xs">PERSONAL PROFILE</h1>
      <section>
        <div className="flex justify-center my-2">
          <div>
            <CurrentUser />
          </div>
        </div>
        {currentUserModal && (
          <div className="flex justify-center w-full">
            <CurrentUserModal />
          </div>
        )}

        <section>
          <div>
            <h1 className="font-bold text-xs">EDIT PROFILE</h1>
          </div>
          <div className="my">
            <h5 className="font-bold text-xs">Full Name</h5>
            <input
              type="text"
              className="w-full rounded h-6 text-xs"
              value={name}
              onChange={(e) => {
                dispatch(setUserInfo({ name: e.target.value }));
              }}
            />
          </div>
          <div className="my-2">
            <h5 className="font-bold text-xs">Email</h5>
            <input
              type="text"
              className="w-full rounded h-6 text-xs"
              value={email}
              onChange={(e) => dispatch(setUserInfo({ email: e.target.value }))}
            />
          </div>
          <div className="my-2">
            <h5 className="font-bold text-xs">Password</h5>
            <input
              type="password"
              className="w-full rounded h-6 text-xs"
              defaultValue="https://www.alsoit.io"
              onFocus={() => {
                dispatch(setShowConfirmationModal(true));
              }}
            />
          </div>
        </section>
        <section>
          <div className="my">
            <h1 className="font-bold text-xs">LANGUAGE & REGION SETTINGS</h1>
          </div>
          <div className="flex justify-between my-2">
            <div className="" style={{ width: '48%' }}>
              <h5 className="font-bold text-xs">Language</h5>
              <select name="language" className="h-6 py-0 text-xs rounded my w-full">
                <option value="en">English</option>
              </select>
            </div>
            <div className="" style={{ width: '48%' }}>
              <h5 className="font-bold text-xs">Region</h5>
              <Region />
            </div>
          </div>
          <div className="my-2 flex justify-between ">
            <div style={{ width: '48%' }}>
              <h5 className="font-bold text-xs">Start of the week</h5>
              <select
                name="Day"
                className="h-6 py-0 rounded my w-full text-xs"
                value={start_week}
                onChange={(e) => dispatch(setUserInfo({ start_week: e.target.value }))}
              >
                <option value="1">Monday</option>
                <option value="0">Sunday</option>
              </select>
            </div>
            <div style={{ width: '48%' }}>
              <h5 className="font-bold text-xs">Time Format</h5>
              <select
                name="Time-format"
                className="h-6 py-0 rounded my w-full text-xs"
                value={time_format}
                onChange={(e) => dispatch(setUserInfo({ time_format: e.target.value }))}
              >
                <option value="1">24-hours</option>
                <option value="0">12-hours</option>
              </select>
            </div>
          </div>
          <div className="my-2 flex justify-between ">
            <div style={{ width: '48%' }}>
              <h5 className="font-bold text-xs">Date Format</h5>
              <select
                name="Date-format"
                className="h-6 py-0 rounded my w-full text-xs"
                value={date_format}
                onChange={(e) => dispatch(setUserInfo({ date_format: e.target.value }))}
              >
                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                <option value="yyyy/mm/dd">yyyy/mm/dd</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="flex justify-end text-white font-bold py-1 px-3 rounded my-2 border-2 text-red-500 border-red-500">
              Delete Account
            </button>
          </div>
        </section>
      </section>
      {showAvatarUpload && (
        <UploadAvatar endpoint={'auth/account/avatar'} invalidateQuery={['self'] as InvalidateQueryFilters<unknown>} />
      )}
    </div>
  );
}

export default Profile;
