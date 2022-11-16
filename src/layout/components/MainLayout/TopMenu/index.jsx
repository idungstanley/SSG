import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
  CogIcon,
  BellIcon,
} from '@heroicons/react/outline';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import SearchInput from './SearchInput';
import { Badge, AvatarWithInitials, StatusDot } from '../../../../components';
import { selectCurrentUser, setCurrentUser, logout } from '../../../../features/auth/authSlice';
import { logoutService } from '../../../../features/auth/authService';
import { displayPrompt, setVisibility } from '../../../../features/general/prompt/promptSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { useGetInboxUnfiledCount } from '../../../../features/inbox/inboxesService';
import MainLogo from '../../../../assets/branding/main-logo.png';

const navigation = [
  { name: 'Explorer', href: '/explorer', current: false },
  { name: 'Shared', href: '/shared', current: false },
  { name: 'Inbox', href: '/inbox', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TopMenu() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const { data: unfiledInboxesCount, status } = useGetInboxUnfiledCount();

  const logoutMutation = useMutation(logoutService, {
    onSuccess: () => {
      dispatch(setVisibility(false));

      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentWorkspaceId');

      dispatch(setCurrentUser({
        user: null,
        accessToken: null,
        currentWorkspaceId: null,
      }));

      dispatch(logout());
    },
  });

  const onLogout = () => {
    dispatch(displayPrompt('Sign out', 'Would you like to sign out of your account?', [
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
    ]));
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 select-none">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={MainLogo}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => (isActive ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium')}
                        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                      >
                        {item.name}

                        {item.name === 'Inbox' && status === 'success' && (
                          <span className="ml-1.5">
                            <Badge
                              value={unfiledInboxesCount}
                              textColour="text-white"
                              backgroundColour="bg-red-500"
                            />
                          </span>
                        )}

                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search section */}
              <SearchInput />

              <div className="absolute space-x-5 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Workspace settings dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="bg-gray-800 p-1 text-gray-400 hover:text-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <CogIcon className="h-6 w-6" aria-hidden="true" />
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
                    <Menu.Items className="origin-top-right absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings/team-members"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-left')}
                          >
                            Team members
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings/team-members/invites"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-left')}
                          >
                            Team member invites
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings/team-members/groups"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-left')}
                          >
                            Team member groups
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings/permissions"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-left')}
                          >
                            Permissions
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <StatusDot
                        on={(
                          <AvatarWithInitials
                            height="h-8"
                            width="w-8"
                            initials={user.initials}
                            backgroundColour={user.colour}
                            textSize="text-xs"
                          />
                        )}
                        top={false}
                        size={2}
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
                    <Menu.Items className="origin-top-right absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => dispatch(setMyWorkspacesSlideOverVisibility(true))}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-left text-gray-700 w-full')}
                          >
                            My workspaces
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="tempurl"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 text-left')}
                          >
                            Account
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={onLogout}
                            type="button"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')
                  }
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default TopMenu;
