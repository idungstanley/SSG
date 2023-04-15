import React from 'react';
import { AvatarWithInitials } from '../../../../components';
import { useAppSelector } from '../../../../app/hooks';

export default function CurrentUser() {
  const { color, userData } = useAppSelector((state) => state.userSetting);
  return (
    <div className="text-left ">
      {userData?.avatar_path === null || userData?.avatar_path === undefined ? (
        <div className="flex justify-center">
          <AvatarWithInitials
            initials="ND"
            height="h-20"
            width="w-20"
            roundedStyle="circular"
            backgroundColour={color}
            textSize="12px"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full">
            <img className="w-full h-full rounded-full" src={userData.avatar_path} alt="" />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <p className="font-extrabold text-left">{userData?.name?.toUpperCase()}</p>
      </div>
    </div>
  );
}
