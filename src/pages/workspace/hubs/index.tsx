import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import everythingIcon from '../../../assets/branding/everything-icon.png';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import hubIcon from '../../../assets/branding/hub.svg';
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
import { AiFillFolderAdd } from 'react-icons/ai';
import { RiPlayListAddFill } from 'react-icons/ri';
import { PlusIcon } from '@heroicons/react/24/outline';
import { setActiveEntityName, setCreateEntityType } from '../../../features/workspace/workspaceSlice';
import DropdownWithoutHeader from '../../../components/Dropdown/DropdownWithoutHeader';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import AddWalletIcon from '../../../assets/icons/AddWallet';
import AddHubIcon from '../../../assets/icons/AddHub';
import AddListIcon from '../../../assets/icons/AddList';

function Hubs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { isSearchActive } = useAppSelector((state) => state.search);
  const { listId, hubId, walletId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
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

  const handleNavigateTask = (type: string) => {
    dispatch(setCreateEntityType(type));
    dispatch(setActiveEntityName('Under Construction'));
    if (type === EntityType.hub) {
      navigate(`/${currentWorkspaceId}` + '/tasks');
    }
    setAnchorEl(null);
  };

  const configForDropdown = [
    {
      label: 'Create Hub',
      icon: <AddHubIcon />,
      onclick: () => handleNavigateTask(EntityType.hub)
    },
    {
      label: 'Create New SubHub',
      icon: <AddHubIcon />,
      onclick: () => handleNavigateTask(EntityType.hub)
    },
    {
      label: 'Add New Wallet',
      icon: <AddWalletIcon />,
      onclick: () => handleNavigateTask(EntityType.wallet)
    },
    {
      label: 'Create New Subwallet',
      icon: <AddWalletIcon />,
      onclick: () => handleNavigateTask(EntityType.wallet)
    },
    {
      label: 'Create New List',
      icon: <AddListIcon />,
      onclick: () => handleNavigateTask(EntityType.list)
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
            <PlusIcon className="w-4 h-4" style={{ color: '#BF00FFB2' }} aria-hidden="true" />
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
