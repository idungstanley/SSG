import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import SubHubModal from './components/SubHubModal';
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
  setCreateEntityType,
  setShowOverlay
} from '../../../features/workspace/workspaceSlice';
import DropdownWithoutHeader from '../../../components/Dropdown/DropdownWithoutHeader';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import AddWalletIcon from '../../../assets/icons/AddWallet';
import AddHubIcon from '../../../assets/icons/AddHub';
import AddListIcon from '../../../assets/icons/AddList';
import { setEntityToCreate, setSelectedTreeDetails } from '../../../features/hubs/hubSlice';
import DropdownWithIcon from '../../../components/Dropdown/index';
import PlusIcon from '../../../assets/icons/PlusIcon';
import ActiveTreeSearch from '../../../components/ActiveTree/ActiveTreeSearch';
import { Modal } from '../../../components/Pilot/components/HotKeys/components/Modal';
import { Capitalize } from '../../../utils/NoCapWords/Capitalize';
import EverythingIcon from '../../../assets/icons/EverythingIcon';

function Hubs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listId, hubId, walletId } = useParams();

  const { showSidebar } = useAppSelector((state) => state.account);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { isSearchActive } = useAppSelector((state) => state.search);
  const { createEntityType } = useAppSelector((state) => state.workspace);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleSearch = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setIsSearchActive(true));
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpenDropdown = () => {
    setShowModal(true);
    dispatch(setSelectedTreeDetails({ name: null, id: null, type: null }));
  };

  const handleNavigateTask = (type: string) => {
    const CapitalizeType = Capitalize(type);
    dispatch(setCreateEntityType(type));
    dispatch(setEntityToCreate(type));
    dispatch(setActiveEntityName('New ' + CapitalizeType + ' Under Construction'));
    if (type === EntityType.hub) {
      setShowModal(false);
      navigate(`/${currentWorkspaceId}` + '/tasks');
      dispatch(setActiveTabId(9));
      dispatch(setShowOverlay(true));
      dispatch(setActiveSubHubManagerTabId(1));
    }
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
      onclick: () => handleNavigateTask(EntityType.subHub)
    },
    {
      label: 'Wallet',
      icon: <AddWalletIcon />,
      onclick: () => handleNavigateTask(EntityType.wallet)
    },
    {
      label: 'Subwallet',
      icon: <AddWalletIcon />,
      onclick: () => handleNavigateTask(EntityType.subWallet)
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
      onClick: () => handleOpenDropdown()
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
            <DropdownWithIcon config={taskCreate} iconType="plus" iconColor="#BF00FFB2" />
          </div>
        }
      />
      <div
        className={cl(
          !showSidebar ? 'overflow-x-hidden w-12 pl-5' : 'pl-6',
          'flex items-center justify-between hover:bg-gray-100'
        )}
      >
        <div className="flex items-center content-center self-center gap-6 py-2">
          <EverythingIcon />
          <p className="block text-xs tracking-wider capitalize truncate">Everything</p>
        </div>
      </div>
      <Modal setShowModal={setShowModal} position="left-44 top-72" showModal={showModal} width="w-64">
        {configForDropdown.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="flex cursor-pointer my-1 gap-2 ml-0.5 rounded-md relative  gap-10 text-gray-500 items-center py-1 px-2 hover:bg-gray-100 cursor-pointer w-full"
              onClick={item.onclick}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {(index + 1) % 2 === 0 && index !== configForDropdown.length - 1 && <hr />}
            {createEntityType === item.label.toLowerCase() && createEntityType !== EntityType.hub && (
              <ActiveTreeSearch />
            )}
          </React.Fragment>
        ))}
      </Modal>

      <DropdownWithoutHeader
        items={configForDropdown}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <ActiveTress />
      <SubHubModal />
      <SubWalletModal />
      <ListModal />
      <TaskModal />
      <WalletModal />
    </>
  );
}

export default Hubs;
