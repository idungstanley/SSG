import CurrentUser from './CurrentUser';
import Region from './Region';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import {
  setCurrentUserModal,
  setShowAvatarUpload,
  setShowConfirmationModal,
  setUserInfo
} from '../../../../../features/settings/user/userSettingsSlice';
import UploadAvatar from '../UploadAvatar';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import PaletteManager from '../../../../../components/ColorPalette';
import { UseRemoveAvatar } from '../../../../../features/settings/user/userSettingsServices';
import { useState } from 'react';
import { ListColourProps } from '../../../../../components/tasks/ListItem';
import { useGetColors } from '../../../../../features/account/accountService';
import { useAbsolute } from '../../../../../hooks/useAbsolute';
import { setPaletteDropDown } from '../../../../../features/account/accountSlice';

function Profile() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { name, email, time_format, date_format, start_week, showAvatarUpload, userData } = useAppSelector(
    (state) => state.userSetting
  );
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { updateCords } = useAppSelector((state) => state.task);

  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | null | undefined>(
    userData?.color as string
  );

  const { show } = paletteDropdown;

  useGetColors();
  const deleteAvatarMutation = useMutation(UseRemoveAvatar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['self']);
      dispatch(setCurrentUserModal(false));
    }
  });

  const { cords, relativeRef } = useAbsolute(updateCords, 266);

  const handleUpdateColor = (c: string | ListColourProps | null | undefined) => {
    setPaletteColor(c);
    dispatch(setUserInfo({ color: c as string }));
  };

  return (
    <div className="w-full bg-white m-2 rounded-lg">
      <div className="overflow-y-auto  p-4" style={{ maxHeight: '98vh' }}>
        <h1 className="font-bold" style={{ fontSize: '15px' }}>
          PERSONAL PROFILE
        </h1>
        <section>
          <div className="flex justify-center my-2">
            <div>
              <CurrentUser paletteColor={paletteColor} />
            </div>
          </div>
          <div className="flex justify-center w-full" ref={relativeRef}>
            {show && (
              <>
                <PaletteManager
                  setPaletteColor={handleUpdateColor}
                  cords={{ top: cords.top - 20, left: cords.left - 40 }}
                  bottomContent={
                    <div className="p-2">
                      <div
                        className="cursor-pointer w-full flex justify-center text-blue-600 border border-blue-500 p-1 rounded hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          dispatch(setShowAvatarUpload(true));
                          dispatch(setPaletteDropDown({ show: false, paletteId: null }));
                        }}
                      >
                        <button className="text-xs">Add custom avatar</button>
                      </div>
                      {userData?.avatar_path && (
                        <div
                          className="cursor-pointer w-full flex justify-center text-red-600 border border-red-500 p-1 rounded hover:bg-red-600 hover:text-white my-1"
                          onClick={() => deleteAvatarMutation.mutateAsync()}
                        >
                          <button className="text-xs">Remove Avatar</button>
                        </div>
                      )}
                    </div>
                  }
                />
              </>
            )}
          </div>

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
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Language
                </h5>
                <select name="language" style={{ fontSize: '15px' }} className="h-10 text-xs rounded my w-full">
                  <option value="en">English</option>
                </select>
              </div>
              <div style={{ width: '48%' }}>
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
