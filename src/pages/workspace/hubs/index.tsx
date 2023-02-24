import React from 'react';
import { useGetHubList } from '../../../features/hubs/hubService';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { useDispatch } from 'react-redux';
import { getHub } from '../../../features/hubs/hubSlice';
import everythingIcon from '../../../assets/branding/everything-icon.png';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import hubIcon from '../../../assets/branding/hub.svg';
import { setCreateHubSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import Dropdown from '../../../components/Dropdown/index';
import SubHubModal from './components/SubHubModal';
import Modal from './components/Modal';
import { cl } from '../../../utils';

function Hubs() {
  const dispatch = useDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { toggleArchive } = useAppSelector((state) => state.hub);
  const { data, status } = useGetHubList({
    query: toggleArchive,
  });
  if (status === 'success') {
    dispatch(getHub(data?.data.hubs));
  }

  const configForDropdown = [
    {
      label: 'Hub',
      icon: <img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />,
      onClick: () => dispatch(setCreateHubSlideOverVisibility(true)),
    },
  ];

  return (
    <>
      <PlaceItem
        label="TASK"
        icon={<img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />}
        rightContent={
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Dropdown config={configForDropdown} iconType="plus" />
          </div>
        }
      />

      <div
        className={cl(
          !showSidebar && 'overflow-x-hidden w-12',
          'flex items-center justify-between pl-4 hover:bg-gray-100'
        )}
      >
        <div className="flex items-center content-center self-center py-2">
          <img src={everythingIcon} alt="Hub Icon" className="h-4 mr-4" />
          <p className="block text-xs tracking-wider capitalize truncate">
            Everything
          </p>
        </div>
      </div>

      <ItemsListInSidebar items={data?.data.hubs} status={status} type="hub" />

      <Modal />
      <SubHubModal />
    </>
  );
}

export default Hubs;
