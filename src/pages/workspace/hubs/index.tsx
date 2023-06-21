import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import everythingIcon from '../../../assets/branding/everything-icon.png';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import hubIcon from '../../../assets/branding/hub.svg';
import {
  setCreateHubSlideOverVisibility,
  setCreateListSlideOverVisibility,
  setCreateTaskSlideOverVisibility,
  setCreateWalletSlideOverVisibility
} from '../../../features/general/slideOver/slideOverSlice';
import SubHubModal from './components/SubHubModal';
import Modal from './components/Modal';
import { cl } from '../../../utils';
import SubWalletModal from '../wallet/components/modals/SubWalletModal';
import ListModal from '../lists/components/modals/ListModal';
import TaskModal from '../tasks/component/TaskModal';
import { BsListCheck } from 'react-icons/bs';
import WalletModal from '../wallet/components/modals/WalletModal';
import ActiveTress from './components/ActiveTree/ActiveTress';
import { BiSearch } from 'react-icons/bi';
import { setIsSearchActive } from '../../../features/search/searchSlice';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownWithoutHeader from '../../../components/Dropdown/DropdownWithoutHeader';
import { AiFillFolderAdd } from 'react-icons/ai';
import { RiPlayListAddFill } from 'react-icons/ri';
import { PlusIcon } from '@heroicons/react/24/outline';
import { setActiveEntityName } from '../../../features/workspace/workspaceSlice';

function Hubs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { isSearchActive } = useAppSelector((state) => state.search);
  const { listId, hubId, walletId } = useParams();
  const toggleSearch = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setIsSearchActive(true));
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const handleNavigateTask = () => {
    dispatch(setCreateHubSlideOverVisibility(true));
    dispatch(setActiveEntityName('Under Construction'));
    navigate(`/${currentWorkspaceId}` + '/tasks');
  };

  const configForDropdown = [
    {
      label: 'Create Hub',
      icon: <img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />,
      onclick: () => handleNavigateTask()
    },
    {
      label: 'Create New SubHub',
      icon: <img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />,
      onclick: () => handleNavigateTask()
    },
    {
      label: 'Add New Wallet',
      icon: <AiFillFolderAdd className="w-4 h-4" />,
      onclick: () => handleNavigateTask()
    },
    {
      label: 'Create New Subwallet',
      icon: <AiFillFolderAdd className="w-4 h-4" />,
      onclick: () => handleNavigateTask()
    },
    {
      label: 'Create New List',
      icon: <RiPlayListAddFill className="w-4 h-4" />,
      onclick: () => handleNavigateTask()
    }
  ];

  return (
    <>
      <PlaceItem
        label="TASKS"
        id="2"
        isActiveLayoutCondition={!(!!listId || !!hubId || !!walletId)}
        icon={<BsListCheck className="w-4 h-4" style={{ color: '#BF00FFB2' }} />}
        midContent={<BiSearch onClick={(e) => toggleSearch(e)} className="w-4 h-4" style={{ color: '#BF00FFB2' }} />}
        searchStatus={isSearchActive}
        rightContent={
          <div className="flex gap-2" onClick={(e) => handleOpenDropdown(e)}>
            <PlusIcon className="w-4 h-4" aria-hidden="true" />
          </div>
        }
      />
      <div
        className={cl(
          !showSidebar ? 'overflow-x-hidden w-12 pl-5' : 'pl-6',
          'flex items-center justify-between hover:bg-gray-100'
        )}
      >
        <div className="flex items-center content-center self-center py-2">
          <img src={everythingIcon} alt="Hub Icon" className={showSidebar ? 'w-5 h-5 mr-5' : 'h-5 w-5 mr-5'} />
          <p className="block text-xs tracking-wider capitalize truncate">Everything</p>
        </div>
      </div>
      <DropdownWithoutHeader
        items={configForDropdown}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <ActiveTress />
      <Modal />
      <SubHubModal />
      <SubWalletModal />
      <ListModal />
      <TaskModal />
      <WalletModal />
    </>
  );
}

export default Hubs;
