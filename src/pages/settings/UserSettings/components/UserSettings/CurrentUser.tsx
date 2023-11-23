import React from 'react';
import { AvatarWithInitials } from '../../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { ListColourProps } from '../../../../../components/tasks/ListItem';
import { setPaletteDropDown } from '../../../../../features/account/accountSlice';

interface ContentUserProps {
  paletteColor: string | ListColourProps | null | undefined;
}

export default function CurrentUser({ paletteColor }: ContentUserProps) {
  const dispatch = useAppDispatch();

  const { color, userData } = useAppSelector((state) => state.userSetting);

  return (
    <div className="text-left">
      <div onClick={() => dispatch(setPaletteDropDown({ show: true, paletteId: 'avatar' }))}>
        {userData?.avatar_path === null || userData?.avatar_path === undefined ? (
          <div className="flex justify-center cursor-pointer">
            <AvatarWithInitials
              initials={userData?.initials as string}
              height="h-44"
              width="w-44"
              roundedStyle="circular"
              backgroundColour={(paletteColor as string) || color}
              textSize="32px"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative flex justify-center items-center w-44 h-44 rounded-full overflow-hidden">
              <div
                className="absolute w-full h-full"
                style={{
                  backgroundImage: `url(${userData.avatar_path})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  filter: 'blur(5px)'
                }}
              />
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${userData.avatar_path})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 1
                }}
              />
              {/* <img
                // style={{ transform: 'translate(-50%, -50%)' }}
                // className="absolute top-1/2 left-1/2 w-auto min-w-max h-full cursor-pointer"
                src={userData.avatar_path}
                alt="user-avatar"
              /> */}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <p className="font-extrabold text-left" style={{ fontSize: '15px' }}>
          {userData?.name?.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
