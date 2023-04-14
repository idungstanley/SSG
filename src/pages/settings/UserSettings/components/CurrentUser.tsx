import React from 'react';
import { AvatarWithInitials } from '../../../../components';
import { useAppSelector } from '../../../../app/hooks';

export default function CurrentUser() {
  const { color, name, avatar_path } = useAppSelector((state) => state.userSetting);
  return (
    <div className="text-left ">
      {avatar_path === null || avatar_path === undefined ? (
        <div className="flex justify-center">
          <AvatarWithInitials
            initials="ND"
            height="h-16"
            width="w-16"
            roundedStyle="circular"
            backgroundColour={color}
            textSize="12px"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full">
            <img className="w-full h-full rounded-full" src={avatar_path} alt="" />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <p className="font-extrabold text-left">{name?.toUpperCase()}</p>
      </div>
    </div>
  );
}
