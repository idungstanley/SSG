import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials, Input } from '../../../../../components';
import { getAllWorkSpaceService, getWorkspaceService } from '../../../../../features/workspace/workspaceService';
import { Spinner } from '../../../../../common';
import { dimensions } from '../../../../../app/config/dimensions';
import { setFetchAllWorkspace } from '../../../../../features/workspace/workspaceSlice';
import { ModalDropdown } from '../../../../../components/Modal/ModalDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import { IWorkspace } from '../../../../../features/account/account.interfaces';
import { switchWorkspaceService } from '../../../../../features/account/accountService';
import { setCurrentWorkspace, switchWorkspace } from '../../../../../features/auth/authSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { MdOutlineGroupAdd, MdSecurity } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { BsPerson, BsPinAngle, BsPinFill } from 'react-icons/bs';
import { Menu } from '@headlessui/react';
import { cl } from '../../../../../utils';
import ArrowDownFilled from '../../../../../assets/icons/ArrowDownFilled';
import { getInitials } from '../../../../../app/helpers';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import { VerticalScroll } from '../../../../../components/ScrollableContainer/VerticalScroll';
import { IoSettingsOutline } from 'react-icons/io5';
import AlsoitIcon from '../../../../../assets/icons/AlsoitIcon';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { FiCreditCard, FiTool } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;
interface workspaceSettingsListType {
  title: string;
  handleClick: () => void;
  icon: ReactElement;
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
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState<null | HTMLDivElement>(null);
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

  const handleCloseModal = () => {
    setShowDropdown(null);
  };

  const handleOpenModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowDropdown(event.currentTarget);
    dispatch(setFetchAllWorkspace(true));
  };

  const pinned = AllMyWorkSpace?.data.workspaces.filter((item) => pinnedIds.includes(item.id));
  const unpinned = AllMyWorkSpace?.data.workspaces.filter((item) => !pinnedIds.includes(item.id));
  const pinnedItems = pinned ?? [];
  const unpinnedItems = unpinned ?? [];
  const sortedItems = [...pinnedItems, ...unpinnedItems];
  useEffect(() => {
    setFilteredResults(sortedItems);
  }, [showDropdown, AllMyWorkSpace]);
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
  const workspaceName = workSpaceData?.data?.workspace?.name;
  const workspaceColor = workSpaceData?.data?.workspace?.color as string;
  const joinName = workspaceName?.split(' ').slice(0, 2).join('').toUpperCase();
  const truncateName = joinName?.substring(0, 6) + '...';

  const workspaceSettingsList: workspaceSettingsListType[] = [
    {
      title: 'Settings',
      handleClick: () => ({}),
      icon: <IoSettingsOutline />
    },
    {
      title: 'AlsoApps',
      handleClick: () => ({}),
      icon: <AlsoitIcon dimensions={{ width: 18, height: 18 }} />
    },
    {
      title: 'People',
      handleClick: () => navigate(`/${currentWorkspaceId}/settings/team-members/invites`, { replace: true }),
      icon: <BsPerson />
    },
    {
      title: 'Analytics',
      handleClick: () => ({}),
      icon: <TbBrandGoogleAnalytics />
    },
    {
      title: 'Integration',
      handleClick: () => ({}),
      icon: <FiTool />
    },
    {
      title: 'Bin',
      handleClick: () => ({}),
      icon: <RiDeleteBin6Line />
    },
    {
      title: 'Billing',
      handleClick: () => ({}),
      icon: <FiCreditCard />
    },
    {
      title: 'Security & Permissions',
      handleClick: () => ({}),
      icon: <MdSecurity />
    }
  ];

  const handleAddWorkSpace = () => {
    navigate('/onboarding');
  };
  const handleInvite = () => {
    navigate('settings/team-members/invites');
  };

  if (status === 'loading') {
    return <Spinner size={10} color={'#6B7280'} />;
  }

  return status === 'success' ? (
    <div
      className={`${
        showSidebar ? 'rounded-md border border-alsoit-gray-100 p-0.5 h-8 cursor-pointer flex flex-grow' : ''
      } `}
    >
      <div className="flex items-center justify-between w-full gap-1" onClick={(e) => handleOpenModal(e)}>
        <div className="flex items-center justify-between space-x-1">
          <AvatarWithInitials
            initials={getInitials(workspaceName ?? '')}
            height={showSidebar ? 'h-6' : 'h-5'}
            width={showSidebar ? 'w-6' : 'w-5'}
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
      <AlsoitMenuDropdown anchorEl={showDropdown} handleClose={handleCloseModal}>
        <section className="flex flex-col py-2 pl-2">
          <VerticalScroll>
            <div className="h-60">
              <h4 className="pl-2 capitalize truncate" style={{ fontSize: '10px' }}>
                {workSpaceData?.data.workspace.name}
              </h4>
              {workspaceSettingsList?.map((i, index) => (
                <div
                  key={index}
                  className="flex items-center w-full p-2 mt-0.5 text-sm text-alsoit-gray-300 rounded-md cursor-pointer hover:bg-alsoit-gray-50 gap-2"
                  onClick={i.handleClick}
                >
                  <span className="flex items-center w-3 h-3">{i.icon}</span>
                  <div className="flex items-center">
                    {i.title}
                    {i.title === 'People' ? (
                      <button
                        className="flex items-center px-1 ml-5 space-x-1 text-white bg-green-400 rounded cursor-pointer"
                        onClick={() => handleInvite()}
                        style={{ fontSize: '10px' }}
                      >
                        <MdOutlineGroupAdd className="w-3 h-3 text-sm" /> <p>Invite</p>
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </VerticalScroll>
          <div className="flex justify-between pt-2 m-2 mr-3 border-t">
            <p className="text-xs font-semibold capitalise">Other Workspaces</p>
            <span className="flex items-center">
              <AiOutlinePlus className="cursor-pointer" onClick={() => handleAddWorkSpace()} />
              <AiOutlineSearch className="cursor-pointer" onClick={() => setIssearch((prev) => !prev)} />
            </span>
          </div>
          {isSearch && (
            <div className="px-2 my-1">
              <Input
                placeholder="Search spaces"
                type="text"
                name="search"
                height="h-8"
                bgColor="bg-alsoit-gray-50"
                trailingIcon={<CiSearch />}
                onChange={(e) => searchItem(e.target.value)}
              />
            </div>
          )}
          <div className="overflow-y-auto max-h-32">
            {filteredResults?.map((i: WorkspaceProps) => (
              <div key={i.id}>
                <div
                  className={cl(
                    'hover:bg-alsoit-gray-50 flex items-center px-3 py-2 mt-1 justify-between rounded-md mr-1'
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
              </div>
            ))}
          </div>
        </section>
      </AlsoitMenuDropdown>
    </div>
  ) : null;
}

export default WorkSpaceSelection;
