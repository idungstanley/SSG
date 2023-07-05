import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import everythingIcon from '../../../assets/branding/everything-icon.png';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
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
import {
  setActiveEntityName,
  setActiveSubHubManagerTabId,
  setActiveTabId,
  setCreateEntityType
} from '../../../features/workspace/workspaceSlice';
import DropdownWithoutHeader from '../../../components/Dropdown/DropdownWithoutHeader';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import AddWalletIcon from '../../../assets/icons/AddWallet';
import AddHubIcon from '../../../assets/icons/AddHub';
import AddListIcon from '../../../assets/icons/AddList';
import { setSelectedTreeDetails } from '../../../features/hubs/hubSlice';
import Dropdown from '../../../components/Dropdown/index';
import PlusIcon from '../../../assets/icons/PlusIcon';

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
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedTreeDetails({ name: null, id: null, type: null }));
  };

  const handleNavigateTask = (type: string) => {
    dispatch(setCreateEntityType(type));
    dispatch(setActiveEntityName('Under Construction'));
    if (type === EntityType.hub) {
      navigate(`/${currentWorkspaceId}` + '/tasks');
      dispatch(setActiveTabId(9));
      dispatch(setActiveSubHubManagerTabId(1));
    }
    setAnchorEl(null);
  };

  const configForDropdown = [
    {
      label: 'Hub',
      icon: <AddHubIcon />,
      onclick: () => handleNavigateTask(EntityType.hub)
    },
    {
      label: 'SubHub',
      icon: <AddHubIcon />,
      onclick: () => handleNavigateTask(EntityType.hub)
    },
    {
      label: 'Wallet',
      icon: <AddWalletIcon />,
      onclick: () => handleNavigateTask(EntityType.wallet)
    },
    {
      label: 'Subwallet',
      icon: <AddWalletIcon />,
      onclick: () => handleNavigateTask(EntityType.wallet)
    },
    {
      label: 'List',
      icon: <AddListIcon />,
      onclick: () => handleNavigateTask(EntityType.list)
    }
  ];

  const taskCreate = [
    {
      label: 'Create New',
      icon: <PlusIcon />,
      onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => handleOpenDropdown(e)
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
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Dropdown config={taskCreate} iconType="plus" iconColor="#BF00FFB2" />
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
