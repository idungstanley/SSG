import React, { useMemo } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { CiMail } from 'react-icons/ci';
import { Spinner } from '../../../../common';
import { useCommunity } from '../../../../features/community/communityService';
import Menu from '@mui/material/Menu';
import { AvatarWithInitials } from '../../../../components';

export function PopAssignModal({
  modalLoader,
  currHoveredOnUser,
  anchorEl,
  handleClose
}: {
  modalLoader: boolean;
  spinnerSize: number;
  currHoveredOnUser: string | undefined | React.Key;
  anchorEl: HTMLDivElement | null;
  handleClose: () => void;
}) {
  const { data } = useCommunity();
  const filteredUser = useMemo(() => data?.team_members.filter((users) => users.id == currHoveredOnUser), [data]);

  const open = Boolean(anchorEl);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      PaperProps={{
        style: {
          overflowY: 'auto',
          width: '300px'
        }
      }}
    >
      {modalLoader ? (
        <Spinner color="#4f46e5" />
      ) : (
        filteredUser?.map((userData) => {
          return (
            <div key={userData.id} className="space-y-5 p-4 bg-white">
              <section className="flex justify-between">
                <div>
                  {userData.user.avatar_path ? (
                    <div className="flex items-center w-24 h-24 rounded-full bg-gray-400 justify-center text-white ">
                      <img
                        src={userData.user.avatar_path}
                        className={'inline-flex items-center justify-center object-contain h-24 w-24 rounded-full'}
                      />
                    </div>
                  ) : (
                    <div>
                      <AvatarWithInitials
                        initials={userData.user.initials}
                        backgroundColour={userData.colour}
                        height="h-24"
                        width="w-24"
                        textSize="30px"
                      />
                    </div>
                  )}
                </div>

                <div className="top-4 right-0">
                  <span className="text-sm text-black border rounded bg-gray-200 flex justify-end p-1">
                    {userData.is_online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </section>

              <div className="flex space-y-1.5 flex-col items-start">
                <span className="text-3xl subpixel-antialiased text-black text-decoration-thickness:1px;">
                  {userData.user.name}
                </span>
                <div className="space-x-2 flex items-center">
                  <CiMail className="w-4 h-4 mx-0.5 text-black" />
                  <span className="text-black text-sm subpixel-antialiased">{userData.user.email}</span>
                </div>
                <div className="space-x-2 flex items-center">
                  <ClockIcon className="w-4 h-4 mx-0.5 text-black" />
                  <span className="text-black text-sm subpixel-antialiased">
                    {moment.utc(new Date()).format('MMMM Do YYYY, h:mm:ss a')}
                  </span>
                </div>
                <div className="w-full flex justify-center">
                  <button className="w-full text-black hover:bg-gray-200 border rounded py-2">View profile</button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </Menu>
  );
}

export default PopAssignModal;
