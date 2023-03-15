import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cl } from '../../../utils';
import { VscTriangleDown } from 'react-icons/vsc';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllWorkSpaceService, getWorkspaceService } from '../../../features/workspace/workspaceService';
import { AvatarWithInitials, Input } from '../../../components';
import { switchWorkspaceService } from '../../../features/account/accountService';
import { useDispatch } from 'react-redux';
import { setCurrentWorkspace, switchWorkspace } from '../../../features/auth/authSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { IWorkspace } from '../../../features/account/account.interfaces';

interface workspaceSettingsListType {
  id: number;
  title: string;
  handleClick: () => void;
}
interface WorkspaceProps {
  colour: string;
  id: string;
  initials: string;
  last_activity_at: string;
  name: string;
}

export default function WorkspaceSettingsModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: AllMyWorkSpace } = getAllWorkSpaceService();
  const { data: currentWorkspaceName } = getWorkspaceService();
  const [isSearch, setIssearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<IWorkspace[] | undefined>([]);

  const workspaceSettingsList: workspaceSettingsListType[] = [
    {
      id: 1,
      title: 'Settings',
      handleClick: () => ({})
    },
    {
      id: 2,
      title: 'AlsoApps',
      handleClick: () => ({})
    },
    {
      id: 3,
      title: 'People',
      handleClick: () => ({})
    },

    {
      id: 4,
      title: 'Analytics',
      handleClick: () => ({})
    },
    {
      id: 5,
      title: 'Integration',
      handleClick: () => ({})
    },
    {
      id: 6,
      title: 'Bin',
      handleClick: () => ({})
    },
    {
      id: 7,
      title: 'Billing',
      handleClick: () => ({})
    },
    {
      id: 8,
      title: 'Security & Permissions',
      handleClick: () => ({})
    }
  ];

  const handleAddWorkSpace = () => {
    navigate('/onboarding');
  };

  const searchItem = (value: string) => {
    setSearchInput(value);
    if (searchInput !== '') {
      const filteredData = AllMyWorkSpace?.data.workspaces.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(AllMyWorkSpace?.data.workspaces);
    }
  };

  const switchWorkspaceMutation = useMutation(switchWorkspaceService, {
    onSuccess: (data) => {
      // Clear react-query and redux cache
      localStorage.setItem('currentWorkspaceId', JSON.stringify(data.data.workspace.id));

      dispatch(
        setCurrentWorkspace({
          workspaceId: data.data.workspace.id
        })
      );

      dispatch(setMyWorkspacesSlideOverVisibility(false));
      navigate('/');

      queryClient.invalidateQueries();
      dispatch(switchWorkspace());
    }
  });
  const onSwitchWorkspace = (id: string) => {
    switchWorkspaceMutation.mutate({
      workspaceId: id
    });
    queryClient.invalidateQueries();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <VscTriangleDown className="text-xs text-gray-400" />
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
        <Menu.Items className="absolute z-30 w-48 px-1 pb-1 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg -right-12 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <section className="flex flex-col">
            <div className="pt-3">
              <h4 className="px-4 font-bold capitalize truncate " style={{ fontSize: '11px' }}>
                {currentWorkspaceName?.data.workspace.name}
              </h4>
              <hr />
              {workspaceSettingsList?.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  className="flex items-center w-full px-4 py-2 mt-0.5 text-xs text-gray-600 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={i.handleClick}
                >
                  <p className="flex ">
                    {i.title}{' '}
                    {i.id == 3 ? (
                      <button className="ml-5 flex items-center bg-purple-400 cursor-pointer p-0.5 rounded-md space-x-1 ">
                        <MdOutlineGroupAdd className="w-4 h-4 test-sm" /> <p>Invite</p>
                      </button>
                    ) : null}
                  </p>
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between px-4 mt-4">
                <p className="text-xs font-semibold capitalise">Other Workspaces</p>
                <span className="flex items-center">
                  <AiOutlinePlus className="cursor-pointer" onClick={() => handleAddWorkSpace()} />
                  <AiOutlineSearch className="cursor-pointer" onClick={() => setIssearch((prev) => !prev)} />
                </span>
              </div>
              {isSearch && (
                <div className="px-4 my-1">
                  <Input
                    placeholder="Search spaces"
                    type="text"
                    name="search"
                    trailingIcon={<CiSearch />}
                    onChange={(e) => searchItem(e.target.value)}
                  />
                </div>
              )}
              <div className="h-40 overflow-y-auto">
                {searchInput.length > 1
                  ? filteredResults?.map((i: WorkspaceProps) => (
                      <Menu.Item key={i.id}>
                        {({ active }) => (
                          <button
                            type="button"
                            className={cl(
                              active ? 'bg-gray-200' : '',
                              'flex items-center space-x-1 py-2 mt-1 text-sm text-gray-600 px-4 text-left w-full rounded-md'
                            )}
                            onClick={() => onSwitchWorkspace(i.id)}
                          >
                            <p>
                              <AvatarWithInitials
                                initials={i.initials.toUpperCase()}
                                height="h-5"
                                width="w-5"
                                roundedStyle="rounded"
                                backgroundColour={i.colour}
                              />
                            </p>
                            <p className="capitalize truncate" style={{ fontSize: '10px' }}>
                              {i.name}
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    ))
                  : AllMyWorkSpace?.data.workspaces?.map((i: WorkspaceProps) => (
                      <Menu.Item key={i.id}>
                        {({ active }) => (
                          <button
                            type="button"
                            className={cl(
                              active ? 'bg-gray-200' : '',
                              'flex items-center space-x-1 py-2 mt-1 text-sm text-gray-600 px-4 text-left w-full rounded-md'
                            )}
                            onClick={() => onSwitchWorkspace(i.id)}
                          >
                            <p>
                              <AvatarWithInitials
                                initials={i.initials.toUpperCase()}
                                height="h-5"
                                width="w-5"
                                roundedStyle="rounded"
                                backgroundColour={i.colour}
                              />
                            </p>
                            <p className="capitalize truncate" style={{ fontSize: '10px' }}>
                              {i.name}
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    ))}
              </div>
            </div>
          </section>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
