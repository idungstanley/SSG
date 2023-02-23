import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsToggleOff } from 'react-icons/bs';
import { useMutation } from '@tanstack/react-query';
import { AvatarWithInitials } from '../../../../components';
import { logoutService } from '../../../../features/auth/authService';
import { useDispatch } from 'react-redux';
import {
  setVisibility,
  displayPrompt,
} from '../../../../features/general/prompt/promptSlice';
import { logout, setAuthData } from '../../../../features/auth/authSlice';

interface UserSettingsType {
  id: number;
  title: string;
  handleClick: () => void;
}

export default function UserSettingsModal() {
  const dispatch = useDispatch();

  const logoutMutation = useMutation(logoutService, {
    onSuccess: () => {
      dispatch(setVisibility(false));

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentWorkspaceId');

      dispatch(
        setAuthData({
          user: null,
          accessToken: null,
          currentWorkspaceId: null,
          currentUserId: null,
        })
      );

      dispatch(logout());
    },
  });

  const userSettings: UserSettingsType[] = [
    {
      id: 1,
      title: 'My Settings',
      handleClick: () => ({}),
    },
    {
      id: 2,
      title: 'Notificaitons',
      handleClick: () => ({}),
    },
    {
      id: 3,
      title: 'Apps',
      handleClick: () => ({}),
    },

    {
      id: 4,
      title: 'Rewards',
      handleClick: () => ({}),
    },
    {
      id: 5,
      title: 'HotKeys',
      handleClick: () => ({}),
    },
    {
      id: 6,
      title: 'Help',
      handleClick: () => ({}),
    },
    {
      id: 7,
      title: 'Dark Mode',
      handleClick: () => ({}),
    },
    {
      id: 8,
      title: 'Log out',
      handleClick: () => {
        dispatch(
          displayPrompt(
            'Sign out',
            'Would you like to sign out of your account?',
            [
              {
                label: 'Sign out',
                style: 'danger',
                callback: () => {
                  logoutMutation.mutate();
                },
              },
              {
                label: 'Cancel',
                style: 'plain',
                callback: () => {
                  dispatch(setVisibility(false));
                },
              },
            ]
          )
        );
      },
    },
  ];

  const getLocalWS = JSON.parse(localStorage.getItem('user') as string);
  const workspaceInitials = getLocalWS ? getLocalWS.initials : 'A';
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <AvatarWithInitials
            initials={workspaceInitials.toUpperCase()}
            height="h-5"
            width="w-5"
            backgroundColour={getLocalWS?.colour}
          />
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
        <Menu.Items className="origin-top-right absolute z-30 mt-2 w-48 rounded-md shadow-lg -right-2 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
          <div className="pt-3">
            {userSettings?.map((i) => (
              <Menu.Item key={i.id}>
                <button
                  type="button"
                  className="flex items-center cursor-pointer px-4 py-2 text-xs text-gray-600 w-full hover:bg-gray-100"
                  onClick={i.handleClick}
                >
                  <div className="flex justify-between items-center">
                    <p>{i.title}</p>
                    <span>
                      {i.id == 7 ? (
                        <button className="flex ml-14 items-center text-gray-400 cursor-pointer p-0.5 rounded-md space-x-1 ">
                          <BsToggleOff className="h-4 w-4 test-sm" />
                        </button>
                      ) : null}
                    </span>
                  </div>
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}