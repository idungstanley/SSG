import React, { Fragment, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AvatarWithInitials } from '../../../../../components';
import { logoutService } from '../../../../../features/auth/authService';
import { useDispatch } from 'react-redux';
import { setVisibility, displayPrompt } from '../../../../../features/general/prompt/promptSlice';
import { logout, setAuthData } from '../../../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../app/hooks';
import ToolTip from '../../../../../components/Tooltip/Tooltip';
import ArrowDownFilled from '../../../../../assets/icons/ArrowDownFilled';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import NotificationIcon from '../../../../../assets/icons/NotificationIcon';
import AppsIcon from '../../../../../assets/icons/AppsIcon';
import RewardsIcon from '../../../../../assets/icons/RewardsIcon';
import AddRemovePinIcon from '../../../../../assets/icons/AddRemovePinIcon';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { CiDark } from 'react-icons/ci';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiUserSettingsLine } from 'react-icons/ri';

interface UserSettingsType {
  id: string;
  title: string;
  handleClick: (e: React.MouseEvent<HTMLDivElement | null, MouseEvent>) => void;
  icon?: JSX.Element;
}

interface UserProps {
  setShowModal: (e: React.MouseEvent<HTMLDivElement | null, MouseEvent>) => void;
}

export default function UserSettingsModal({ setShowModal }: UserProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSettingsMenu, setShowSettingsMenu] = useState<null | HTMLDivElement>(null);

  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowSettingsMenu(event.currentTarget);
  };
  const handleCloseSettingsMenu = () => {
    setShowSettingsMenu(null);
  };

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { userData } = useAppSelector((state) => state.userSetting);

  const logoutMutation = useMutation(logoutService, {
    onSuccess: () => {
      dispatch(setVisibility(false));

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentWorkspaceId');
      localStorage.removeItem('teamMemberInviteCode');
      localStorage.removeItem('currentUserId');

      dispatch(
        setAuthData({
          user: null,
          accessToken: null,
          currentWorkspaceId: null,
          currentUserId: null
        })
      );

      dispatch(logout());
      navigate('/');
    }
  });

  const userSettings: UserSettingsType[] = [
    {
      id: 'my_settings',
      title: 'My Settings',
      handleClick: () => {
        navigate(`/${currentWorkspaceId}/settings/profile`);
      },
      icon: <RiUserSettingsLine className="w-4 h-4" />
    },
    {
      id: 'notificaitons',
      title: 'Notificaitons',
      handleClick: () => {
        navigate(`/${currentWorkspaceId}/settings/notifications`);
      },
      icon: <NotificationIcon />
    },
    {
      id: 'apps',
      title: 'Apps',
      handleClick: () => ({}),
      icon: <AppsIcon />
    },

    {
      id: 'rewards',
      title: 'Rewards',
      handleClick: () => ({}),
      icon: <RewardsIcon />
    },
    {
      id: 'hot_keys',
      title: 'HotKeys',
      handleClick: (e) => {
        setShowModal(e);
      },
      icon: <AddRemovePinIcon />
    },
    {
      id: 'help',
      title: 'Help',
      handleClick: () => ({}),
      icon: <IoIosHelpCircleOutline className="w-4 h-4" />
    },
    {
      id: 'dark_mode',
      title: 'Dark Mode',
      handleClick: () => ({}),
      icon: <CiDark className="w-4 h-4" />
    },
    {
      id: 'log_out',
      title: 'Log out',
      handleClick: () => {
        dispatch(
          displayPrompt('Sign out', 'Would you like to sign out of your account?', [
            {
              label: 'Sign out',
              style: 'danger',
              callback: () => {
                logoutMutation.mutate();
              }
            },
            {
              label: 'Cancel',
              style: 'plain',
              callback: () => {
                dispatch(setVisibility(false));
              }
            }
          ])
        );
      },
      icon: <AiOutlineLogout className="w-4 h-3" />
    }
  ];

  return (
    <>
      <div onClick={(e) => handleOpenSettingsMenu(e)}>
        <ToolTip title="User Settings">
          <div className="relative flex mr-2 cursor-pointer">
            <AvatarWithInitials
              initials={userData?.initials.toUpperCase() as string}
              height="h-5"
              width="w-5"
              backgroundColour={userData?.color as string | undefined}
            />
            <span className="absolute bottom-0 left-5">
              <ArrowDownFilled />
            </span>
          </div>
        </ToolTip>
      </div>
      <AlsoitMenuDropdown anchorEl={showSettingsMenu} handleClose={handleCloseSettingsMenu}>
        <div className="p-2 w-52">
          <div className="my-2 space-y-2">
            <p style={{ fontSize: '8px' }}>USER SETTINGS</p>
            <hr />
          </div>
          {userSettings?.map((i) => (
            <div key={i.id}>
              <div
                className="flex items-center w-full py-2 text-xs text-gray-600 rounded cursor-pointer px-0.5 hover:bg-alsoit-gray-50 justify-between"
                onClick={(e) => i.handleClick(e)}
              >
                <div className="flex items-center gap-2">
                  <p className="flex items-center w-5 h-5">{i.icon}</p>
                  <p>{i.title}</p>
                </div>
                <span>
                  {i.id === 'dark_mode' ? (
                    <label className="switch">
                      <input className="inputShow" type="checkbox" checked={false} onChange={() => ({})} />
                      <div className="slider checked"></div>
                    </label>
                  ) : null}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
