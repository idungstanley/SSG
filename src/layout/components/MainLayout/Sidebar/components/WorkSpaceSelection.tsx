import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials, Input } from '../../../../../components';
import { getAllWorkSpaceService, getWorkspaceService } from '../../../../../features/workspace/workspaceService';
import { Spinner } from '../../../../../common';
import { dimensions } from '../../../../../app/config/dimensions';
import { setFetchAllWorkspace } from '../../../../../features/workspace/workspaceSlice';
import { ModalDropdown } from '../../../../../components/Modal/ModalDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IWorkspace } from '../../../../../features/account/account.interfaces';
import { switchWorkspaceService } from '../../../../../features/account/accountService';
import { setCurrentWorkspace, switchWorkspace } from '../../../../../features/auth/authSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { BsPinAngle, BsPinFill } from 'react-icons/bs';
import { Menu } from '@headlessui/react';
import { cl } from '../../../../../utils';
import ArrowDownFilled from '../../../../../assets/icons/ArrowDownFilled';
import { getInitials } from '../../../../../app/helpers';

const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;
interface workspaceSettingsListType {
  title: string;
  handleClick: () => void;
}

interface WorkspaceProps {
  color: string;
  id: string;
  initials: string;
  last_activity_at: string;
  name: string;
}

function WorkSpaceSelection() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { sidebarWidthRD } = useAppSelector((state) => state.workspace);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSearch, setIssearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<IWorkspace[]>([]);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const { data: workSpaceData, status } = getWorkspaceService();
  const { data: AllMyWorkSpace } = getAllWorkSpaceService();

  const togglePin = (id: string, e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    if (pinnedIds.includes(id)) {
      setPinnedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    } else {
      setPinnedIds((prevIds) => [id, ...prevIds]);
    }
  };

  const pinned = AllMyWorkSpace?.data.workspaces.filter((item) => pinnedIds.includes(item.id));
  const unpinned = AllMyWorkSpace?.data.workspaces.filter((item) => !pinnedIds.includes(item.id));
  const pinnedItems = pinned ?? [];
  const unpinnedItems = unpinned ?? [];
  const sortedItems = [...pinnedItems, ...unpinnedItems];
  useEffect(() => {
    setFilteredResults(sortedItems);
  }, [showModal, AllMyWorkSpace]);
  const searchItem = (value: string) => {
    setSearchInput(value);
    if (searchInput !== '') {
      const filteredData = sortedItems.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(sortedItems);
    }
  };
  const switchWorkspaceMutation = useMutation(switchWorkspaceService, {
    onSuccess: (data) => {
      // Clear react-query and redux cache
      localStorage.setItem('currentWorkspaceId', JSON.stringify(data.data.workspace.id));

      dispatch(setCurrentWorkspace(data.data.workspace.id));

      dispatch(setMyWorkspacesSlideOverVisibility(false));
      // navigate(`/${data.data.workspace.id}`);
      // windows.location.href = `/${data.data.workspace.id}`;
      queryClient.invalidateQueries();
      dispatch(switchWorkspace());
      if (data.data.workspace.id) {
        window.location.href = `/${data.data.workspace.id}`;
      }
    }
  });

  const onSwitchWorkspace = (id: string) => {
    switchWorkspaceMutation.mutate({
      workspaceId: id
    });
    queryClient.invalidateQueries();
  };
  // const [isDropdownActive, setDropDownActive] = useState<boolean>();
  const workspaceName = workSpaceData?.data?.workspace.name;
  const workspaceColor = workSpaceData?.data?.workspace.color as string;
  const joinName = workspaceName?.split(' ').slice(0, 2).join('').toUpperCase();
  const truncateName = joinName?.substring(0, 6) + '...';

  const workspaceSettingsList: workspaceSettingsListType[] = [
    {
      title: 'Settings',
      handleClick: () => ({})
    },
    {
      title: 'AlsoApps',
      handleClick: () => ({})
    },
    {
      title: 'People',
      handleClick: () => navigate('settings/team-members/invites')
    },
    {
      title: 'Analytics',
      handleClick: () => ({})
    },
    {
      title: 'Integration',
      handleClick: () => ({})
    },
    {
      title: 'Bin',
      handleClick: () => ({})
    },
    {
      title: 'Billing',
      handleClick: () => ({})
    },
    {
      title: 'Security & Permissions',
      handleClick: () => ({})
    }
  ];

  const handleAddWorkSpace = () => {
    navigate('/onboarding');
  };
  const handleInvite = () => {
    navigate('settings/team-members/invites');
  };

  if (status == 'loading') {
    return <Spinner size={10} color={'#6B7280'} />;
  }

  return status == 'success' ? (
    <div
      className={`${
        showSidebar ? 'rounded-md border border-alsoit-gray-75 p-0.5 h-8 cursor-pointer flex flex-grow' : ''
      } `}
      onClick={() => setShowModal((prev) => !prev)}
    >
      <div className="flex items-center justify-between w-full" onClick={() => dispatch(setFetchAllWorkspace(true))}>
        <div className="flex items-center justify-between space-x-1">
          <AvatarWithInitials
            initials={getInitials(workspaceName ?? '')}
            height="h-6"
            width="w-6"
            backgroundColour={workspaceColor}
            roundedStyle="rounded"
            textColor="white"
          />
          {showSidebar && (
            <p className="truncate" style={{ fontSize: '10px', fontWeight: '600' }}>
              {sidebarWidthRD === MIN_SIDEBAR_WIDTH ? truncateName : workspaceName}
            </p>
          )}
        </div>
        <ArrowDownFilled />
      </div>
      {showModal && (
        <ModalDropdown showModal={showModal} setShowModal={setShowModal} position="left-28 top-14">
          <section className="flex flex-col">
            <div className="pt-3">
              <h4 className="px-4 font-bold capitalize truncate font-alsoit-text-md">
                {workSpaceData?.data.workspace.name}
              </h4>
              <hr />
              {workspaceSettingsList?.map((i, index) => (
                <div
                  key={index}
                  className="flex items-center w-full px-4 py-2 mt-0.5 text-xs text-alsoit-gray-300 rounded-md cursor-pointer hover:bg-alsoit-gray-50"
                  onClick={i.handleClick}
                >
                  <div className="flex ">
                    {i.title}
                    {i.title == 'People' ? (
                      <button
                        className="ml-5 flex items-center bg-alsoit-purple-50 cursor-pointer p-0.5 rounded-md space-x-1"
                        onClick={() => handleInvite()}
                      >
                        <MdOutlineGroupAdd className="w-4 h-4 test-sm" /> <p>Invite</p>
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <Menu>
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
                {filteredResults?.map((i: WorkspaceProps) => (
                  <Menu.Item key={i.id}>
                    {({ active }) => (
                      <div
                        className={cl(
                          active ? 'bg-alsoit-gray-50' : '',
                          'flex items-center px-4 py-2 mt-1 justify-between rounded-md mr-1'
                        )}
                      >
                        <div
                          className={cl('flex items-center space-x-1 text-sm text-alsoit-gray-300 text-left w-full')}
                          onClick={() => onSwitchWorkspace(i.id)}
                        >
                          <div>
                            <AvatarWithInitials
                              initials={i.initials.toUpperCase()}
                              height="h-5"
                              width="w-5"
                              roundedStyle="rounded"
                              backgroundColour={i.color}
                            />
                          </div>
                          <p className="capitalize truncate" style={{ fontSize: '10px' }}>
                            {i.name}
                          </p>
                        </div>
                        {pinnedIds.includes(i.id) ? (
                          <BsPinFill className="mr-1" onClick={(e) => togglePin(i.id, e)} />
                        ) : (
                          <BsPinAngle className="mr-1" onClick={(e) => togglePin(i.id, e)} />
                        )}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu>
          </section>
        </ModalDropdown>
      )}
    </div>
  ) : null;
}

export default WorkSpaceSelection;
