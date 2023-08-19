import React from 'react';
import CurrentUser from './CurrentUser';
import Region from './Region';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import {
  setClockLimit,
  setClockStopReminder,
  setClockType,
  setClocktime,
  setShowConfirmationModal,
  setUserInfo
} from '../../../../../features/settings/user/userSettingsSlice';
import CurrentUserModal from './CurrentUserModal';
import UploadAvatar from '../UploadAvatar';
import { InvalidateQueryFilters } from '@tanstack/react-query';

const minutesToMilliseconds = 60 * 1000;
const hoursToMilliseconds = 60 * 60 * 1000;

function Profile() {
  const {
    name,
    email,
    time_format,
    date_format,
    start_week,
    currentUserModal,
    showAvatarUpload,
    clock_type,
    is_clock_time,
    clock_limit,
    clock_stop_reminder
  } = useAppSelector((state) => state.userSetting);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full bg-white m-2 rounded-lg">
      <div className="overflow-y-auto  p-4" style={{ maxHeight: '98vh' }}>
        <h1 className="font-bold" style={{ fontSize: '15px' }}>
          PERSONAL PROFILE
        </h1>
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
            <h1 className="font-semibold my-2" style={{ fontSize: '15px' }}>
              EDIT PROFILE
            </h1>
            <div className="my">
              <h5 className="font-semibold my" style={{ fontSize: '15px' }}>
                Full Name
              </h5>
              <input
                type="text"
                className="w-full rounded h-10"
                style={{ fontSize: '15px' }}
                value={name}
                onChange={(e) => {
                  dispatch(setUserInfo({ name: e.target.value }));
                }}
              />
            </div>
            <div className="my-2">
              <h5 className="font-semibold my" style={{ fontSize: '15px' }}>
                Email
              </h5>
              <input
                type="text"
                className="w-full rounded h-10"
                style={{ fontSize: '15px' }}
                value={email}
                onChange={(e) => dispatch(setUserInfo({ email: e.target.value }))}
              />
            </div>
            <div className="my-2">
              <h5 className="font-semibold my" style={{ fontSize: '15px' }}>
                Password
              </h5>
              <input
                type="password"
                className="w-full rounded h-10"
                style={{ fontSize: '15px' }}
                defaultValue="https://www.alsoit.io"
                onFocus={() => {
                  dispatch(setShowConfirmationModal(true));
                }}
              />
            </div>
          </section>
          <section>
            <div className="my">
              <h1 className="font-semibold my-2" style={{ fontSize: '15px' }}>
                LANGUAGE & REGION SETTINGS
              </h1>
            </div>
            <div className="flex justify-between my-3">
              <div className="" style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Language
                </h5>
                <select name="language" style={{ fontSize: '15px' }} className="h-10 text-xs rounded my w-full">
                  <option value="en">English</option>
                </select>
              </div>
              <div className="" style={{ width: '48%' }}>
                <h5 className="font-bold" style={{ fontSize: '15px' }}>
                  Region
                </h5>
                <Region />
              </div>
            </div>
            <div className="my-3 flex justify-between ">
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Start of the week
                </h5>
                <select
                  name="Day"
                  className="h-10 rounded my w-full"
                  value={start_week}
                  onChange={(e) => dispatch(setUserInfo({ start_week: e.target.value }))}
                  style={{ fontSize: '15px' }}
                >
                  <option value="1">Monday</option>
                  <option value="0">Sunday</option>
                </select>
              </div>
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Time Format
                </h5>
                <select
                  name="Time-format"
                  className="h-10 rounded my w-full"
                  value={time_format}
                  onChange={(e) => dispatch(setUserInfo({ time_format: e.target.value }))}
                  style={{ fontSize: '15px' }}
                >
                  <option value="1">24-hours</option>
                  <option value="0">12-hours</option>
                </select>
              </div>
            </div>
            <div className="my-3 flex justify-between ">
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Date Format
                </h5>
                <select
                  name="Date-format"
                  className="h-10 rounded my w-full"
                  value={date_format}
                  onChange={(e) => dispatch(setUserInfo({ date_format: e.target.value }))}
                  style={{ fontSize: '15px' }}
                >
                  <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                  <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                  <option value="yyyy/mm/dd">yyyy/mm/dd</option>
                </select>
              </div>
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Clock Type
                </h5>
                <select
                  name="clock_time"
                  className="h-10 rounded my w-full"
                  value={clock_type}
                  onChange={(e) => dispatch(setClockType(e.target.value))}
                  style={{ fontSize: '15px' }}
                >
                  <option value="d">Digital</option>
                  <option value="a">Analog</option>
                </select>
              </div>
            </div>
            <div className="my-3 flex justify-between ">
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Clocking Limit
                </h5>
                <select
                  name="Day"
                  className="h-10 rounded my w-full"
                  value={clock_limit}
                  onChange={(e) => dispatch(setClockLimit(Number(e.target.value)))}
                  style={{ fontSize: '15px' }}
                >
                  <option value={1 * hoursToMilliseconds}>1 hour</option>
                  <option value={2 * hoursToMilliseconds}>2 hours</option>
                  <option value={3 * hoursToMilliseconds}>3 hour</option>
                  <option value={24 * hoursToMilliseconds}>1 day</option>
                </select>
              </div>
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Reminder Time
                </h5>
                <select
                  name="Time-format"
                  className="h-10 rounded my w-full"
                  value={clock_stop_reminder}
                  onChange={(e) => dispatch(setClockStopReminder(Number(e.target.value)))}
                  style={{ fontSize: '15px' }}
                >
                  <option value={5 * minutesToMilliseconds}>5 minutes</option>
                  <option value={15 * minutesToMilliseconds}>15 minutes</option>
                  <option value={25 * minutesToMilliseconds}>25 minutes</option>
                  <option value={35 * minutesToMilliseconds}>35 minutes</option>
                </select>
              </div>
            </div>
            <div className="my-3 flex justify-between w-full">
              <div style={{ width: '10%' }} className="flex items-center">
                <label className="switch w-full">
                  <input
                    type="checkbox"
                    checked={is_clock_time ? true : false}
                    onClick={() => dispatch(setClocktime(is_clock_time === 1 ? 0 : 1))}
                  />
                  <div className={`slider ${is_clock_time === 1 ? 'checked' : ''}`}></div>
                </label>
              </div>
              <span className="w-full">Show Toolbar Clock?</span>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="flex items-center justify-center font-bold h-10 px-3 rounded my-8 border-2 text-alsoit-danger border-alsoit-danger w-52"
                style={{ fontSize: '15px' }}
              >
                Delete Account
              </button>
            </div>
          </section>
        </section>
        {showAvatarUpload && (
          <UploadAvatar
            endpoint={'auth/account/avatar'}
            invalidateQuery={['self'] as InvalidateQueryFilters<unknown>}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
