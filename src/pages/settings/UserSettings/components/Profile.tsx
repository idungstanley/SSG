import React from 'react';
import CurrentUser from './CurrentUser';
import Region from './Region';
// import { IUserData } from '../../../../features/workspace/workspace.interfaces';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { setCurrentUserModal, setUserInfo } from '../../../../features/settings/user/userSettingsSlice';
import CurrentUserModal from './CurrentUserModal';
import UploadAvatar from './UploadAvatar';

function Profile() {
  const { name, email, time_format, date_format, start_week, currentUserModal, showAvatarUpload } = useAppSelector(
    (state) => state.userSetting
  );
  const dispatch = useAppDispatch();

  return (
    <div className="w-2/6 bg-white m-2 h-full p-4 rounded-lg h-full">
      <h1 className="font-bold" style={{ fontSize: '10px' }}>
        PERSONAL PROFILE
      </h1>
      <section>
        <div className="flex justify-center my-2">
          <div className="cursor-pointer" onClick={() => dispatch(setCurrentUserModal(!currentUserModal))}>
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
            <h1 className="font-bold" style={{ fontSize: '10px' }}>
              EDIT PROFILE
            </h1>
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
            <input type="password" className="w-full rounded h-6 text-xs" value="n.salifu@simpsgroup.co.uk" />
          </div>
        </section>
        <section>
          <div className="my">
            <h1 className="font-bold" style={{ fontSize: '10px' }}>
              LANGUAGE & REGION SETTINGS
            </h1>
          </div>
          <div className="flex justify-between my-2">
            <div className="" style={{ width: '48%' }}>
              <h5 className="font-bold text-xs" style={{ fontSize: '10px' }}>
                Language
              </h5>
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
              <h5 className="font-bold" style={{ fontSize: '10px' }}>
                Start of the week
              </h5>
              <select
                name="Day"
                className="h-6 py-0 rounded my w-full"
                style={{ fontSize: '10px' }}
                value={start_week}
                onChange={(e) => dispatch(setUserInfo({ start_week: e.target.value }))}
              >
                <option value="1">Monday</option>
                <option value="0">Sunday</option>
              </select>
            </div>
            <div style={{ width: '48%' }}>
              <h5 className="font-bold" style={{ fontSize: '10px' }}>
                Time Format
              </h5>
              <select
                name="Time-format"
                className="h-6 py-0 rounded my w-full"
                style={{ fontSize: '10px' }}
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
              <h5 className="font-bold" style={{ fontSize: '10px' }}>
                Date Format
              </h5>
              <select
                name="Date-format"
                className="h-6 py-0 rounded my w-full"
                style={{ fontSize: '10px' }}
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
            <button className="flex justify-end text-white font-bold py-2 px-4 rounded my-2 border-2 text-red-500 border-red-500">
              Delete Account
            </button>
          </div>
        </section>
      </section>
      {showAvatarUpload && <UploadAvatar />}
    </div>
  );
}

export default Profile;
