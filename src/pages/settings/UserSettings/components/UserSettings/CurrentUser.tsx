import React from 'react';
import { AvatarWithInitials } from '../../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCurrentUserModal } from '../../../../../features/settings/user/userSettingsSlice';

export default function CurrentUser() {
  const { color, userData } = useAppSelector((state) => state.userSetting);
  const dispatch = useAppDispatch();
  return (
    <div className="text-left ">
      {userData?.avatar_path === null || userData?.avatar_path === undefined ? (
        <div className="flex justify-center cursor-pointer" onClick={() => dispatch(setCurrentUserModal(true))}>
          <AvatarWithInitials
            initials="ND"
            height="h-44"
            width="w-44"
            roundedStyle="circular"
            backgroundColour={color}
            textSize="12px"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-44 h-44 rounded-full">
            <img
              className="w-full h-full rounded-full cursor-pointer"
              src={userData.avatar_path}
              alt=""
              onClick={() => dispatch(setCurrentUserModal(true))}
            />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <p className="font-extrabold text-left" style={{ fontSize: '15px' }}>
          {userData?.name?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
