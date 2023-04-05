import React from 'react';
import { AvatarWithInitials } from '../../../../components';
import { useAppSelector } from '../../../../app/hooks';
import { selectCurrentUser } from '../../../../features/auth/authSlice';

export default function CurrentUser() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="text-left ">
      {user?.avatar_path === null ? (
        <AvatarWithInitials
          initials="ND"
          height="h-20"
          width="w-20"
          roundedStyle="circular"
          backgroundColour={user?.colour}
          textSize="12px"
        />
      ) : (
        <div className="w-20 h-20 rounded-full">
          <img className="w-full h-full rounded-full" src={user?.avatar_path} alt="" />
        </div>
      )}

      <p className="mt-3 font-extrabold text-left">{user?.name}</p>
    </div>
  );
}
