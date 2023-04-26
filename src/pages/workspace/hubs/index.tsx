import React from 'react';
// import { useGetHubList } from '../../../features/hubs/hubService';
// import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { useDispatch } from 'react-redux';
// import { getHub } from '../../../features/hubs/hubSlice';
import everythingIcon from '../../../assets/branding/everything-icon.png';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import hubIcon from '../../../assets/branding/hub.svg';
import { setCreateHubSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import Dropdown from '../../../components/Dropdown/index';
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

function Hubs() {
  const dispatch = useDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  // const { toggleArchive } = useAppSelector((state) => state.hub);
  const { isSearchActive } = useAppSelector((state) => state.search);
  // const { data, status } = useGetHubList({
  //   query: toggleArchive
  // });

  // if (status === 'success') {
  //   dispatch(getHub(data?.data.hubs));
  // }

  const toggleSearch = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setIsSearchActive(true));
  };

  const configForDropdown = [
    {
      label: 'hub',
      icon: <img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />,
      onClick: () => dispatch(setCreateHubSlideOverVisibility(true))
    }
  ];

  return (
    <>
      <PlaceItem
        label="TASKS"
        id="2"
        icon={<BsListCheck className="w-4 h-4" style={{ color: '#BF00FFB2' }} />}
        midContent={<BiSearch onClick={(e) => toggleSearch(e)} className="w-4 h-4" style={{ color: '#BF00FFB2' }} />}
        searchStatus={isSearchActive}
        rightContent={
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Dropdown config={configForDropdown} iconType="plus" iconColor="#BF00FFB2" />
          </div>
        }
      />
      <div
        className={cl(
          !showSidebar && 'overflow-x-hidden w-12',
          'flex items-center justify-between pl-7 hover:bg-gray-100'
        )}
      >
        <div className="flex items-center content-center self-center py-2">
          <img src={everythingIcon} alt="Hub Icon" className="h-4 mr-4" />
          <p className="block text-xs tracking-wider capitalize truncate">Everything</p>
        </div>
      </div>
      <ActiveTress />
      {/* <ItemsListInSidebar items={data?.data.hubs} status={status} type="hub" /> */}
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
