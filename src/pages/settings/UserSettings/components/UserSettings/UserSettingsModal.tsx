import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
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
import { VscTriangleDown } from 'react-icons/vsc';
import ArrowDownFilled from '../../../../../assets/icons/ArrowDownFilled';

interface UserSettingsType {
  id: number;
  title: string;
  handleClick: () => void;
}

// interface User {
//   initials: string;
//   colour: string;
// }s
interface UserProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserSettingsModal({ setShowModal }: UserProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);
  // const { userData } = useAppSelector((state) => state.userSetting);
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
      id: 1,
      title: 'My Settings',
      handleClick: () => {
        navigate(`/${currentWorkspaceId}/settings/profile`);
      }
    },
    {
      id: 2,
      title: 'Notificaitons',
      handleClick: () => {
        navigate(`/${currentWorkspaceId}/settings/notifications`);
      }
    },
    {
      id: 3,
      title: 'Apps',
      handleClick: () => ({})
    },

    {
      id: 4,
      title: 'Rewards',
      handleClick: () => ({})
    },
    {
      id: 5,
      title: 'HotKeys',
      handleClick: () => setShowModal(true)
    },
    {
      id: 6,
      title: 'Help',
      handleClick: () => ({})
    },
    {
      id: 7,
      title: 'Dark Mode',
      handleClick: () => ({})
    },
    {
      id: 8,
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

  // const getLocalWS: User = JSON.parse(localStorage.getItem('user') as string) as User;

  // const workspaceInitials: string = getLocalWS ? getLocalWS.initials : 'A';
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <ToolTip tooltip="User Settings">
            <div className="relative flex mr-2">
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
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`mt-2 w-48 px-1 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none ${
            showSidebar ? 'absolute -right-2' : 'fixed left-10'
          }`}
          style={{ zIndex: '9999' }}
        >
          <div className="pt-3">
            {userSettings?.map((i) => (
              <Menu.Item key={i.id}>
                <div
                  className="flex items-center w-full px-4 py-2 text-xs text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={i.handleClick}
                >
                  <div className="flex items-center justify-between">
                    <p>{i.title}</p>
                    <span>
                      {i.id == 7 ? (
                        <button className="flex ml-14 items-center text-gray-400 cursor-pointer p-0.5 rounded-md space-x-1 ">
                          <BsToggleOff className="w-4 h-4 test-sm" />
                        </button>
                      ) : null}
                    </span>
                  </div>
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
