import React, { Fragment, useState } from 'react';
import { BsToggleOff } from 'react-icons/bs';
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

interface UserSettingsType {
  id: string;
  title: string;
  handleClick: () => void;
}

interface UserProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
      }
    },
    {
      id: 'notificaitons',
      title: 'Notificaitons',
      handleClick: () => {
        navigate(`/${currentWorkspaceId}/settings/notifications`);
      }
    },
    {
      id: 'apps',
      title: 'Apps',
      handleClick: () => ({})
    },

    {
      id: 'rewards',
      title: 'Rewards',
      handleClick: () => ({})
    },
    {
      id: 'hot_keys',
      title: 'HotKeys',
      handleClick: () => setShowModal(true)
    },
    {
      id: 'help',
      title: 'Help',
      handleClick: () => ({})
    },
    {
      id: 'dark_mode',
      title: 'Dark Mode',
      handleClick: () => ({})
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
      }
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
            <span className="absolute -bottom-2 left-3">
              <ArrowDownFilled />
            </span>
          </div>
        </ToolTip>
      </div>
      <AlsoitMenuDropdown anchorEl={showSettingsMenu} handleClose={handleCloseSettingsMenu}>
        <div className="px-1">
          {userSettings?.map((i) => (
            <div key={i.id}>
              <div
                className="flex items-center w-full px-4 py-2 text-xs text-gray-600 rounded cursor-pointer hover:bg-primary-200 hover:text-primary-500"
                onClick={i.handleClick}
              >
                <div className="flex items-center justify-between">
                  <p>{i.title}</p>
                  <span>
                    {i.id === 'dark_mode' ? (
                      <button className="flex ml-14 items-center text-gray-400 cursor-pointer p-0.5 rounded-md space-x-1 ">
                        <BsToggleOff className="w-4 h-4 test-sm" />
                      </button>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
